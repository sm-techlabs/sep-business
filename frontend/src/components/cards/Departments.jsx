// src/cards/Departments.jsx
import WorkspaceCard from '../WorkspaceCard';

const Departments = () => (
  <WorkspaceCard title="Departments" authorizedRoles={['Admin']}>
    <p>Department overview and structure here.</p>
  </WorkspaceCard>
);

Departments.meta = {
  priority: 1,
};

export default Departments;
