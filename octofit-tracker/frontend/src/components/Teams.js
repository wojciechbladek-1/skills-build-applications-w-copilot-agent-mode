import React from 'react';
import DataTablePage from './DataTablePage';

function Teams() {
  return (
    <DataTablePage
      codespaceEndpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams`}
      columns={['#', 'Team Name', 'Members']}
      emptyMessage="No teams found."
      endpointPath="/teams/"
      getRowKey={(team, index) => team.id ?? team.name ?? `team-${index}`}
      getSearchText={team => `${team.name ?? ''} ${team.members_count ?? ''}`}
      renderCells={(team, index) => [
        <span className="badge text-bg-secondary" key="position">
          {index + 1}
        </span>,
        <span className="fw-semibold" key="name">
          {team.name ?? 'Unnamed team'}
        </span>,
        <span className="text-muted" key="members">
          {team.members_count ?? team.members?.length ?? 0}
        </span>,
      ]}
      subtitle="Create and monitor teams for training challenges."
      title="Teams"
    />
  );
}

export default Teams;
