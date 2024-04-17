import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../Services/UserService';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const ModalEditUser = (props) => {
    const { handleClose, show, dataUserEdit } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = () => {};

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    console.log('edit', dataUserEdit);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add-new">
                    <form>
                        <div class="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Job</label>
                            <input
                                type="text"
                                class="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Comfirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditUser;
