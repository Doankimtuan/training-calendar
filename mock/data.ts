const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Chest Day - with Arm exercises',
      exercises: [
        {
          id: 'task-1-exercise-1',
          name: 'Bench Press',
          sets: '50 lb x 5, 60 lb x 5',
          times: 3,
        },
        {
          id: 'task-1-exercise-2',
          name: 'Squats',
          sets: '100 lb x 5, 120 lb x 5',
          times: 3,
        },
      ],
    },
    'task-2': {
      id: 'task-2',
      title: 'Exercise B',
      exercises: [
        {
          id: 'task-2-exercise-1',
          name: 'Deadlift',
          sets: '50 lb x 5, 60 lb x 5',
          times: 3,
        },
        {
          id: 'task-2-exercise-2',
          name: 'Overhead Press',
          sets: '100 lb x 5, 120 lb x 5',
          times: 3,
        },
      ],
    },
    'task-3': {
      id: 'task-3',
      title: 'Exercise C',
      exercises: [
        {
          id: 'task-3-exercise-1',
          name: 'Pull-Up',
          sets: '50 lb x 5, 60 lb x 5',
          times: 3,
        },
        {
          id: 'task-3-exercise-2',
          name: 'Barbell Row',
          sets: '100 lb x 5, 120 lb x 5',
          times: 3,
        },
      ],
    },
  },
};

export { initialData };
