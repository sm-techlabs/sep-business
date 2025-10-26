import React, { useEffect, useState } from "react";
import ListView from "../ListView";
import eventRequestClient from "../../clients/eventRequestClient";

const EventRequestList = () => {
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
      <ListView 
      title={"Event Requests"}
      data={records} />
    </div>
  );
};

export default EventRequestList;
