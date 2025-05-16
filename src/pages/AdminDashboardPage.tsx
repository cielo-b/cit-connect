
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { useComplaints } from "@/contexts/ComplaintsContext";
import { getCategoryById, mockUsers, getStatusColor } from "@/services/mockData";
import { ComplaintStatus } from "@/types";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { complaints, assignComplaint, updateStatus } = useComplaints();
  
  const [filter, setFilter] = useState<string>("all");
  
  // Redirect if not admin or agency user
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "agency")) {
    navigate("/");
    return null;
  }

  // Filter complaints based on user role and filter selection
  let filteredComplaints = complaints;
  
  // If agency user, only show complaints from their agency
  if (currentUser.role === "agency" && currentUser.agency) {
    const agencyCategoryIds = complaints
      .filter(c => {
        const category = getCategoryById(c.category);
        return category?.agency === currentUser.agency;
      })
      .map(c => c.category);
    
    filteredComplaints = complaints.filter(c => agencyCategoryIds.includes(c.category));
  }
  
  // Apply selected filter
  if (filter !== "all") {
    filteredComplaints = filteredComplaints.filter(c => c.status === filter);
  }

  // Sort by newest first
  filteredComplaints.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Create data for pie chart
  const statusCounts: Record<string, number> = {};
  complaints.forEach(complaint => {
    if (statusCounts[complaint.status]) {
      statusCounts[complaint.status]++;
    } else {
      statusCounts[complaint.status] = 1;
    }
  });

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1),
    value: count,
    status: status as ComplaintStatus
  }));

  const COLORS = ['#FFBB28', '#0088FE', '#8884D8', '#00C49F', '#FF8042'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-civic-dark">
        {currentUser.role === "admin" ? "Admin Dashboard" : "Agency Dashboard"}
      </h1>
      <p className="text-gray-600 mb-8">
        Manage and respond to citizen complaints
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{complaints.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{complaints.filter(c => c.status === 'pending').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{complaints.filter(c => c.status === 'in_progress').length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{complaints.filter(c => c.status === 'resolved').length}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Complaints by Status Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Complaints by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest complaints and updates</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            <ul className="space-y-4">
              {complaints.slice(0, 5).map(complaint => (
                <li key={complaint.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{complaint.title}</span>
                    <StatusBadge status={complaint.status} />
                  </div>
                  <div className="text-sm text-gray-500">
                    {complaint.location} • {new Date(complaint.createdAt).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate("/complaints")}
            >
              View All Complaints
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Complaints Management */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-civic-dark">Manage Complaints</h2>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Complaint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComplaints.map(complaint => {
                const category = getCategoryById(complaint.category);
                return (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{complaint.id.substring(0, 6)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{complaint.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {complaint.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {category?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/complaints/${complaint.id}`)}
                        >
                          View
                        </Button>
                        {complaint.status === 'pending' && (
                          <Button 
                            size="sm"
                            className="bg-civic-primary hover:bg-civic-dark"
                            onClick={() => {
                              if (currentUser) {
                                assignComplaint(complaint.id, currentUser.id);
                              }
                            }}
                          >
                            Assign
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No complaints found matching the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
