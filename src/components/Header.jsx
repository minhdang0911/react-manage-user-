import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../Assets/logo.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = (props) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('logout success');
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} width="35" height="35" className="d-inline-block align-top" alt="logo" />
                    <span> Quản lý người dùng</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>

                        <NavLink to="/users" className="nav-link">
                            Manage User
                        </NavLink>
                    </Nav>

                    <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavLink to="/login" className="dropdown-item">
                                Login
                            </NavLink>
                            <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
