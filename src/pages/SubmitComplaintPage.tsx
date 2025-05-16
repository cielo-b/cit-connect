
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCategories } from "@/services/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useComplaints } from "@/contexts/ComplaintsContext";

const SubmitComplaintPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { createComplaint } = useComplaints();
  
  // Parse category from URL if present
  const params = new URLSearchParams(location.search);
  const preselectedCategory = params.get('category') || "";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(preselectedCategory);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated
  if (!currentUser) {
    navigate("/login", { state: { from: location } });
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we would upload the files to a server and get URLs back
    // For this mock, we'll use placeholders
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((_, index) => 
        `https://placehold.co/600x400?text=Uploaded+Image+${images.length + index + 1}`
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    const newComplaint = {
      title,
      description,
      category,
      status: "pending" as const,
      location: address,
      images,
      citizenId: currentUser.id,
    };
    
    createComplaint(newComplaint);
    setIsSubmitting(false);
    navigate("/complaints");
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-civic-dark">Submit a Complaint</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
                <CardDescription>
                  Provide details about your complaint to help us address it effectively.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Complaint Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief title for your complaint"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.agency})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the issue..."
                    className="min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Address or area where the issue is located"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images (Optional)</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">
                    Upload photos of the issue to help us better understand your complaint.
                  </p>
                </div>
                
                {/* Image Preview */}
                {images.length > 0 && (
                  <div>
                    <Label>Uploaded Images</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="rounded-md w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-civic-primary hover:bg-civic-dark" 
                  disabled={isSubmitting || !title || !category || !description || !address}
                >
                  {isSubmitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <div className="shrink-0 text-civic-primary">•</div>
                  <p>Be specific and provide as much detail as possible.</p>
                </li>
                <li className="flex gap-2">
                  <div className="shrink-0 text-civic-primary">•</div>
                  <p>Include clear photos to help explain your issue.</p>
                </li>
                <li className="flex gap-2">
                  <div className="shrink-0 text-civic-primary">•</div>
                  <p>Provide accurate location information for quick response.</p>
                </li>
                <li className="flex gap-2">
                  <div className="shrink-0 text-civic-primary">•</div>
                  <p>Choose the most relevant category for your complaint.</p>
                </li>
                <li className="flex gap-2">
                  <div className="shrink-0 text-civic-primary">•</div>
                  <p>Please avoid submitting duplicate complaints for the same issue.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <div className="shrink-0 font-semibold text-civic-primary">1.</div>
                  <p>Your complaint will be reviewed and assigned to the appropriate department.</p>
                </li>
                <li className="flex gap-2">
                  <div className="shrink-0 font-semibold text-civic-primary">2.</div>
                  <p>You'll receive updates as your complaint progresses.</p>
                </li>
                <li className="flex gap-2">
                  <div className="shrink-0 font-semibold text-civic-primary">3.</div>
                  <p>Agency staff may contact you for additional information if needed.</p>
                </li>
                <li className="flex gap-2">
                  <div className="shrink-0 font-semibold text-civic-primary">4.</div>
                  <p>Once resolved, you can provide feedback on the solution.</p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaintPage;
