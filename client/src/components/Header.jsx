

import { useState } from 'react'
import {Link} from 'react-router-dom'
import { Brain, Menu, User, X } from 'lucide-react'
import { useSelector } from 'react-redux'
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Multiplayer', href: '/multiplayer' },
]


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const user=useSelector((state)=>state.user.user)
  console.log(user)
 

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Qz Master</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            {/* Dropdown for user options */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative h-8 w-8 rounded-full flex items-center justify-center"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="/avatars/01.png" // Replace with the actual avatar image URL
                  alt="User Avatar"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    
                  </div>
                  <div className="border-t">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
                    <div className="border-t">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="ml-4 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
