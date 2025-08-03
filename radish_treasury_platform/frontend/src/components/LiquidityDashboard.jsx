import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function LiquidityDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/liquidity/')
      .then(res => setData(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;

  const pieData = {
    labels: data.nostro_accounts.map(a => a.currency),
    datasets: [{
      label: 'Liquidity',
      data: data.nostro_accounts.map(a => a.balance),
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
    }]
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Liquidity Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.nostro_accounts.map((acct, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{acct.bank}</h3>
            <p>{acct.currency}: {acct.balance.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <h3 className="text-lg mt-6 font-semibold">Liquidity Spread</h3>
      <Pie data={pieData} />
    </div>
  );
}

export default LiquidityDashboard;