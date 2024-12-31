import grid from 'gridfs-stream'
import mongoose from 'mongoose';

const url = 'http://localhost:8000';


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
        // if (!file) {
        //     return response.status(404).json({ msg: "File not found" });
        // }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        // Set the correct Content-Type header for the file
        // response.set('Content-Type', file.contentType);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
};
