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
        console.error('No file uploaded:', req.file);
        return res.status(404).json({ msg: 'File not found' });
    }

    const filename = path.basename(req.file.filename);
    console.log('Sanitized Filename:', filename); // Debug log

    const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
    const imageUrl = `${baseUrl}/file/${filename}`;
    return res.status(200).json({ imageUrl });
};

// Retrieve image
export const getImage = async (request, response) => {
    try {
        const filename = request.params.filename;
        console.log('Requested filename:', filename); // Debug log

        const file = await gfs.files.findOne({ filename });
        if (!file) {
            console.error('File not found:', filename);
            return response.status(404).json({ msg: 'File not found' });
        }

        console.log('File metadata:', file); // Debug log

        response.set('Content-Type', file.contentType);
        response.set('Access-Control-Allow-Origin', '*');

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        console.error('Error retrieving file:', error.message);
        response.status(500).json({ msg: error.message });
    }
};
