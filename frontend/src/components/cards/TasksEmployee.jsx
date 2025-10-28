// src/cards/Tasks.jsx
import { UserRoundCheck, ListChecks } from 'lucide-react';
import { useState, useEffect } from 'react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import TaskTableEmployee from '../tables/TaskTableEmployee';
import authClient from '../../clients/authClient';

const TasksEmployee = () => {
  
    const { openModalWithContent } = useModalContext();
    const [self, setSelf] = useState();

    useEffect(() => {
    const getSelfInfo = async () => {
      const response = await authClient.validateToken();
      setSelf(response)
    } 
    getSelfInfo()
  }, [])
  
  return (
  <WorkspaceCard title="Tasks" authorizedRoles={[
    'Decorating Architect', 
    'Decorating Assistant',
    'Audio Engineer',
    'Network Engineer',
    'Graphic Designer',
    'Photographer',
    ]}>
    <div className="workspace-card-actions">
      <ActionButton
          icon={UserRoundCheck}
          label="View My Tasks"
          onClick={() => openModalWithContent(<TaskTableEmployee filter={{ assignedToId: self.id}} />)}
      />
      <ActionButton
          icon={ListChecks}
          label="View All Tasks"
          onClick={() => openModalWithContent(<TaskTableEmployee filter={{ subteamId: self.teamId }}/>)}
      />
    </div>
  </WorkspaceCard>
);}

TasksEmployee.meta = {
  priority: 1,
};

export default TasksEmployee;
