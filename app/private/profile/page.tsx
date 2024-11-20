'use client'

import React from 'react'
import withAuth from '@/utils/withAuth';
import { motion } from 'framer-motion'
import { User, Leaf, History, Edit, FileText, Shield, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '@/context/AuthContext'
import CustomNavBar from '@/components/custom/CustomNavBar'

const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Eco Warrior Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <motion.div
            className="relative w-40 h-40 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-24 h-24 text-white" />
            </div>
            <Leaf className="absolute bottom-0 right-0 w-10 h-10 text-green-500 bg-white rounded-full p-2" />
          </motion.div>

          <div className="w-full space-y-4">
            <Button variant="outline" className="w-full justify-start text-gray-500" disabled>
              <History className="mr-2 h-4 w-4" />
              History Data
              <span className="ml-auto text-xs">(Coming Soon)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray-500" disabled>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
              <span className="ml-auto text-xs">(Coming Soon)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray-500" disabled>
              <FileText className="mr-2 h-4 w-4" />
              Terms & Conditions
              <span className="ml-auto text-xs">(Coming Soon)</span>
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray-500" disabled>
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy
              <span className="ml-auto text-xs">(Coming Soon)</span>
            </Button>
            <Button variant="destructive" className="w-full" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
      <CustomNavBar />
    </div>
  )
}

export default withAuth(ProfileScreen);