import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Recycle, MapPin, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Scheduling",
      description: "Schedule waste pickups at your convenience"
    },
    {
      icon: MapPin,
      title: "Report Issues",
      description: "Report illegal dumping and missed pickups"
    },
    {
      icon: Recycle,
      title: "Waste Sorting",
      description: "Learn proper recycling and waste sorting"
    },
    {
      icon: BookOpen,
      title: "Education Hub",
      description: "Access sustainability tips and guides"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Smart Waste Management for a{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Cleaner City
              </span>
            </h1>
            
            <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
              Schedule pickups, report issues, learn proper waste sorting, and be part of the solution. 
              Join thousands of residents making our city cleaner and more sustainable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="eco" size="lg" className="text-lg px-8 py-4">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">15K+</div>
                <div className="text-sm text-foreground/60">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-foreground/60">On-Time Pickups</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">2.5M</div>
                <div className="text-sm text-foreground/60">Tons Recycled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Smart Waste Management
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              From scheduling pickups to learning about sustainability, CleanCity provides all the tools 
              you need to manage waste efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;