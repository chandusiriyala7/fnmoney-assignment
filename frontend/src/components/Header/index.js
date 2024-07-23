import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { useNavigate } from 'react-router-dom';
const Header = () =>{

  const navigate = useNavigate()
  
  const handleLogout = () =>{
    const jwtToken = Cookies.remove('jwtToken')
    navigate('/login')
  }
    return(
        <div>
 
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home"><img  src ="https://www.shutterstock.com/image-vector/initial-letter-fn-logo-design-260nw-2466369435.jpg" alt ="logo" className ="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"></Nav.Link>
            <Nav.Link href="#pricing"><h1><strong>FN Money</strong></h1></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets"><button className='btn btn-danger' onClick = {handleLogout}>Logout</button></Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              <button className='btn btn-info'>Hire Me</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
        </div>
    )
}
export default Header 
