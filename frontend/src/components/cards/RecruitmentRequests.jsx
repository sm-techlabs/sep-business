// src/cards/NewEventRequest.jsx
import { ClockFading, Handshake, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import CreateRecruitmentRequestForm from '../forms/CreateRecruitmentRequestForm';
import { useModalContext } from '../../utils/ModalContext';
import EditRecruitmentRequestForm from '../forms/EditRecruitmentRequestForm';
import RecruitmentRequestTable from '../tables/RecruitmentRequestTable';

const RecruitmentRequests = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Recruitment Requests" authorizedRoles={['Production Manager', 'Service Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={UserPlus}
          label="Create Recruitment Request"
          onClick={() => openModalWithContent(<CreateRecruitmentRequestForm />)}
        />
        <ActionButton
          icon={ClockFading}
          label="Ongoing Requests"
          onClick={() => openModalWithContent(<RecruitmentRequestTable filter={{ status: 'Active' }}/>)}
        />
        <ActionButton
          icon={Handshake}
          label="Resolved Requests"
          onClick={() => openModalWithContent(<RecruitmentRequestTable filter={{ status: '!Active' }}/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

RecruitmentRequests.meta = {
  priority: 1,
};

export default RecruitmentRequests;
