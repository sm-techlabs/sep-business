// src/cards/NewEventRequest.jsx
import { Eye, FileText, Pen, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import EventRequestTable from '../tables/EventRequestTable';

const EventRequestAM = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Review Event Requests" authorizedRoles={[
      'Administration Manager',
      ]}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Eye}
          label="Review Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable filter={{ status: 'ReviewedByFinancialManager'}} mode="review"/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestAM.meta = {
  priority: 1,
};

export default EventRequestAM;
