import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import eventRequestClient from "../../clients/eventRequestClient";
import { useModalContext } from "../../utils/ModalContext";
import EditEventRequestForm from "../forms/EditEventRequestForm";



const EventRequestTable = () => {
  const [records, setRecords] = useState([]);
   const { openModalWithContent } = useModalContext();

  useEffect(() => {
    const getEventRequests = async () => {
      const response = await eventRequestClient.getAll();
      setRecords(response.data);
    }
    getEventRequests();
  }, []);


  return (
    <div>
      <TableView 
      header={"Event Requests"}
      records={records}
      onDelete={(id) => eventRequestClient.delete(id)}
      onEdit={(id) => {
        openModalWithContent(<EditEventRequestForm id={id}/>) 
      }}
      />
    </div>
  );
};

export default EventRequestTable;
