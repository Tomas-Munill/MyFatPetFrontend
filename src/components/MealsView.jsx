import { useQuery } from 'react-query';
import petsService from '../services/petsService';
import { Button, Spinner } from 'react-bootstrap';

import PetMeals from './PetMeals';
import ErrorPage from './ErrorPage';
import MealForm from './MealForm';
import Togglable from './Togglable';

const MealsView = () => {
  const todaysPetsMealsResult = useQuery(
    'todaysPetsMeals',
    petsService.getTodaysPetsMeals
  );

  if (todaysPetsMealsResult.isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (todaysPetsMealsResult.isError) {
    return <ErrorPage />;
  }

  const todaysPetsMeals = todaysPetsMealsResult.data;

  return (
    <div>
      <h2>Comidas de hoy</h2>
      {todaysPetsMeals.map((pet) => {
        return (
          <div key={pet.id}>
            <h3>{pet.name}</h3>
            <PetMeals meals={pet.meals}/>
          </div>
        );
      })}
      <Togglable buttonLabel='Añadir comida'>
        <MealForm pets={todaysPetsMeals}/>
      </Togglable>
      <Button variant='warning'>Exportar csv</Button>
    </div>
  );
};

export default MealsView;
