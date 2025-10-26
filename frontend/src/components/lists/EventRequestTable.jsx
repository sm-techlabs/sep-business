import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import eventRequestClient from "../../clients/eventRequestClient";

const EventRequestTable = () => {
  const [records, setRecords] = useState([]);

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
      records={records} />
    </div>
  );
};

export default EventRequestTable;
