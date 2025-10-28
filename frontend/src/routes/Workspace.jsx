import { useAppContext } from '../utils/AppContext';
import '../styles/workspace.css';
// Event Requests
import EventRequestCSO from '../components/cards/EventRequestsCSO';
import EventRequestSCSO from '../components/cards/EventRequestsSCSO';
import EventRequestFM from '../components/cards/EventRequestsFM';
import EventRequestAM from '../components/cards/EventRequestsAM';
// Tasks
import TasksEmployee from '../components/cards/TasksEmployee';
import TasksManager from '../components/cards/TasksManager';
// Budget Adjustment Requests
import BudgetAdjustmentRequestFM from '../components/cards/BudgetAdjustmentRequestsFM';
import BudgetAdjustmentRequest from '../components/cards/BudgetAdjustmentRequests';
//Recruitment
import RecruitmentRequests from '../components/cards/RecruitmentRequests';
import RecruitmentRequestsHR from '../components/cards/RecruitmentRequestsHR';

const Workspace = () => {
  const { tokenValid, loading } = useAppContext();

  // 🕓 Wait while token is being validated
  if (loading) return <Loader />;

  // 🚫 Not authorized → render nothing
  if (!tokenValid) return null;

  // ✅ Authorized → render page
  return (
    <div className="workspace-container">
      <h1>Workspace</h1>
      <h3>You should only see content you're authorized for.</h3>
      <div className="workspace-grid">
        {/* Event Requests */}
        <EventRequestCSO />
        <EventRequestSCSO />
        <EventRequestFM />
        <EventRequestAM />

        {/* Tasks */}
        <TasksEmployee />
        <TasksManager />

        {/* Budget Adjustment Requests */}
        <BudgetAdjustmentRequest />
        <BudgetAdjustmentRequestFM />

        {/* Recruitment Requests */}
        <RecruitmentRequests /> 
        <RecruitmentRequestsHR /> 
      </div>
    </div>
  );
};

export default Workspace;
