import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import LoadingSpinner from "../LoadingSpinner";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from '../inc/Header';

function Register() {
    const history = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem('user-info') !== null) {
            history('/');
        }
    });
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //verify email valid
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //validate inputs on change
    const handleChange = (event) => {
        switch (event.target.type) {
            case "email":
                let email = event.target.value;
                // console.warn(email);
                if (!isValidEmail(email)) {
                    event.target.classList.add("is-invalid");
                    event.target.classList.remove("is-valid");
                } else {
                    event.target.classList.remove("is-invalid");
                    event.target.classList.add("is-valid");
                }
                break;
            case "password":
                let password = event.target.value;
                if (password.length > 8) {
                    event.target.classList.remove("is-invalid");
                    event.target.classList.add("is-valid");
                } else {
                    event.target.classList.add("is-invalid");
                    event.target.classList.remove("is-valid");
                }
                break;
                case "text":
                    let text = event.target.value;
                    if (text.length > 3) {
                        event.target.classList.remove("is-invalid");
                        event.target.classList.add("is-valid");
                    } else {
                        event.target.classList.add("is-invalid");
                        event.target.classList.remove("is-valid");
                    }
                break;
        }
    };
    const handleFetch = () => {
        setIsLoading(true);
        let data = { 'name': document.getElementById("username").value, 'email': document.getElementById("emailReg").value, 'password': document.getElementById("regPassword").value }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        };


        fetch("http://127.0.0.1:8000/api/register", requestOptions)
            .then((respose) => respose.json())
            .then((respose) => {
                //    setUsers(respose.data)
                if (respose.token) {
                    localStorage.setItem('user-info', JSON.stringify(respose));
                    alert("Logged in successfully");
                    setTimeout(() => { history('/') }, 3000);
                } else {
                    setIsLoading(false);
                    alert("Logged in Failed");
                }

            })
            .catch(() => {
                setIsLoading(false);
                alert("Unable to send request");
            });
    };
    const renderForm = (
        <div>

            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Form id='loginform'>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="username">Username</Form.Label>
                                <Form.Control size="lg" value={username} id="username" type="text" name="username" placeholder="User Name" onChange={(e) => setUsername(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">Nice Name!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter email.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="emailReg">Email</Form.Label>
                                <Form.Control size="lg" value={message} id="emailReg" type="email" name="emailReg" placeholder="User Email" onChange={(e) => setMessage(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter email.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="regPassword">Password</Form.Label>
                                <Form.Control type="password" value={password} id="regPassword" aria-describedby="passwordHelpBlock" placeholder="Password" size="lg" onChange={(e) => setPassword(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">Let's register now!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Password too short.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" size="lg" onClick={handleFetch}>
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>);
    return (
        <>
        
        <Header />
        <div className='col-xs-6 col-sm-6 col-md-6 offset-xs-3 offset-sm-3 offset-md-3 login-form'>
            <h2>Register</h2>
            {isLoading ? <LoadingSpinner /> : renderForm}

        </div>
        </>
    );
}

export default Register;
