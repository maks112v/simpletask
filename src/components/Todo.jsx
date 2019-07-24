import React from 'react';

import moment from 'moment';

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
} from 'mdbreact';
import { firestore } from '../firebase';
import { useSession } from '../hooks/useAuth';

export default function Todo({ title, subtitle, date, complete, id }) {
  const { auth } = useSession();
  function toggleComplete() {
    firestore
      .collection('users')
      .doc(auth.uid)
      .collection('tasks')
      .doc(id)
      .update({ complete: !complete });
  }

  return (
    <MDBCol md="6" lg="4" sm="12" className="my-3">
      <MDBCard>
        <MDBCardBody cascade>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>{subtitle}</MDBCardText>
        </MDBCardBody>
        <div
          className={`${
            complete ? 'success-color-dark' : 'danger-color-dark'
          } rounded-bottom lighten-3 text-center p-3 text-left`}
        >
          <MDBRow>
            <MDBCol className="white-text" style={{ flexGrow: 1 }}>
              <MDBIcon far icon="clock" className="mr-2 " />
              {date ? moment(date).fromNow() : null}
            </MDBCol>
            <MDBCol
              className=" white-text text-right"
              onClick={() => toggleComplete()}
            >
              {complete ? (
                <MDBIcon icon="check" />
              ) : (
                <MDBIcon far icon="times-circle" />
              )}
            </MDBCol>
          </MDBRow>
        </div>
      </MDBCard>
    </MDBCol>
  );
}
