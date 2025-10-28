// src/cards/NewEventRequest.jsx
import { Check, Eye, FilePenLine, FileText, Pen, UserCheck, UserPlus, X } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import EventRequestTable from '../tables/EventRequestTable';

const EventRequestSCSO = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="New Event Requests" authorizedRoles={[
      'Senior Customer Service Officer',
      ]}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Pen}
          label="Edit Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable mode="edit"/>)}
        />
        <ActionButton
          icon={FilePenLine}
          label="Review Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable filter={{ status: '!Approved'}} mode="review"/>)}
        />
        <ActionButton
          icon={Check}
          label="Approved Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable filter={{ status: 'Approved'}} mode="readOnly"/>)}
        />
        <ActionButton
          icon={X}
          label="Rejected Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable filter={{ status: 'Rejected'}} mode="readOnly"/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestSCSO.meta = {
  priority: 1,
};

export default EventRequestSCSO;
