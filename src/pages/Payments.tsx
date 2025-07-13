import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentRecord {
  month: string;
  year: number;
  paid: boolean;
  dueDate: Date;
  amount: number;
}

interface Customer {
  id: string;
  name: string;
  apartmentNumber: string;
  houseNumber?: string;
  paymentRecords: PaymentRecord[];
}

const Payments = () => {
  const [currentCycle, setCurrentCycle] = useState<Date>(new Date());
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { toast } = useToast();

  const monthlyFee = 250; // Monthly fee in Kenyan Shillings (KES)

  // Sample customer data
  const sampleCustomers: Customer[] = [
    {
      id: "1",
      name: "John Kamau",
      apartmentNumber: "A-101",
      houseNumber: "Block A",
      paymentRecords: []
    },
    {
      id: "2", 
      name: "Mary Wanjiku",
      apartmentNumber: "B-205",
      houseNumber: "Block B",
      paymentRecords: []
    },
    {
      id: "3",
      name: "Peter Ochieng",
      apartmentNumber: "C-302",
      houseNumber: "Block C", 
      paymentRecords: []
    },
    {
      id: "4",
      name: "Grace Nyambura",
      apartmentNumber: "A-204",
      houseNumber: "Block A",
      paymentRecords: []
    },
    {
      id: "5",
      name: "David Mutua",
      apartmentNumber: "B-108",
      houseNumber: "Block B",
      paymentRecords: []
    }
  ];

  // Generate payment records for each customer
  const generatePaymentRecords = (customerId: string): PaymentRecord[] => {
    const records: PaymentRecord[] = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const dueDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      records.push({
        month: date.toLocaleDateString('en-US', { month: 'long' }),
        year: date.getFullYear(),
        paid: Math.random() > 0.4, // Random payment status for demo
        dueDate: dueDate,
        amount: monthlyFee
      });
    }
    
    return records;
  };

  // Initialize customers and their payment records
  useEffect(() => {
    const saved = localStorage.getItem('cleanCityCustomers');
    if (saved) {
      const savedCustomers = JSON.parse(saved);
      // Convert dueDate strings back to Date objects
      const customersWithDates = savedCustomers.map((customer: any) => ({
        ...customer,
        paymentRecords: customer.paymentRecords.map((record: any) => ({
          ...record,
          dueDate: new Date(record.dueDate)
        }))
      }));
      setCustomers(customersWithDates);
    } else {
      const customersWithRecords = sampleCustomers.map(customer => ({
        ...customer,
        paymentRecords: generatePaymentRecords(customer.id)
      }));
      setCustomers(customersWithRecords);
      localStorage.setItem('cleanCityCustomers', JSON.stringify(customersWithRecords));
    }
  }, []);

  // Calculate total arrears for all customers
  const getTotalArrears = () => {
    let total = 0;
    customers.forEach(customer => {
      const unpaidRecords = customer.paymentRecords.filter(
        record => !record.paid && new Date(record.dueDate) < new Date()
      );
      total += unpaidRecords.reduce((sum, record) => sum + record.amount, 0);
    });
    return total;
  };

  // Get customer arrears
  const getCustomerArrears = (customer: Customer) => {
    const unpaidRecords = customer.paymentRecords.filter(
      record => !record.paid && new Date(record.dueDate) < new Date()
    );
    return unpaidRecords.reduce((sum, record) => sum + record.amount, 0);
  };

  // Timer for current month
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const timeDiff = endOfMonth.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Month ended");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const togglePaymentStatus = (customerId: string, recordIndex: number) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        const updatedRecords = [...customer.paymentRecords];
        updatedRecords[recordIndex].paid = !updatedRecords[recordIndex].paid;
        return { ...customer, paymentRecords: updatedRecords };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    localStorage.setItem('cleanCityCustomers', JSON.stringify(updatedCustomers));
    
    const customer = updatedCustomers.find(c => c.id === customerId);
    const record = customer?.paymentRecords[recordIndex];
    
    if (record) {
      toast({
        title: record.paid ? "Payment Marked as Paid" : "Payment Marked as Unpaid",
        description: `${customer?.name} - ${record.month} ${record.year} - KES ${record.amount}`,
      });
    }
  };

  const getCurrentMonthRecord = (customer: Customer) => {
    const now = new Date();
    return customer.paymentRecords.find(record => 
      record.month === now.toLocaleDateString('en-US', { month: 'long' }) && 
      record.year === now.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <DollarSign className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment Tracking</h1>
            <p className="text-muted-foreground">Monitor your monthly waste management payments and arrears</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Month Timer */}
          <Card className="border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Current Month Timer
              </CardTitle>
              <CardDescription>Time left until payment due</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-primary mb-2">
                  {timeLeft}
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Arrears */}
          <Card className={getTotalArrears() > 0 ? "border-destructive/50 bg-destructive/5" : "border-green-500/50 bg-green-500/5"}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className={`h-5 w-5 ${getTotalArrears() > 0 ? "text-destructive" : "text-green-600"}`} />
                Total Arrears
              </CardTitle>
              <CardDescription>Accumulated unpaid amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${getTotalArrears() > 0 ? "text-destructive" : "text-green-600"}`}>
                  KES {getTotalArrears().toLocaleString()}
                </div>
                <Badge variant={getTotalArrears() > 0 ? "destructive" : "default"} className="text-xs">
                  {getTotalArrears() > 0 ? `${customers.reduce((total, customer) => {
                    const overdue = customer.paymentRecords.filter(r => !r.paid && new Date(r.dueDate) < new Date());
                    return total + overdue.length;
                  }, 0)} overdue payments` : "All payments up to date"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Fee */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Monthly Fee
              </CardTitle>
              <CardDescription>Standard service charge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">
                  KES {monthlyFee}
                </div>
                <div className="text-sm text-muted-foreground">
                  Waste management service
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Payment Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {customers.map((customer) => {
            const currentRecord = getCurrentMonthRecord(customer);
            const arrears = getCustomerArrears(customer);
            const isCurrentPaid = currentRecord?.paid || false;
            
            return (
              <Card key={customer.id} className={`${
                arrears > 0 ? 'border-destructive/50 bg-destructive/5' : 
                isCurrentPaid ? 'border-green-500/50 bg-green-500/5' : 
                'border-orange-500/50 bg-orange-500/5'
              }`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                  <CardDescription>
                    {customer.apartmentNumber} • {customer.houseNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Month:</span>
                      <Badge variant={isCurrentPaid ? "default" : "secondary"}>
                        {isCurrentPaid ? "Paid" : "Pending"}
                      </Badge>
                    </div>
                    
                    {arrears > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Arrears:</span>
                        <Badge variant="destructive">
                          KES {arrears.toLocaleString()}
                        </Badge>
                      </div>
                    )}
                    
                    {currentRecord && (
                      <div className="flex items-center gap-2 pt-2">
                        <Checkbox
                          checked={isCurrentPaid}
                          onCheckedChange={() => {
                            const recordIndex = customer.paymentRecords.findIndex(r => r === currentRecord);
                            if (recordIndex !== -1) {
                              togglePaymentStatus(customer.id, recordIndex);
                            }
                          }}
                        />
                        <label className="text-xs text-muted-foreground">
                          Mark current month as paid
                        </label>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Payment History</CardTitle>
            <CardDescription>Payment records for all customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {customers.map((customer) => (
                <div key={customer.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {customer.apartmentNumber} • {customer.houseNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Arrears</div>
                      <div className={`font-bold ${getCustomerArrears(customer) > 0 ? 'text-destructive' : 'text-green-600'}`}>
                        KES {getCustomerArrears(customer).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {customer.paymentRecords.slice(-6).map((record, index) => {
                      const isOverdue = !record.paid && new Date(record.dueDate) < new Date();
                      const isCurrent = record.month === new Date().toLocaleDateString('en-US', { month: 'long' }) && 
                                       record.year === new Date().getFullYear();
                      
                      return (
                        <div key={index} className={`p-2 rounded border text-center ${
                          isOverdue ? 'border-destructive/50 bg-destructive/10' : 
                          isCurrent ? 'border-primary/50 bg-primary/10' :
                          record.paid ? 'border-green-500/50 bg-green-500/10' :
                          'border-border'
                        }`}>
                          <div className="text-xs font-medium">
                            {record.month.slice(0, 3)} {record.year}
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <Checkbox
                              checked={record.paid}
                              onCheckedChange={() => {
                                const recordIndex = customer.paymentRecords.findIndex(r => r === record);
                                togglePaymentStatus(customer.id, recordIndex);
                              }}
                              className="h-3 w-3"
                            />
                            <Badge 
                              variant={record.paid ? "default" : isOverdue ? "destructive" : "secondary"}
                              className="text-xs px-1 py-0"
                            >
                              {record.paid ? "✓" : isOverdue ? "!" : "?"}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;