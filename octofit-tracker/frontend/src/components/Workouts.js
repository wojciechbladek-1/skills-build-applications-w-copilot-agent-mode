import React from 'react';
import DataTablePage from './DataTablePage';

function Workouts() {
  return (
    <DataTablePage
      codespaceEndpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts`}
      columns={['#', 'Workout', 'Intensity']}
      emptyMessage="No workouts found."
      endpointPath="/workouts/"
      getRowKey={(workout, index) => workout.id ?? workout.name ?? workout.title ?? `workout-${index}`}
      getSearchText={workout => `${workout.name ?? ''} ${workout.title ?? ''} ${workout.intensity ?? ''}`}
      renderCells={(workout, index) => [
        <span className="badge text-bg-secondary" key="position">
          {index + 1}
        </span>,
        <span className="fw-semibold" key="name">
          {workout.name ?? workout.title ?? 'Unnamed workout'}
        </span>,
        <span className="text-muted" key="intensity">
          {workout.intensity ?? 'Moderate'}
        </span>,
      ]}
      subtitle="Personalized suggestions to keep training balanced."
      title="Workouts"
    />
  );
}

export default Workouts;
