// src/cards/Tasks.jsx
import { Plus, Eye, Edit, Trash } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';

const Tasks = () => (
  <WorkspaceCard title="Tasks" authorizedRoles={['Staff', 'Manager']}>
    <div className="workspace-card-actions">
      <ActionButton icon={Plus} label="Add Task" />
      <ActionButton icon={Eye} label="View Existing Tasks" />
      <ActionButton icon={Edit} label="Edit Task" />
      <ActionButton icon={Trash} label="Delete Task" />
    </div>
  </WorkspaceCard>
);

Tasks.meta = {
  priority: 1,
};

export default Tasks;
