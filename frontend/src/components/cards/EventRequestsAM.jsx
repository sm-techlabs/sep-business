// src/cards/NewEventRequest.jsx
import { Eye, FilePenLine, FileText, History, Pen, UserCheck, UserPlus } from 'lucide-react';
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
          icon={FilePenLine}
          label="Review Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable filter={{ status: 'ReviewedByFinancialManager'}} mode="review"/>)}
        />
        <ActionButton
          icon={History}
          label="View Approved Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable filter={{ status: 'Approved'}} mode="readOnly"/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestAM.meta = {
  priority: 1,
};

export default EventRequestAM;
