import { Button, Table } from 'react-bootstrap';
import { convertDateISOToString } from '../helpers';

const PetMeals = ({ meals }) => {
  if (meals.length === 0) {
    return <div>No existen comidas registradas aún.</div>;
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Hora</td>
            <td>Unidad</td>
            <td>Cantidad</td>
            <td>Usuario</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => {
            return (
              <tr key={meal.id}>
                <td>{convertDateISOToString(meal.dateTime)}</td>
                <td>{meal.portionUnit}</td>
                <td>{meal.portionQuantity}</td>
                <td>{meal.user.name}</td>
                <td>
                  <Button variant="danger" size="sm">
                    Borrar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PetMeals;
