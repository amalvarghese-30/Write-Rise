import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]); // State to hold all posts
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    // Fetch posts when the component mounts or when the category changes
    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data); // Update state with fetched posts
            }
        };
        fetchData();
    }, [category]);

    return (
        <>
            {posts.length ? (
                posts.map((post) => (
                    <Grid item lg={3} sm={4} xs={12} key={post._id}>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            to={`details/${post._id}`}
                        >
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for the selected category
                </Box>
            )}
        </>
    );
};

export default Posts;
