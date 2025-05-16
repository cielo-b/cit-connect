
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from "@/services/mockData";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-civic-light rounded-xl mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-civic-primary/30 to-transparent z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-civic-dark">
            Your Voice Matters in Your Community
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            Report issues, submit feedback, and help improve public services. 
            Track progress and see how your participation makes a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/submit">
              <Button size="lg" className="bg-civic-primary hover:bg-civic-dark">
                Submit a Complaint
              </Button>
            </Link>
            <Link to="/complaints">
              <Button size="lg" variant="outline" className="border-civic-primary text-civic-primary hover:bg-civic-light">
                Track a Complaint
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 mb-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-civic-dark">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-civic-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-civic-primary">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Submit</h3>
            <p className="text-gray-600">
              Submit your complaint or feedback with details and supporting images.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-civic-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-civic-primary">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Track</h3>
            <p className="text-gray-600">
              Follow the status of your submission through real-time updates.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-civic-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-civic-primary">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Resolve</h3>
            <p className="text-gray-600">
              Get notified when your issue is addressed by the appropriate agency.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-civic-dark">Report Issues By Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockCategories.map(category => (
            <Link key={category.id} to={`/submit?category=${category.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.agency}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="w-full justify-start text-civic-primary">
                    Report Issue →
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
