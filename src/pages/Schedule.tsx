import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Trash2, Recycle, Leaf, Zap, Package, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedWasteType, setSelectedWasteType] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();

  const wasteTypes = [
    { 
      id: "general", 
      name: "General Waste", 
      icon: Trash2, 
      color: "bg-muted text-muted-foreground",
      description: "Non-recyclable household waste"
    },
    { 
      id: "recycling", 
      name: "Recycling", 
      icon: Recycle, 
      color: "bg-success text-white",
      description: "Paper, plastic, glass, and metal"
    },
    { 
      id: "organic", 
      name: "Organic Waste", 
      icon: Leaf, 
      color: "bg-primary text-white",
      description: "Food scraps and garden waste"
    },
    { 
      id: "electronic", 
      name: "E-Waste", 
      icon: Zap, 
      color: "bg-warning text-white",
      description: "Electronic devices and components"
    },
    { 
      id: "bulk", 
      name: "Bulk Items", 
      icon: Package, 
      color: "bg-info text-white",
      description: "Furniture and large appliances"
    },
  ];

  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedWasteType || !selectedTime || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pickup Scheduled Successfully!",
      description: `Your ${wasteTypes.find(w => w.id === selectedWasteType)?.name} pickup has been scheduled for ${format(selectedDate, "PPP")} between ${selectedTime}.`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedWasteType("");
    setSelectedTime("");
    setAddress("");
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Schedule a Pickup
          </h1>
          <p className="text-foreground/70">
            Request a waste collection service for your location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pickup Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Pickup Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Waste Type Selection */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What type of waste do you need picked up? *
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wasteTypes.map((type) => (
                        <div
                          key={type.id}
                          className={cn(
                            "p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
                            selectedWasteType === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => setSelectedWasteType(type.id)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", type.color)}>
                              <type.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-medium text-foreground">{type.name}</h3>
                          </div>
                          <p className="text-sm text-foreground/60">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <Label htmlFor="date" className="text-base font-medium">
                      Preferred Date *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) =>
                            date < new Date() || date.getDay() === 0 // Disable past dates and Sundays
                          }
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label htmlFor="time" className="text-base font-medium">
                      Preferred Time *
                    </Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address" className="text-base font-medium">
                      Pickup Address *
                    </Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full address"
                      className="mt-2"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-base font-medium">
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special instructions or additional information..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" variant="eco" size="lg" className="w-full">
                    Schedule Pickup
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pickup Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Operating Hours</h4>
                  <p className="text-sm text-foreground/70">
                    Monday - Saturday: 8:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Response Time</h4>
                  <p className="text-sm text-foreground/70">
                    Most pickups are scheduled within 24-48 hours of request.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Preparation Tips</h4>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Separate waste by type</li>
                    <li>• Use proper containers</li>
                    <li>• Place items at curb by 7:00 AM</li>
                    <li>• Check weight limits for bulk items</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Emergency Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-4">
                  Need immediate pickup for hazardous materials or emergency situations?
                </p>
                <Button variant="outline" className="w-full">
                  Contact Emergency Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;