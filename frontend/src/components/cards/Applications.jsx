// src/cards/Applications.jsx
import WorkspaceCard from '../WorkspaceCard';
import '../WorkspaceCard.css';
import { Eye, HandCoins, UserCheck, UserPlus, UsersRound, Wallet } from 'lucide-react';
import ActionButton from '../ActionButton';

const Applications = () => (
  <WorkspaceCard title="Ongoing Applications" authorizedRoles={['Staff', 'Manager']}>
    <div className="workspace-card-actions">
      <ActionButton icon={HandCoins} label="Request Budget Adjustment" />
      <ActionButton icon={Wallet} label="Request Financial Situation" />
      <ActionButton icon={UsersRound} label="Request Hiring / Outsourcing" />
    </div>
  </WorkspaceCard>
);

Applications.meta = {
  priority: 1,
};

export default Applications;
