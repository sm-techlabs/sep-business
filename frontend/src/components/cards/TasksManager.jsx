// src/cards/Tasks.jsx
import { ListChecks, CircleFadingPlus, CircleCheckBig, Clock, Wrench } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import CreateTaskForm from '../forms/CreateTaskForm';
import { useModalContext } from '../../utils/ModalContext';
import TaskTableManager from '../tables/TaskTableManager';

const TasksManager = () => {
  
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
        <ActionButton
          icon={Clock}
          label="Pending"
          onClick={() => openModalWithContent(<TaskTableManager filter={{ status: 'Pending'}} />)}
        />
        <ActionButton
          icon={Wrench}
          label="In Progress"
          onClick={() => openModalWithContent(<TaskTableManager filter={{ status: 'InProgress'}}/>)}
        />
        <ActionButton
          icon={CircleCheckBig}
          label="Completed"
          onClick={() => openModalWithContent(<TaskTableManager filter={{ status: 'Completed'}}/>)}
        />
    </div>
  </WorkspaceCard>
);}

TasksManager.meta = {
  priority: 1,
};

export default TasksManager;
