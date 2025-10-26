import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import eventRequestClient from "../../clients/eventRequestClient";
import { useModalContext } from "../../utils/ModalContext";
import EditEventRequestForm from "../forms/EditEventRequestForm";

const TaskTable = ({ createdById }) => {
  const [records, setRecords] = useState([]);
  const { openModalWithContent } = useModalContext();

  useEffect(() => {
    const getEventRequests = async () => {
      try {
        const response = createdById
          ? await eventRequestClient.getAll({createdById})
          : await eventRequestClient.getAll();

        setRecords(response.data);
      } catch (err) {
        console.error("Failed to load event requests", err);
      }
    };

    getEventRequests();
  }, [createdById]);

  return (
    <div>
      <TableView
        header={"Event Requests"}
        records={records}
        onDelete={(id) => eventRequestClient.delete(id)}
        onEdit={(id) => {
          openModalWithContent(<EditEventRequestForm id={id} />);
        }}
      />
    </div>
  );
};

export default TaskTable;
