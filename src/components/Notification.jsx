import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (notification.message === '') {
    return null;
  }

  if (notification.isSuccessful) {
    return <Alert variant="success">{notification.message}</Alert>;
  }

  return <Alert variant="danger">{notification.message}</Alert>;
};

export default Notification;
