import Header from '../inc/Header';
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Book() {
    const username = JSON.parse(window.localStorage.getItem('user-info'));
    const [isLoading, setIsLoading] = useState(false);
    const date = new Date();
    let day = date.getDate();
    let sum = (date.getMonth() + 1);
    let month = sum < 10 ? "0" + sum : sum;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let firstDate = `${year}-${month}-01`;
    let lasttDate = `${year}-${month}-28`;
    const [toDate, setToDate] = useState(lasttDate);
    const [fromDate, setFromDate] = useState(firstDate);
    const history = useNavigate();
    useEffect(() => {
        if (!window.localStorage.getItem('user-info')) {
            history('/');
        }
        document.getElementById("fromDate").defaultValue = firstDate;
        document.getElementById("toDate").defaultValue = lasttDate;
        fillTable();
    });

    function fillTable(){
        let data = { 'from': fromDate, 'to': toDate };
        let token = JSON.parse(localStorage.getItem('user-info'));
        let auth = 'Bearer ' + token.token;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': auth },
            body: JSON.stringify(data)
        };
        fetch("http://127.0.0.1:8000/api/booking-list", requestOptions)
            .then((respose) => respose.json())
            .then((respose) => {
                console.warn(respose.data.length);
                //    setUsers(respose.data)
                if (respose.data.length > 0) {
                    let source = respose.data;
                    const body = document.getElementById('list'),
                        tbl = document.createElement('table');
                        let header_tr = document.createElement('tr');
                        let th = document.createElement('th');
                        body.innerHTML = "";
                        th.appendChild(document.createTextNode("Name"));
                        console.warn("big");
                        header_tr.appendChild(th);
                        let th2 = document.createElement('th');
                        th2.appendChild(document.createTextNode('message'));
                        header_tr.appendChild(th2);
                        let th4 = document.createElement('th');
                        th4.appendChild(document.createTextNode('booking_date'));
                        header_tr.appendChild(th4);
                        tbl.appendChild(header_tr);
                    for (var i = 0; i < source.length; i++) {

                        let tr = document.createElement('tr');
                        let td = document.createElement('td');
                        td.appendChild(document.createTextNode(source[i]['name'] + "\n"));
                        td.appendChild(document.createTextNode(source[i]['email'] + "\n"));
                        td.appendChild(document.createTextNode(source[i]['contact_number'] + "\n"));
                        tr.appendChild(td);
                        let td2 = document.createElement('td');
                        td2.appendChild(document.createTextNode(source[i]['message']));
                        tr.appendChild(td2);
                        let td4 = document.createElement('td');
                        td4.appendChild(document.createTextNode(source[i]['booking_date'] + "\n"));
                        td4.appendChild(document.createTextNode(source[i]['booking_start_time'] + "\n"));
                        td4.appendChild(document.createTextNode(source[i]['booking_end_time'] + "\n"));
                        tr.appendChild(td4);
                        tbl.appendChild(tr);

                        console.warn(source[i]);
                    }
                    body.appendChild(tbl);
                    console.warn("ran");
                } else {
                    document.getElementById('list').innerHTML = "No results";
                }

            })
            .catch(() => {
                setIsLoading(false);
            });
    }
    return (
        <>

            <Header />
            <h2>{localStorage.getItem('user-info') ? username.name : ""} you bookings.</h2>
            <form>
                <Form.Group id="filters">
                    <Form.Label htmlFor="fromDate">From</Form.Label>
                    <Form.Control size="lg" id="fromDate" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} name="fromDate" required />
                    <Form.Label htmlFor="toDate">To</Form.Label>
                    <Form.Control size="lg" id="toDate" type="date" value={toDate} name="toDate" onChange={(e) => setToDate(e.target.value)} required />
                    <Button className={'btn primary-btn'} onClick={fillTable}>Find</Button>
                </Form.Group>
            </form>
            <div id="list">

            </div>
        </>
    );
}

export default Book;
