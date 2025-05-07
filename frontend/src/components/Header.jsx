import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import './Header.css'

function Header(){
    return(
        <>
            <Navbar className="bg-dark">
                <Container>
                    <Navbar.Brand href="#"><Link to='/' className="text-decoration-none fw-bold fs-4">BIDMYRIDE</Link></Navbar.Brand>
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
                            <Link to='/riderlogin' className="text-decoration-none text-white me-3 bg-primary border rounded px-2 py-2">Book a Ride</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='/driverlogin' className="text-decoration-none text-white me-3 bg-secondary border rounded px-2 py-2">Bid a Ride</Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;