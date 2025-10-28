import DynamicForm from "../DynamicForm";
import taskClient from "../../clients/taskClient";
import teamClient from "../../clients/teamClient";
import { useState, useEffect } from "react";


const EditTaskFormEmployee = ({ id }) => {

  const [teamMemberOptions, setTeamMemberOptions] = useState([]);
  const [initialValues, setInitialValues] = useState([]);

  useEffect(() => {
  const fetchTeamMembers = async () => {
    try {
      const response = await teamClient.getTeamMembers();
      const teamMembers = Array.isArray(response) ? response : [];

      const options = teamMembers
        .filter((s) => s && s.id && s.name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((subteam) => ({
          value: subteam.id,
          label: `${subteam.name}`, // Adjust field names as needed
        }));

      setTeamMemberOptions(
        options.length
          ? options
          : [{ value: "", label: "⚠️ No team members found" }]
      );
    } catch (err) {
      console.error("Error fetching team members:", err);
      setTeamMemberOptions([
        { value: "", label: "⚠️ Failed to load team members" },
      ]);
    }
  };

  fetchTeamMembers();
}, []);

// Fetch task initial values (edit mode)
  useEffect(() => {
    if (!id) return;

    const getInitialValues = async () => {
      try {
        const response = await taskClient.getById(id);

        // Map API structure → form structure
        const mapped = {
          title: response.title || "",
          priority: response.priority || "Medium",
          assignedToId: response.assignedToId || "",
          status: response.status || "",
          startsOn: response.startsOn ? new Date(response.startsOn) : null,
          endsOn: response.endsOn ? new Date(response.endsOn) : null,
          comments: response.comments || "",
          description: response.description || "",
        };

        setInitialValues(mapped);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };

    getInitialValues();
  }, [id]);


  const form = {
    title: "View Task",
    fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "New Task Title",
      required: true,
      readOnly: true,
    },
    {
      name: "assignedToId",
      label: "Assigned To",
      type: "dropdown",
      options: teamMemberOptions,
      placeholder: 'Select team member',
      required: true
    },
    {
      name: "status",
      label: "Status",
      type: "dropdown",
      options:
      [
        { label: "Pending", value: "Pending" },
        { label: "In Progress", value: "InProgress" },
        { label: "Completed", value: "Completed" },
      ],
      required: true,
    },
    {
      name: "priority",
      label: "Priority",
      type: "dropdown",
      options:
      [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
      ],
      required: true,
    },
    {
      name: "startsOn",
      label: "Start Date",
      type: "date",
      required: true,
      readOnly: true,
    },
    {
      name: "endsOn",
      label: "End Date",
      type: "date",
      required: true,
      readOnly: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Expected outcomes and responsibilities",
      required: false,
      readOnly: true,
    },
    {
      name: "comments",
      label: "Comments",
      type: "text",
      placeholder: "Comments",
      required: true,
    },
  ]};

const handleEditSubmit = async (formData) => {
    return await taskClient.partialUpdate(id, formData);
  };

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        onSubmit={handleEditSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export default EditTaskFormEmployee
