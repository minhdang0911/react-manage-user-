import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import ModalAddnew from './components/ModalAddNew';
import { useState } from 'react';

function App() {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const handleClose = () => {
        setIsShowModalAddNew(false);
    };
    return (
        <div className="app-container">
            {/* <Container> */}
            <Header />
            <Container>
                <div className="my-3 add-new">
                    <span>
                        <b> List users:</b>
                    </span>

                    <button
                        className="btn btn-success"
                        onClick={() => {
                            setIsShowModalAddNew(true);
                        }}
                    >
                        Add new user
                    </button>
                </div>

                <TableUsers />
            </Container>
            <ModalAddnew show={isShowModalAddNew} handleClose={handleClose} />

            {/* </Container> */}
        </div>
    );
}

export default App;
