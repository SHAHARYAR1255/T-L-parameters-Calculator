import React, { useState } from 'react';
import './Header.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar light className="header__navbar" expand="md">
                <NavbarBrand href="#"><span><sup>Technical Parameters Calculator</sup></span></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="header__nav" navbar>
                        <NavItem className="nav__navitem">
                            <NavLink className="nav-link" to='/sag'><h6>Sag</h6></NavLink>
                        </NavItem>
                        <NavItem className="nav__navitem">
                            <NavLink className="nav-link" to='/corona'><h6>Corona</h6></NavLink>
                        </NavItem>
                        <NavItem className="nav__navitem">
                            <NavLink className="nav-link" to="/Inductance"><h6>Inductance</h6></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <br />
        </div>

    )}

export default Header;