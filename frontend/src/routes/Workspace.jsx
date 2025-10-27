import { useAppContext } from '../utils/AppContext';
import '../styles/workspace.css';
import Departments from '../components/cards/Departments';
import Employees from '../components/cards/Employees';
import Tasks from '../components/cards/Tasks';
import NewRecruitmentRequest from '../components/cards/RecruitmentRequests';
import Applications from '../components/cards/Applications';
import HR from '../components/cards/HR';
import Teams from '../components/cards/Teams';
import EventArchive from '../components/cards/EventArchive';
import Clients from '../components/cards/Clients';
import EventRequestCSO from '../components/cards/EventRequestsCSO';
import EventRequestSCSO from '../components/cards/EventRequestsSCSO';
import EventRequestFM from '../components/cards/EventRequestsFM';
import EventRequestAM from '../components/cards/EventRequestsAM';

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
        <NewRecruitmentRequest />
        <Applications />
        <HR />
        <Teams />
        <EventArchive />
        <Clients />
        {/* Event Requests */}
        <EventRequestCSO />
        <EventRequestSCSO />
        <EventRequestFM />
        <EventRequestAM />
      </div>
    </div>
  );
};

export default Workspace;
