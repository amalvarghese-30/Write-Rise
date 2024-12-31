import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, styled, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { API } from '../../service/api';

const DashboardContainer = styled(Box)`
    background-color: #fff; /* White background */
    color: #000; /* Black text */
    min-height: 100vh;
    padding: 20px;
`;

const Title = styled(Typography)`
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    color: #000; /* Black text */
`;

const PostCard = styled(Card)`
    background-color: #f9f9f9; /* Light grey card background */
    color: #000; /* Black text */
    margin: 15px;
    border: 1px solid #ddd; /* Subtle border */
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
`;

const CardImage = styled(CardMedia)`
    height: 150px;
    border-bottom: 1px solid #ddd; /* Border between image and content */
`;

const DeleteButton = styled(Button)`
    background-color: #000; /* Black button */
    color: #fff; /* White text */
    text-transform: none;
    &:hover {
        background-color: #333; /* Slightly lighter black on hover */
    }
`;

const PaginationContainer = styled(Box)`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PaginationButton = styled(Button)`
    background-color: #000; /* Black button */
    color: #fff; /* White text */
    text-transform: none;
    &:hover {
        background-color: #333; /* Slightly lighter black on hover */
    }
`;

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]); // All posts
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const postsPerPage = 6; // Number of posts to show per page

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await API.getAdminPosts();
            if (response.isSuccess) {
                setPosts(response.data);
            }
        };
        fetchPosts();
    }, []);

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handleNextPage = () => {
        if (indexOfLastPost < posts.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const deletePost = async (id) => {
        await API.deleteAdminPost(id);
        setPosts(posts.filter((post) => post._id !== id));
    };

    return (
        <DashboardContainer>
            <Title>Admin Dashboard</Title>
            <Grid container spacing={3}>
                {currentPosts.map((post) => (
                    <Grid item xs={12} md={6} lg={4} key={post._id}>
                        <PostCard>
                            {post.picture && (
                                <CardImage
                                    image={post.picture}
                                    title={post.title}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Author: {post.username}
                                </Typography>
                                <Box mt={2}>
                                    <DeleteButton onClick={() => deletePost(post._id)} fullWidth>
                                        Delete
                                    </DeleteButton>
                                </Box>
                            </CardContent>
                        </PostCard>
                    </Grid>
                ))}
            </Grid>
            <PaginationContainer>
                <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1} style={{ marginRight: 10 }}>
                    Previous
                </PaginationButton>
                <PaginationButton
                    onClick={handleNextPage}
                    disabled={indexOfLastPost >= posts.length}
                >
                    Next
                </PaginationButton>
            </PaginationContainer>
        </DashboardContainer>
    );
};

export default AdminDashboard;
