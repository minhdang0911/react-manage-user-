import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';

import { ToastContainer, toast } from 'react-toastify';
import Home from './components/Home';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <>
            <div className="app-container">
                {/* <Container> */}
                <Header />
                <Container>
                    {/* <TableUsers /> */}

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<TableUsers />} />
                    </Routes>
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
