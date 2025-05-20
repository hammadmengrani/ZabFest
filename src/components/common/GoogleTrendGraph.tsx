"use client";

import React, { useState } from "react";
import { generateSendStoreEmail } from "@/graphql/vendor";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type Props = {
  data: string;
};

interface ProductDetail {
  name: string;
  quantity: number;
  price: number;
  salePrice: number;
}

interface GenerateSendStoreEmailInput {
  email: string;
  brand: string;
  vendorName: string;
  companyName: string;
  shippingAddress: string;
  cityStateZip: string;
  tax: number;
  shippingRate: number;
  paymentMethod: string;
  paymentDate: string;
  note: string;
  phoneNumber: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  products: ProductDetail[];
}

const regex = /[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/gis;

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CF4",
  "#FF6666",
  "#66CC99",
];

function jsonFromString(str: string) {
  const matches = str.match(regex);
  if (!matches) return [];
  const parsed = Object.assign({}, ...matches.map((m) => JSON.parse(m)));
  return [...Object.values(parsed)];
}

export default function GoogleTrendsGraph(props: Props) {
  const data = jsonFromString(props.data);
  console.log(
    "🚀 ~ file: GoogleTrendGraph.tsx:45 ~ GoogleTrendsGraph ~ data:",
    data
  );

  const [formData, setFormData] = useState<GenerateSendStoreEmailInput>({
    email: "bsai23108126@szabist.pk",
    brand: "My Brand",
    vendorName: "My Vendor",
    companyName: "My Company",
    shippingAddress: "123 Main Street",
    cityStateZip: "City, ST 12345",
    tax: 5,
    shippingRate: 15,
    paymentMethod: "Bank Transfer",
    paymentDate: new Date().toISOString().split("T")[0],
    note: "This is a static note",
    phoneNumber: "1234567890",
    contactName: "John Doe",
    contactTitle: "Purchasing Manager",
    contactEmail: "john@example.com",
    products: [],
  });

  const handleSendOrder = async (item: any) => {
    const payload: GenerateSendStoreEmailInput = {
      ...formData,
      products: [
        {
          name: item.product_name,
          quantity: 1,
          price: item.product_cost,
          salePrice: item.selling_cost,
        },
      ],
    };

    try {
      const response = await generateSendStoreEmail(payload);
      console.log("✅ Order sent successfully:", response);
      alert("Order Sent!");
    } catch (error) {
      console.error("❌ Failed to send order:", error);
      alert("Failed to send order");
    }
  };

  return (
    <div className="p-6 bg-gray-100 drop-shadow-md w-full grid grid-cols-1 gap-5">
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-5 bg-white drop-shadow-md"
        >
          <h3 className="font-semibold">Product Name</h3>
          <span>{item.product_name}</span>

                    <div className="flex flex-col lg:flex-row gap-10 pt-5">
            {/* Line Chart */}
            <div className="w-full lg:w-1/2 h-96 bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-center mb-2">
                Google Trends (Monthly)
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={item.google_trend?.x_axis?.map(
                    (label: string, idx: number) => ({
                      month: label,
                      interest: item.google_trend?.y_axis?.[idx] ?? 0,
                    })
                  )}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={"month"} />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="interest"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="w-full lg:w-1/2 h-96 bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-center mb-2">
                Regional Interest
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(item.google_trend_region || {}).map(
                      ([region, value]) => ({
                        region,
                        value,
                      })
                    )}
                    dataKey="value"
                    nameKey="region"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {Object.entries(item.google_trend_region || {}).map(
                      ([_, __], index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <h3 className="font-semibold">Product Description</h3>
          <p>{item.short_description}</p>

          <h3 className="font-semibold">Average Rating</h3>
          <span>⭐ {item.average_rating}</span>

          <h3 className="font-semibold">User Review Summary</h3>
          <span>{item.user_review_summary}</span>

          <h3 className="font-semibold">Trending Reason</h3>
          <span>{item.trending_reason}</span>

          <div className="flex gap-5 justify-between items-start">
            <div className="flex gap-5">
              <div>
                <h3 className="font-semibold">Product Cost</h3>
                <span>{item.product_cost}</span>
              </div>
              <div>
                <h3 className="font-semibold">Selling Cost</h3>
                <span>{item.selling_cost}</span>
              </div>
              <div>
                <h3 className="font-semibold">Max Discount</h3>
                <span>
                  {((item.discount_cost * 100) / item.selling_cost).toFixed(2)}{" "}
                  %
                </span>
              </div>
            </div>
            <button
              className="bg-green-500 px-4 py-2 rounded-full text-white hover:bg-green-600"
              onClick={() => handleSendOrder(item)}
            >
              Send Purchase Order
            </button>
          </div>


        </div>
      ))}
    </div>
  );
}
