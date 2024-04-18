import axios from 'axios';
import './TableUsers.scss';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FetchAllUser } from '../Services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddnew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalComfirm from './ModalComfirm';
import _, { debounce } from 'lodash';
import { CSVLink, CSVDownload } from 'react-csv';
import Papa from 'papaparse';
import { toast, Toast } from 'react-toastify';
const Header = (props) => {
    const [listUser, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');
    const [keyword, setKeyword] = useState('');
    const [dataExport, setDataExport] = useState([]);
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };
    useEffect(() => {
        //call api
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await FetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
            setTotalUsers(res.total);
            setTotalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        // getUsers(+event.selected + 1);
        getUsers(event.selected + 1);
    };

    const hanleUpdateTable = (user) => {
        setListUsers([user, ...listUser]);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        let index = listUser.findIndex((item) => item.id === user.id);
        console.log('index', index);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
        setListUsers(cloneListUsers);
    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUser);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    };

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUser);
            cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 2000);

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name']);
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== 'text/csv') {
                toast.error('Only accept csv file');
                return;
            }
            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== 'email' ||
                                rawCSV[0][1] !== 'first_name' ||
                                rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Wrong format Header CSV file');
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                setListUsers(result);
                            }
                        } else {
                            toast.error('Wrong format CSV file');
                        }
                    } else {
                        toast.error('not found data on CSV file');
                    }
                    console.log('Finished:', results.data);
                },
            });
        }
    };

    useEffect(() => {
        document.title = 'Quản lý người dùng';
    }, []);

    return (
        <>
            <div className="my-3 add-new">
                <span>
                    <b> List users:</b>
                </span>
                <div className="group-button">
                    <label htmlFor="test" className="btn btn-warning">
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input id="test" type="file" hidden onChange={(event) => handleImportCSV(event)} />

                    <CSVLink
                        data={dataExport}
                        filename={'user.csv'}
                        className="btn btn-primary"
                        target="_blank"
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        <i className="fa-solid fa-download"></i> Export
                    </CSVLink>

                    <button
                        className="btn btn-success"
                        onClick={() => {
                            setIsShowModalAddNew(true);
                        }}
                    >
                        <i class="fa-solid fa-circle-plus"></i>
                        Add new
                    </button>
                </div>
            </div>
            <div className="col-4 my-3">
                <input
                    onChange={(event) => handleSearch(event)}
                    className="form-control"
                    placeholder="search user by email"
                    // value={keyword}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className="sort-header">
                                <span> ID </span>
                                <span>
                                    {' '}
                                    <i
                                        onClick={() => handleSort('desc', 'id')}
                                        className="fa-solid fa-arrow-down"
                                    ></i>{' '}
                                    <i className="fa-solid fa-arrow-up" onClick={() => handleSort('asc', 'id')}></i>
                                </span>
                            </div>
                        </th>
                        <th className="sort-header">Email</th>
                        <th>
                            <div className="sort-header">
                                <span> First Name </span>
                                <span>
                                    {' '}
                                    <i
                                        onClick={() => handleSort('desc', 'first_name')}
                                        className="fa-solid fa-arrow-down"
                                    ></i>{' '}
                                    <i
                                        className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className="btn btn-warning mx-3" onClick={() => handleEditUser(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
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
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddnew show={isShowModalAddNew} handleClose={handleClose} hanleUpdateTable={hanleUpdateTable} />
            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalComfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
};

export default Header;
