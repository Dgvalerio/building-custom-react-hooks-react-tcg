import React, { useCallback, useEffect, useState } from 'react';

import useHttp from './components/hooks/useHttp';
import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformData = useCallback((data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    fetchTasks(
      {
        url: 'https://react-tcg-14-default-rtdb.firebaseio.com/tasks.json',
      },
      transformData
    );
  }, [fetchTasks, transformData]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
