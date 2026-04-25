import React, { useCallback, useEffect, useMemo, useState } from 'react';

const getBaseApiUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev/api` : 'http://localhost:8000/api';
};

const normalizePayload = payload => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

function DataTablePage({
  title,
  subtitle,
  endpointPath,
  columns,
  getRowKey,
  getSearchText,
  renderCells,
  emptyMessage,
}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const endpoint = `${getBaseApiUrl()}${endpointPath}`;

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();
      setItems(normalizePayload(payload));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return items;
    }

    return items.filter(item => getSearchText(item).toLowerCase().includes(normalizedSearch));
  }, [items, searchTerm, getSearchText]);

  return (
    <section className="container py-4 py-lg-5">
      <div className="card shadow-sm border-0 app-surface-card">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
            <div>
              <h2 className="display-6 fw-semibold mb-2">{title}</h2>
              <p className="text-secondary mb-0">{subtitle}</p>
            </div>
            <a className="btn btn-outline-primary" href={endpoint} rel="noreferrer" target="_blank">
              Open API Link
            </a>
          </div>

          <form
            className="row g-2 align-items-end mb-3"
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <div className="col-12 col-md-8">
              <label className="form-label fw-semibold" htmlFor={`${title}-search`}>
                Search
              </label>
              <input
                className="form-control"
                id={`${title}-search`}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder={`Search ${title.toLowerCase()}...`}
                type="text"
                value={searchTerm}
              />
            </div>
            <div className="col-12 col-md-4 d-flex gap-2">
              <button className="btn btn-primary w-100" type="submit">
                Filter
              </button>
              <button className="btn btn-outline-secondary w-100" onClick={fetchItems} type="button">
                Refresh
              </button>
            </div>
          </form>

          {isLoading && <div className="alert alert-info mb-0">Loading data...</div>}
          {error && !isLoading && <div className="alert alert-danger mb-0">Error: {error}</div>}

          {!isLoading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    {columns.map(column => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={getRowKey(item, index)}>
                      {renderCells(item, index).map((cell, cellIndex) => (
                        <td key={`${getRowKey(item, index)}-${cellIndex}`}>{cell}</td>
                      ))}
                      <td>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedItem(item)} type="button">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td className="text-center text-secondary" colSpan={columns.length + 1}>
                        {emptyMessage}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} Details</h5>
                  <button
                    aria-label="Close"
                    className="btn-close"
                    onClick={() => setSelectedItem(null)}
                    type="button"
                  />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedItem(null)} type="button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default DataTablePage;