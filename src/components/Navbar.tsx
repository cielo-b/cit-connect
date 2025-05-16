
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-civic-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 2L3 7V17L12 22L21 17V7L12 2Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M12 22V16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M12 12L3 7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M12 12L21 7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          <Link to="/" className="text-xl font-bold">Citizen Connect</Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-civic-light">Home</Link>
          <Link to="/complaints" className="hover:text-civic-light">Complaints</Link>
          <Link to="/submit" className="hover:text-civic-light">Submit Complaint</Link>
          <Link to="/about" className="hover:text-civic-light">About</Link>
        </div>

        <div className="flex items-center space-x-3">
          {currentUser ? (
            <>
              <span className="hidden md:inline">Hello, {currentUser.name}</span>
              {currentUser.role !== "citizen" && (
                <Link to="/admin">
                  <Button variant="secondary" className="bg-civic-dark text-white hover:bg-civic-primary">
                    Admin
                  </Button>
                </Link>
              )}
              <Button variant="outline" className="bg-white text-civic-primary hover:bg-civic-light" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="bg-white text-civic-primary hover:bg-civic-light">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-civic-secondary text-white hover:bg-green-600">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
