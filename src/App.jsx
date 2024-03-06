//import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { checkLoggedIn, logOut } from './reducers/userReducer';

import Home from './components/Home';
import MealsView from './components/MealsView';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch]);

  return (
    <div className="container">
      <Router>
        <div className="d-flex flex-column vh-100">
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle
              className="ms-3"
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link to="/">inicio</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/meals">comidas</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/pets">mascotas</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/users">usuarios</Link>
                </Nav.Link>
              </Nav>
              {user ? (
                <div className="ms-auto">
                  <Navbar.Text>Registrado como: {'Tomas'}</Navbar.Text>
                  <Button
                    className="mx-2"
                    variant="outline-dark"
                    onClick={() => dispatch(logOut())}
                  >
                    logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">Iniciar Sesión</Link>
              )}
            </Navbar.Collapse>
          </Navbar>

          <Notification />

          <Routes>
            <Route
              path="/meals"
              element={
                <ProtectedRoute user={user}>
                  <MealsView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pets"
              element={
                <ProtectedRoute user={user}>
                  <div></div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute user={user}>
                  <div></div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/" /> : <LoginForm />}
            />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<div>Not Found Page</div>} />
          </Routes>

          <div className="mt-auto">
            <i>My Fat Pet app, Tomas Munill 2024</i>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
