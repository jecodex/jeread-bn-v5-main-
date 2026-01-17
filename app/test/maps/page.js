"use client"
import { useEffect, useState } from "react";
import { MapPin, Search, Thermometer, Droplets, Wind, Eye, Gauge, AlertTriangle, Sun, Moon, CloudRain } from "lucide-react";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Dhaka");
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [rainAlert, setRainAlert] = useState(false);
  const [rainProbability, setRainProbability] = useState(0);

  const API_KEY = "71bd7b6abc333f50e1a8ea483db95d6b";

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      
      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      
      // Forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();
      
      if (weatherData.cod !== 200) {
        setError("City not found. Please try again.");
        setWeather(null);
        setForecast(null);
      } else {
        setWeather(weatherData);
        setForecast(forecastData);
        setCity(cityName);
        checkRainAlert(forecastData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setError("Failed to fetch weather data. Please try again.");
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");
      
      // Current weather by coordinates
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      
      // Forecast by coordinates
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();
      
      if (weatherData.cod !== 200) {
        setError("Unable to get weather for your location.");
        setWeather(null);
        setForecast(null);
      } else {
        setWeather(weatherData);
        setForecast(forecastData);
        setCity(weatherData.name);
        checkRainAlert(forecastData);
      }
      setLocationLoading(false);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setError("Failed to fetch weather data. Please try again.");
      setLoading(false);
    }
  };

  const checkRainAlert = (forecastData) => {
    if (!forecastData || !forecastData.list) return;
    
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    // Check next 2 hours for rain and get maximum probability
    let maxRainProbability = 0;
    let hasRain = false;
    
    forecastData.list.forEach(item => {
      const itemDate = new Date(item.dt * 1000);
      if (itemDate <= twoHoursLater) {
        // Check if it's rain, drizzle or thunderstorm
        if (item.weather[0].main === 'Rain' || 
            item.weather[0].main === 'Drizzle' || 
            item.weather[0].main === 'Thunderstorm') {
          hasRain = true;
          
          // Calculate probability based on weather conditions and clouds
          let probability = 0;
          
          // Base probability based on weather type
          if (item.weather[0].main === 'Thunderstorm') {
            probability = 85;
          } else if (item.weather[0].main === 'Rain') {
            probability = 70;
          } else if (item.weather[0].main === 'Drizzle') {
            probability = 60;
          }
          
          // Adjust based on cloud coverage
          if (item.clouds && item.clouds.all) {
            probability = Math.max(probability, item.clouds.all * 0.8);
          }
          
          // Adjust based on humidity
          if (item.main && item.main.humidity) {
            if (item.main.humidity > 80) {
              probability += 10;
            } else if (item.main.humidity > 60) {
              probability += 5;
            }
          }
          
          // Cap at 95%
          probability = Math.min(probability, 95);
          maxRainProbability = Math.max(maxRainProbability, probability);
        } else if (item.clouds && item.clouds.all > 70) {
          // High cloud coverage without rain
          const cloudProbability = item.clouds.all * 0.4;
          maxRainProbability = Math.max(maxRainProbability, cloudProbability);
        }
      }
    });
    
    // Show alert if probability is above 30% or if there's actual rain predicted
    const shouldShowAlert = hasRain || maxRainProbability > 30;
    
    setRainAlert(shouldShowAlert);
    setRainProbability(Math.round(maxRainProbability));
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location. Please enter a city manually.");
          setLocationLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    if (searchCity.trim()) {
      fetchWeather(searchCity.trim());
      setSearchCity("");
    }
  };

  const getWeatherIcon = (weatherMain) => {
    const icons = {
      clear: '☀️',
      clouds: '☁️',
      rain: '🌧️',
      drizzle: '🌦️',
      thunderstorm: '⛈️',
      snow: '❄️',
      mist: '🌫️',
      fog: '🌫️'
    };
    return icons[weatherMain?.toLowerCase()] || '🌤️';
  };

  const getBackgroundImage = (weatherMain) => {
    const isNight = new Date().getHours() >= 18 || new Date().getHours() <= 6;
    
    const backgrounds = {
      clear: isNight 
        ? 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=1200&fit=crop&crop=center'
        : 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&h=1200&fit=crop&crop=center',
      clouds: isNight
        ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&crop=center'
        : 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=1200&fit=crop&crop=center',
      rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=1200&fit=crop&crop=center',
      drizzle: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=1200&fit=crop&crop=center',
      thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&h=1200&fit=crop&crop=center',
      snow: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&h=1200&fit=crop&crop=center',
      mist: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&h=1200&fit=crop&crop=center',
      fog: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&h=1200&fit=crop&crop=center'
    };
    
    return backgrounds[weatherMain?.toLowerCase()] || backgrounds.clear;
  };

  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "সুপ্রভাত", icon: <Sun className="w-5 h-5" /> };
    if (hour < 17) return { text: "শুভ দুপুর", icon: <Sun className="w-5 h-5" /> };
    if (hour < 20) return { text: "শুভ সন্ধ্যা", icon: <Sun className="w-5 h-5" /> };
    return { text: "শুভ রাত্রি", icon: <Moon className="w-5 h-5" /> };
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=1200&fit=crop&crop=center)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        <div className="text-white text-center relative z-10">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-white/30 border-t-white mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-white/20"></div>
          </div>
          <p className="text-2xl font-light mb-2">আবহাওয়ার তথ্য লোড হচ্ছে...</p>
          <p className="text-white/70">অনুগ্রহ করে অপেক্ষা করুন</p>
        </div>
      </div>
    );
  }

  const greeting = getCurrentTimeGreeting();

  return (
    <div 
      className="min-h-screen p-4 relative"
      style={{
        backgroundImage: `url(${weather ? getBackgroundImage(weather.weather[0].main) : 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=1200&fit=crop&crop=center'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/40"></div>
      
      <div className="max-w-md mx-auto pt-8 relative z-10">
        {/* Greeting Header */}
        {weather && !error && (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              {greeting.icon}
              <h1 className="text-2xl font-light text-white drop-shadow-lg">{greeting.text}</h1>
            </div>
            <p className="text-white/80 text-sm drop-shadow">আজ {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        )}

        {/* Rain Alert */}
        {rainAlert && (
          <div className="bg-gradient-to-r from-blue-500/90 to-indigo-600/90 backdrop-blur-lg rounded-2xl p-5 mb-6 shadow-2xl border border-blue-300/50 animate-pulse">
            <div className="flex items-center gap-3">
              <CloudRain className="w-8 h-8 text-white animate-bounce" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-bold text-lg">🌧️ বৃষ্টির সতর্কতা!</p>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold">
                    {rainProbability}%
                  </span>
                </div>
                <p className="text-white/90 text-sm">
                  আগামী ২ ঘন্টার মধ্যে {rainProbability}% সম্ভাবনা বৃষ্টি হতে পারে। ছাতা নিয়ে বের হন।
                </p>
              </div>
            </div>
            
            {/* Probability Bar */}
            <div className="mt-4">
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-white to-blue-200 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${rainProbability}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-white/80 mt-1">
                <span>০%</span>
                <span>৫০%</span>
                <span>১০০%</span>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 mb-6 shadow-2xl border border-white/30">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="শহরের নাম লিখুন..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className="flex-1 px-5 py-4 rounded-2xl border-0 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg text-lg"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-4 bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 rounded-2xl transition-all duration-300 text-white shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Search size={24} />
            </button>
          </div>
          
          <button
            onClick={getCurrentLocation}
            disabled={locationLoading}
            className="w-full px-5 py-4 bg-gradient-to-r from-green-500/80 to-teal-600/80 hover:from-green-600/90 hover:to-teal-700/90 rounded-2xl transition-all duration-300 text-white flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg font-medium"
          >
            <MapPin size={20} />
            {locationLoading ? "অবস্থান খুঁজে বের করা হচ্ছে..." : "বর্তমান অবস্থান ব্যবহার করুন"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/90 backdrop-blur-lg rounded-2xl p-5 mb-6 shadow-2xl border border-red-300/50">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <p className="text-white font-medium text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Current Weather Display */}
        {weather && !error && (
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">{weather.name}</h1>
              <p className="text-white/90 text-lg font-medium drop-shadow">{weather.sys.country}</p>
            </div>

            <div className="text-center mb-10">
              <div className="text-8xl mb-6 drop-shadow-2xl animate-bounce">{getWeatherIcon(weather.weather[0].main)}</div>
              <div className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                {Math.round(weather.main.temp)}°C
              </div>
              <p className="text-2xl text-white/95 capitalize mb-3 font-medium drop-shadow-lg">
                {weather.weather[0].description}
              </p>
              <p className="text-white/80 text-lg drop-shadow">
                অনুভূত তাপমাত্রা {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-6">
              {[
                { icon: <Thermometer className="w-7 h-7" />, label: "সর্বনিম্ন/সর্বোচ্চ", value: `${Math.round(weather.main.temp_min)}° / ${Math.round(weather.main.temp_max)}°` },
                { icon: <Droplets className="w-7 h-7" />, label: "আর্দ্রতা", value: `${weather.main.humidity}%` },
                { icon: <Wind className="w-7 h-7" />, label: "বাতাসের গতি", value: `${weather.wind.speed} m/s` },
                { icon: <Gauge className="w-7 h-7" />, label: "বায়ুচাপ", value: `${weather.main.pressure} hPa` }
              ].map((item, index) => (
                <div key={index} className="bg-white/25 backdrop-blur-md rounded-2xl p-5 text-center shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300">
                  <div className="text-white/90 mx-auto mb-3 drop-shadow">{item.icon}</div>
                  <p className="text-white/70 text-sm font-medium mb-2">{item.label}</p>
                  <p className="text-white font-bold text-lg drop-shadow">{item.value}</p>
                </div>
              ))}
            </div>

            {weather.visibility && (
              <div className="bg-white/25 backdrop-blur-md rounded-2xl p-5 text-center shadow-xl border border-white/20">
                <Eye className="w-7 h-7 text-white/90 mx-auto mb-3 drop-shadow" />
                <p className="text-white/70 text-sm font-medium mb-2">দৃশ্যমানতা</p>
                <p className="text-white font-bold text-lg drop-shadow">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;