
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-civic-dark">About Citizen Connect</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Citizen Connect is dedicated to improving public services through effective 
                citizen engagement. We believe that by creating an open channel for citizens 
                to voice their concerns and provide feedback, we can help government agencies 
                better address community needs and improve service delivery.
              </p>
              <p>
                Our platform bridges the gap between citizens and government, ensuring that 
                complaints are properly tracked, categorized, and directed to the appropriate 
                departments. By promoting transparency and accountability, we aim to foster 
                trust between citizens and their government.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6">
                <li className="flex">
                  <span className="bg-civic-light text-civic-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">1</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Submit a Complaint</h3>
                    <p className="text-gray-600">
                      Citizens can submit detailed complaints or feedback about public services, 
                      including location information and supporting images.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-civic-light text-civic-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">2</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Complaint Routing</h3>
                    <p className="text-gray-600">
                      Our system automatically categorizes and routes complaints to the 
                      appropriate government agency based on the issue type and location.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-civic-light text-civic-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">3</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Status Tracking</h3>
                    <p className="text-gray-600">
                      Citizens can track the status of their submissions in real-time, from 
                      initial review through resolution.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-civic-light text-civic-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">4</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Agency Response</h3>
                    <p className="text-gray-600">
                      Government agencies review, update status, and respond to complaints 
                      through our administrative interface.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <span className="bg-civic-light text-civic-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">5</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Resolution & Feedback</h3>
                    <p className="text-gray-600">
                      Once resolved, citizens can provide feedback on the solution, helping 
                      agencies improve their service delivery.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-civic-primary">support@citizenconnect.gov</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p>(555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p>
                  123 Civic Center Plaza<br />
                  Suite 500<br />
                  Anytown, ST 12345
                </p>
              </div>
              
              <div className="pt-4">
                <Link to="/submit">
                  <Button className="w-full bg-civic-primary hover:bg-civic-dark">
                    Submit a Complaint
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">How quickly will my complaint be addressed?</h3>
                <p className="text-gray-600 text-sm">
                  Response times vary by issue type and severity. Urgent matters are prioritized for faster response.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">Can I submit anonymously?</h3>
                <p className="text-gray-600 text-sm">
                  While you need an account to submit, you can choose to keep your personal information private from public view.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">What issues can I report?</h3>
                <p className="text-gray-600 text-sm">
                  Any concerns related to public services, infrastructure, safety, and community well-being.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">How do I track my complaint?</h3>
                <p className="text-gray-600 text-sm">
                  Login to your account and visit the "My Complaints" section to view all your submissions and their status.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
