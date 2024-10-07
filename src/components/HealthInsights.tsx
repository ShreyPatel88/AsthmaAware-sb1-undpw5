import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '5/1', aqi: 50 },
  { date: '5/2', aqi: 55 },
  { date: '5/3', aqi: 60 },
  { date: '5/4', aqi: 52 },
  { date: '5/5', aqi: 48 },
  { date: '5/6', aqi: 58 },
  { date: '5/7', aqi: 62 },
];

export default function HealthInsights() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Air Quality Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Based on recent air quality trends, your asthma symptoms may be more noticeable. Consider using your preventive inhaler more frequently.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Try to limit outdoor activities between 2 PM and 6 PM when air quality is typically at its worst.</p>
        </CardContent>
      </Card>
    </div>
  );
}