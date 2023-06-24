import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ArrowUpCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";


const Navigation = (props) => {

  const { logOut } = props;

  return (
    <Navbar expand="lg">
      <Container fluid className='px-lg-5'>
        <Navbar.Brand as={Link} to="/" > 
        <svg aria-label="Furniture Warehouse" 
           viewBox="0 0 100 100" width="60" height="60">
           
            <defs>
                <path 
                    id="circle" 
                    d="M 50, 50
                    m -37, 0
                    a 37,37 0 1,1 74,0
                    a 37,37 0 1,1 -74,0" 
                />
            </defs>
            <text class="font">
                <textPath href="#circle">
                Lorem ..... Ipsum ..............
                </textPath>
            </text>
        </svg>
        </Navbar.Brand>
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
