import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const storage = new GridFsStorage({
    url: `mongodb+srv://Abhishek:OS4FmQUVqDOsgGJA@blog-app.b4d8d.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.memeType) === -1)
            return `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});
const upload = multer({ storage });

export default upload;
