import React from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

import { GOOGLE_AUTH_CONTROLLER, loginHandler } from '../hooks/useAuth';
import { Redirect } from 'react-router-dom';

import { useSession } from '../hooks/useAuth';

export default function Login() {
  const { auth: user } = useSession();
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <MDBContainer fluid>
      <MDBRow style={{ height: '100vh', textAlign: 'center' }}>
        <MDBCol middle md="6">
          <h3>Login</h3>
          <MDBBtn
            social="gplus"
            color="danger"
            onClick={() => loginHandler(GOOGLE_AUTH_CONTROLLER)}
          >
            <MDBIcon fab icon="google-plus-g" className="pr-1" /> Google +
          </MDBBtn>
        </MDBCol>
        <MDBCol
          md="6"
          style={{
            background: `url(https://images.unsplash.com/photo-1560909858-d8dae853b22a?ixlib=rb-1.2.1&auto=format&fit=crop&w=882&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </MDBRow>
    </MDBContainer>
  );
}
