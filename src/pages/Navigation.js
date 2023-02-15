import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ArrowUpCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import Logo from "../images/logo.webp";

const Navigation = (props) => {

  const { logOut } = props;

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" > <img  src={Logo} alt="logo"/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {logOut ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link accessKey='1' as={Link} to="/" > Home </Nav.Link>
              <Nav.Link accessKey='2' as={Link} to="store" > Store </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link accessKey='3' onClick={logOut} > Sign out <ArrowUpCircle /> </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link accessKey='1' as={Link} to="/" > Home </Nav.Link>
              <Nav.Link accessKey='2' as={Link} to="auth" > Store </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link accessKey='3' as={Link} to="auth"  > Sign in <ArrowUpCircle /> </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;