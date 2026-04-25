import React from 'react';
import DataTablePage from './DataTablePage';

function Activities() {
  return (
    <DataTablePage
      codespaceEndpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities`}
      columns={['#', 'Activity', 'Category']}
      emptyMessage="No activities found."
      endpointPath="/activities/"
      getRowKey={(activity, index) => activity.id ?? activity.name ?? `activity-${index}`}
      getSearchText={activity => `${activity.name ?? ''} ${activity.activity_type ?? ''}`}
      renderCells={(activity, index) => [
        <span className="badge text-bg-secondary" key="position">
          {index + 1}
        </span>,
        <span className="fw-semibold" key="name">
          {activity.name ?? 'Unnamed activity'}
        </span>,
        <span className="text-muted" key="type">
          {activity.activity_type ?? 'General'}
        </span>,
      ]}
      subtitle="Track and review all logged fitness activities."
      title="Activities"
    />
  );
}

export default Activities;
