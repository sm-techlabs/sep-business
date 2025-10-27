// src/cards/NewEventRequest.jsx
import { Eye, FilePenLine, FileText, Pen, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import RegisteredEventRequestForm from '../forms/CreateRegisteredEventRequestForm';
import EditEventRequestForm from '../forms/EditRegisteredEventRequestForm';
import EventRequestTable from '../tables/EventRequestTable';
import EventRequestTableFM from '../tables/EventRequestTableFM';

const EventRequestFM = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Review Event Requests" authorizedRoles={[
      'Financial Manager',
      ]}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={FilePenLine}
          label="Review Event Requests"
          onClick={() => openModalWithContent(<EventRequestTableFM filter={{ status: 'ApprovedBySCSO'}} mode="edit"/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestFM.meta = {
  priority: 1,
};

export default EventRequestFM;
