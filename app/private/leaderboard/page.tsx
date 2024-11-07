'use client';

import React, { useState, useEffect } from 'react';
import withAuth from '@/utils/withAuth';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy } from 'lucide-react';
import CustomNavBar from '@/components/custom/CustomNavBar';

interface User {
  id: number;
  fullName: string;
  averageCO2PerDay: number;
  daysOnPlatform: number;
}

const getBadgeColor = (value: number) => {
  const hue = Math.max(0, Math.min(120, 120 - (value / 50) * 120));
  return `hsl(${hue}, 70%, 50%)`;
};

const CO2eBadge: React.FC<{ value: number }> = ({ value }) => {
  const color = getBadgeColor(value);
  return (
    <div
      className="w-16 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
      style={{ backgroundColor: color }}
    >
      {value.toFixed(2)}
    </div>
  );
};

const TopThreeIcon: React.FC<{ rank: number }> = ({ rank }) => {
  const colors = ['text-yellow-400', 'text-gray-400', 'text-amber-600'];
  return <Trophy className={`w-5 h-5 ${colors[rank - 1]}`} />;
};

const LeaderPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found.');
          return;
        }
  
        const config = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };
  

        const response = await axios.get('https://v8-senior-2f6a65d2df2a.herokuapp.com/calc/leaderboard/', config);
        const data = response.data.map((entry: any, index: number) => ({
          id: index + 1,
          fullName: entry.user,
          averageCO2PerDay: entry.average_co2_per_day,
          daysOnPlatform: entry.days_on_platform,
        }));
        setUsers(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Could not fetch leaderboard. Please try again later.');
      }
    };
  
    fetchLeaderboard();
  }, []);
  

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto overflow-hidden mt-5 mb-15">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700">
          <CardTitle className="text-xl sm:text-2xl text-center text-white">
            Top 50 Eco-Warriors
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {error ? (
            <p className="text-red-500 text-center p-4">{error}</p>
          ) : (
            <ScrollArea className="h-[60vh]">
              <ul className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <motion.li
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex justify-between items-center p-4 ${
                      index < 3 ? 'bg-green-50' : 'hover:bg-gray-50'
                    } transition-colors duration-150 ease-in-out`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className={`text-lg font-semibold w-8 text-right flex items-center justify-end ${
                        index < 3 ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {index < 3 && <TopThreeIcon rank={index + 1} />}
                        <span className={index < 3 ? 'ml-2' : ''}>{index + 1}.</span>
                      </span>
                      <div className="flex flex-col">
                        <span className={`font-medium ${
                          index < 3 ? 'text-green-700' : 'text-gray-700'
                        }`}>
                          {user.fullName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user.daysOnPlatform} day{user.daysOnPlatform !== 1 ? 's' : ''} on platform
                        </span>
                      </div>
                    </div>
                    <CO2eBadge value={user.averageCO2PerDay} />
                  </motion.li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
      <CustomNavBar />
    </>
  );
};

export default withAuth(LeaderPage);
