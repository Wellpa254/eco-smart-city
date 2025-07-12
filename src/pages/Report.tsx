import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Camera, Clock, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("");
  const { toast } = useToast();

  const issueTypes = [
    { id: "missed-pickup", name: "Missed Pickup", icon: Clock, color: "bg-warning" },
    { id: "illegal-dumping", name: "Illegal Dumping", icon: AlertTriangle, color: "bg-destructive" },
    { id: "overflowing-bin", name: "Overflowing Bin", icon: AlertTriangle, color: "bg-warning" },
    { id: "damaged-bin", name: "Damaged Bin", icon: AlertTriangle, color: "bg-info" },
    { id: "blocked-access", name: "Blocked Access", icon: MapPin, color: "bg-muted" },
  ];

  const urgencyLevels = [
    { value: "low", label: "Low Priority", color: "bg-success" },
    { value: "medium", label: "Medium Priority", color: "bg-warning" },
    { value: "high", label: "High Priority", color: "bg-destructive" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueType || !location || !description || !urgency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Submitted Successfully!",
      description: "We've received your report and will investigate within 24 hours.",
    });

    // Reset form
    setIssueType("");
    setLocation("");
    setDescription("");
    setUrgency("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Report an Issue
          </h1>
          <p className="text-foreground/70">
            Help us keep the city clean by reporting waste management issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Issue Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Issue Type */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What type of issue are you reporting? *
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {issueTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                            issueType === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setIssueType(type.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center text-white`}>
                              <type.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium text-foreground">{type.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location" className="text-base font-medium">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter address or landmark"
                      className="mt-2"
                    />
                    <p className="text-sm text-foreground/60 mt-1">
                      Be as specific as possible (e.g., "Corner of Main St & 5th Ave")
                    </p>
                  </div>

                  {/* Urgency */}
                  <div>
                    <Label htmlFor="urgency" className="text-base font-medium">
                      Priority Level *
                    </Label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`} />
                              {level.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-base font-medium">
                      Detailed Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  {/* Photo Upload Placeholder */}
                  <div>
                    <Label className="text-base font-medium">
                      Photos (Optional)
                    </Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
                      <p className="text-foreground/60 mb-2">Upload photos to help us understand the issue</p>
                      <Button variant="outline">
                        Select Photos
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" variant="eco" size="lg" className="w-full">
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-destructive text-white">High</Badge>
                  <span className="text-sm text-foreground/70">2-4 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-warning text-white">Medium</Badge>
                  <span className="text-sm text-foreground/70">24-48 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-success text-white">Low</Badge>
                  <span className="text-sm text-foreground/70">3-5 days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-4">
                  For immediate health or safety hazards:
                </p>
                <Button variant="destructive" className="w-full mb-2">
                  Call Emergency Line
                </Button>
                <p className="text-xs text-foreground/50 text-center">
                  Available 24/7
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Overflowing bin</p>
                      <p className="text-foreground/60">Park Avenue - Resolved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Clock className="h-4 w-4 text-warning" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Missed pickup</p>
                      <p className="text-foreground/60">5th Street - In Progress</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;