import { DollarSign, FileSliders, ListChecks, Receipt, TicketPlus, } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import BudgetAdjustmentRequestTable from '../tables/BudgetAdjustmentRequestTable';
import CreateBudgetAdjustmentRequestForm from '../forms/CreateBudgetAdjustmentRequestForm';


const BudgetAdjustmentRequest = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Budget Adjustment Requests" authorizedRoles={['Production Manager', 'Service Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={TicketPlus}
          label="Create Budget Adjustment Request"
          onClick={() => openModalWithContent(<CreateBudgetAdjustmentRequestForm />)}
        />
        <ActionButton
          icon={Receipt}
          label="Ongoing Requests"
          onClick={() => openModalWithContent(<BudgetAdjustmentRequestTable filter={{ status: 'Active' }}/>)}
        />
        <ActionButton
          icon={ListChecks}
          label="Resolved Requests"
          onClick={() => openModalWithContent(<BudgetAdjustmentRequestTable filter={{ status: '!Active' }}/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

BudgetAdjustmentRequest.meta = {
  priority: 1,
};

export default BudgetAdjustmentRequest;
