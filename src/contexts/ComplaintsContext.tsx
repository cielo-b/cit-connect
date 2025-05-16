
import { createContext, useContext, useState, ReactNode } from "react";
import { Complaint, Comment, ComplaintStatus } from "../types";
import { mockComplaints } from "../services/mockData";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";

interface ComplaintsContextType {
  complaints: Complaint[];
  getUserComplaints: (userId: string) => Complaint[];
  getComplaintById: (id: string) => Complaint | undefined;
  createComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateStatus: (complaintId: string, status: ComplaintStatus) => void;
  assignComplaint: (complaintId: string, userId: string) => void;
  addComment: (complaintId: string, text: string) => void;
}

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(undefined);

export function ComplaintsProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const getUserComplaints = (userId: string) => {
    return complaints.filter(complaint => complaint.citizenId === userId);
  };

  const getComplaintById = (id: string) => {
    return complaints.find(complaint => complaint.id === id);
  };

  const createComplaint = (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const now = new Date().toISOString();
    const newComplaint: Complaint = {
      ...complaint,
      id: `temp_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      comments: [],
    };

    setComplaints([...complaints, newComplaint]);
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been submitted successfully.",
    });
  };

  const updateStatus = (complaintId: string, status: ComplaintStatus) => {
    setComplaints(complaints.map(complaint => {
      if (complaint.id === complaintId) {
        return {
          ...complaint,
          status,
          updatedAt: new Date().toISOString(),
        };
      }
      return complaint;
    }));

    toast({
      title: "Status Updated",
      description: `The complaint status has been updated to ${status.replace('_', ' ')}.`,
    });
  };

  const assignComplaint = (complaintId: string, userId: string) => {
    setComplaints(complaints.map(complaint => {
      if (complaint.id === complaintId) {
        return {
          ...complaint,
          assignedTo: userId,
          status: complaint.status === 'pending' ? 'under_review' : complaint.status,
          updatedAt: new Date().toISOString(),
        };
      }
      return complaint;
    }));

    toast({
      title: "Complaint Assigned",
      description: "The complaint has been assigned successfully.",
    });
  };

  const addComment = (complaintId: string, text: string) => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to add comments.",
      });
      return;
    }

    const now = new Date().toISOString();
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      text,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      createdAt: now,
    };

    setComplaints(complaints.map(complaint => {
      if (complaint.id === complaintId) {
        return {
          ...complaint,
          comments: [...complaint.comments, newComment],
          updatedAt: now,
        };
      }
      return complaint;
    }));

    toast({
      title: "Comment Added",
      description: "Your comment has been added successfully.",
    });
  };

  return (
    <ComplaintsContext.Provider value={{
      complaints,
      getUserComplaints,
      getComplaintById,
      createComplaint,
      updateStatus,
      assignComplaint,
      addComment,
    }}>
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintsContext);
  if (context === undefined) {
    throw new Error("useComplaints must be used within a ComplaintsProvider");
  }
  return context;
}
