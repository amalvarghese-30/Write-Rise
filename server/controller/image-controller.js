import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import path from 'path';

const url = process.env.BASE_URL;

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs',
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
    console.log('GridFS initialized successfully');
});

// Upload image
export const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(404).json({ msg: 'File not found' });
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
    const imageUrl = `${baseUrl}/file/${req.file.filename}`; // Correct construction
    return res.status(200).json({ imageUrl });
};

// Retrieve image
export const getImage = async (req, res) => {
    try {
        const filename = req.params.filename;

        const file = await gfs.files.findOne({ filename });
        if (!file) {
            return res.status(404).json({ msg: 'File not found' });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        res.set('Content-Type', file.contentType);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

