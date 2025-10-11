// src/cards/Employees.jsx
import WorkspaceCard from '../WorkspaceCard';

const Employees = () => (
  <WorkspaceCard title="Employees" authorizedRoles={['Admin', 'HR']}>
    <p>Employee list and management tools go here.</p>
  </WorkspaceCard>
);

Employees.meta = {
  priority: 2,
};

export default Employees;
