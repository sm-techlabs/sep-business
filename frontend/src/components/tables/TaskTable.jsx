import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import taskClient from "../../clients/taskClient";
import { useModalContext } from "../../utils/ModalContext";
import EditTaskForm from "../forms/EditTaskForm";
import Loader from "../Loader";

const TaskTable = ({ createdById, mode }) => {
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { openModalWithContent } = useModalContext();

  const fetchData = async () => {
    try {
      const response = createdById
        ? await taskClient.getAll({ createdById })
        : await taskClient.getAll();
      setRecords(response.data);
    } catch (err) {
      console.error("Failed to load event requests", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [createdById]);

  const delayedRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      await fetchData();
      setRefreshing(false);
    }, 500);
  };

  const handleApprove = async (id) => {
    try {
      await taskClient.approve(id);
      delayedRefresh();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await taskClient.reject(id);
      delayedRefresh();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskClient.delete(id);
      delayedRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      {refreshing ? (
        <Loader />
      ) : (
        <TableView
          mode={mode}
          header="Event Requests"
          records={records}
          onDelete={handleDelete}
          onEdit={(id) => openModalWithContent(<EditTaskForm id={id} />)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default TaskTable;
