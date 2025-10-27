// src/cards/NewEventRequest.jsx
import { Eye, Pen, MessageCirclePlus, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import CreateRegisteredEventRequestForm from '../forms/CreateRegisteredEventRequestForm';
import CreateNonRegisteredEventRequestForm from '../forms/CreateNonRegisteredEventRequestForm';
import { useModalContext } from '../../utils/ModalContext';
import EditEventRequestForm from '../forms/EditRegisteredEventRequestForm';
import ReviewSCSOEventRequestForm from '../forms/ReviewSCSOEventRequestForm';
import ReviewFMEventRequestForm from '../forms/ReviewFMEventRequestForm';
import ReviewAMEventRequestForm from '../forms/ReviewAMEventRequestForm';
import EventRequestTable from '../tables/EventRequestTable';
import { useEffect, useState } from 'react';
import authClient from '../../clients/authClient';

const EventRequestCSO = () => {

  const { openModalWithContent } = useModalContext();
  const [self, setSelf] = useState();

  useEffect(() => {
    const getSelfInfo = async () => {
      const response = await authClient.self();
      setSelf(response)
    } 
    getSelfInfo()
  }, [])

  return (
    <WorkspaceCard title="New Event Requests" authorizedRoles={[
      'Customer Service Officer',
      ]}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={UserCheck}
          label="For Registered Clients"
          onClick={() => openModalWithContent(<CreateRegisteredEventRequestForm />)}
        />
        <ActionButton
          icon={UserPlus}
          label="For New Clients"
          onClick={() => openModalWithContent(<CreateNonRegisteredEventRequestForm />)}
        />
        <ActionButton
          icon={Eye}
          label="View My Event Requests"
          onClick={() => openModalWithContent(<EventRequestTable filter={{createdById: self.id}} />)}
        />
      </div>

    </WorkspaceCard>
  );
};

EventRequestCSO.meta = {
  priority: 1,
};

export default EventRequestCSO;
