import DynamicForm from "../DynamicForm";
import taskClient from "../../clients/taskClient";
import teamClient from "../../clients/teamClient";
import applicationClient from "../../clients/applicationClient";
import { useState, useEffect } from "react";


const CreateTaskForm = () => {

  const [applicationOptions, setApplicationOptions] = useState([]);
  const [subteamOptions, setSubteamOptions] = useState([]);

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const response = await applicationClient.getAll();
      const applications = Array.isArray(response) ? response : [];

      const options = applications
        .filter((a) => a && a.id)
        .sort((a, b) => (a.id || "").localeCompare(b.id || ""))
        .map((app) => ({
          value: app.id,
          label: `(Application #${app.id})`,
        }));

      setApplicationOptions(
        options.length
          ? options
          : [{ value: "", label: "⚠️ No applications found" }]
      );
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplicationOptions([
        { value: "", label: "⚠️ Failed to load applications" },
      ]);
    }
  };

  fetchApplications();
}, []);


  useEffect(() => {
  const fetchSubteams = async () => {
    try {
      const response = await teamClient.getSubteams();
      const subteams = Array.isArray(response) ? response : [];

      const options = subteams
        .filter((s) => s && s.id && s.name)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((subteam) => ({
          value: subteam.id,
          label: `${subteam.name} (${subteam.id || "N/A"})`, // Adjust field names as needed
        }));

      setSubteamOptions(
        options.length
          ? options
          : [{ value: "", label: "⚠️ No subteams found" }]
      );
    } catch (err) {
      console.error("Error fetching subteams:", err);
      setSubteamOptions([
        { value: "", label: "⚠️ Failed to load subteams" },
      ]);
    }
  };

  fetchSubteams();
}, []);


  const form = {
    title: "New Task",
    fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "New Task Title",
      required: true,
    },
    {
      name: "applicationId",
      label: "Relevant Application",
      type: "dropdown",
      options: applicationOptions,
      required: true,
    },
    {
      name: "subteamId",
      label: "Subteam",
      type: "dropdown",
      options: subteamOptions,
      required: true
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
    },
    {
      name: "endsOn",
      label: "End Date",
      type: "date",
      required: true,
    },
    {
      name: "comments",
      label: "Comments",
      type: "text",
      placeholder: "Comments",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Expected outcomes and responsibilities",
      required: false,
    },
  ]};

  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        onSubmit={taskClient.create}
      />
    </div>
  );
};

export default CreateTaskForm;
