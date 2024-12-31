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
    animation: fadeInComponent 0.5s 0.3s forwards;

    @keyframes fadeInComponent {
        to {
            opacity: 1;
        }
    }
`;

const Image = styled('img')({
    width: '80%',
    height: 'auto',
    objectFit: 'contain',
    filter: 'grayscale(100%)',
    display: 'block',
    margin: '10px auto 0',
    marginBottom: '0',
    borderBottom: 'none',
});

const Wrapper = styled(Box)`
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #000000;
    color: #ffffff;
    height: 48px;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #ffffff;
    color: #000000;
    height: 48px;
    border-radius: 8px;
    border: 2px solid black;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    animation: fadeIn 0.5s forwards;

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;

const CenteredContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    padding-bottom: 100px;
`;

const loginInitialValues = {
    username: '',
    password: '',
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

    useEffect(() => {
        showError(false);
    }, [login]);

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
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            const user = response.data;
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });

            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }

            isUserAuthenticated(true);
            setLogin(loginInitialValues);
        } else {
            showError('Something went wrong! Please try again later.');
        }
    };

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! Please try again later.');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <CenteredContainer>
            <Component>
                <Image src={loginImage} alt="blog" />
                {account === 'login' ? (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={login.username}
                            onChange={onValueChange}
                            name="username"
                            label="Enter Username"
                        />
                        <TextField
                            variant="standard"
                            value={login.password}
                            onChange={onValueChange}
                            name="password"
                            label="Enter Password"
                        />
                        {error && <Error>{error}</Error>}
                        <LoginButton onClick={loginUser}>Login</LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>
                            Create an account
                        </SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            onChange={onInputChange}
                            name="name"
                            label="Enter Name"
                        />
                        <TextField
                            variant="standard"
                            onChange={onInputChange}
                            name="username"
                            label="Enter Username"
                        />
                        <TextField
                            variant="standard"
                            onChange={onInputChange}
                            name="password"
                            label="Enter Password"
                        />
                        <SignupButton onClick={signupUser}>Signup</SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton onClick={toggleSignup}>Already have an account</LoginButton>
                    </Wrapper>
                )}
            </Component>
        </CenteredContainer>
    );
};

export default Login;
