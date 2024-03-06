import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Form, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import mealsService from '../services/mealsService';
import { showNotification } from '../reducers/notificationReducer';

const MealForm = ({ pets }) => {
  const [pet, setPet] = useState('');
  const [portionUnit, setPortionUnit] = useState('');
  const [portionQuantity, setPortionQuantity] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const queryClient = useQueryClient();
  const newMealMutation = useMutation(mealsService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('todaysPetsMeals');
      dispatch(showNotification('¡Has añadido una nueva comida para tu mascota con éxito!', true));
    },
    onError: (error) => {
      console.error('Error al crear meal: ', error);
      dispatch(showNotification('Lo sentimos, ha ocurrido un error inesperado. Por favor, reintenta más tarde.', false));
    }
  });

  const addMeal = async (event) => {
    event.preventDefault();

    // -- Debbug --
    console.log('valor de pet', pet);
    console.log('valor de portionUnit', portionUnit);
    console.log('valor de portionQuantity', portionQuantity);
    // ------------

    // Validar datos ingresados y seleccionados
    if (pet.trim() === '') {
      alert('Por favor, seleccione una mascota.');
      return;
    }
    if (portionUnit.trim() === '') {
      alert('Por favor, seleccione una unidad de porcion.');
      return;
    }
    if (portionQuantity.trim() === '') {
      alert('Por favor, ingrese una cantidad.');
      return;
    }
    if (Number(portionQuantity) <= 0) {
      alert('Por favor, ingrese una cantidad positiva.');
      return;
    }

    newMealMutation.mutate({
      pet: pet,
      user: user.id,
      portionUnit: portionUnit,
      portionQuantity: portionQuantity
    });

    // Resetear inputs y select
    setPet('');
    setPortionUnit('');
    setPortionQuantity('');

    // Cerrar el formulario ...
  };

  return (
    <Card>
      <Card.Header as='h3'>Registrar comida</Card.Header>
      <Card.Body>
        <Form onSubmit={addMeal}>
          <Form.Group>
            <Form.Label>Seleccionar mascota:</Form.Label>
            <Form.Select
              value={pet}
              onChange={(event) => setPet(event.target.value)}
            >
              <option value=''>Abrir menú de selección</option>
              {pets.map((pet) => {
                return (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Seleccionar unidad de porcion:</Form.Label>
            <Form.Select
              value={portionUnit}
              onChange={(event) => setPortionUnit(event.target.value)}
            >
              <option value=''>Abrir menú de selección</option>
              <option value='cucharadas'>cucharadas</option>
              <option value='gramos'>gramos</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ingresar cantidad:</Form.Label>
            <Form.Control
              type='number'
              value={portionQuantity}
              onChange={(event) => setPortionQuantity(event.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant='success'>
            Registrar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MealForm;
