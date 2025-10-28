// src/cards/NewEventRequest.jsx
import { DollarSign, FileSliders, } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import BudgetAdjustmentRequestTable from '../tables/BudgetAdjustmentRequestTable';
import CreateBudgetAdjustmentRequestForm from '../forms/CreateBudgetAdjustmentRequestForm';


const NewBudgetAdjustmentRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Financial Requests" authorizedRoles={['Production Manager', 'Service Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={DollarSign}
          label="Create Budget Adjustment Request"
          onClick={() => openModalWithContent(<CreateBudgetAdjustmentRequestForm />)}
        />
        <ActionButton
          icon={FileSliders}
          label="Financial Requests"
          onClick={() => openModalWithContent(<BudgetAdjustmentRequestTable />)}
        />
      </div>

    </WorkspaceCard>
  );
};

NewBudgetAdjustmentRequest.meta = {
  priority: 1,
};

export default NewBudgetAdjustmentRequest;
