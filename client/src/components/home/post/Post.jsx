import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add smooth transition */
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }

    &:hover {
        transform: scale(1.05); /* Add popping effect */
        box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.5); /* Add shadow effect */
        cursor: pointer; /* Change cursor on hover */
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const Post = ({ post }) => {
    // Dynamically construct the image URL
   const url = post.picture || 'https://via.placeholder.com/150';

    // Helper function to truncate long text
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    };

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    );
};


export default Post;
