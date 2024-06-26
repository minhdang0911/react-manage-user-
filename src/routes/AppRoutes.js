import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import TableUsers from '../components/TableUsers';
import PrivateRoutes from './PrivateRoutes';
import NotFound from '../components/NotFound';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoutes>
                            <TableUsers />
                        </PrivateRoutes>
                    }
                ></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <PrivateRoutes path="/users">
                <TableUsers />
            </PrivateRoutes> */}
        </>
    );
};

export default AppRoutes;
