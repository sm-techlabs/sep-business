// src/cards/HR.jsx
import { Plus, Eye, Edit, Trash, Megaphone } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import ReviewRecruitmentRequestForm from '../forms/ReviewRecruitmentRequestForm';

const HR = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="HR" authorizedRoles={['Manager', 'HR team']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Megaphone}
          label="Create Job Advertisement"
        />
        <ActionButton
          icon={Eye}
          label="Review Recruitment Requests"
          onClick={() => openModalWithContent(<ReviewRecruitmentRequestForm/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

HR.meta = {
  priority: 1,
};

export default HR;
