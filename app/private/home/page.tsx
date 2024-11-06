'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import withAuth from '@/utils/withAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomNavBar from '@/components/custom/CustomNavBar';
import axios from 'axios';

axios.defaults.baseURL = 'https://v8-senior-2f6a65d2df2a.herokuapp.com';

const CO2eDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [factors, setFactors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [totalCO2e, setTotalCO2e] = useState(0);
  const [addedItems, setAddedItems] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndFactors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Authentication token not found.");
          return;
        }
  
        const config = { headers: { Authorization: `Bearer ${token}` } };
  
        // Fetch categories
        const categoryRes = await axios.get('/calc/emission-categories/', config);
        setCategories(categoryRes.data);
  
        // Fetch emission factors for each category
        const factorsRes = await axios.get('/calc/emission-factors/', config);
        const factorsByCategory = factorsRes.data.reduce((acc, factor) => {
          if (!acc[factor.category]) acc[factor.category] = [];
          acc[factor.category].push(factor);
          return acc;
        }, {});
        
        setFactors(factorsByCategory);
  
        // Log the structure of factorsByCategory
        console.log("Fetched factors:", factorsByCategory);
      } catch (error) {
        console.error('Error fetching categories and factors:', error);
        setError("Failed to fetch data. Please try again later.");
      }
    };
  
    fetchCategoriesAndFactors();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setQuantities({});
  };

  const handleQuantityChange = (factorId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [factorId]: Math.max(0, quantity) }));
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called");
  
    if (!selectedCategory) {
      console.log("No category selected, aborting submit.");
      return;
    }
  
    console.log("Selected category:", selectedCategory);
    console.log("Quantities:", quantities);
  
    const categoryFactors = factors[selectedCategory];
    console.log("Category factors for selected category:", categoryFactors);
  
    if (!categoryFactors) {
      console.log("No factors found for selected category.");
      setError("No emission factors found for the selected category.");
      return;
    }
  
    let newAddedItems = { ...addedItems };
    let newTotalCO2e = totalCO2e;
  
    // Retrieve and log the token to ensure it's correctly retrieved and prefixed
    const token = localStorage.getItem('token');
    console.log("Retrieved token from localStorage:", token);
  
    if (!token) {
      console.log("Token not found in localStorage.");
      setError("Authentication token not found. Please log in again.");
      return;
    }
  
    // Set Authorization header
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
  
    console.log("Authorization header configured:", config.headers.Authorization);
  
    // Iterate over each item in quantities and submit to the API
    for (const [factorId, quantity] of Object.entries(quantities)) {
      if (quantity > 0) {
        const factor = categoryFactors.find((f) => f.id === parseInt(factorId));
        if (factor) {
          const emissionData = {
            category: factor.category,
            emission_factor: factor.id,
            quantity,
            date: new Date().toISOString().split('T')[0],
          };
  
          console.log("Emission data prepared for submission:", emissionData);
  
          try {
            const response = await axios.post(
              'http://v8-senior-2f6a65d2df2a.herokuapp.com/calc/emissions/',
              emissionData,
              config
            );
  
            console.log("Emission submitted successfully:", response.data);
  
            newAddedItems[factorId] = (newAddedItems[factorId] || 0) + quantity;
            newTotalCO2e += factor.factor * quantity;
            setError(null);
          } catch (error) {
            console.error("Error submitting emission:", error);
            setError("Failed to submit emission data. Unauthorized access (401).");
            return;
          }
        } else {
          console.log(`Factor not found for id: ${factorId} in selected category.`);
        }
      }
    }
  
    setAddedItems(newAddedItems);
    setTotalCO2e(newTotalCO2e);
    setQuantities({});
    setSelectedCategory(null);
    console.log("Added items and total CO2e updated.");
  };
  
  
  const handleCancel = () => {
    setSelectedCategory(null);
    setQuantities({});
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Card className="mb-6 w-full">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-center">CO2e Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl sm:text-4xl font-bold text-center">
            {totalCO2e.toFixed(2)} <span className="text-xl sm:text-2xl font-normal">kg CO2e/day</span>
          </div>
        </CardContent>
      </Card>

      {!selectedCategory ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              variant="outline"
              className="w-full text-sm sm:text-base"
            >
              {category.name}
            </Button>
          ))}
        </div>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">
              {categories.find((c) => c.id === selectedCategory)?.name} Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {factors[selectedCategory]?.map((factor) => (
                <div key={factor.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <Label htmlFor={`quantity-${factor.id}`} className="mb-2 sm:mb-0">
                    {factor.name} ({factor.factor.toFixed(3)} kg CO2e per {factor.unit})
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id={`quantity-${factor.id}`}
                      type="number"
                      value={quantities[factor.id] || 0}
                      onChange={(e) => handleQuantityChange(factor.id, parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      min="0"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(factor.id, (quantities[factor.id] || 0) + 1)}
                      aria-label={`Add one ${factor.name}`}
                      className="ml-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={handleSubmit} className="flex-grow">
                Submit
              </Button>
              <Button onClick={handleCancel} variant="outline" className="ml-2">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(addedItems).length > 0 && (
        <Card className="mt-6 w-full">
          <CardHeader>
            <CardTitle className="text-lg">Added Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(addedItems).map(([factorId, quantity]) => {
                const category = Object.keys(factors).find((cat) => factors[cat].some((f) => f.id === factorId));
                const factor = category ? factors[category].find((f) => f.id === factorId) : null;
                return factor ? (
                  <li key={factorId} className="flex justify-between text-sm">
                    <span>{factor.name}</span>
                    <span>{quantity} (Total: {(factor.factor * quantity).toFixed(2)} kg CO2e)</span>
                  </li>
                ) : null;
              })}
            </ul>
          </CardContent>
        </Card>
      )}
      <CustomNavBar />
    </div>
  );
};

export default withAuth(CO2eDashboard);
