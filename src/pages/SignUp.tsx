import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Building, Home, MapPin, Mail, Phone, User } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    wasteTypes: [],
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent, customerType: string) => {
    e.preventDefault();
    
    // Store signup data (in real app, this would go to backend)
    const signupData = {
      ...formData,
      customerType,
      signupDate: new Date().toISOString()
    };
    
    localStorage.setItem('pendingSignup', JSON.stringify(signupData));
    
    toast({
      title: "Registration Submitted!",
      description: "We'll contact you within 24 hours to confirm your service.",
    });
    
    navigate('/');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join CleanCity Waste Collection
            </h1>
            <p className="text-xl text-muted-foreground">
              Professional waste collection services for apartments and businesses
            </p>
          </div>

          <Tabs defaultValue="apartment" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="apartment" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Apartment Owners
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Businesses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="apartment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    Apartment Waste Collection Service
                  </CardTitle>
                  <CardDescription>
                    Convenient waste collection for apartment buildings and residential complexes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, 'apartment')} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Building Name / Your Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Enter building or contact name"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="Your phone number"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="service-type">Collection Frequency</Label>
                        <Select onValueChange={(value) => updateFormData('serviceType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily Collection</SelectItem>
                            <SelectItem value="alternate">Alternate Days</SelectItem>
                            <SelectItem value="weekly">Weekly Collection</SelectItem>
                            <SelectItem value="bi-weekly">Bi-Weekly Collection</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Building Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          placeholder="Complete building address with landmarks"
                          className="pl-10"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Requirements</Label>
                      <Textarea
                        id="notes"
                        placeholder="Number of units, special requirements, access instructions, etc."
                        value={formData.notes}
                        onChange={(e) => updateFormData('notes', e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Register for Apartment Collection Service
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Business Waste Collection Service
                  </CardTitle>
                  <CardDescription>
                    Professional waste management solutions for businesses of all sizes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, 'business')} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="business-name">Business Name</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="business-name"
                            placeholder="Your business name"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="business-email">Business Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="business-email"
                            type="email"
                            placeholder="business@example.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="business-phone">Contact Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="business-phone"
                            placeholder="Business phone number"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="business-type">Business Type</Label>
                        <Select onValueChange={(value) => updateFormData('serviceType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                            <SelectItem value="office">Office Building</SelectItem>
                            <SelectItem value="retail">Retail Store</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                            <SelectItem value="hotel">Hotel/Hospitality</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="business-address">Business Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="business-address"
                          placeholder="Complete business address with access details"
                          className="pl-10"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="business-notes">Waste Details & Requirements</Label>
                      <Textarea
                        id="business-notes"
                        placeholder="Types of waste generated, estimated volume, special handling requirements, preferred collection times, etc."
                        value={formData.notes}
                        onChange={(e) => updateFormData('notes', e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Register for Business Collection Service
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• We'll review your application within 24 hours</li>
              <li>• Our team will contact you to discuss pricing and schedule</li>
              <li>• We'll arrange a site visit if needed</li>
              <li>• Service begins once agreement is finalized</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;