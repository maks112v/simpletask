import React, { useState } from 'react';

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from 'mdbreact';

import { loginHandler, useSession } from '../hooks/useAuth';

export default function({ setmodal, sort, setsort }) {
  const [navState, setnavState] = useState(false);
  const { auth } = useSession();
  if (auth) {
    return (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Simple Task</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => setnavState(!navState)} />
        <MDBCollapse id="navbarCollapse3" isOpen={navState} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink onClick={() => setmodal(true)}>Create</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                onClick={() => setsort(sort === 'date' ? 'title' : 'date')}
              >
                Sort By: {sort === 'date' ? 'Date' : 'Title'}
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink>{auth.displayName}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <div className="label mx-2">
                <img
                  src={auth.photoURL}
                  style={{ maxHeight: 40 }}
                  alt=""
                  className="rounded-circle z-depth-1-half"
                />
              </div>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                className="waves-effect waves-light"
                onClick={() => loginHandler()}
              >
                <MDBIcon icon="sign-out-alt" />
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
  return null;
}
