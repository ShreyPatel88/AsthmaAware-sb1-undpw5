import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="air-quality-alerts">Air Quality Alerts</Label>
            <Switch id="air-quality-alerts" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="medication-reminders">Medication Reminders</Label>
            <Switch id="medication-reminders" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="data-saver">Data Saver Mode</Label>
            <Switch id="data-saver" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}