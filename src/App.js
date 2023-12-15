
import './App.scss';
import Header from './Components/Header';
import Home from './Components/Home';
import TableUsers from './Components/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Components/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log(">>>check user:", user)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/users' element={<TableUsers />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
