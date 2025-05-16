
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-7xl font-bold text-civic-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="space-x-4">
          <Link to="/">
            <Button className="bg-civic-primary hover:bg-civic-dark">
              Back to Home
            </Button>
          </Link>
          <Link to="/submit">
            <Button variant="outline">
              Submit a Complaint
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
