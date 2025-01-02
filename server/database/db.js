import mongoose from 'mongoose';

const Connection = async () => {
    const URL = `mongodb+srv://Abhishek:OS4FmQUVqDOsgGJA@blog-app.b4d8d.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;
    try {
        // Updated: No need for useNewUrlParser or useUnifiedTopology
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;
