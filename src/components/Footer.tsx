
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-civic-primary">Citizen Connect</h3>
            <p className="text-gray-600 text-sm">
              A platform connecting citizens with their local government to improve public services through feedback and collaboration.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-civic-primary">Home</Link>
              </li>
              <li>
                <Link to="/complaints" className="text-gray-600 hover:text-civic-primary">Complaints</Link>
              </li>
              <li>
                <Link to="/submit" className="text-gray-600 hover:text-civic-primary">Submit Complaint</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-civic-primary">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/submit?category=1" className="text-gray-600 hover:text-civic-primary">Roads & Infrastructure</Link></li>
              <li><Link to="/submit?category=2" className="text-gray-600 hover:text-civic-primary">Water Supply</Link></li>
              <li><Link to="/submit?category=3" className="text-gray-600 hover:text-civic-primary">Electricity</Link></li>
              <li><Link to="/submit?category=4" className="text-gray-600 hover:text-civic-primary">Public Transportation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: support@citizenconnect.gov</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
              <li className="text-gray-600">Hours: Mon-Fri 9AM-5PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2023 Citizen Connect. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-600 text-sm hover:text-civic-primary">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-600 text-sm hover:text-civic-primary">Privacy Policy</Link>
            <Link to="/accessibility" className="text-gray-600 text-sm hover:text-civic-primary">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
