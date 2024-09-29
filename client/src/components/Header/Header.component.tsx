import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

type Props = {};

const Header = (props: Props) => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/">CTF WareHouse</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="/challenge">Challenge</Nav.Link>
                            <Nav.Link href="/blog">Blog</Nav.Link>
                            <NavDropdown title="Vulnerability Collection" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/vuln/web">Web</NavDropdown.Item>
                                <NavDropdown.Item href="/vuln/re">Reverse Engineering</NavDropdown.Item>
                                <NavDropdown.Item href="/vuln/cryto">Cryptography</NavDropdown.Item>
                                <NavDropdown.Item href="/vuln/foren">Forensics</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">Other</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/account">Account</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Looking for something?"
                                className="me-2"
                                style={{ width: '20vw' }}
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
