'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white text-gray-900 shadow-2xl">
          <CardHeader className="space-y-1 border-b border-gray-200 pb-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">
              Welcome to v8
            </CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="hello@v8.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="pl-10 bg-gray-50 border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-gray-900"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 bg-gray-50 border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-gray-900"
                    placeholder="********"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-600 text-center">
              Don't have an account?{' '}
              <Link href="/public/register" className="text-gray-900 font-semibold hover:underline">
                Register here
              </Link>
            </div>
            <div className="text-sm text-gray-600 text-center">
              <Link href="/public/forgot" className="text-gray-900 font-semibold hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}