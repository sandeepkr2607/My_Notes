import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userAction';

function Header(props) {
  const { setSearch } = props;
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          onClick={() => Navigate('/')}
          className="logoNav"
          style={{ cursor: 'pointer' }}
        >
          My Note
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Nav>

          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {userInfo ? (
              <Nav.Link onClick={() => Navigate('/mynotes')}>My Notes</Nav.Link>
            ) : null}

            <NavDropdown
              title={userInfo ? `${userInfo?.name}` : `Login`}
              id="navbarScrollingDropdown"
            >
              {userInfo ? (
                <NavDropdown.Item onClick={() => Navigate('/profile')}>
                  My Profile
                </NavDropdown.Item>
              ) : null}

              {userInfo ? (
                <NavDropdown.Item
                  onClick={() => {
                    // localStorage.removeItem("userInfo");
                    dispatch(logout());
                    Navigate('/');
                  }}
                >
                  Log out
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                  onClick={() => {
                    // localStorage.removeItem("userInfo");
                    // dispatch(logout());
                    Navigate('/login');
                  }}
                >
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
