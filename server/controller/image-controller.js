import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import path from 'path';

const url = process.env.BASE_URL || 'http://localhost:8000';


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

export const uploadImage = (req, res) => {
    if (!req.file) {
        console.error('No file uploaded:', req.file);
        return res.status(404).json({ msg: 'File not found' });
    }

    // Ensure only the filename is extracted
    const filename = path.basename(req.file.filename);

    console.log('Sanitized Filename:', filename); // Debug log to confirm sanitization

    // Generate the correct image URL
    const imageUrl = `${url}/file/${filename}`;
    return res.status(200).json({ imageUrl });
};




export const getImage = async (request, response) => {
    try {
        const filename = request.params.filename; // Expect just the filename
        const file = await gfs.files.findOne({ filename });

        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        // Set the Content-Type and CORS headers
        response.set('Content-Type', file.contentType);
        response.set('Access-Control-Allow-Origin', '*');

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
};
