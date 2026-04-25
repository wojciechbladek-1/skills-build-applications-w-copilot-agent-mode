import React from 'react';
import DataTablePage from './DataTablePage';

function Leaderboard() {
  return (
    <DataTablePage
      codespaceEndpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`}
      columns={['Rank', 'Athlete', 'Points']}
      emptyMessage="No leaderboard entries found."
      endpointPath="/leaderboard/"
      getRowKey={(entry, index) => entry.id ?? `${entry.user ?? entry.username ?? 'entry'}-${index}`}
      getSearchText={entry => `${entry.user ?? ''} ${entry.username ?? ''} ${entry.points ?? ''} ${entry.score ?? ''}`}
      renderCells={(entry, index) => [
        <span className="badge text-bg-warning" key="rank">
          #{index + 1}
        </span>,
        <span className="fw-semibold" key="athlete">
          {entry.user ?? entry.username ?? 'Unknown user'}
        </span>,
        <span className="text-muted" key="points">
          {entry.points ?? entry.score ?? 0}
        </span>,
      ]}
      subtitle="See who leads the competition across all activities."
      title="Leaderboard"
    />
  );
}

export default Leaderboard;
