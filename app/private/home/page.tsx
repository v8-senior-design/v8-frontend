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
import CO2eGauge from '@/components/custom/CO2eGauge';

axios.defaults.baseURL = 'https://v8-senior-2f6a65d2df2a.herokuapp.com';

const CO2eDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [factors, setFactors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [totalCO2e, setTotalCO2e] = useState(0);
  const [addedItems, setAddedItems] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndFactors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Authentication token not found.");
          return;
        }

        const config = { headers: { Authorization: `Token ${token}` } };

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
      } catch (error) {
        console.error('Error fetching categories and factors:', error);
      }
    };

    fetchCategoriesAndFactors();
  }, []);

  // Fetch today's emissions
  const fetchTodaysEmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      const config = { headers: { Authorization: `Token ${token}` } };
      const today = new Date().toISOString().split('T')[0];

      // Fetch emissions for today
      const response = await axios.get(`/calc/emissions/?date=${today}`, config);
      setAddedItems(response.data);
      setError(null); 
    } catch (error) {
      console.error("Error fetching today's emissions:", error);

    }
  };

  useEffect(() => {
    fetchTodaysEmissions();
  }, []);

  // Calculate total CO2e for today's emissions each time addedItems changes
  useEffect(() => {
    const total = addedItems.reduce((sum, item) => sum + item.total_emissions_kg, 0);
    setTotalCO2e(total);
  }, [addedItems]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setQuantities({});
  };

  const handleQuantityChange = (factorId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [factorId]: Math.max(0, quantity) }));
  };

  const handleSubmit = async () => {
    if (!selectedCategory) {
      setError("Please select a category before submitting.");
      return;
    }

    const categoryFactors = factors[selectedCategory];
    if (!categoryFactors) {
      setError("No emission factors found for the selected category.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

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

          try {
            await axios.post('/calc/emissions/', emissionData, config);
            await fetchTodaysEmissions();
            setError(null); 
          } catch (error) {
            console.error("Error submitting emission:", error);
            setError("Failed to submit emission data. Unauthorized access (401).");
            return;
          }
        }
      }
    }

    setQuantities({});
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setSelectedCategory(null);
    setQuantities({});
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <CO2eGauge value={totalCO2e} />

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
        <Card className="w-full mb-15">
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

      {addedItems.length > 0 && (
        <Card className="mt-6 w-full" style={{marginBottom: 200}}>
          <CardHeader>
            <CardTitle className="text-lg">Today&apos;s Added Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {addedItems.map((item) => {
                // Cross-reference the emission factor ID with factors to get the name
                const factor = Object.values(factors)
                  .flat()
                  .find((f) => f.id === item.emission_factor);
                return (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>{factor ? factor.name : "Unknown Item"}</span>
                    <span>{item.quantity} (Total: {item.total_emissions_kg.toFixed(2)} kg CO2e)</span>
                  </li>
                );
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
