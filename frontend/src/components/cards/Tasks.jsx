// src/cards/Tasks.jsx
import { Plus, Eye, Edit, Trash, CircleFadingPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import CreateTaskForm from '../forms/CreateTaskForm';
import { useModalContext } from '../../utils/ModalContext';

const Tasks = () => {
  
    const { openModalWithContent } = useModalContext();
  
  return (
  <WorkspaceCard title="Tasks" authorizedRoles={[
    'Production Manager', 
    'Service Manager',
    ]}>
    <div className="workspace-card-actions">
      <ActionButton
          icon={CircleFadingPlus}
          label="Create Tasks"
          onClick={() => openModalWithContent(<CreateTaskForm />)}
        />
        {/* <ActionButton
          icon={FilePenLine}
          label="Review Tasks"
          onClick={() => openModalWithContent(<EventRequestTable filter={{ status: '!Approved'}} mode="review"/>)}
        />
        */}
    </div>
  </WorkspaceCard>
);}

Tasks.meta = {
  priority: 1,
};

export default Tasks;
