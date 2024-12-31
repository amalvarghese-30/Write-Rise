import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled, IconButton, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const Container = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: 'auto',
    marginTop: theme.spacing(6),
    maxWidth: '80%',
    backgroundColor: '#fafafa',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',  // Soft shadow for depth
    borderRadius: theme.shape.borderRadius,  // Rounded corners
    border: '1px solid #e0e0e0',  // Soft border for subtle separation
    [theme.breakpoints.down('md')]: {
        maxWidth: '95%',
        padding: theme.spacing(2),
    },
}));


const Image = styled('img')({
    width: '100%',
    maxHeight: '500px',
    borderRadius: '8px',
    objectFit: 'cover',
});

const ActionIcons = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
});

const Heading = styled(Typography)({
    fontSize: '34px',
    fontWeight: 'bold',
    color: '#333',
    margin: '20px 0 10px',
});

const Author = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

const AuthorName = styled(Typography)({
    fontWeight: 600,
    color: '#555',
});

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {

        document.body.style.backgroundImage = 'url("/banner7.jpg")';
        document.body.style.backgroundPosition = 'center';


        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundPosition = '';

        };
    }, []);

    const deleteBlog = async () => {
        try {
            const response = await API.deletePost(post._id);
            if (response.isSuccess) {
                alert('Post deleted successfully');
                navigate('/');
            } else {
                alert('Error deleting post');
            }
        } catch (error) {
            alert('Error deleting post');
            console.error('Error deleting post:', error);
        }
    };

    return (

        <Container elevation={4}>
            <Image src={post.picture || url} alt="post" />
            <ActionIcons>
                {account.username === post.username && (
                    <>
                        <IconButton onClick={() => navigate(`/update/${post._id}`)} size="large">
                            <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={deleteBlog} size="large">
                            <Delete color="error" />
                        </IconButton>
                    </>
                )}
            </ActionIcons>
            <Heading>{post.title}</Heading>
            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none' }}>
                    <AuthorName>Author: {post.username}</AuthorName>
                </Link>
                <Typography variant="body2">
                    {new Date(post.createdDate).toDateString()}
                </Typography>
            </Author>
            <Typography paragraph>{post.description}</Typography>
            <Comments post={post} />
        </Container>

    );
};

export default DetailView;
