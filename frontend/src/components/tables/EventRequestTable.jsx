import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import eventRequestClient from "../../clients/eventRequestClient";
import { useModalContext } from "../../utils/ModalContext";
import EditRegisteredEventRequestForm from "../forms/EditRegisteredEventRequestForm";
import EditNonRegisteredEventRequestForm from "../forms/EditNonRegisteredEventRequestForm";
import Loader from "../Loader";

const EventRequestTable = ({ filter = {}, mode }) => {
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { openModalWithContent } = useModalContext();

  const fetchData = async () => {
    try {
      const response = await eventRequestClient.getAll(filter);
      setRecords(response.data);
    } catch (err) {
      console.error("Failed to load event requests", err);
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

  const handleEdit = async (id) => {
    try {
      const response = await eventRequestClient.getById(id);
      if (response.type === "registered") {
        openModalWithContent(<EditRegisteredEventRequestForm id={id} />);
      } else {
        openModalWithContent(<EditNonRegisteredEventRequestForm id={id} />);
      }
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
          header="Event Requests"
          records={records}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default EventRequestTable;
