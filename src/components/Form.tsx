'use client'
import React, { useState } from 'react';

// Withdrawal rate table with percentage chances
const withdrawalRates = {
  '100': [
    [3.00, 100], [3.25, 100], [3.50, 100], [3.75, 99], [4.00, 97], [4.25, 94], [4.50, 91], [4.75, 86], [5.00, 82]
  ],
  '75': [
    [3.00, 100], [3.25, 100], [3.50, 100], [3.75, 100], [4.00, 99], [4.25, 95], [4.50, 90], [4.75, 84], [5.00, 80]
  ],
  '50': [
    [3.00, 100], [3.25, 100], [3.50, 100], [3.75, 100], [4.00, 95], [4.25, 91], [4.50, 85], [4.75, 77], [5.00, 70]
  ],
  '25': [
    [3.00, 100], [3.25, 100], [3.50, 98], [3.75, 93], [4.00, 86], [4.25, 76], [4.50, 65], [4.75, 59], [5.00, 51]
  ],
  '0': [
    [3.00, 89], [3.25, 80], [3.50, 68], [3.75, 61], [4.00, 54], [4.25, 50], [4.50, 45], [4.75, 40], [5.00, 34]
  ]
};

export const FinancialIndependenceForm = () => {
  const [formValues, setFormValues] = useState({
    savings: 0,
    bonds: 0,
    fixedIncome: 0,
    securities: 0,
    fees: 0,
    socialSecurity: 0,
    governmentPension: 0,
    businessPension: 0,
    housingCosts: 0,
    foodGasEntertainment: 0,
    investmentDuration: 40, // Default to 40 years
  });

  const [result, setResult] = useState<any>(null);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: parseFloat(value) || 0,
    });
  };

  let warning;

  const findMaxTargetWithdrawalRate = (stockProportion: any) => {
    const rates = withdrawalRates[stockProportion as keyof typeof withdrawalRates];
    for (let i = rates.length - 1; i >= 0; i--) {
      if (rates[i][1] > 95) {
        return rates[i][0];
      }
    }
    return 2; // If no rate is found with >95% success
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 1. Calculate total fixed investments (pensions)
    const totalPensions = formValues.socialSecurity + formValues.governmentPension + formValues.businessPension;

    // 2. Calculate total expenses
    const totalExpenses = formValues.housingCosts + formValues.foodGasEntertainment;

    // 3. Calculate net expenses (expenses minus pensions)
    const netExpenses = totalExpenses - totalPensions;

    // 4. Calculate total assets
    const totalAssets = formValues.savings + formValues.bonds + formValues.fixedIncome + formValues.securities;

    // 5. Determine stock proportion (assuming securities are stocks)
    const stockProportion = (Math.round(((formValues.securities / totalAssets) | 0) * 100 / 25) * 25).toString();

    // 6. Calculate withdrawal rate
    const withdrawalRate = (netExpenses / totalAssets) * 100;

    // 7. Find the closest withdrawal rate and its corresponding percentage
    const rateRow = withdrawalRates[stockProportion as keyof typeof withdrawalRates].reduce((prev, curr) => 
      Math.abs(curr[0] - withdrawalRate) < Math.abs(prev[0] - withdrawalRate) ? curr : prev
    );

    const safeWithdrawalPercentage = rateRow[1];

    // 8. Determine if financially independent (using 90% as a safe threshold)
    const isFinanciallyIndependent = safeWithdrawalPercentage >= 90;

    // 9. Find max target withdrawal rate
    const maxTargetWithdrawalRatePercent = findMaxTargetWithdrawalRate(stockProportion.toString());
    const maxTargetWithdrawalRate = maxTargetWithdrawalRatePercent*totalAssets/100

    // 10. Generate message
    let message;
    if (safeWithdrawalPercentage >= 90) {
      message = "This withdrawal rate is considered safe.";
    } else if (safeWithdrawalPercentage >= 75) {
      message = "This withdrawal rate has some risk, but may be acceptable.";
    } else {
      message = "This withdrawal rate is too dangerous and not recommended.";
    }

    setResult({
      totalAssets,
      netExpenses,
      withdrawalRate,
      safeWithdrawalPercentage,
      isFinanciallyIndependent,
      message,
      maxTargetWithdrawalRate
    });
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Assets (Total)</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="savings" className="block text-sm font-medium text-gray-700">Savings Accounts</label>
            <input
              type="number"
              id="savings"
              placeholder="Enter amount"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="bonds" className="block text-sm font-medium text-gray-700">Bonds</label>
            <input
              type="number"
              id="bonds"
              placeholder="Enter amount"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Investments</h3>
            <div className="space-y-2">
              <div>
                <label htmlFor="securities" className="block text-sm font-medium text-gray-700">Securities/Stocks/Index Funds</label>
                <input
                  type="number"
                  id="securities"
                  placeholder="Enter amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Pensions (per month)</h3>
            <div className="space-y-2">
              <div>
                <label htmlFor="socialSecurity" className="block text-sm font-medium text-gray-700">Social Security</label>
                <input
                  type="number"
                  id="socialSecurity"
                  placeholder="Enter amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="pension" className="block text-sm font-medium text-gray-700">Pension (if multiple, please add all of them together)</label>
                <input
                  type="number"
                  id="pension"
                  placeholder="Enter amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="annuities" className="block text-sm font-medium text-gray-700">Annuities</label>
                <input
                  type="number"
                  id="annuities"
                  placeholder="Enter amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inflationAdjustment"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="inflationAdjustment" className="ml-2 block text-sm text-gray-900">Inflation Adjustment</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="housingCosts" className="block text-sm font-medium text-gray-700">Housing Costs</label>
            <input
              type="number"
              id="housingCosts"
              placeholder="Enter amount"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-500 mt-1">Include: Mortgage/Rent, Electricity, Taxes, etc.</p>
          </div>
          <div>
            <label htmlFor="foodGasEntertainment" className="block text-sm font-medium text-gray-700">Food/Gas/Entertainment</label>
            <input
              type="number"
              id="foodGasEntertainment"
              placeholder="Enter amount"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
      >
        Calculate
      </button>
      
      {result && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Results</h3>
          <p>Total Assets: ${result.totalAssets.toFixed(2)}</p>
          <p>Net Annual Expenses: ${result.netExpenses.toFixed(2)}</p>
          <p>Current Withdrawal Rate: {result.withdrawalRate.toFixed(2)}%</p>
          <p>Safe Withdrawal Percentage: {result.safeWithdrawalPercentage}%</p>
          <p className={result.isFinanciallyIndependent ? 'text-green-500' : 'text-red-500'}>
            {result.isFinanciallyIndependent 
              ? 'You are financially independent!' 
              : 'You are not yet financially independent.'}
          </p>
          <p className="font-bold mt-2">{result.message}</p>
          {result.maxTargetWithdrawalRate && (
            <p className="mt-2">
              Maximum Target Withdrawal Rate ({'>'}95% success rate): ${result.maxTargetWithdrawalRate}
            </p>
          )}
        </div>
      )}
    </form>
  );
};
