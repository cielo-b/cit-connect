
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { useComplaints } from "@/contexts/ComplaintsContext";
import { getCategoryById } from "@/services/mockData";
import { ComplaintStatus } from "@/types";
import { format } from "date-fns";

const ComplaintDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getComplaintById, updateStatus, addComment } = useComplaints();
  
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<ComplaintStatus | "">("");
  
  if (!id) {
    navigate("/complaints");
    return null;
  }
  
  const complaint = getComplaintById(id);
  
  if (!complaint) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-civic-dark">Complaint Not Found</h1>
        <p className="text-gray-600 mb-6">The complaint you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/complaints")}>
          Back to Complaints
        </Button>
      </div>
    );
  }
  
  const category = getCategoryById(complaint.category);
  const isAdmin = currentUser && (currentUser.role === "admin" || currentUser.role === "agency");
  const isOwner = currentUser && currentUser.id === complaint.citizenId;
  const canComment = !!currentUser;
  
  const handleStatusChange = () => {
    if (status && isAdmin) {
      updateStatus(complaint.id, status as ComplaintStatus);
      setStatus("");
    }
  };
  
  const handleAddComment = () => {
    if (comment.trim() && canComment) {
      addComment(complaint.id, comment);
      setComment("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate("/complaints")} className="mb-4">
          ← Back to Complaints
        </Button>
        
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-civic-dark">{complaint.title}</h1>
            <div className="flex flex-wrap gap-2 items-center mt-2">
              <StatusBadge status={complaint.status} />
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{category?.name}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{complaint.location}</span>
            </div>
          </div>
          
          {isAdmin && (
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <Select value={status} onValueChange={(val) => setStatus(val as ComplaintStatus)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update Status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleStatusChange} 
                disabled={!status}
                className="bg-civic-primary hover:bg-civic-dark"
              >
                Update
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Complaint Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
              <CardDescription>
                Submitted on {format(new Date(complaint.createdAt), "PPP")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line mb-6">{complaint.description}</p>
              
              {complaint.images && complaint.images.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Attached Images</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {complaint.images.map((image, idx) => (
                      <img 
                        key={idx}
                        src={image} 
                        alt={`Evidence ${idx + 1}`} 
                        className="rounded-md w-full h-40 object-cover" 
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
              <CardDescription>
                {complaint.comments.length} {complaint.comments.length === 1 ? "comment" : "comments"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {complaint.comments.length > 0 ? (
                <div className="space-y-6">
                  {complaint.comments.map(comment => (
                    <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium">{comment.userName}</span>
                          <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-gray-100">
                            {comment.userRole === "agency" ? "Agency Staff" : 
                             comment.userRole === "admin" ? "Admin" : "Citizen"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {format(new Date(comment.createdAt), "PPp")}
                        </span>
                      </div>
                      <p className="text-gray-800">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">No comments yet</p>
              )}
              
              {canComment && (
                <div className="mt-6 pt-6 border-t">
                  <Textarea 
                    placeholder="Add your comment here..." 
                    className="mb-3 min-h-[100px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button 
                    onClick={handleAddComment} 
                    disabled={comment.trim() === ""}
                    className="bg-civic-primary hover:bg-civic-dark"
                  >
                    Post Comment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Information */}
          <Card>
            <CardHeader>
              <CardTitle>Status Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Current Status</h4>
                  <div className="mt-1">
                    <StatusBadge status={complaint.status} />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Category</h4>
                  <p className="mt-1">{category?.name}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Responsible Agency</h4>
                  <p className="mt-1">{category?.agency}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="mt-1">{complaint.location}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date Submitted</h4>
                  <p className="mt-1">{format(new Date(complaint.createdAt), "PPP")}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                  <p className="mt-1">{format(new Date(complaint.updatedAt), "PPP")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Complaints (this would be a feature enhancement) */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-2">
                Feature coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailPage;
