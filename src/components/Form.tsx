'use client'
import react, { useState } from 'react';

export const FinancialIndependenceForm = () => {
  // State to manage form inputs
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
  });

  const [total, setTotal] = useState(0);

  // Handle input change
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: parseFloat(value) || 0, // Parse the input as a float, default to 0 if empty
    });
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Sum all the form values
    const sum = Object.values(formValues).reduce((acc, value) => acc + value, 0);

    setTotal(sum);
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Assets</h2>
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
                <label htmlFor="fixedIncome" className="block text-sm font-medium text-gray-700">Fixed Income</label>
                <input
                  type="number"
                  id="fixedIncome"
                  placeholder="Enter amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="securities" className="block text-sm font-medium text-gray-700">Securities</label>
                <input
                  type="number"
                  id="securities"
                  placeholder="Enter amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="fees" className="block text-sm font-medium text-gray-700">Fees</label>
                <input
                  type="number"
                  id="fees"
                  placeholder="Enter percentage or amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Pensions</h3>
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
                <label htmlFor="governmentPension" className="block text-sm font-medium text-gray-700">Government Pension</label>
                <input
                  type="number"
                  id="governmentPension"
                  placeholder="Enter amount"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="businessPension" className="block text-sm font-medium text-gray-700">Business Pension</label>
                <input
                  type="number"
                  id="businessPension"
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
        Calculate Total
      </button>
      {total !== null && (
        <div
          className={`mt-4 text-xl font-bold ${
            total >= 100 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          Total: {total.toFixed(2)}
        </div>
      )}
    </form>
  );
};
