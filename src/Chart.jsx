import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'January', OurCompany: 40, OtherCompanies: 60 },
  { name: 'February', OurCompany: 30, OtherCompanies: 70 },
  { name: 'March', OurCompany: 50, OtherCompanies: 50 },
  { name: 'April', OurCompany: 70, OtherCompanies: 30 },
  { name: 'May', OurCompany: 60, OtherCompanies: 40 },
  { name: 'June', OurCompany: 80, OtherCompanies: 20 },
];

const CustomLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="OurCompany" stroke="#8884d8" />
        <Line type="monotone" dataKey="OtherCompanies" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
