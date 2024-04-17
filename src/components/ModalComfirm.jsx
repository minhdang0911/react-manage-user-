import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../Services/UserService';
import { toast } from 'react-toastify';

const ModalComfirm = (props) => {
    const { handleClose, show, dataUserDelete, handleDeleteUserFromModal } = props;
    console.log('dataUserDelete', dataUserDelete);

    const ComfirmDelete = async () => {
        let res = await DeleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success('Delete User Success');
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error('Error Delete User');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delte a users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add-new">
                    this action can't be undone! Do you want to delete this user <br />
                    <b>Email={dataUserDelete.email}</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => ComfirmDelete()}>
                    Comfirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComfirm;
