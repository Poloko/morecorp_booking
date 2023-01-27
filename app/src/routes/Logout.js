import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

function Book() {
    const history = useNavigate();
    localStorage.clear();
    useEffect(() => {
            history('/');
    });
}

export default Book;
