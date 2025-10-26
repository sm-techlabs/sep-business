// src/cards/NewEventRequest.jsx
import { Eye, FileText, Pen, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import RegisteredEventRequestForm from '../forms/RegisteredEventRequestForm';
import EditEventRequestForm from '../forms/EditEventRequestForm';
import EventRequestTable from '../tables/EventRequestTable';

const EventRequestAdmin = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="New Event Requests" authorizedRoles={[
      'Senior Customer Service Officer',
      ]}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={UserCheck}
          label="For Registered Clients"
          onClick={() => openModalWithContent(<RegisteredEventRequestForm />)}
        />
        <ActionButton
          icon={Eye}
          label="View Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable mode="review"/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestAdmin.meta = {
  priority: 1,
};

export default EventRequestAdmin;
