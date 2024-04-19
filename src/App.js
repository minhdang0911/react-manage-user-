import './App.scss';
import Header from './components/Header';

import Container from 'react-bootstrap/Container';

import { ToastContainer, toast } from 'react-toastify';

import AppRoutes from './routes/AppRoutes';

import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';

function App() {
    const { user, logout, loginContext } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'));
        }
    }, []);
    return (
        <>
            <div className="app-container">
                {/* <Container> */}
                <Header />
                <Container>
                    {/* <TableUsers /> */}
                    <AppRoutes />
                </Container>

                {/* </Container> */}
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
                // transition: Bounce
            />
        </>
    );
}

export default App;
