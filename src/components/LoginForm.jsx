import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/userReducer';
import { useField } from '../hooks';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useField('text');
  const password = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };
    dispatch(logIn(credentials));
    // redireccionar al home page solo si es exitoso (verificar si user del store ya no es null)
    navigate('/');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario:</Form.Label>
          <Form.Control
            {...username.inputProps}
            maxLength={20}
            style={{ maxWidth: '300px' }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            {...password.inputProps}
            maxLength={20}
            style={{ maxWidth: '300px' }}
          />
        </Form.Group>
        <div className="d-grid">
          <Button type="submit">login</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
