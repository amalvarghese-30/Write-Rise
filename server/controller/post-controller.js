import Post from '../model/post.js';


export const createPost = async (req, res) => {
    try {
        if (req.body.picture) {
            const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
            req.body.picture = `${baseUrl}/file/${req.body.picture.replace(/^.*\/file\//, '')}`;
        }

        const post = new Post(req.body);
        await post.save();
        res.status(200).json('Post saved successfully');
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Ensure only the filename is saved
        if (req.body.picture) {
            req.body.picture = req.body.picture.replace(/^.*\/file\//, '');
        }

        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Post updated successfully');
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ msg: error.message });
    }
};


export const deletePost = async (req, res) => {
    try {
        console.log('Request params:', req.params); // Debugging log
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ msg: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.picture) {
            post.picture = `${process.env.BASE_URL}/file/${post.picture}`;
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find();
        posts = posts.map((post) => {
            if (post.picture) {
                post.picture = `${process.env.BASE_URL}/file/${post.picture}`;
            }
            return post;
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find();
        posts = posts.map((post) => {
            if (post.picture) {
                post.picture = `${process.env.BASE_URL}/file/${post.picture}`;
            }
            return post;
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

