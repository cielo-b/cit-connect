
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin' | 'agency';
  agency?: string;
};

export type Category = {
  id: string;
  name: string;
  agency: string;
  icon?: string;
};

export type ComplaintStatus = 'pending' | 'under_review' | 'in_progress' | 'resolved' | 'rejected';

export type Complaint = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ComplaintStatus;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: string[];
  citizenId: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userRole: 'citizen' | 'admin' | 'agency';
  createdAt: string;
};
