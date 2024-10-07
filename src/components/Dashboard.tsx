import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bluetooth, CloudSun, Thermometer, Droplets, Gauge } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { bluetoothService } from '@/services/BluetoothService';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  high: number;
  low: number;
}

interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  humidity: number;
}

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    iaq: 0,
    co2: 0,
    gas: 0
  });
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchWeatherData();
    fetchAirQualityData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Long Beach&units=imperial&appid=1b5398b650e4a3edef0dc32752facbf8`);
      setWeatherData({
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        high: Math.round(response.data.main.temp_max),
        low: Math.round(response.data.main.temp_min)
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const fetchAirQualityData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=33.77&lon=-118.19&appid=1b5398b650e4a3edef0dc32752facbf8`);
      
      if (!response.data || !response.data.list || response.data.list.length === 0) {
        throw new Error('Invalid air quality data received');
      }

      const airQualityInfo = response.data.list[0];
      const openWeatherAQI = airQualityInfo.main.aqi;
      const usaAQI = convertToUSAQI(openWeatherAQI);
      
      setAirQualityData({
        aqi: usaAQI,
        pm25: airQualityInfo.components.pm2_5,
        pm10: airQualityInfo.components.pm10,
        humidity: airQualityInfo.main.humidity || 0 // Fallback to 0 if humidity is not available
      });
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch air quality data. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const convertToUSAQI = (openWeatherAQI: number): number => {
    // This is a simplified conversion. For accurate conversion, you'd need more detailed data.
    const aqiRanges = [0, 50, 100, 150, 200, 300, 500];
    return aqiRanges[openWeatherAQI - 1] || 0;
  };

  const handleConnectToggle = async () => {
    if (isConnected) {
      await bluetoothService.disconnect();
      setIsConnected(false);
    } else {
      const connected = await bluetoothService.connect();
      setIsConnected(connected);
      if (connected) {
        updateSensorData();
      }
    }
  };

  const updateSensorData = async () => {
    if (bluetoothService.isConnected()) {
      try {
        const temperature = await bluetoothService.readCharacteristic('temperature');
        const humidity = await bluetoothService.readCharacteristic('humidity');
        const pressure = await bluetoothService.readCharacteristic('pressure');
        const iaq = await bluetoothService.readCharacteristic('bsec');
        const co2 = await bluetoothService.readCharacteristic('co2');
        const gas = await bluetoothService.readCharacteristic('gas');

        setSensorData({ temperature, humidity, pressure, iaq, co2, gas });
      } catch (error) {
        console.error('Error reading sensor data:', error);
        toast({
          title: "Error",
          description: "Failed to read sensor data. Please try reconnecting.",
          variant: "destructive",
        });
      }
    }
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-500';
    if (aqi <= 100) return 'text-yellow-500';
    if (aqi <= 150) return 'text-orange-500';
    if (aqi <= 200) return 'text-red-500';
    if (aqi <= 300) return 'text-purple-500';
    return 'text-rose-500';
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm text-muted-foreground">Welcome back,</div>
            <div className="font-semibold">User</div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleConnectToggle}>
          <Bluetooth className="w-4 h-4 mr-2" />
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Long Beach, CA</span>
          </div>
        </CardHeader>
        <CardContent>
          {weatherData && (
            <div className="flex justify-between items-center">
              <div>
                <div className="text-4xl font-bold">{weatherData.temperature}°</div>
                <div className="text-sm text-muted-foreground">{weatherData.high}° / {weatherData.low}°</div>
              </div>
              <CloudSun className="w-12 h-12" />
            </div>
          )}
          {airQualityData && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-secondary p-2 rounded-md text-center">
                <div className={`text-lg font-medium ${getAQIColor(airQualityData.aqi)}`}>{airQualityData.aqi}</div>
                <div className="text-xs text-muted-foreground">AQI</div>
              </div>
              <div className="bg-secondary p-2 rounded-md text-center">
                <div className="text-lg font-medium">{airQualityData.pm25}</div>
                <div className="text-xs text-muted-foreground">PM2.5</div>
              </div>
              <div className="bg-secondary p-2 rounded-md text-center">
                <div className="text-lg font-medium">{airQualityData.pm10}</div>
                <div className="text-xs text-muted-foreground">PM10</div>
              </div>
              <div className="bg-secondary p-2 rounded-md text-center">
                <div className="text-lg font-medium">{airQualityData.humidity}%</div>
                <div className="text-xs text-muted-foreground">Humidity</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Real-Time Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-sm text-muted-foreground">Temperature</div>
              <div className="text-lg font-semibold">{sensorData.temperature.toFixed(1)}°C</div>
            </div>
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-sm text-muted-foreground">Humidity</div>
              <div className="text-lg font-semibold">{sensorData.humidity.toFixed(1)}%</div>
            </div>
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-sm text-muted-foreground">Pressure</div>
              <div className="text-lg font-semibold">{sensorData.pressure.toFixed(1)} hPa</div>
            </div>
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-sm text-muted-foreground">IAQ</div>
              <div className="text-lg font-semibold">{sensorData.iaq.toFixed(1)}</div>
            </div>
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-sm text-muted-foreground">CO2</div>
              <div className="text-lg font-semibold">{sensorData.co2} ppm</div>
            </div>
            <div className="bg-secondary p-3 rounded-md">
              <div className="text-sm text-muted-foreground">Gas</div>
              <div className="text-lg font-semibold">{sensorData.gas} Ω</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;