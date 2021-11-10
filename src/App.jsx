import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { fromMonaco } from '@hackerrank/firepad';
import {
  Navbar, Container, Row, Col, FloatingLabel, Form, ListGroup,
} from 'react-bootstrap';
import { randomSessionSlug, randomUserSlug } from './util';
import { database } from './firebase';
import birb from './img/space-bird.png';
import './app.css';

function generateOrExtractDatabaseKeyFromUrl(url) {
  if (!url) {
    return randomSessionSlug();
  }
  return url.replace(/#/g, '');
}

function App() {
  const editorRef = useRef(null);
  const firepadRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const key = generateOrExtractDatabaseKeyFromUrl(window.location.hash);

  const ref = database.ref().child(key);
  const [language, setLanguage] = useState('plain');
  const [userName, setUserName] = useState(randomUserSlug());
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);

  const editorDidMount = (editor) => {
    editorRef.current = editor;
    setEditorLoaded(true);
  };

  useEffect(() => {
    // Update window location to match hash
    const host = window.location.href.split('#')[0];
    window.location = `${host}#${key}`;

    // Subscribe to data updates
    ref.on('value', ((snapshot) => {
      const data = snapshot.val();
      setLanguage(data.language || 'plain');

      // Extract usernames from users if present.
      if (data.users) {
        setUsers(Object.entries(data.users).map((entry) => {
          const value = entry[1];
          return value;
        }));
      }
    }));
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.language = language;
    }
    ref.update({ language });
  }, [language]);

  useEffect(() => {
    if (!editorLoaded) { return; }

    if (firepadRef.current == null) {
      const firepad = fromMonaco(ref, editorRef.current);
      firepadRef.current = firepad;
    }

    firepadRef.current.setUserName(userName);
  }, [editorLoaded, userName]);

  return (
    <div height="100%">
      <Navbar className="mb-2">
        <Container>
          <Navbar.Brand>Collaboredit</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="row-no-gutters">
          <Col className="mr-3" xs={3}>
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="name"
                  placeholder="Anonymouse"
                  defaultValue={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel className="mb-3" controlId="floatingSelect" label="Programming Language" ms-auto>
                <Form.Select
                  value={language}
                  aria-label="Programming Language select"
                  onChange={(event) => {
                    setLanguage(event.target.value);
                  }}
                >
                  <option value="plain">Plain Text</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                </Form.Select>
              </FloatingLabel>
              <ListGroup>
                <ListGroup.Item variant="secondary">Collaborators</ListGroup.Item>
                {users.map((user) => (
                  <ListGroup.Item key={user.name}>
                    {user.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col xs={9} className="px-3">
            <Editor
              height="90vh"
              theme="vs-light"
              defaultLanguage="plain"
              language={language}
              onMount={editorDidMount}
            />
          </Col>
        </Row>
      </Container>
      <img src={birb} alt="" className="birb" />
    </div>

  );
}

export default App;
