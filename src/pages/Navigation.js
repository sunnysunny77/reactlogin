import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ArrowUpCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

const Navigation = (props) => {

  const { logOut, bool } = props;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" >React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {bool ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link accessKey='1' as={Link} to="/" > Home </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link accessKey='2' as={Link} to="auth"  > sign in <ArrowUpCircle /> </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link accessKey='1' as={Link} to="/" > Home </Nav.Link>
              <Nav.Link accessKey='2' as={Link} to="admin" > Admin </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link accessKey='3' onClick={logOut} > sign out <ArrowUpCircle /> </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;