'use client'

import React from 'react'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GaugeProps {
  value: number
}

const CO2eGauge: React.FC<GaugeProps> = ({ value = 0 }) => {
  // Calculate the rotation based on the value (0 to 180 degrees)
  const calculateRotation = (val: number) => {
    if (val <= 5.48) return val * (36 / 5.48)
    if (val <= 10.96) return 36 + (val - 5.48) * (36 / 5.48)
    if (val <= 21.92) return 72 + (val - 10.96) * (36 / 10.96)
    if (val <= 32.88) return 108 + (val - 21.92) * (36 / 10.96)
    
    return Math.min(180, 144 + (val - 32.88) * (36 / 10.96))
  }

  const rotation = calculateRotation(value)

  const getRating = (val: number) => {
    if (val <= 5.48) return { text: "Excellent", color: "text-emerald-500" }
    if (val <= 10.96) return { text: "Very Good", color: "text-green-500" }
    if (val <= 21.92) return { text: "Good", color: "text-yellow-500" }
    if (val <= 32.88) return { text: "Fair", color: "text-orange-500" }
    return { text: "Poor", color: "text-red-500" }
  }

  const rating = getRating(value)

  return (
    <Card className="w-full mb-5">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-center">You CO2 Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full max-w-sm mx-auto">
          <svg viewBox="0 0 200 100" className="w-full">
            {/* Gauge background */}
            <path
              d="M20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Colored gauge segments */}
            <path
              d="M20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="25%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="75%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            {/* Needle */}
            <motion.line
              key={rotation}
              x1="100"
              y1="90"
              x2="130"
              y2="20"
              stroke="#000000"
              strokeWidth="1.5"
              initial={{ rotate: 0 }}
              animate={{ rotate: rotation - 90 }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              style={{ originX: "100px", originY: "90px", zIndex: 999 }}
            />
            {/* Center point */}
            <circle cx="100" cy="90" r="5" fill="#000000" />
          </svg>
          {/* Value display */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-center">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-3xl font-bold ${rating.color}`}
            >
              {value.toFixed(2)}
            </motion.div>
            <motion.div
              key={rating.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-lg font-semibold ${rating.color} mb-6`}
            >
              {rating.text}
            </motion.div>
            <div className="text-sm text-muted-foreground">kg CO2e/day</div>
          </div>
        </div>
        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Excellent: ≤ 5.48</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Very Good: 5.49 – 10.96</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Good: 10.97 – 21.92</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Fair: 21.93 – 32.88</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Poor: > 32.88</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CO2eGauge