import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Book from './routes/Book'
import Home from './routes/Home'
import UpdateBooking from './UpdateBooking'
import Register from './routes/Register'
import Login from './routes/Login';
import List from './routes/List';
import Logout from './routes/Logout';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/add' element={<Book />}></Route>
          <Route path='/update' element={<UpdateBooking />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
