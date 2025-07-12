import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Recycle, Trash2, Leaf, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import wasteSortingImage from "@/assets/waste-sorting.jpg";

const WasteGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Items", icon: Recycle, color: "bg-primary" },
    { id: "recyclable", name: "Recyclable", icon: Recycle, color: "bg-success" },
    { id: "general", name: "General Waste", icon: Trash2, color: "bg-muted" },
    { id: "organic", name: "Organic", icon: Leaf, color: "bg-primary" },
    { id: "hazardous", name: "Hazardous", icon: AlertTriangle, color: "bg-destructive" },
    { id: "electronic", name: "E-Waste", icon: Zap, color: "bg-warning" },
  ];

  const wasteItems = [
    {
      name: "Plastic Bottles",
      category: "recyclable",
      description: "Clean plastic bottles and containers with recycling symbols 1-7",
      tips: ["Remove caps and labels", "Rinse thoroughly", "Check recycling number"],
      binType: "Blue Recycling Bin"
    },
    {
      name: "Food Scraps",
      category: "organic",
      description: "Fruit peels, vegetable scraps, coffee grounds, eggshells",
      tips: ["No meat or dairy", "Use compostable bags", "Keep dry"],
      binType: "Green Organic Bin"
    },
    {
      name: "Newspapers",
      category: "recyclable",
      description: "Newspapers, magazines, office paper, cardboard",
      tips: ["Keep dry", "Remove plastic wrapping", "Flatten cardboard boxes"],
      binType: "Blue Recycling Bin"
    },
    {
      name: "Old Phone",
      category: "electronic",
      description: "Mobile phones, tablets, laptops, and their accessories",
      tips: ["Remove personal data", "Find certified e-waste facility", "Battery removal may be required"],
      binType: "Special E-Waste Collection"
    },
    {
      name: "Paint Cans",
      category: "hazardous",
      description: "Paint, solvents, pesticides, cleaning chemicals",
      tips: ["Never mix chemicals", "Keep in original containers", "Use all product before disposal"],
      binType: "Hazardous Waste Facility"
    },
    {
      name: "Glass Jars",
      category: "recyclable",
      description: "Glass bottles and jars (clear, brown, green)",
      tips: ["Remove lids and rings", "Rinse clean", "No broken glass"],
      binType: "Blue Recycling Bin"
    },
    {
      name: "Diapers",
      category: "general",
      description: "Used diapers, sanitary products, pet waste",
      tips: ["Wrap securely", "Use biodegradable bags when possible"],
      binType: "General Waste Bin"
    },
    {
      name: "Aluminum Cans",
      category: "recyclable",
      description: "Aluminum beverage cans, food containers",
      tips: ["Rinse clean", "Remove labels", "Crush to save space"],
      binType: "Blue Recycling Bin"
    },
  ];

  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Recycle;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "recyclable": return "bg-success text-white";
      case "general": return "bg-muted text-muted-foreground";
      case "organic": return "bg-primary text-white";
      case "hazardous": return "bg-destructive text-white";
      case "electronic": return "bg-warning text-white";
      default: return "bg-primary text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Waste Sorting Guide
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Learn how to properly sort your waste to maximize recycling and minimize environmental impact.
          </p>
          
          <div 
            className="h-64 bg-cover bg-center bg-no-repeat rounded-2xl mb-8 flex items-center justify-center"
            style={{ backgroundImage: `url(${wasteSortingImage})` }}
          >
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-foreground">
                Proper Sorting Matters
              </h3>
              <p className="text-foreground/70">
                Help us achieve 95% recycling efficiency
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                placeholder="Search for an item (e.g., 'plastic bottle', 'battery')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const IconComponent = getCategoryIcon(item.category);
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(item.category)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      {item.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-3">
                      {item.binType}
                    </Badge>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Tips:</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        {item.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2">
                            <span className="text-success mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No items found
            </h3>
            <p className="text-foreground/70">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        )}

        {/* Quick Tips */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Quick Sorting Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Clean Before Recycling
                </h3>
                <p className="text-foreground/70">
                  Rinse containers to remove food residue before placing in recycling bins.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Handle Hazardous Items
                </h3>
                <p className="text-foreground/70">
                  Never throw batteries, chemicals, or electronics in regular bins.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Compost Organic Waste
                </h3>
                <p className="text-foreground/70">
                  Turn food scraps and yard waste into valuable compost for gardens.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteGuide;