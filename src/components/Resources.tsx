import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText } from 'lucide-react';

export default function Resources() {
  const resources = [
    { type: 'article', title: 'Understanding Asthma Triggers', icon: BookOpen },
    { type: 'video', title: 'How to Use Your Inhaler Properly', icon: Video },
    { type: 'guide', title: 'Creating an Asthma Action Plan', icon: FileText },
  ];

  return (
    <div className="space-y-4">
      {resources.map((resource, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <resource.icon className="h-5 w-5" />
            <CardTitle>{resource.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Click to view this {resource.type}.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}