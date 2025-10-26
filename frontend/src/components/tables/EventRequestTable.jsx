import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import eventRequestClient from "../../clients/eventRequestClient";
import { useModalContext } from "../../utils/ModalContext";
import EditEventRequestForm from "../forms/EditEventRequestForm";
import Loader from "../Loader";

const EventRequestTable = ({ createdById, mode }) => {
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { openModalWithContent } = useModalContext();

  const fetchData = async () => {
    try {
      const response = createdById
        ? await eventRequestClient.getAll({ createdById })
        : await eventRequestClient.getAll();
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
      await eventRequestClient.approve(id);
      delayedRefresh();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await eventRequestClient.reject(id);
      delayedRefresh();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eventRequestClient.delete(id);
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
          onEdit={(id) => openModalWithContent(<EditEventRequestForm id={id} />)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default EventRequestTable;
