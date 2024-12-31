import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './model/user.js'; // Adjust the path if necessary

const createAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10); // Replace 'admin123' with your desired password
        const adminUser = new User({
            name: 'Admin',
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });
        await adminUser.save();
        console.log('Admin user created successfully!');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        mongoose.disconnect(); // Ensure database connection is closed
    }
};

const connectDBAndCreateAdmin = async () => {
    try {
        const URL = `mongodb+srv://Abhishek:OS4FmQUVqDOsgGJA@blog-app.b4d8d.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully!');
        await createAdmin(); // Call function to create the admin user
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

connectDBAndCreateAdmin();
