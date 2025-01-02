import Post from '../model/post.js';


export const createPost = async (req, res) => {
    try {
        // Ensure only the filename is saved
        if (req.body.picture) {
            req.body.picture = req.body.picture.replace(/^.*\/file\//, '');
        }

        const post = new Post(req.body);
        await post.save();
        res.status(200).json('Post saved successfully');
    } catch (error) {
        console.error('Error creating post:', error);
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
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Add full URL to the picture field
        if (post.picture) {
            post.picture = `https://write-rise.onrender.com/file/${post.picture}`;
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ msg: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    const { username, category } = req.query;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }

        // Add full URL to each post's picture field
        posts = posts.map((post) => {
            if (post.picture) {
                post.picture = `https://write-rise.onrender.com/file/${post.picture}`;
            }
            return post;
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ msg: error.message });
    }
};

