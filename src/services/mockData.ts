
import { User, Category, Complaint, ComplaintStatus } from "../types";

export const mockCategories: Category[] = [
  { id: "1", name: "Roads & Infrastructure", agency: "Public Works Department" },
  { id: "2", name: "Water Supply", agency: "Water Authority" },
  { id: "3", name: "Electricity", agency: "Energy Department" },
  { id: "4", name: "Public Transportation", agency: "Transit Authority" },
  { id: "5", name: "Waste Management", agency: "Sanitation Department" },
  { id: "6", name: "Parks & Recreation", agency: "Parks Department" },
  { id: "7", name: "Public Safety", agency: "Police Department" },
  { id: "8", name: "Education", agency: "Education Department" },
  { id: "9", name: "Healthcare", agency: "Health Department" },
];

export const mockUsers: User[] = [
  { id: "1", name: "John Citizen", email: "john@example.com", role: "citizen" },
  { id: "2", name: "Admin User", email: "admin@gov.org", role: "admin" },
  { id: "3", name: "PWD Agent", email: "pwd@gov.org", role: "agency", agency: "Public Works Department" },
  { id: "4", name: "Water Authority Agent", email: "water@gov.org", role: "agency", agency: "Water Authority" },
];

export const mockComplaints: Complaint[] = [
  {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues and vehicle damage",
    category: "1",
    status: "in_progress",
    location: "123 Main Street",
    coordinates: { lat: 40.7128, lng: -74.006 },
    images: ["https://placehold.co/600x400?text=Pothole+Image"],
    citizenId: "1",
    assignedTo: "3",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-16T14:20:00Z",
    comments: [
      {
        id: "101",
        text: "We have scheduled repairs for next week.",
        userId: "3",
        userName: "PWD Agent",
        userRole: "agency",
        createdAt: "2023-06-16T14:20:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Water supply interruption",
    description: "No water supply in Brooklyn Heights area for past 24 hours",
    category: "2",
    status: "resolved",
    location: "Brooklyn Heights",
    images: [],
    citizenId: "1",
    assignedTo: "4",
    createdAt: "2023-06-10T08:15:00Z",
    updatedAt: "2023-06-12T11:30:00Z",
    comments: [
      {
        id: "102",
        text: "Maintenance work is ongoing. Supply should be restored within 6 hours.",
        userId: "4",
        userName: "Water Authority Agent",
        userRole: "agency",
        createdAt: "2023-06-11T09:00:00Z",
      },
      {
        id: "103",
        text: "Issue resolved. Water supply has been restored.",
        userId: "4",
        userName: "Water Authority Agent",
        userRole: "agency",
        createdAt: "2023-06-12T11:30:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Street light not working",
    description: "Street light at corner of Oak and Pine has been out for a week",
    category: "3",
    status: "pending",
    location: "Corner of Oak and Pine Street",
    images: ["https://placehold.co/600x400?text=Streetlight+Image"],
    citizenId: "1",
    createdAt: "2023-06-18T19:45:00Z",
    updatedAt: "2023-06-18T19:45:00Z",
    comments: [],
  },
];

export const getStatusColor = (status: ComplaintStatus): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "under_review":
      return "bg-blue-100 text-blue-800";
    case "in_progress":
      return "bg-purple-100 text-purple-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: ComplaintStatus): string => {
  switch (status) {
    case "pending":
      return "Pending";
    case "under_review":
      return "Under Review";
    case "in_progress":
      return "In Progress";
    case "resolved":
      return "Resolved";
    case "rejected":
      return "Rejected";
    default:
      return "Unknown";
  }
};

export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find(category => category.id === id);
};
