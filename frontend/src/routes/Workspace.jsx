import { useAppContext } from '../utils/AppContext';
import '../styles/workspace.css';
import Departments from '../components/cards/Departments';
import Employees from '../components/cards/Employees';
import Tasks from '../components/cards/Tasks';
import NewEventRequest from '../components/cards/EventRequests';
import NewRecruitmentRequest from '../components/cards/RecruitmentRequests';
import NewFinancialRequest from '../components/cards/FinancialRequests';
import Applications from '../components/cards/Applications';
import HR from '../components/cards/HR';
import Teams from '../components/cards/Teams';
import EventArchive from '../components/cards/EventArchive';
import Clients from '../components/cards/Clients';

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
        <Employees />
        <Departments />
        <Tasks />
        <NewEventRequest />
        <NewRecruitmentRequest />
        <NewFinancialRequest />
        <Applications />
        <HR />
        <Teams />
        <EventArchive />
        <Clients />
      </div>
    </div>
  );
};

export default Workspace;
