import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { firestoredb } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserStatusBarChart = () => {
  const [pending, setPending] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [approved, setApproved] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const docRef = collection(firestoredb, 'users');
      const querySnapshot = await getDocs(docRef);

      let pendingCount = 0;
      let rejectedCount = 0;
      let approvedCount = 0;

      querySnapshot.docs.forEach((doc) => {
        const userData = doc.data();
        if (userData.loan_info?.status?.loanStatus === 'pending...') {
          pendingCount += 1;
        }
        if (userData.loan_info?.status?.loanStatus === 'rejected...') {
          rejectedCount += 1;
        }
        if (userData.loan_info?.status?.loanStatus === 'approved...') {
          approvedCount += 1;
        }
      });

      setPending(pendingCount);
      setRejected(rejectedCount);
      setApproved(approvedCount);
    }

    
    fetchData();
  }, []); // Fetch data once on component mount

  // Sample data updated dynamically
  const data = {
    labels: ['Pending', 'Rejected', 'Approved'],
    datasets: [
      {
        label: 'User Status',
        data: [pending, rejected, approved],
        backgroundColor: ['#FFBB28', '#C7253E', '#387F39'], // Different colors for each bar
        borderColor: ['#FFBB28', '#C7253E', '#387F39'], // Optional: border colors
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to fill the container
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Set container height */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserStatusBarChart;
