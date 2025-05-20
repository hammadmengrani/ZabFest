import React from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'pie';

interface GraphProps {
  title: string;
  data: any[];
  chartType: ChartType;
  dataKeys: { key: string; color: string }[]; // for Pie, use only one key
}

const Graph: React.FC<GraphProps> = ({ title, data, chartType, dataKeys }) => {
  const isPie = chartType === 'pie';

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ResponsiveContainer width="100%" height={300}>
        {isPie ? (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey={dataKeys[0].key}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={dataKeys[index % dataKeys.length].color} />
              ))}
            </Pie>
          </PieChart>
        ) : (
          (chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map(({ key, color }) => (
                <Line key={key} type="monotone" dataKey={key} stroke={color} />
              ))}
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map(({ key, color }) => (
                <Bar key={key} dataKey={key} fill={color} />
              ))}
            </BarChart>
          ))
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
