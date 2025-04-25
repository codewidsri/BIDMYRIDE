import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import './Header.css'

function Header(){
    return(
        <>
            <Navbar className="bg-dark">
                <Container>
                    <Navbar.Brand href="#"><Link to='/' className="text-decoration-none fw-bold fs-2">BIDMYRIDE</Link></Navbar.Brand>
                    <Nav>
                        <Nav.Item>
                            <Link to='/' className="text-decoration-none text-white me-3 nav-hover">Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/aboutus' className="text-decoration-none text-white me-3 nav-hover">About Us</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/contactus' className="text-decoration-none text-white me-3 nav-hover">Contact Us</Link>
                        </Nav.Item>
                        <Nav.Item className="">
                            <Link to='/login' className="text-decoration-none text-white me-3 bg-primary rounded px-2 py-2">Login/Register</Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;