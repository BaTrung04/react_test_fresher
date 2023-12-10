import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../Services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';

const TableUsers = (props) => {
    const [listUser, setListUser] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPasges] = useState(0);

    const [isShowModalAddNew, setIsShowMoDalAddNew] = useState(false);
    const handleClose = () => {
        setIsShowMoDalAddNew(false)
    }
    const handleUpdateTableUsers = (user) => {
        setListUser([user, ...listUser])
    }
    useEffect(() => {
        //call api
        getUser();

    }, [])

    const getUser = async (page) => {
        let res = await fetchAllUser(page)
        console.log("res:", res)
        if (res && res.data) {
            console.log(res)
            setTotalUsers(res.total)
            setListUser(res.data)
            setTotalPasges(res.total_pages)
        }
    }
    console.log("check res:", listUser)

    const handlePageClick = (event) => {
        getUser(+event.selected + 1)
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
            </div>
        </>
    )
}

export default TableUsers;