import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building,
  Calculator,
  Car,
  CheckCircle2,
  Clock,
  Home,
  Landmark,
  Percent,
  Phone,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trackEvent } from "@/lib/analytics";

const LENDERS = [
  {
    name: "Sheffield BBT",
    icon: Landmark,
    title: "Prequalify Now!",
    description: "Get prequalified with no impact to your credit.*",
    url: "https://prequalify.sheffieldfinancial.com/Apply/Dealer/56712?source=web",
  },
  {
    name: "BLI Heartland",
    icon: Home,
    title: "Rent To Own",
    description: "Helping Golf Cart Customers Achieve Ownership.*",
    url: "https://blirentals.com/app/TIGON_GOLFCARTS_LLC",
  },
  {
    name: "DLL Financial Solutions",
    icon: Building,
    title: "DLL Financial Solutions",
    description: "Get the lowest APR without hidden fees.*",
    url: "https://applynow-cica-prd.dllgroup.com/?entityId=4&dealerCode=015639",
  },
  {
    name: "Roadrunner / Octane",
    icon: Heart,
    title: "Consumer Financing",
    description: "Get Ready To Ride With Consumer Financing.",
    url: "https://octane.co/flex/034170",
  },
  {
    name: "Univest Capital",
    icon: Briefcase,
    title: "Univest Capital",
    description: "Customized a solution for your specific business needs.",
    url: "https://form.jotform.com/UnivestCapital/credit-application-bakos?utm_source=Black+Friday+Golf+Carts&utm_medium=Financing&utm_campaign=Business&utm_term=Best+Golf+Cart+Financing",
  },
  {
    name: "Dealer Direct",
    icon: Car,
    title: "Dealer Direct Financing",
    description: "Buy Now, Pay Later With Dealer Direct Financing.*",
    url: "https://dealerdirect.apptraker.com/my/guest?dealer=10735",
  },
];

export default function Financing() {
  const [cartPrice, setCartPrice] = useState("9500");
  const [downPayment, setDownPayment] = useState("1000");
  const [apr, setApr] = useState("0");
  const [term, setTerm] = useState("48");

  const p = parseFloat(cartPrice) || 0;
  const d = parseFloat(downPayment) || 0;
  const a = parseFloat(apr) || 0;
  const t = parseInt(term) || 48;

  const totalFinanced = Math.max(0, p - d);
  let monthlyPayment = 0;

  if (totalFinanced > 0) {
    if (a === 0) {
      monthlyPayment = totalFinanced / t;
    } else {
      const r = a / 100 / 12;
      monthlyPayment =
        (totalFinanced * (r * Math.pow(1 + r, t))) / (Math.pow(1 + r, t) - 1);
    }
  }

  const totalPaid = monthlyPayment * t;

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-background">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4 md:px-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black uppercase tracking-tight mb-2 relative z-10">
          Golf Cart Financing & Loans
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black uppercase tracking-widest text-primary mb-8 relative z-10">
          — Low Monthly Payments
        </h2>

        <p className="max-w-4xl text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 relative z-10">
          Valentines Golf Carts works with 6 national lending partners to offer
          golf cart financing for every credit profile — from 0% APR on new
          carts to rent-to-own for buyers rebuilding credit. Apply online in
          minutes, get same-day decisions, and drive away in your cart without
          delay.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto max-w-md sm:max-w-none">
          <Button
            size="lg"
            className="h-14 px-8 uppercase font-black tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto ruby-glow"
            asChild
          >
            <a href="tel:+18444562228">
              <Phone className="w-5 h-5 mr-2" />
              Call 1-844-456-2228
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 uppercase font-black tracking-widest border-primary/50 text-primary hover:bg-primary/10 w-full sm:w-auto bg-background/50 "
            asChild
          >
            <a href="#lenders">
              Apply Online <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* 4-Col Highlights */}
      <div className="border-y border-border bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Percent className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm md:text-base uppercase tracking-wider mb-1">
                0% APR Available
              </h4>
              <p className="text-xs text-muted-foreground">
                On qualifying new carts
              </p>
            </div>
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm md:text-base uppercase tracking-wider mb-1">
                Same-Day Approval
              </h4>
              <p className="text-xs text-muted-foreground">
                Decisions in minutes
              </p>
            </div>
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm md:text-base uppercase tracking-wider mb-1">
                6 Lending Partners
              </h4>
              <p className="text-xs text-muted-foreground">
                Sheffield, DLL, Octane & more
              </p>
            </div>
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm md:text-base uppercase tracking-wider mb-1">
                No Hidden Fees
              </h4>
              <p className="text-xs text-muted-foreground">
                Transparent terms always
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lending Partners Grid */}
      <div
        id="lenders"
        className="py-20 md:py-28 container mx-auto px-4 md:px-6 scroll-mt-24"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight mb-4">
            Our Lending Partners
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We partner with 6 trusted lenders covering every credit type — good,
            fair, bad, and no credit history. Click any partner to start your
            application.
          </p>
        </div>

        <div className="bg-card/40 border border-border rounded-xl p-6 md:p-10 shadow-2xl ">
          {/* 4 Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-background/80 border border-border rounded-lg p-5 flex flex-col items-center text-center">
              <div className="text-primary mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h5 className="font-display font-bold text-sm uppercase tracking-wider mb-2">
                Flexible Options
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Multiple financing plans to fit every budget and lifestyle.
              </p>
            </div>
            <div className="bg-background/80 border border-border rounded-lg p-5 flex flex-col items-center text-center">
              <div className="text-primary mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h5 className="font-display font-bold text-sm uppercase tracking-wider mb-2">
                Quick Approval
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fast application process with decisions in minutes.
              </p>
            </div>
            <div className="bg-background/80 border border-border rounded-lg p-5 flex flex-col items-center text-center">
              <div className="text-primary mb-3">
                <Percent className="w-6 h-6" />
              </div>
              <h5 className="font-display font-bold text-sm uppercase tracking-wider mb-2">
                Competitive Rates
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Low monthly payments and competitive interest rates.
              </p>
            </div>
            <div className="bg-background/80 border border-border rounded-lg p-5 flex flex-col items-center text-center">
              <div className="text-primary mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h5 className="font-display font-bold text-sm uppercase tracking-wider mb-2">
                No Hidden Fees
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transparent terms with no surprise charges.
              </p>
            </div>
          </div>

          {/* 6 Lender Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LENDERS.map((lender) => (
              <Card
                key={lender.name}
                className="bg-background border-border overflow-hidden flex flex-col h-full group hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <lender.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-black text-lg uppercase tracking-wider">
                        {lender.name}
                      </h4>
                    </div>
                    <h5 className="font-bold text-lg mb-3 text-foreground">
                      {lender.title}
                    </h5>
                    <p className="text-sm text-muted-foreground mb-8 flex-1">
                      {lender.description}
                    </p>
                    <Button
                      asChild
                      className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground text-primary-foreground border border-border transition-colors group-hover:border-primary h-12 uppercase tracking-widest font-bold"
                    >
                      <a
                        href={lender.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent("financing_partner_clicked", {
                            lender: lender.name,
                            location: "financing_page",
                          })
                        }
                      >
                        Quick Apply <ArrowUpRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="py-20 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight mb-4">
              Estimate Your Monthly Payment
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Adjust the fields below to see your estimated payment for any cart
              at any APR.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-card border border-border rounded-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

            <h4 className="font-display font-black uppercase tracking-wider mb-8 flex items-center gap-3 text-xl">
              <Calculator className="w-6 h-6 text-primary" /> Payment Calculator
            </h4>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="price"
                      className="text-sm uppercase tracking-wider font-bold"
                    >
                      Cart Price
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        $
                      </span>
                      <Input
                        id="price"
                        type="number"
                        className="pl-8 h-14 bg-background text-lg"
                        value={cartPrice}
                        onChange={(e) => setCartPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="downPayment"
                      className="text-sm uppercase tracking-wider font-bold"
                    >
                      Down Payment
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                        $
                      </span>
                      <Input
                        id="downPayment"
                        type="number"
                        className="pl-8 h-14 bg-background text-lg"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="apr"
                    className="text-sm uppercase tracking-wider font-bold"
                  >
                    Annual Interest Rate (%)
                  </Label>
                  <Select value={apr} onValueChange={setApr}>
                    <SelectTrigger
                      id="apr"
                      className="h-14 bg-background text-base"
                    >
                      <SelectValue placeholder="Select APR" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% — Promotional APR</SelectItem>
                      <SelectItem value="5.99">5.99% — Good Credit</SelectItem>
                      <SelectItem value="7.99">
                        7.99% — Standard Rate
                      </SelectItem>
                      <SelectItem value="12.99">
                        12.99% — Fair Credit
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="term"
                    className="text-sm uppercase tracking-wider font-bold"
                  >
                    Loan Term (months)
                  </Label>
                  <Select value={term} onValueChange={setTerm}>
                    <SelectTrigger
                      id="term"
                      className="h-14 bg-background text-base"
                    >
                      <SelectValue placeholder="Select Term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="48">48 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                      <SelectItem value="72">72 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-background border border-primary/20 rounded-xl p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
                <h5 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Estimated Monthly Payment
                </h5>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-6xl md:text-7xl font-display font-black text-foreground">
                    ${formatCurrency(monthlyPayment)}
                  </span>
                  <span className="text-2xl text-muted-foreground">/mo</span>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground mb-10">
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="uppercase tracking-wider">
                      Total financed:
                    </span>
                    <span className="font-mono text-foreground font-bold">
                      ${formatCurrency(totalFinanced)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="uppercase tracking-wider">
                      Total paid:
                    </span>
                    <span className="font-mono text-foreground font-bold">
                      ${formatCurrency(totalPaid)}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-black tracking-widest h-14 text-base ruby-glow mt-auto"
                  asChild
                >
                  <a href="#lenders">Apply Now</a>
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-8 text-center">
              Estimate only. Actual rate and payment depend on credit approval,
              lender, and cart details. 0% APR on qualifying purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="py-20 container mx-auto px-4 md:px-6 mb-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight mb-4">
            Financing Programs at a Glance
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every program available — compare terms, credit requirements, and
            ideal use case.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="border border-border rounded-xl overflow-hidden bg-card shadow-xl">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-secondary">
                  <TableRow className="border-border">
                    <TableHead className="font-bold uppercase tracking-wider h-16 text-foreground">
                      Program
                    </TableHead>
                    <TableHead className="font-bold uppercase tracking-wider h-16 text-foreground whitespace-nowrap">
                      Terms
                    </TableHead>
                    <TableHead className="font-bold uppercase tracking-wider h-16 text-foreground whitespace-nowrap">
                      Credit Required
                    </TableHead>
                    <TableHead className="font-bold uppercase tracking-wider h-16 text-foreground">
                      Best For
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold h-16 flex items-center gap-3">
                      <span className="whitespace-nowrap">
                        0% APR Financing
                      </span>
                      <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] uppercase font-black tracking-widest rounded border border-primary/30 whitespace-nowrap">
                        Best Rate
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      12–60 months
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      Good–Excellent (650+)
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      New carts, lowest total cost
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold h-16 whitespace-nowrap">
                      Standard Installment
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      24–72 months
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      Fair–Good (580+)
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      New & used, flexible monthly
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold h-16 whitespace-nowrap">
                      Rent-to-Own
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      12–48 months
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      All credit types
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      No credit / rebuilding credit
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold h-16 whitespace-nowrap">
                      Business / Commercial
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      24–60 months
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      Business credit
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Fleets, golf courses, resorts
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-bold h-16 whitespace-nowrap">
                      Buy Now, Pay Later
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      Up to 48 months
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      Soft-pull pre-qual
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Fastest approval path
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Credit requirements vary by lender. Call{" "}
            <a
              href="tel:+18444562228"
              className="text-primary hover:underline font-bold"
            >
              1-844-456-2228
            </a>{" "}
            during business hours to discuss available programs.
          </p>
        </div>
      </div>
    </div>
  );
}
