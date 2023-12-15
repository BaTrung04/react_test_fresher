import { Routes, Route, Link } from 'react-router-dom';
import Login from '../Components/Login';
import Home from '../Components/Home';
import PrivateRoutes from './PrivateRouter';
import TableUsers from '../Components/TableUsers';
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>

                <Route
                    path='/users'
                    element={
                        <PrivateRoutes  >
                            <TableUsers />
                        </PrivateRoutes>
                    }

                />

            </Routes>
            {/* <PrivateRoutes path1="/users" >
                <TableUsers />
            </PrivateRoutes> */}


        </>
    );
}

export default AppRoutes;