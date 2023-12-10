import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { postCreateUser } from '../Services/UserService';
import { ToastContainer, toast } from 'react-toastify';


const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTableUsers } = props;
    const [name, setName] = useState([]);
    const [job, setJob] = useState([]);

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        if (res && res.id) {
            handleClose();
            setName('');
            setJob("");
            toast.success("a user is create success!")
            // props.handleUpdateTableUsers()
            handleUpdateTableUsers({
                first_name: name,
                id: res.id,
            })
            //success
        }
        else {
            toast.error("an error")

        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input
                                type="text"
                                className="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;