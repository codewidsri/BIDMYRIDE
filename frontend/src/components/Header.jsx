import { Container, Navbar,Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate= useNavigate();
    return (
        <>
            <Navbar className='p-3 bg-dark'>
                <Container>
                    <Navbar.Brand className='text-white fw-bold'>BidMyRide</Navbar.Brand>
                    <Nav>
                        <Button className='rounded-3 mx-2' onClick={()=>navigate('/riderlogin')}>Login</Button>
                        <Button className='rounded-3 mx-2' onClick={()=>navigate('/riderregister')}>Signup</Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;