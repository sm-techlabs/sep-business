import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm";
import eventRequestClient from "../../clients/eventRequestClient";

const ReviewFMNonRegisteredEventRequestForm = ({ id }) => {

  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
  const getInitialValues = async () => {
    try {
      const response = await eventRequestClient.getById(id);

      // Map API structure -> form structure
      const mapped = {
        name: response.name || "",
        email: response.email || "",
        businessCode: response.businessCode || "",
        address: response.address || "",
        eventType: response.eventType || "",
        startsOn: new Date(response.startsOn),
        endsOn: new Date(response.endsOn),
        estimatedBudget: response.estimatedBudget || 0,
        expectedNumberOfAttendees: response.expectedNumberOfAttendees || 0,
        preferences: {
          decorations: response.preferences?.decorations ?? false,
          parties: response.preferences?.parties ?? false,
          photosOrFilming: response.preferences?.photosOrFilming ?? false,
          breakfastLunchDinner: response.preferences?.breakfastLunchDinner ?? false,
          softHotDrinks: response.preferences?.softHotDrinks ?? false,
        },
      };
      setInitialValues(mapped);
    } catch (err) {
      console.error("Failed to fetch event request:", err);
    }
  };

  getInitialValues();
}, [id]);

  const form = {
    title: "Review Event Request - Non-Registered Client",
    fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "New Customer Name",
      required: true,
      readOnly: true,
    },
    {
      name: "email",
      label: "E-mail",
      type: "text",
      placeholder: "client@business.com",
      required: true,
      readOnly: true,
    },
    {
      name: "businessCode",
      label: "Business Code",
      type: "text",
      placeholder: "Business identifier",
      required: true,
      readOnly: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "e.g. El. Venizelou 20, Thessaloniki 546 24, Greece",
      required: true,
      readOnly: true,
    },
    {
      name: "eventType",
      label: "Event Type",
      type: "text",
      placeholder: "e.g. Conference, Birthday, Wedding...",
      required: true,
      readOnly: true,
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
      name: "estimatedBudget",
      label: "Estimated Budget (SEK)",
      type: "number",
      placeholder: "Enter estimated cost",
      required: true,
      readOnly: true,
    },
    {
      name: "expectedNumberOfAttendees",
      label: "Expected Number of Attendees",
      type: "number",
      placeholder: "e.g. 50",
      required: true,
      readOnly: true,
    },
    {
      name: "preferences",
      label: "Preferences",
      type: "checkbox-group",
      options: [
        { name: "decorations", description: "Decorations" },
        { name: "parties", description: "Parties" },
        { name: "photosOrFilming", description: "Photos or Filming" },
        { name: "breakfastLunchDinner", description: "Breakfast, Lunch or Dinner" },
        { name: "softHotDrinks", description: "Soft or Hot Drinks" },
      ],
      readOnly: true,
    },
    {
      name: "budgetComment",
      label: "Budget Comment",
      type: "string",
      placeholder: "e.g. Budget seems reasonable.",
      required: true
    }
  ]}

  const handleEditSubmit = async (formData) => {
    await eventRequestClient.updateNonRegistered(id, formData);
    await eventRequestClient.approve(id);
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

export default ReviewFMNonRegisteredEventRequestForm;
