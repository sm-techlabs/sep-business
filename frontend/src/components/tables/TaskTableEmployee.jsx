import React, { useEffect, useState } from "react";
import TableView from "../TableView";
// import eventRequestClient from "../../clients/eventRequestClient";
import { useModalContext } from "../../utils/ModalContext";
// import EditRegisteredEventRequestForm from "../forms/EditRegisteredEventRequestForm";
// import EditNonRegisteredEventRequestForm from "../forms/EditNonRegisteredEventRequestForm";
import Loader from "../Loader";
import taskClient from "../../clients/taskClient";
import EditTaskFormEmployee from "../forms/EditTaskFormEmployee";

const TaskTableEmployee = ({ filter = {}, mode }) => {
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { openModalWithContent } = useModalContext();

  const fetchData = async () => {
    try {
      const response = await taskClient.getAll(filter);
      setRecords(response.data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(filter)]); // re-fetch when filter changes

  const delayedRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      await fetchData();
      setRefreshing(false);
    }, 500);
  };

  const handleDelete = async (id) => {
    try {
      await taskClient.delete(id);
      delayedRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      openModalWithContent(<EditTaskFormEmployee id={id} />);
    } catch (err) {
      console.error("Failed to open edit form", err);
    }
  };

  return (
    <div>
      {refreshing ? (
        <Loader />
      ) : (
        <TableView
          mode={mode}
          header="Tasks"
          records={records}
          onDelete={handleDelete}
          onEdit={handleEdit}
          // onApprove={handleApprove}
          // onReject={handleReject}
        />
      )}
    </div>
  );
};

export default TaskTableEmployee;
