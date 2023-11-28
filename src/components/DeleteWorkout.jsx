
import React from 'react';
import { Button } from '@mui/material';

export default function DeleteWorkout({ params, getWorkouts }) {
  const deleteWorkout = () => {
    if (window.confirm('Are you sure?')) {
      const workoutLink = params.data.links && params.data.links.find(link => link.rel === 'self');

      if (workoutLink) {
        fetch(workoutLink.href, { method: 'DELETE' })
          .then(response => {
            if (response.ok) {
              alert('Workout deleted');
              getWorkouts();
            } else {
              alert('Error deleting workout');
            }
          })
          .catch(err => console.error(err));
      } else {
        alert('Invalid workout link');
      }
    }
  };

  return (
    <Button variant="outlined" color="primary" onClick={deleteWorkout}>
      Delete
    </Button>
  );
}