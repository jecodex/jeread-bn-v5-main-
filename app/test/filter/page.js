"use client";
import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Fuel, Settings, Heart, Star, ChevronRight, Phone, MessageCircle, Share2, Download, ChevronLeft, Grid, List, Eye } from 'lucide-react';
import { cars} from '@/data/mockcar';
export default function ResponsiveCarListingApp() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [likedCars, setLikedCars] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list' for desktop
  const [filters, setFilters] = useState({
    brand: '', model: '', yearFrom: '', yearTo: '', priceFrom: '', priceTo: '', fuelType: '', transmission: '', color: ''
  });

  
  const toggleLike = (carId) => {
    const newLiked = new Set(likedCars);
    newLiked.has(carId) ? newLiked.delete(carId) : newLiked.add(carId);
    setLikedCars(newLiked);
  };

  const filteredCars = cars.filter(car => {
    const searchMatch = !searchQuery || car.brand.toLowerCase().includes(searchQuery.toLowerCase()) || car.model.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch && 
           (!filters.brand || car.brand === filters.brand) &&
           (!filters.model || car.model.includes(filters.model)) &&
           (!filters.yearFrom || car.year >= parseInt(filters.yearFrom)) &&
           (!filters.yearTo || car.year <= parseInt(filters.yearTo)) &&
           (!filters.priceFrom || car.price >= parseInt(filters.priceFrom)) &&
           (!filters.priceTo || car.price <= parseInt(filters.priceTo)) &&
           (!filters.fuelType || car.fuelType === filters.fuelType) &&
           (!filters.transmission || car.transmission === filters.transmission) &&
           (!filters.color || car.color === filters.color);
  });

  const resetFilters = () => setFilters({ brand: '', model: '', yearFrom: '', yearTo: '', priceFrom: '', priceTo: '', fuelType: '', transmission: '', color: '' });

  const viewCarDetails = (car) => {
    setSelectedCar(car);
    setCurrentImageIndex(0);
    setCurrentView('details');
  };

  const nextImage = () => selectedCar && setCurrentImageIndex((prev) => (prev + 1) % selectedCar.images.length);
  const prevImage = () => selectedCar && setCurrentImageIndex((prev) => (prev - 1 + selectedCar.images.length) % selectedCar.images.length);

  const StarRating = ({ rating, size = 'w-3 h-3' }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${size} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  // Desktop Car Card Component
  const DesktopCarCard = ({ car }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full h-48 object-cover" />
        <button onClick={() => toggleLike(car.id)} className={`absolute top-3 right-3 p-2 rounded-full transition-all ${likedCars.has(car.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}>
          <Heart className={`w-4 h-4 ${likedCars.has(car.id) ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex space-x-1">
          {car.images.slice(0, 3).map((_, index) => <div key={index} className="w-1.5 h-1.5 bg-white/70 rounded-full" />)}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{car.year482year} {car.brand} {car.model}</h3>
            <div className="flex items-center mt-1">
              <StarRating rating={car.rating} />
              <span className="text-xs text-gray-600 ml-1">({car.rating})</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#43C3B9]">${car.price.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{car.mileage}</div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-4">
            {[
              [Calendar, car.year],
              [Fuel, car.fuelType],
              [Settings, car.transmission]
            ].map(([Icon, value], i) => (
              <div key={i} className="flex items-center space-x-1">
                <Icon className="w-3 h-3" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
          <MapPin className="w-3 h-3" />
          <span>{car.location}</span>
        </div>
        <button onClick={() => viewCarDetails(car)} className="w-full bg-[#43C3B9] text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#37A99B] transition-colors">
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  // Desktop List View Component
  const DesktopListCard = ({ car }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex">
        <div className="relative w-80 h-48">
          <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
          <button onClick={() => toggleLike(car.id)} className={`absolute top-3 right-3 p-2 rounded-full transition-all ${likedCars.has(car.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}>
            <Heart className={`w-4 h-4 ${likedCars.has(car.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">{car.year} {car.brand} {car.model}</h3>
              <div className="flex items-center mb-2">
                <StarRating rating={car.rating} size="w-4 h-4" />
                <span className="text-sm text-gray-600 ml-2">({car.rating}) • {car.reviews} reviews</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{car.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#43C3B9] mb-1">${car.price.toLocaleString()}</div>
              <div className="text-sm text-gray-500">{car.mileage}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              ['Year', car.year],
              ['Fuel Type', car.fuelType],
              ['Transmission', car.transmission]
            ].map(([label, value], i) => (
              <div key={i}>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
                <div className="font-medium text-gray-900">{value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {car.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-[#43C3B9]/10 text-[#43C3B9] text-xs rounded-full">{feature}</span>
            ))}
            {car.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+{car.features.length - 3} more</span>
            )}
          </div>

          <div className="flex space-x-3">
            <button onClick={() => viewCarDetails(car)} className="flex-1 bg-[#43C3B9] text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#37A99B] transition-colors">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
            <button className="px-4 py-2.5 border border-[#43C3B9] text-[#43C3B9] rounded-lg font-medium hover:bg-[#43C3B9] hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="px-4 py-2.5 border border-green-500 text-green-500 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'details' && selectedCar) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <button onClick={() => setCurrentView('list')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">Car Details</h1>
              <div className="flex space-x-2">
                <button onClick={() => toggleLike(selectedCar.id)} className={`p-2 rounded-full transition-all ${likedCars.has(selectedCar.id) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'}`}>
                  <Heart className={`w-5 h-5 ${likedCars.has(selectedCar.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#43C3B9] hover:bg-opacity-10 hover:text-[#43C3B9] transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Image Gallery */}
            <div className="relative mb-6 lg:mb-0">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img src={selectedCar.images[currentImageIndex]} alt={`${selectedCar.brand} ${selectedCar.model}`} className="w-full h-full object-cover" />
                {selectedCar.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
                      {selectedCar.images.map((_, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Car Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{selectedCar.year} {selectedCar.brand} {selectedCar.model}</h2>
                    <div className="flex items-center">
                      <StarRating rating={selectedCar.rating} size="w-4 h-4" />
                      <span className="text-sm text-gray-600 ml-2">({selectedCar.rating}) • {selectedCar.reviews} reviews</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl lg:text-4xl font-bold text-[#43C3B9]">${selectedCar.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{selectedCar.mileage}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCar.features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-[#43C3B9]/10 text-[#43C3B9] text-sm rounded-full">{feature}</span>
                  ))}
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vehicle Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {[
                      ['VIN', selectedCar.vin],
                      ['Color', `${selectedCar.color} - ${selectedCar.colorAr}`],
                      ['Fuel Type', selectedCar.fuelType]
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">{label}</div>
                        <div className="font-medium text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[
                      ['Year', selectedCar.year],
                      ['Transmission', selectedCar.transmission],
                      ['Engine', selectedCar.engine]
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">{label}</div>
                        <div className="font-medium text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inspection Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inspection Report</h3>
                <div className={`p-4 rounded-lg mb-4 ${selectedCar.inspectionStatus === 'Completed' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <div className="flex items-center space-x-3">
                    <Settings className={`w-5 h-5 ${selectedCar.inspectionStatus === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`} />
                    <span className={`font-medium ${selectedCar.inspectionStatus === 'Completed' ? 'text-green-800' : 'text-yellow-800'}`}>
                      Inspection {selectedCar.inspectionStatus}
                    </span>
                  </div>
                </div>

                {selectedCar.damageReport.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Damage Report</h4>
                    {selectedCar.damageReport.map((damage, index) => (
                      <div key={index} className={`p-3 rounded border-l-4 mb-3 ${
                        damage.severity === 'high' ? 'bg-red-50 border-red-500' : 
                        damage.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' : 'bg-blue-50 border-blue-500'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{damage.part}</span>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            damage.severity === 'high' ? 'bg-red-100 text-red-700' : 
                            damage.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {damage.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dealer Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Dealer Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#43C3B9] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{selectedCar.dealer.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{selectedCar.dealer}</div>
                    <div className="text-gray-600">{selectedCar.location}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-600">{selectedCar.dealerRating} ({selectedCar.dealerReviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed lg:static bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-4">
              <button className="flex-1 bg-[#43C3B9] text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#37A99B] transition-colors">
                <Phone className="w-5 h-5" />
                <span>Call Dealer</span>
              </button>
              <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>Chat</span>
              </button>
              <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-20 lg:hidden"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl lg:text-2xl font-bold text-[#43C3B9]">AJJALA</h1>
              <div className="flex items-center space-x-3">
                {/* Desktop View Toggle */}
                <div className="hidden lg:flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-[#43C3B9]' : 'text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white text-[#43C3B9]' : 'text-gray-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)} 
                  className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-[#43C3B9] hover:bg-opacity-10 hover:text-[#43C3B9] transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by brand or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#43C3B9] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Brand', key: 'brand', type: 'select', options: ['Volkswagen', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Lexus'] },
                { label: 'Model', key: 'model', type: 'text' },
                { label: 'Year From', key: 'yearFrom', type: 'number' },
                { label: 'Year To', key: 'yearTo', type: 'number' },
                { label: 'Price From', key: 'priceFrom', type: 'number' },
                { label: 'Price To', key: 'priceTo', type: 'number' },
                { label: 'Fuel Type', key: 'fuelType', type: 'select', options: ['Gasoline', 'Hybrid', 'Electric', 'Diesel'] },
                { label: 'Transmission', key: 'transmission', type: 'select', options: ['Automatic', 'Manual'] },
                { label: 'Color', key: 'color', type: 'select', options: ['White', 'Black', 'Silver', 'Blue', 'Red'] }
              ].map((field, index) => (
                <div key={index} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={filters[field.key]}
                      onChange={(e) => setFilters({ ...filters, [field.key]: e.target.value })}
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#43C3B9] focus:border-transparent"
                    >
                      <option value="">{`Select ${field.label}`}</option>
                      {field.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={filters[field.key]}
                      onChange={(e) => setFilters({ ...filters, [field.key]: e.target.value })}
                      placeholder={field.label}
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#43C3B9] focus:border-transparent"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 bg-[#43C3B9] text-white rounded-lg hover:bg-[#37A99B] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Car Listings */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#43C3B9] focus:border-transparent">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Year: Newest First</option>
              <option>Year: Oldest First</option>
            </select>
          </div>
        </div>

        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-6'
        }>
          {filteredCars.map((car) => (
            viewMode === 'grid'
              ? <DesktopCarCard key={car.id} car={car} />
              : <DesktopListCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}