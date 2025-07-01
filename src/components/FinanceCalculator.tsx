import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";

const FinanceCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [downPayment, setDownPayment] = useState([20]); // Pourcentage
  const [loanTerm, setLoanTerm] = useState([25]); // Ann��es
  const [interestRate, setInterestRate] = useState([7.5]); // Pourcentage annuel
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calcul du crédit immobilier
  useEffect(() => {
    const principal = propertyPrice - (propertyPrice * downPayment[0]) / 100;
    const monthlyRate = interestRate[0] / 100 / 12;
    const numberOfPayments = loanTerm[0] * 12;

    if (principal > 0 && monthlyRate > 0) {
      const monthly =
        (principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const total = monthly * numberOfPayments;
      const interest = total - principal;

      setMonthlyPayment(monthly);
      setTotalInterest(interest);
      setTotalAmount(total);
    }
  }, [propertyPrice, downPayment, loanTerm, interestRate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-brand-blue" />
          Calculateur de Financement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prix de la propriété */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Prix de la propriété ($)
          </Label>
          <Input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="border-gray-200 focus:border-brand-blue"
          />
        </div>

        {/* Apport initial */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Apport initial ({downPayment[0]}%)
          </Label>
          <div className="px-3">
            <Slider
              value={downPayment}
              onValueChange={setDownPayment}
              max={50}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>5%</span>
              <span className="font-medium">
                ${((propertyPrice * downPayment[0]) / 100).toLocaleString()}
              </span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Durée du prêt */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Durée du prêt ({loanTerm[0]} ans)
          </Label>
          <div className="px-3">
            <Slider
              value={loanTerm}
              onValueChange={setLoanTerm}
              max={30}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>5 ans</span>
              <span>30 ans</span>
            </div>
          </div>
        </div>

        {/* Taux d'intérêt */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Taux d'intérêt annuel ({interestRate[0]}%)
          </Label>
          <div className="px-3">
            <Slider
              value={interestRate}
              onValueChange={setInterestRate}
              max={15}
              min={3}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>3%</span>
              <span>15%</span>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="bg-brand-blue/5 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-brand-blue">Résultats du calcul</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded p-3">
              <div className="text-sm text-gray-600">Mensualité</div>
              <div className="text-lg font-bold text-brand-blue">
                $
                {monthlyPayment.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            <div className="bg-white rounded p-3">
              <div className="text-sm text-gray-600">Montant emprunté</div>
              <div className="text-lg font-bold">
                $
                {(
                  propertyPrice -
                  (propertyPrice * downPayment[0]) / 100
                ).toLocaleString()}
              </div>
            </div>

            <div className="bg-white rounded p-3">
              <div className="text-sm text-gray-600">Intérêts totaux</div>
              <div className="text-lg font-bold text-orange-600">
                $
                {totalInterest.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            <div className="bg-white rounded p-3">
              <div className="text-sm text-gray-600">Coût total</div>
              <div className="text-lg font-bold">
                $
                {(
                  totalAmount +
                  (propertyPrice * downPayment[0]) / 100
                ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </div>

        {/* Répartition des coûts */}
        <div className="space-y-3">
          <h4 className="font-medium">Répartition des coûts</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Apport initial</span>
              <span className="font-medium">
                ${((propertyPrice * downPayment[0]) / 100).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Capital emprunté</span>
              <span className="font-medium">
                $
                {(
                  propertyPrice -
                  (propertyPrice * downPayment[0]) / 100
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Intérêts sur {loanTerm[0]} ans</span>
              <span className="font-medium text-orange-600">
                $
                {totalInterest.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>
                $
                {(
                  totalAmount +
                  (propertyPrice * downPayment[0]) / 100
                ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white">
          Demander un Pré-financement
        </Button>
      </CardContent>
    </Card>
  );
};

export default FinanceCalculator;
