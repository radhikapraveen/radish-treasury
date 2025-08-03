import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function FXDashboard() {
  const [rates, setRates] = useState(null);
  const [exposures, setExposures] = useState({
    USD: 500000,
    INR: 300000,
    GBP: 400000,
    EUR: 200000
  });

  useEffect(() => {
    axios.get('http://localhost:8000/fx?base=USD')
      .then(res => setRates(res.data));
  }, []);

  if (!rates) return <div>Loading FX rates...</div>;

  const chartData = {
    labels: Object.keys(rates),
    datasets: [{
      label: 'FX Rate (vs USD)',
      data: Object.values(rates),
      backgroundColor: ['#4ade80', '#60a5fa', '#f472b6', '#facc15'],
    }]
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">FX Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Live FX Rates</h3>
          <table className="table-auto border w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Currency</th>
                <th className="border px-4 py-2">Rate (vs USD)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates).map(([currency, rate]) => (
                <tr key={currency}>
                  <td className="border px-4 py-2">{currency}</td>
                  <td className="border px-4 py-2">{rate.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">FX Rate Chart</h3>
          <Bar data={chartData} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">FX Exposure & Hedging Strategy</h3>
        <table className="table-auto border w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Currency</th>
              <th className="border px-4 py-2">Exposure</th>
              <th className="border px-4 py-2">Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(exposures).map(([currency, exposure]) => (
              <tr key={currency}>
                <td className="border px-4 py-2">{currency}</td>
                <td className="border px-4 py-2">{exposure.toLocaleString()}</td>
                <td className="border px-4 py-2">
                  {exposure > 300000 ? 'Hedge with forward' : 'No action needed'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FXDashboard;