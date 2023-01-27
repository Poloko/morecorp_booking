import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import Header from '../inc/Header';

function Book() {
    const history = useNavigate();
    useEffect(() => {
        if (!window.localStorage.getItem('user-info')) {
            history('/');
        }
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const theDate = new Date();

    //verify email valid
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    //validate inputs on change
    const handleChange = (event) => {
        switch (event.target.id) {
            case "emailAdd":
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
            case "nameAdd":
                let password = event.target.value;
                if (password.length > 3) {
                    event.target.classList.remove("is-invalid");
                    event.target.classList.add("is-valid");
                } else {
                    event.target.classList.add("is-invalid");
                    event.target.classList.remove("is-valid");
                }
                break;
            case "contactNum":
                let contactNum = event.target.value;
                if (contactNum.length > 3) {
                    event.target.classList.remove("is-invalid");
                    event.target.classList.add("is-valid");
                } else {
                    event.target.classList.add("is-invalid");
                    event.target.classList.remove("is-valid");
                }
                break;
            case "message":
                let messagetrt = event.target.value;
                if (messagetrt.length > 10) {
                    event.target.classList.remove("is-invalid");
                    event.target.classList.add("is-valid");
                } else {
                    event.target.classList.add("is-invalid");
                    event.target.classList.remove("is-valid");
                }
                break;
            case "date":
                let datet = event.target.value;
                if (datet.length > 3) {
                    event.target.classList.remove("is-invalid");
                    event.target.classList.add("is-valid");
                } else {
                    event.target.classList.add("is-invalid");
                    event.target.classList.remove("is-valid");
                }
                break;
            case "startTime":
                let startTimeu = event.target.value;
                if (startTimeu.length > 3) {
                    event.target.classList.remove("is-invalid");
                    event.target.classList.add("is-valid");
                } else {
                    event.target.classList.add("is-invalid");
                    event.target.classList.remove("is-valid");
                }
                break;
            case "endTime":
                let endTimeu = event.target.value;
                if (endTimeu.length > 3) {
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
        let data = { 'name': document.getElementById("nameAdd").value, 'email': document.getElementById("emailAdd").value, 'contact_number': document.getElementById("contactNum").value, 'message': document.getElementById("message").value, 'booking_date': document.getElementById("date").value, 'booking_start_time': document.getElementById("startTime").value, 'booking_end_time': document.getElementById("endTime").value }
        let token = JSON.parse(localStorage.getItem('user-info'));
        let auth = 'Bearer ' + token.token;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': auth },
            body: JSON.stringify(data)
        };


        fetch("http://127.0.0.1:8000/api/booking-create", requestOptions)
            .then((respose) => respose.json())
            .then((respose) => {
                //    setUsers(respose.data)
                if (respose.success) {
                    alert('saved');
                    setTimeout(() => { history('/') }, 3000);
                } else {
                    setIsLoading(false);
                }

            })
            .catch(() => {
                setIsLoading(false);
            });
    };
    const renderForm = (
        <div>

            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Form id='loginform'>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="nameAdd">Name</Form.Label>
                                <Form.Control size="lg" value={name} id="nameAdd" type="text" name="nameAdd" placeholder="User Name" onChange={(e) => setName(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">Nice name!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter name.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="emailAdd">Email</Form.Label>
                                <Form.Control size="lg" value={email} id="emailAdd" type="email" name="emailAdd" placeholder="User Email" onChange={(e) => setEmail(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter email.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="contactNum">Contact Number</Form.Label>
                                <Form.Control type="text" value={number} id="contactNum" name="contactNum" placeholder="Contact Number" size="lg" onChange={(e) => setNumber(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">Now we are getting there!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please enter you number.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="message">Message</Form.Label>
                                <Form.Control type="text" value={message} id="message" name="message" placeholder="Message" size="lg" onChange={(e) => setMessage(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">Interesting!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please tell me more.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="date">Date</Form.Label>
                                <Form.Control type="date" value={date} id="date" name="date" min={theDate} size="lg" onChange={(e) => setDate(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">It's set!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please pick a date.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="startTime">Start Time</Form.Label>
                                <Form.Control type="time" value={startTime} id="startTime" name="startTime" size="lg" onChange={(e) => setStartTime(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">I'll be there!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please pick a start time.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="">
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="endTime">End Time</Form.Label>
                                <Form.Control type="time" value={endTime} id="endTime" name="endTime" size="lg" onChange={(e) => setEndTime(e.target.value)} onBlur={handleChange} required />
                                <Form.Control.Feedback type="valid">It's a quick one, lol! Now let's save it.</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please pick a end time.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" size="lg" onClick={handleFetch}>
                            Add Item
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>);
    return (
        <>

            <Header />
            <div className='col-xs-6 col-sm-6 col-md-6 offset-xs-3 offset-sm-3 offset-md-3 login-form'>
                <h2>Add item</h2>
                {isLoading ? <LoadingSpinner /> : renderForm}

            </div>
        </>
    );
}

export default Book;
