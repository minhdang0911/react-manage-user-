import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FetchAllUser } from '../Services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddnew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
const Header = (props) => {
    const [listUser, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
    };
    useEffect(() => {
        //call api
        getUsers(2);
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

    return (
        <>
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
                                        <button className="btn btn-danger">Delete</button>
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
            <ModalEditUser show={isShowModalEdit} dataUserEdit={dataUserEdit} handleClose={handleClose} />
        </>
    );
};

export default Header;
