import { useState } from "react";
import { HelpCircle } from "lucide-react";

export default function WorkflowGuide() {
  const [open, setOpen] = useState(false);

  const workflows = [
  {
    title: "Workflow 1: Event Request Approval Flow",
    steps: [
      "1️⃣ Login as Sarah (`sarah`, `pwd`) — Customer Service Officer. Create a new Event Request for any client.",
      "2️⃣ Login as Janet (`janet`, `pwd`) — Senior Customer Service Officer. Review and approve Sarah’s submitted request.",
      "3️⃣ Login as Alice (`alice`, `pwd`) — Financial Manager. Review the approved request from the financial perspective.",
      "4️⃣ Login as Mike (`mike`, `pwd`) — Administration Manager. Provide final approval on behalf of admin management.",
      "✅ Janet can now view fully approved Event Requests and proceed with related follow-up actions.",
    ],
  },
  {
    title: "Workflow 2: Task Management Flow",
    steps: [
      "1️⃣ Login as Jack (`jack`, `pwd`) — Production Manager. Create a new task for a specific subteam (e.g., Decoration, Photography, Audio, etc.).",
      "2️⃣ Login as a subteam member (e.g., Magy `magy`, Angelina `angelina`, or Don `don`) and assign one of your teammates to the task.",
      "3️⃣ Update the task status to 'In Progress' or 'Completed' as work advances.",
      "✅ Jack (Production Manager) can view all tasks across different statuses and track team progress.",
    ],
  },
  {
    title: "Workflow 3: Recruitment Request Flow",
    steps: [
      "1️⃣ Login as Jack (`jack`, `pwd`) or Natalie (`natalie`, `pwd`) — Production or Services Manager. Create a Recruitment Request (Hiring/Outsourcing).",
      "2️⃣ Login as Simon (`simon`, `pwd`) — Senior HR Manager. Review and approve the recruitment request.",
      "✅ The manager (Jack or Natalie) can now see approved recruitment requests in the system.",
    ],
  },
  {
    title: "Workflow 4: Budget Adjustment Flow",
    steps: [
      "1️⃣ Login as Jack (`jack`, `pwd`) or Natalie (`natalie`, `pwd`) — Production or Services Manager. Create a Budget Adjustment Request for an ongoing event or application.",
      "2️⃣ Login as Alice (`alice`, `pwd`) — Financial Manager. Review and approve the adjustment (after negotiating with the client if needed).",
      "✅ The requesting manager (Jack or Natalie) can see approved budget adjustments reflected in their dashboard.",
    ],
  },
];



  return (
    <div className="workflow-guide">
      <button
        className="workflow-button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle workflow guide"
      >
        <HelpCircle className="workflow-icon" />
      </button>

      {open && (
        <div className="workflow-tooltip">
          <h3>Testing Workflows</h3>
          {workflows.map((wf, i) => (
            <div key={i} className="workflow-section">
              <h4>{wf.title}</h4>
              <ul>
                {wf.steps.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
