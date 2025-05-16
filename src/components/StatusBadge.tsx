
import React from "react";
import { ComplaintStatus } from "@/types";
import { getStatusColor, getStatusText } from "@/services/mockData";

interface StatusBadgeProps {
  status: ComplaintStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = getStatusColor(status);
  const statusDisplay = getStatusText(status);
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {statusDisplay}
    </span>
  );
};

export default StatusBadge;
