import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import { useModalContext } from "../../utils/ModalContext";
import Loader from "../Loader";
// import EditBudgetAdjustmentRequestForm from "../forms/EditBudgetAdjustmentRequestForm";
import recruitmentRequestClient from "../../clients/recruitmentRequestClient";
import EditRecruitmentRequestFormHR from "../forms/EditRecruitmentRequestFormHR";

const RecruitmentRequestTableHR = ({ filter = {}, mode }) => {
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { openModalWithContent } = useModalContext();

  const fetchData = async () => {
    try {
      const response = await recruitmentRequestClient.getAll(filter);
      setRecords(response.data);
    } catch (err) {
      console.error("Failed to load recruitment requests", err);
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
      await recruitmentRequestClient.delete(id);
      delayedRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      openModalWithContent(<EditRecruitmentRequestFormHR id={id} />);
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
          header="Recruitment Requests"
          records={records}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default RecruitmentRequestTableHR;
