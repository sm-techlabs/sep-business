import DynamicForm from "../DynamicForm";
import taskClient from "../../clients/taskClient";
import teamClient from "../../clients/teamClient";
import applicationClient from "../../clients/applicationClient";
import { useState, useEffect } from "react";


const EditTaskFormManager = ({ id }) => {

  const [applicationOptions, setApplicationOptions] = useState([]);
  const [subteamOptions, setSubteamOptions] = useState([]);
  const [initialValues, setInitialValues] = useState([]);

  useEffect(() => {
  const fetchApplications = async () => {
    try {
      const response = await applicationClient.getAll();
      const applications = Array.isArray(response) ? response : [];

      const options = applications
        .filter((a) => a && a.id)
        .sort((a, b) => a.id - b.id)
        .map((app) => ({
          value: app.id,
          label: `Application #${app.id}`,
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
          label: `${subteam.name}`, // Adjust field names as needed
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


// Fetch task initial values (edit mode)
  useEffect(() => {
    if (!id) return;

    const getInitialValues = async () => {
      try {
        const response = await taskClient.getById(id);

        // Map API structure → form structure
        const mapped = {
          title: response.title || "",
          applicationId: response.applicationId || "",
          subteamId: response.subteamId || "",
          priority: response.priority || "Medium",
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
      label: "Application",
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
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Expected outcomes and responsibilities",
      required: false,
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
    return await taskClient.update(id, formData);
  };


  return (
    <div className="modal-form-container">
      <DynamicForm
        title={form.title}
        fields={form.fields}
        initialValues={initialValues}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default EditTaskFormManager;
