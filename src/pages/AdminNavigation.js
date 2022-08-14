import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ArrowUpCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

const AdminNavigation = (props) => {
  const { logOut } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" >React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/" > Admin </Nav.Link>
          <Nav.Link as={Link} to="home" > Home </Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link onClick={logOut} > sign out <ArrowUpCircle /> </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavigation;