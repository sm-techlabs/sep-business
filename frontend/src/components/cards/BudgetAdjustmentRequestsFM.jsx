import { DollarSign, FileSliders, ListCheck, MessagesSquare, Receipt, } from 'lucide-react';
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import ActionButton from '../ActionButton';
import { useModalContext } from '../../utils/ModalContext';
import BudgetAdjustmentRequestTableFM from '../tables/BudgetAdjustmentRequestTableFM';


const BudgetAdjustmentRequestFM = () => {

  const { openModalWithContent } = useModalContext();

  return (
    <WorkspaceCard title="Budget Adjustment Requests" authorizedRoles={['Financial Manager']}>
      <div className="workspace-card-actions">
        <ActionButton
          icon={Receipt}
          label="Ongoing Requests"
          onClick={() => openModalWithContent(<BudgetAdjustmentRequestTableFM filter={{ status: 'Active'}}/>)}
        />
        <ActionButton
          icon={ListCheck}
          label="Resolved"
          onClick={() => openModalWithContent(<BudgetAdjustmentRequestTableFM filter={{ status: '!Active' }}/>)}
        />
      </div>

    </WorkspaceCard>
  );
};

BudgetAdjustmentRequestFM.meta = {
  priority: 1,
};

export default BudgetAdjustmentRequestFM;
