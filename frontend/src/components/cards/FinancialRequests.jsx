// src/cards/NewEventRequest.jsx
import { Pen, Plus, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import CreateFinancialRequestForm from '../forms/CreateFinancialRequestForm';
import EditFinancialRequestForm from '../forms/EditFinancialRequestForm';
import ReviewFinancialRequestForm from '../forms/ReviewFinancialRequestForm';
import { useModalContext } from '../../utils/ModalContext';


const NewFinancialRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Financial Requests" authorizedRoles={['Production Manager', 'Service Manager', 'Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Plus}
          label="New Recruitment Request"
          onClick={() => openModalWithContent(<CreateFinancialRequestForm />)}
        />
        <ActionButton
          icon={Pen}
          label="Edit Recruitment Request"
          onClick={() => openModalWithContent(<EditFinancialRequestForm />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewFinancialRequest.meta = {
  priority: 1,
};

export default NewFinancialRequest;
