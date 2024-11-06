'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white text-gray-900 shadow-xl">
          <CardHeader className="space-y-1 border-b border-gray-200 pb-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      placeholder="m@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
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
                      Sending...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center text-gray-700">
                <p>If an account exists for that email, we have sent password reset instructions.</p>
                <p className="mt-2">Please check your email.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/public/login" className="text-gray-900 font-semibold hover:underline">
                Log in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}