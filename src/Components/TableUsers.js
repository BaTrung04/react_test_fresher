import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../Services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import _, { debounce } from 'lodash';
import './TableUsers.scss'
import { CSVLink, CSVDownload } from "react-csv";


const TableUsers = (props) => {
    const [listUser, setListUser] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPasges] = useState(0);

    const [isShowModalAddNew, setIsShowMoDalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});


    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState('id');

    const [keyword, setKeyWord] = useState('');
    const [dataExport, setDataExport] = useState('');

    const handleClose = () => {
        setIsShowMoDalAddNew(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
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

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handleDeleteUserFrom = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUser(cloneListUsers);


    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUser);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUser(cloneListUsers);


    }

    const handleSearch = debounce((event) => {
        let term = event.target.value
        if (term) {
            let cloneListUsers = _.cloneDeep(listUser);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUser(cloneListUsers)
        } else {
            getUser();
        }
    }, 300)

    const getUserExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name'])
            listUser.map(item => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                console.log(arr)
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }
    return (
        <>
            <div className='my-3 add-new'>
                <span>List Users:</span>
                <div className='group-btns'>
                    <label htmlFor="test" className='btn btn-warning'>
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input id='test' type='file' hidden />
                    <CSVLink
                        data={dataExport}
                        filename={"users.csv"}
                        className="btn btn-primary"
                        asyncOnClick={true}
                        onClick={getUserExport}
                    >
                        <i className="fa-solid fa-file-arrow-down"></i> Export
                    </CSVLink>

                    <button
                        className='btn btn-success'
                        onClick={() => setIsShowMoDalAddNew(true)}
                    >
                        <i className="fa-solid fa-circle-plus"></i> Add new
                    </button>
                </div>
            </div>

            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    placeholder='Search user by email....'
                    // value={keyword}
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className='sort-header'>
                                    <span>ID</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down" onClick={() => handleSort("desc", 'id')}></i>
                                        <i className="fa-solid fa-arrow-up" onClick={() => handleSort("asc", 'id')}></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className='sort-header'>
                                    <span>First Name</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down" onClick={() => handleSort("desc", 'first_name')}></i>
                                        <i className="fa-solid fa-arrow-up" onClick={() => handleSort("asc", 'first_name')}></i>
                                    </span>
                                </div>
                            </th>
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
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteUser(item)}

                                            >Delete</button>
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
                <ModalDeleteUser
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataUserDelete={dataUserDelete}
                    handleDeleteUserFrom={handleDeleteUserFrom}
                />
            </div>
        </>
    )
}

export default TableUsers;