'use client'

import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomNavBar from '@/components/custom/CustomNavBar'

const categories = [
  { id: 'food', name: 'Food' },
  { id: 'transport', name: 'Transport' },
  { id: 'energy', name: 'Energy' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'waste', name: 'Waste' },
  { id: 'water', name: 'Water' },
]

const items = {
  food: [
    { id: 'beef', name: 'Beef (100g)', co2e: 2.7 },
    { id: 'chicken', name: 'Chicken (100g)', co2e: 0.69 },
    { id: 'rice', name: 'Rice (100g)', co2e: 0.27 },
  ],
  transport: [
    { id: 'car', name: 'Car (per km)', co2e: 0.192 },
    { id: 'bus', name: 'Bus (per km)', co2e: 0.105 },
    { id: 'train', name: 'Train (per km)', co2e: 0.041 },
  ],
  energy: [
    { id: 'electricity', name: 'Electricity (kWh)', co2e: 0.475 },
    { id: 'natural_gas', name: 'Natural Gas (kWh)', co2e: 0.185 },
    { id: 'lpg', name: 'LPG (kWh)', co2e: 0.215 },
  ],
  shopping: [
    { id: 't_shirt', name: 'T-shirt', co2e: 5.5 },
    { id: 'jeans', name: 'Jeans', co2e: 25 },
    { id: 'shoes', name: 'Shoes', co2e: 14 },
  ],
  waste: [
    { id: 'landfill', name: 'Landfill waste (kg)', co2e: 0.99 },
    { id: 'recycled', name: 'Recycled waste (kg)', co2e: 0.21 },
    { id: 'composted', name: 'Composted waste (kg)', co2e: 0.08 },
  ],
  water: [
    { id: 'tap_water', name: 'Tap water (liter)', co2e: 0.000344 },
    { id: 'bottled_water', name: 'Bottled water (liter)', co2e: 0.215 },
    { id: 'hot_water', name: 'Hot water (liter)', co2e: 0.0135 },
  ],
}

export default function CO2eDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [totalCO2e, setTotalCO2e] = useState(0)
  const [addedItems, setAddedItems] = useState<Record<string, number>>({})

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setQuantities({})
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [itemId]: Math.max(0, quantity) }))
  }

  const handleSubmit = () => {
    if (!selectedCategory) return

    const categoryItems = items[selectedCategory]
    let newAddedItems = { ...addedItems }
    let newTotalCO2e = totalCO2e

    Object.entries(quantities).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        const item = categoryItems.find(i => i.id === itemId)
        if (item) {
          newAddedItems[itemId] = (newAddedItems[itemId] || 0) + quantity
          newTotalCO2e += item.co2e * quantity
        }
      }
    })

    setAddedItems(newAddedItems)
    setTotalCO2e(newTotalCO2e)
    setQuantities({})
    setSelectedCategory(null)
  }

  const handleCancel = () => {
    setSelectedCategory(null)
    setQuantities({})
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
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
            <CardTitle className="text-lg">{categories.find(c => c.id === selectedCategory)?.name} Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items[selectedCategory].map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <Label htmlFor={`quantity-${item.id}`} className="mb-2 sm:mb-0">
                    {item.name} ({item.co2e.toFixed(3)} kg CO2e per unit)
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      value={quantities[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      min="0"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, (quantities[item.id] || 0) + 1)}
                      aria-label={`Add one ${item.name}`}
                      className="ml-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={handleSubmit} className="flex-grow">Submit</Button>
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
              {Object.entries(addedItems).map(([itemId, quantity]) => {
                const category = Object.entries(items).find(([_, items]) => 
                  items.some(item => item.id === itemId)
                )?.[0]
                const item = category ? items[category].find(i => i.id === itemId) : null
                return item ? (
                  <li key={itemId} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>{quantity} (Total: {(item.co2e * quantity).toFixed(2)} kg CO2e)</span>
                  </li>
                ) : null
              })}
            </ul>
          </CardContent>
        </Card>
      )}
      <CustomNavBar />
    </div>
  )
}