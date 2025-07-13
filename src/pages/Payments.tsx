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

const Payments = () => {
  const [currentCycle, setCurrentCycle] = useState<Date>(new Date());
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([]);
  const [totalArrears, setTotalArrears] = useState<number>(0);
  const { toast } = useToast();

  const monthlyFee = 250; // Monthly fee in Kenyan Shillings (KES)

  // Initialize payment records for the last 12 months
  useEffect(() => {
    const records: PaymentRecord[] = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const dueDate = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Last day of month
      
      records.push({
        month: date.toLocaleDateString('en-US', { month: 'long' }),
        year: date.getFullYear(),
        paid: Math.random() > 0.3, // Random initial state for demo
        dueDate: dueDate,
        amount: monthlyFee
      });
    }
    
    // Load from localStorage if available
    const saved = localStorage.getItem('cleanCityPayments');
    if (saved) {
      const savedRecords = JSON.parse(saved);
      // Convert dueDate strings back to Date objects
      const recordsWithDates = savedRecords.map((record: any) => ({
        ...record,
        dueDate: new Date(record.dueDate)
      }));
      setPaymentRecords(recordsWithDates);
    } else {
      setPaymentRecords(records);
      localStorage.setItem('cleanCityPayments', JSON.stringify(records));
    }
  }, []);

  // Calculate arrears
  useEffect(() => {
    const unpaidRecords = paymentRecords.filter(record => !record.paid && new Date(record.dueDate) < new Date());
    const arrears = unpaidRecords.reduce((sum, record) => sum + record.amount, 0);
    setTotalArrears(arrears);
  }, [paymentRecords]);

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

  const togglePaymentStatus = (index: number) => {
    const updatedRecords = [...paymentRecords];
    updatedRecords[index].paid = !updatedRecords[index].paid;
    setPaymentRecords(updatedRecords);
    localStorage.setItem('cleanCityPayments', JSON.stringify(updatedRecords));
    
    toast({
      title: updatedRecords[index].paid ? "Payment Marked as Paid" : "Payment Marked as Unpaid",
      description: `${updatedRecords[index].month} ${updatedRecords[index].year} - KES ${updatedRecords[index].amount}`,
    });
  };

  const getCurrentMonthRecord = () => {
    const now = new Date();
    return paymentRecords.find(record => 
      record.month === now.toLocaleDateString('en-US', { month: 'long' }) && 
      record.year === now.getFullYear()
    );
  };

  const currentRecord = getCurrentMonthRecord();

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
                {currentRecord && (
                  <div className="flex items-center justify-center gap-2">
                    <Checkbox
                      id="current-payment"
                      checked={currentRecord.paid}
                      onCheckedChange={() => {
                        const index = paymentRecords.findIndex(r => r === currentRecord);
                        if (index !== -1) togglePaymentStatus(index);
                      }}
                    />
                    <label htmlFor="current-payment" className="text-sm font-medium">
                      Payment Made (KES {currentRecord.amount})
                    </label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Total Arrears */}
          <Card className={totalArrears > 0 ? "border-destructive/50 bg-destructive/5" : "border-green-500/50 bg-green-500/5"}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className={`h-5 w-5 ${totalArrears > 0 ? "text-destructive" : "text-green-600"}`} />
                Total Arrears
              </CardTitle>
              <CardDescription>Accumulated unpaid amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${totalArrears > 0 ? "text-destructive" : "text-green-600"}`}>
                  KES {totalArrears.toLocaleString()}
                </div>
                <Badge variant={totalArrears > 0 ? "destructive" : "default"} className="text-xs">
                  {totalArrears > 0 ? `${paymentRecords.filter(r => !r.paid && new Date(r.dueDate) < new Date()).length} overdue payments` : "All payments up to date"}
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

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Last 12 months payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentRecords.map((record, index) => {
                const isOverdue = !record.paid && new Date(record.dueDate) < new Date();
                const isCurrent = record.month === new Date().toLocaleDateString('en-US', { month: 'long' }) && 
                                 record.year === new Date().getFullYear();
                
                return (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                    isOverdue ? 'border-destructive/50 bg-destructive/5' : 
                    isCurrent ? 'border-primary/50 bg-primary/5' :
                    'border-border'
                  }`}>
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={record.paid}
                        onCheckedChange={() => togglePaymentStatus(index)}
                      />
                      <div>
                        <div className="font-medium">
                          {record.month} {record.year}
                          {isCurrent && <Badge variant="outline" className="ml-2">Current</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Due: {record.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">KES {record.amount}</div>
                        <Badge 
                          variant={record.paid ? "default" : isOverdue ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {record.paid ? "Paid" : isOverdue ? "Overdue" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;