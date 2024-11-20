import React from 'react'
import { Instagram } from 'lucide-react'

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">v8</h2>
            <p className="text-sm">Empowering eco-conscious decisions</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors duration-200"
              aria-label="Follow us on X (formerly Twitter)"
            >
              <XIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <Instagram />
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} v8. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer