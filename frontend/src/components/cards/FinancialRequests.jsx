// src/cards/NewEventRequest.jsx
import { Plus, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import FinancialRequestForm from '../forms/FinancialRequestForm';
import { useModalContext } from '../../utils/ModalContext';

const NewFinancialRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Financial Requests" authorizedRoles={['Staff', 'Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Plus}
          label="New Financial Request"
          onClick={() => openModalWithContent(<FinancialRequestForm />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewFinancialRequest.meta = {
  priority: 1,
};

export default NewFinancialRequest;
