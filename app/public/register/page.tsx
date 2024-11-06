"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Mail,
  User,
  Calendar,
  MapPin,
  Flag,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== password2) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://v8-senior-2f6a65d2df2a.herokuapp.com/user/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            dob,
            state,
            country: "USA",
            password,
            password2,
          }),
        }
      );

      if (response.ok) {
        router.push("/public/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl bg-white text-gray-900 shadow-xl">
          <CardHeader className="space-y-1 border-b border-gray-200 pb-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-center">
              Register for v8
            </CardTitle>
            <CardDescription className="text-gray-600 text-center">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-gray-700">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="first_name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-gray-700">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="last_name"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-gray-700">
                    Date of Birth
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="dob"
                      placeholder="YYYY-MM-DD"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-700">
                    State
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      id="state"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full pl-10 pr-4 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900 rounded-md h-[42px]"
                    >
                      <option value="">Select your state</option>
                      {STATES.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-gray-700">
                    Country
                  </Label>
                  <div className="relative">
                    <Flag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="country"
                      value="USA"
                      disabled
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2" className="text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password2"
                      type="password"
                      required
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="********"
                      className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/public/login"
                className="text-gray-900 font-semibold hover:underline"
              >
                Log in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
