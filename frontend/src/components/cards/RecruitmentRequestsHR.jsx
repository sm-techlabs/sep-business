// src/cards/NewEventRequest.jsx
import { ClockFading, Handshake, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import RecruitmentRequestTableHR from '../tables/RecruitmentRequestTableHR';

const RecruitmentRequestsHR = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Recruitment Requests" authorizedRoles={['Senior HR Manager', 'HR Assistant']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={ClockFading}
          label="Ongoing Requests"
          onClick={() => openModalWithContent(<RecruitmentRequestTableHR filter={{ status: 'Active' }}/>)}
        />
        <ActionButton
          icon={Handshake}
          label="Resolved Requests"
          onClick={() => openModalWithContent(<RecruitmentRequestTableHR filter={{ status: '!Active' }}/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

RecruitmentRequestsHR.meta = {
  priority: 1,
};

export default RecruitmentRequestsHR;
