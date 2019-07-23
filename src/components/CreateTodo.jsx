import React, { useState } from 'react';

import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBInput,
  MDBModalFooter,
  MDBBtn,
  MDBIcon,
} from 'mdbreact';
import { firestore } from '../firebase';
import { useSession } from '../hooks/useAuth';

export default function CreateTodo({ modal, setmodal }) {
  const { auth } = useSession();
  const [inputs, setinputs] = useState({ title: '', subtitle: '' });
  function createTask() {
    firestore
      .collection(`users/${auth.uid}/tasks/`)
      .add({ ...inputs, date: Date.now(), complete: false })
      .then(res => {
        setinputs({ title: '', subtitle: '' });
        setmodal(false);
      });
  }

  return (
    <MDBModal isOpen={modal} toggle={() => setmodal(false)}>
      <MDBModalHeader
        className="text-center"
        titleClass="w-100 font-weight-bold"
        toggle={() => setmodal(false)}
      >
        Create a Task
      </MDBModalHeader>
      <MDBModalBody>
        <form className="mx-3 grey-text">
          <MDBInput
            label="Task Title"
            value={inputs.title}
            onChange={e => setinputs({ ...inputs, title: e.target.value })}
            type="text"
          />
          <MDBInput
            type="textarea"
            rows="2"
            onChange={e => setinputs({ ...inputs, subtitle: e.target.value })}
            value={inputs.subtitle}
            label="Your message"
          />
        </form>
      </MDBModalBody>
      <MDBModalFooter className="justify-content-center">
        <MDBBtn color="unique" onClick={createTask}>
          Create
          <MDBIcon far icon="paper-plane" className="ml-2" />
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
}
