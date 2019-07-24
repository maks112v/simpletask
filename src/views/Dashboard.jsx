import React, { useState, useEffect } from 'react';

import Todo from '../components/Todo';
import CreateTodo from '../components/CreateTodo';
import Navbar from '../components/Navbar';

import { MDBContainer, MDBRow } from 'mdbreact';
import { firestore } from '../firebase';
import { useSession } from '../hooks/useAuth';

export default function Dashboard() {
  const { auth } = useSession();
  const [modal, setmodal] = useState(false);
  const [todos, settodos] = useState([]);
  const [sort, setsort] = useState('date');

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(auth.uid)
      .collection('tasks')
      .orderBy(sort, 'asc')
      .onSnapshot(snapshot => {
        let todos = [];
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          todos.push({ id: doc.id, ...data });
        });
        settodos(todos);
      });
    return () => unsubscribe();
  }, [sort]);

  return (
    <>
      <Navbar setmodal={setmodal} sort={sort} setsort={setsort} />
      <MDBContainer className="mt-5">
        <CreateTodo modal={modal} setmodal={setmodal} />
        <MDBRow>
          {todos.map(({ title, subtitle, date, id, complete }) => (
            <Todo
              title={title}
              subtitle={subtitle}
              id={id}
              date={date}
              complete={complete}
            />
          ))}
        </MDBRow>
      </MDBContainer>
    </>
  );
}
