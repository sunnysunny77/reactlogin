import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const Navigation = (props) => {

  const { logOut } = props;

  return (
    <Navbar id="top" className='p-0' expand="none">
      <Container fluid className='nav-container p-0 pe-xxl-2'>
        <Navbar.Brand className='ps-3' as={Link} to="/" > 
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
            <text className="font">
                <textPath href="#circle">
                Lorem ..... Ipsum ..............
                </textPath>
            </text>
        </svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"> 
          <div>
            <div className="slider_8-bar1"></div>
            <div className="slider_8-bar2"></div>
            <div className="slider_8-bar3"></div>
          </div>
        </Navbar.Toggle>
        {logOut ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" > Home </Nav.Link>
              <Nav.Link as={Link} to="store" > Store </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logOut} > Sign out </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" > Home </Nav.Link>
              <Nav.Link as={Link} to="auth" > Store </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="auth"  > Sign in </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
