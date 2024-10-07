import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, Info } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    { type: 'alert', title: 'High Pollen Alert', message: 'Pollen levels are high today. Consider staying indoors.' },
    { type: 'reminder', title: 'Medication Reminder', message: 'Time to take your daily inhaler.' },
    { type: 'info', title: 'Air Quality Update', message: 'Air quality has improved in your area.' },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            {notification.type === 'alert' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            {notification.type === 'reminder' && <Bell className="h-5 w-5 text-blue-500" />}
            {notification.type === 'info' && <Info className="h-5 w-5 text-green-500" />}
            <CardTitle>{notification.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{notification.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}