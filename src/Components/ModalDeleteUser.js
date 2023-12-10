import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { postCreateUser } from '../Services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import { deleteUser } from '../Services/UserService';

const ModalDeleteUser = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFrom } = props;

    const handleDeleteUserList = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success("Delete user succeed!");
            handleClose();
            handleDeleteUserFrom(dataUserDelete);
        }
        else {
            toast.error('error user delete')
        }
        console.log('CHeck res:', res)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Do you want to delete this user?
                        <br></br>
                        <b>email: {dataUserDelete.email} ?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUserList()} >Delete User</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser;