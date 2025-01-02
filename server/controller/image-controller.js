import grid from 'gridfs-stream'
import mongoose from 'mongoose';

const url = 'https://write-rise.onrender.com';


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

    console.log('File details:', req.file); // Debug log for the uploaded file

    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
};





export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });

        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        // Set CORS and Content-Type headers
        response.set('Access-Control-Allow-Origin', 'https://write-rise-frontend.onrender.com'); // Frontend domain
        response.set('Content-Type', file.contentType);

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
};
