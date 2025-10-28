// src/cards/NewEventRequest.jsx
import { Eye, Pen, Plus, UserCheck, UserPlus } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import EditFinancialRequestForm from '../forms/EditFinancialRequestForm';
import ReviewFinancialRequestForm from '../forms/ReviewFinancialRequestForm';
import { useModalContext } from '../../utils/ModalContext';


const ReviewFinancialRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Financial Requests" authorizedRoles={['Financial Manager', 'Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Eye}
          label="ReviewRecruitment Request"
          onClick={() => openModalWithContent(<ReviewFinancialRequestForm />)}
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

ReviewFinancialRequest.meta = {
  priority: 1,
};

export default ReviewFinancialRequest;
