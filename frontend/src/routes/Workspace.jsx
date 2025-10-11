import '../styles/workspace.css';
import { useAppContext } from '../utils/AppContext';

const Workspace = () => {
  const { user, tokenValid, loading } = useAppContext();
  // const authorizedJobTitles = ['Manager', 'Admin'];

  // 🕓 Wait while token is being validated
  if (loading) return <Loader />;

  // 🚫 Not authorized → render nothing
  if (!tokenValid) return null;

  // ✅ Authorized → render page
  return (
    <div className="workspace-container">
      <h1>Workspace</h1>
      <h3>You should only see content you're authorized for.</h3>
      {/* 
      <Card 1 /> e.g. New Request (registered / non-registered) - Request preferences
      <Card 2 /> e.g. Ongoing Applications + Budget Adjustment Requests, Financial Situation Request, Hiring / Outsourcing Requests
      <Card 3 /> e.g. Tasks
      <Card 4 /> e.g. Financial Situation Requests
      <Card 5 /> e.g. Hiring or Outsourcing Requests
      <Card 6 /> e.g. Job Advertisements
      <Card 7 /> e.g. Departments
      <Card 8 /> e.g. Teams
      <Card 9 /> e.g. Employees
      <Card 10 /> e.g. Events (archived)
      <Card 11 /> e.g. Clients
      <Card 12 /> e.g. Settings
      */}
    </div>
  );
};

export default Workspace;
