import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import loginImage from '../../images/logo1.png';



const Component = styled(Box)`
    width: 600px;
    margin: 200px auto;
    box-shadow: 0px 0px 150px 1px rgba(0, 0, 0.5, 1);
    background: #ffffff;
    border-radius: 40px;
    overflow: hidden;
    opacity: 0;
    animation: fadeInComponent 0.5s 0.3s forwards; // Delayed fade-in for dramatic effect

    @keyframes fadeInComponent {
        to {
            opacity: 1;
        }
    }
`;





const Image = styled('img')({
    width: '80%',         // Reduced width to make the image visually smaller
    height: 'auto',       // Maintain aspect ratio
    objectFit: 'contain', // Ensures the image is fully visible and centered
    filter: 'grayscale(100%)',
    display: 'block',
    margin: '10px auto 0', // Centers the image horizontally, margin-top is 10px
    marginBottom: '0',
    borderBottom: 'none'
});


// Adjust the Wrapper to ensure it fits well within the Component
const Wrapper = styled(Box)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: #ffffff; // Ensure the background matches
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

// Buttons adjusted for better visual integration
const LoginButton = styled(Button)`
    text-transform: none;
    background: #000000;
    color: #ffffff;
    height: 48px;
    border-radius: 8px;
    transition: transform 0.3s ease; // Smooth transition for the transform property

    &:hover {
        transform: scale(1.05); // Scales up the button to 105% of its size
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Optional: adds a shadow for more depth
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #ffffff;
    color: #000000;
    height: 48px;
    border-radius: 8px;
    border: 2px solid black;
    transition: transform 0.3s ease; // Consistent transition for visual cohesion

    &:hover {
        transform: scale(1.05); // Same scale effect for consistency
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Adds shadow for depth and visibility
    }
`;





const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
    opacity: 0;
    animation: fadeIn 0.5s forwards; // Animation to fade in the error message

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;


const StyledTextField = styled(TextField)`
    & .MuiInput-underline:after {
        border-bottom: 2px solid #000000; // Black underline
    }

    & .MuiInput-underline:before {
        border-bottom: 1px solid #cccccc; // Default underline color
    }

    &:hover .MuiInput-underline:before {
        border-bottom: 1px solid #333333; // Darken underline on hover
    }

    & .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom: 2px solid #333333; // Thicker and darker underline on hover
    }

    & .Mui-focused .MuiInput-underline:after {
        border-bottom: 2px solid #000000; // Keep black underline on focus
    }
`;

const CenteredContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    padding-bottom:100px;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError(false);
    }, [login])

    useEffect(() => {
        document.body.style.height = '100%';
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.backgroundImage = 'url("./loginback.jpg")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.overflow = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
        };
    }, []);




    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });

            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! Please try again later.');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! Please try again later.');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <CenteredContainer>
            <Component>
                <Image src={loginImage} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={onValueChange} name='username' label='Enter Username' />
                            <TextField variant="standard" value={login.password} onChange={onValueChange} name='password' label='Enter Password' />
                            {error && <Error>{error}</Error>}
                            <LoginButton onClick={loginUser} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={onInputChange} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={onInputChange} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={onInputChange} name='password' label='Enter Password' />
                            <SignupButton onClick={signupUser} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton onClick={toggleSignup}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Component>
        </CenteredContainer>
    )
}

export default Login;
