import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGO_URI || `mongodb+srv://Abhishek:OS4FmQUVqDOsgGJA@blog-app.b4d8d.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

        if (match.indexOf(file.mimetype) === -1) {
            return {
                bucketName: "photos",
                filename: `${Date.now()}-blog-${file.originalname}`,
            };
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        };
    }
});

const upload = multer({ storage });

export default upload;
