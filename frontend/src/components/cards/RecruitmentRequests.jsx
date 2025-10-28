// src/cards/NewEventRequest.jsx
import { Pen, Plus, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import CreateRecruitmentRequestForm from '../forms/CreateRecruitmentRequestForm';
import { useModalContext } from '../../utils/ModalContext';
import EditRecruitmentRequestForm from '../forms/EditRecruitmentRequestForm';

const NewRecruitmentRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Recruitment Requests" authorizedRoles={['HR Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Plus}
          label="New Recruitment Request"
          onClick={() => openModalWithContent(<CreateRecruitmentRequestForm />)}
        />
        <ActionButton
          icon={Pen}
          label="Edit Recruitment Request"
          onClick={() => openModalWithContent(<EditRecruitmentRequestForm />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewRecruitmentRequest.meta = {
  priority: 1,
};

export default NewRecruitmentRequest;
