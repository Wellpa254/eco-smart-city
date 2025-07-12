import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Recycle, AlertTriangle, TrendingUp, Clock, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Dashboard = () => {
  const upcomingPickups = [
    { id: 1, type: "General Waste", date: "Tomorrow", time: "9:00 AM", status: "scheduled" },
    { id: 2, type: "Recycling", date: "Friday", time: "2:00 PM", status: "confirmed" },
    { id: 3, type: "Organic Waste", date: "Monday", time: "8:00 AM", status: "pending" },
  ];

  const recentReports = [
    { id: 1, type: "Missed Pickup", location: "Main St & 5th Ave", status: "resolved", date: "2 days ago" },
    { id: 2, type: "Illegal Dumping", location: "Park Avenue", status: "investigating", date: "1 week ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-info text-white";
      case "confirmed": return "bg-success text-white";
      case "pending": return "bg-warning text-white";
      case "resolved": return "bg-success text-white";
      case "investigating": return "bg-warning text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John!
          </h1>
          <p className="text-foreground/70">
            Here's what's happening with your waste management today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">Next Pickup</p>
                  <p className="text-2xl font-bold text-foreground">Tomorrow</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">Recycling Rate</p>
                  <p className="text-2xl font-bold text-foreground">84%</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Recycle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">Reports Filed</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60">Impact Score</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Pickups */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Pickups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPickups.map((pickup) => (
                  <div key={pickup.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{pickup.type}</p>
                        <p className="text-sm text-foreground/60">{pickup.date} at {pickup.time}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(pickup.status)}>
                      {pickup.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Schedule New Pickup
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.type}</p>
                        <p className="text-sm text-foreground/60">{report.location}</p>
                        <p className="text-xs text-foreground/50">{report.date}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Report New Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="h-48 bg-cover bg-center bg-no-repeat rounded-lg flex items-center justify-center"
              style={{ backgroundImage: `url(${dashboardPreview})` }}
            >
              <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Your Contribution This Month
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">125kg</div>
                    <div className="text-sm text-foreground/60">Recycled</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">89%</div>
                    <div className="text-sm text-foreground/60">Proper Sorting</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-info">12</div>
                    <div className="text-sm text-foreground/60">Trees Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;