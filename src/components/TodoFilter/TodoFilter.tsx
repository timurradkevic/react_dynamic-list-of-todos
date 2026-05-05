import React from 'react';
import { Todo } from '../../types/Todo';
import { getActiveTodos, getCompletedTodos, getTodos } from '../../api';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  setTodos: (todos: Todo[]) => void;
}

export const TodoFilter: React.FC<Props> = ({ query, setQuery, setTodos }) => {
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'active':
        getActiveTodos().then(setTodos);
        break;
      case 'completed':
        getCompletedTodos().then(setTodos);
        break;
      case 'all':
      default:
        getTodos().then(setTodos);
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSort}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          spellCheck={false}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
