
import './App.scss';
import Header from './Components/Header';
import TableUsers from './Components/TableUsers';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import ModalAddNew from './Components/ModalAddNew';
import { useState } from 'react';
function App() {
  const [isShowModalAddNew, setIsShowMoDalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowMoDalAddNew(false)
  }
  return (
    <div className='app-container'>
      <Header />
      <Container>
        <div className='my-3 add-new'>
          <span>List Users:</span>
          <button className='btn btn-success' onClick={() => setIsShowMoDalAddNew(true)}>Add new user</button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}

      />
    </div>
  );
}

export default App;
