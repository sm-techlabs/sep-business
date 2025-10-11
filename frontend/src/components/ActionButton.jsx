import './ActionButton.css';

const ActionButton = ({ icon: Icon, label, onClick }) => {
  return (
    <div className="action-button">
      <button onClick={onClick}>
        <Icon />
      </button>
      <span className="tooltip">{label}</span>
    </div>
  );
};

export default ActionButton;

