'use client'
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Graph from "./Graph";

const salesData = [
  { name: "Mon", Week1: 400, Week2: 240, Week3: 300 },
  { name: "Tue", Week1: 300, Week2: 139, Week3: 200 },
  { name: "Wed", Week1: 200, Week2: 980, Week3: 280 },
  { name: "Thu", Week1: 278, Week2: 390, Week3: 500 },
  { name: "Fri", Week1: 189, Week2: 480, Week3: 400 },
  { name: "Sat", Week1: 239, Week2: 380, Week3: 320 },
  { name: "Sun", Week1: 349, Week2: 430, Week3: 450 },
];

const segmentData = [
  { name: "18-24", Men: 3000, Women: 2000 },
  { name: "25-34", Men: 4000, Women: 3000 },
  { name: "35-44", Men: 3500, Women: 2500 },
];

const pieData = [
  { name: "Skincare", value: 400 },
  { name: "Fashion", value: 600 },
  { name: "Men Fashion", value: 100 },
];

const Dashboard: React.FC = () => {
  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    const store = localStorage.getItem('storeInfo');
    if (store) {
      try {
        const parsed = JSON.parse(store);
        setOwnerName(parsed.ownerName || '');
      } catch (err) {
        console.error('Failed to parse storeInfo', err);
      }
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full grid gap-6">
      {/* Welcome Message */}
      <div className="text-2xl font-semibold h-10 text-gray-800">
        <span>Welcome{ownerName ? `, ${ownerName}` : ''}!</span>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Total Revenue" value={27450} percentage={2.5} />
        <Card title="Total Orders" value={1000} percentage={1.3} />
        <Card title="Total Visitors" value={500} percentage={-2.2} />
      </div>

      {/* Graphs Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Graph
          title="Sales Summary"
          chartType="line"
          data={salesData}
          dataKeys={[
            { key: "Week1", color: "#8884d8" },
            { key: "Week2", color: "#82ca9d" },
            { key: "Week3", color: "#ffc658" },
          ]}
        />
        <Graph
          title="Customer Segmentation"
          chartType="bar"
          data={segmentData}
          dataKeys={[
            { key: "Men", color: "#8884d8" },
            { key: "Women", color: "#82ca9d" },
          ]}
        />
        <Graph
          title="Customer Gender Split"
          chartType="pie"
          data={pieData}
          dataKeys={[
            { key: "value", color: "#8884d8" },
            { key: "value", color: "#82ca9d" },
            { key: "value", color: "#ffc658" },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
