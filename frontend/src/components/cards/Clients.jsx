// src/cards/Clients.jsx
import WorkspaceCard from '../WorkspaceCard';

const Clients = () => (
  <WorkspaceCard title="Clients" authorizedRoles={['Admin', 'Manager', 'HR']}>
    <p>Client list and management tools go here.</p>
  </WorkspaceCard>
);

Clients.meta = {
  priority: 2,
};

export default Clients;
