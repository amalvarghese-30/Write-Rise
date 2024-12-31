import { AppBar, Toolbar, styled, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import headlog from './logo1.png';
const Component = styled(AppBar)`
    background: rgba(255, 255, 255, 0.95); // Semi-transparent white for a subtle glass effect
    color: #333; // Soft black for text
    box-shadow: none; // Remove default material-UI shadow for a flatter design
    border-bottom: 1px solid #ddd; // Adds a subtle separation from the content
`;

const Container = styled(Toolbar)`
    justify-content: space-between; // Spreads content to both ends
`;

const Logo = styled('img')`
    height: 80px; // Set the height of your logo
    cursor: pointer;
`;

const Navigation = styled('div')`
    & > a, & > button {
        padding: 20px;
        color: #333; // Matching the text color with the general theme
        text-decoration: none;
        font-size: 18px; // Larger font size for better readability
        font-weight: 500; // Medium font weight for a more pronounced appearance
        transition: color 0.3s, border-bottom 0.3s; // Smooth transitions for hover effects

        &:hover, &:focus {
            color: #000; // Darker color on hover for contrast
            border-bottom: 3px solid black; // Underline effect on hover
        }

        &[aria-current="page"] {
            color: #000; // Highlight the active page more distinctly
            border-bottom: 3px solid black; // Strong underline for active link
        }
    }
`;

const Header = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Assuming logout mechanism clears session or token then navigates
        navigate('/account');
    };

    return (
        <Component>
            <Container>
                <Logo src={headlog} alt="Logo" onClick={() => navigate('/')} />
                <Navigation>
                    <Link to='/' aria-current={window.location.pathname === '/' ? 'page' : undefined}>HOME</Link>
                    <Link to='/about' aria-current={window.location.pathname === '/about' ? 'page' : undefined}>ABOUT</Link>
                    <Link to='/contact' aria-current={window.location.pathname === '/contact' ? 'page' : undefined}>CONTACT</Link>
                    <Button onClick={logout} style={{ color: '#333' }}>LOGOUT</Button>
                </Navigation>
            </Container>
        </Component>
    )
}

export default Header;
