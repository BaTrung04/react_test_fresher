import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../Services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';

const TableUsers = (props) => {
    const [listUser, setListUser] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPasges] = useState(0);

    const [isShowModalAddNew, setIsShowMoDalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const handleClose = () => {
        setIsShowMoDalAddNew(false)
        setIsShowModalEdit(false)
    }
    const handleUpdateTableUsers = (user) => {
        setListUser([user, ...listUser])
    }

    const handleEditUserFromModal = (user) => {
        // let cloneListUsers = [...listUser]
        //lodash
        let cloneListUsers = _.cloneDeep(listUser);
        let index = listUser.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        setListUser(cloneListUsers);

    }
    useEffect(() => {
        //call api
        getUser();

    }, [])

    const getUser = async (page) => {
        let res = await fetchAllUser(page)

        if (res && res.data) {
            setTotalUsers(res.total)
            setListUser(res.data)
            setTotalPasges(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUser(+event.selected + 1)
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true)
    }
    return (
        <>
            <div className='my-3 add-new'>
                <span>List Users:</span>
                <button className='btn btn-success' onClick={() => setIsShowMoDalAddNew(true)}>Add new user</button>
            </div>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {listUser && listUser.length > 0 &&
                            listUser.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditUser(item)}
                                            >Edit</button>
                                            <button className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                />
                <ModalAddNew
                    show={isShowModalAddNew}
                    handleClose={handleClose}
                    handleUpdateTableUsers={handleUpdateTableUsers}
                />
                <ModalEditUser
                    show={isShowModalEdit}
                    handleClose={handleClose}
                    dataUserEdit={dataUserEdit}
                    handleUpdateTableUsers={handleUpdateTableUsers}
                    handleEditUserFromModal={handleEditUserFromModal}
                />
            </div>
        </>
    )
}

export default TableUsers;