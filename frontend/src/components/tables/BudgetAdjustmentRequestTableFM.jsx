import React, { useEffect, useState } from "react";
import TableView from "../TableView";
import { useModalContext } from "../../utils/ModalContext";
import Loader from "../Loader";
import budgetAdjustmentRequestClient from "../../clients/budgetAdjustmentRequestClient";
import EditBudgetAdjustmentRequestForm from "../forms/EditBudgetAdjustmentRequestForm";
import EditBudgetAdjustmentRequestFormFM from "../forms/EditBudgetAdjustmentRequestFormFM";

const BudgetAdjustmentRequestTableFM = ({ filter = {}, mode }) => {
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { openModalWithContent } = useModalContext();

  const fetchData = async () => {
    try {
      const response = await budgetAdjustmentRequestClient.getAll(filter);
      setRecords(response.data);
    } catch (err) {
      console.error("Failed to load budget adjustment requests", err);
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
      await budgetAdjustmentRequestClient.delete(id);
      delayedRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      openModalWithContent(<EditBudgetAdjustmentRequestFormFM id={id} />);
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
          header="Budget Adjustment Requests"
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

export default BudgetAdjustmentRequestTableFM;
