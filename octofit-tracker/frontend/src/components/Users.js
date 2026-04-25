import React from 'react';
import DataTablePage from './DataTablePage';

function Users() {
  return (
    <DataTablePage
      codespaceEndpoint={`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users`}
      columns={['#', 'Username', 'Email']}
      emptyMessage="No users found."
      endpointPath="/users/"
      getRowKey={(user, index) => user.id ?? user.username ?? `user-${index}`}
      getSearchText={user => `${user.username ?? ''} ${user.name ?? ''} ${user.email ?? ''}`}
      renderCells={(user, index) => [
        <span className="badge text-bg-secondary" key="position">
          {index + 1}
        </span>,
        <span className="fw-semibold" key="username">
          {user.username ?? user.name ?? 'Unknown user'}
        </span>,
        <span className="text-muted" key="email">
          {user.email ?? 'n/a'}
        </span>,
      ]}
      subtitle="Browse all registered athletes and profile basics."
      title="Users"
    />
  );
}

export default Users;
