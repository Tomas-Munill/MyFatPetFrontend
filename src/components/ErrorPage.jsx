import { Image } from 'react-bootstrap';
import serverErrorImage from '../assets/server-error.svg';

const ErrorPage = () => {
  return (
    <div>
      <Image
        src={serverErrorImage}
        alt="Servidor backend"
        fluid
        rounded
      />
      <h3>Server error</h3>
      <p>Servicio no disponible debido a problemas en el servidor</p>
    </div>
  );
};

export default ErrorPage;
