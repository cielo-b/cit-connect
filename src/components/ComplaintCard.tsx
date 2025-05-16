
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Complaint } from "@/types";
import { getCategoryById } from "@/services/mockData";
import { formatDistance } from "date-fns";

interface ComplaintCardProps {
  complaint: Complaint;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  const category = getCategoryById(complaint.category);
  const timeAgo = formatDistance(new Date(complaint.createdAt), new Date(), { addSuffix: true });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{complaint.title}</CardTitle>
          <StatusBadge status={complaint.status} />
        </div>
        <div className="text-sm text-gray-500">
          {category?.name} • {complaint.location} • {timeAgo}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2">{complaint.description}</p>
        
        {complaint.images && complaint.images.length > 0 && (
          <div className="mt-3 flex -mx-1 overflow-x-auto">
            {complaint.images.map((image, idx) => (
              <img 
                key={idx}
                src={image} 
                alt={`Complaint image ${idx + 1}`} 
                className="h-16 w-16 object-cover rounded mx-1 flex-shrink-0" 
              />
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <div className="text-xs text-gray-500">
          <span>Assigned to: </span>
          <span className="font-medium">{complaint.assignedTo ? category?.agency : 'Unassigned'}</span>
        </div>
        <Link to={`/complaints/${complaint.id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
