
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComplaintCard from "@/components/ComplaintCard";
import { useAuth } from "@/contexts/AuthContext";
import { useComplaints } from "@/contexts/ComplaintsContext";
import { getCategoryById } from "@/services/mockData";
import { ComplaintStatus } from "@/types";

const ComplaintsListPage = () => {
  const { currentUser } = useAuth();
  const { complaints, getUserComplaints } = useComplaints();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all-statuses");
  const [categoryFilter, setCategoryFilter] = useState<string>("all-categories");

  // Get user complaints if logged in, otherwise show all
  const displayedComplaints = currentUser 
    ? getUserComplaints(currentUser.id)
    : complaints;

  const filteredComplaints = displayedComplaints.filter(complaint => {
    // Apply search filter
    const matchesSearch = 
      searchTerm === "" || 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === "all-statuses" || 
      complaint.status === statusFilter;
    
    // Apply category filter
    const matchesCategory = 
      categoryFilter === "all-categories" || 
      complaint.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-civic-dark">
            {currentUser ? "My Complaints" : "Public Complaints"}
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredComplaints.length} {filteredComplaints.length === 1 ? "complaint" : "complaints"} found
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-civic-primary hover:bg-civic-dark"
          onClick={() => navigate("/submit")}
        >
          Submit New Complaint
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-statuses">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">All Categories</SelectItem>
            {complaints
              .map(c => c.category)
              .filter((value, index, self) => self.indexOf(value) === index) // Get unique categories
              .map(categoryId => {
                const category = getCategoryById(categoryId);
                return (
                  <SelectItem key={categoryId} value={categoryId}>
                    {category?.name || "Unknown"}
                  </SelectItem>
                );
              })}
          </SelectContent>
        </Select>
      </div>

      {/* Complaints Grid */}
      {filteredComplaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map(complaint => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">No complaints found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or submit a new complaint</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintsListPage;
