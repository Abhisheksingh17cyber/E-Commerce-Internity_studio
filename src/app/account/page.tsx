'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  User, Package, Heart, MapPin, CreditCard, Settings, LogOut, 
  ChevronRight, Edit2, Plus, Trash2 
} from 'lucide-react'

const menuItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const recentOrders = [
  {
    id: 'INT-9X7K2M',
    date: 'January 15, 2024',
    status: 'Delivered',
    total: 485,
    items: [
      { name: 'Velvet Noir', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200', size: '100ml' },
    ],
  },
  {
    id: 'INT-8P3L5N',
    date: 'December 28, 2023',
    status: 'Delivered',
    total: 295,
    items: [
      { name: 'Midnight Oud', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200', size: '50ml' },
    ],
  },
]

const savedAddresses = [
  {
    id: 1,
    type: 'Home',
    name: 'John Doe',
    address: '123 Madison Avenue, Apt 4B',
    city: 'New York, NY 10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Office',
    name: 'John Doe',
    address: '456 Fifth Avenue, Suite 1200',
    city: 'New York, NY 10018',
    country: 'United States',
    isDefault: false,
  },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    memberSince: 'January 2023',
    tier: 'Gold Member',
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-64 flex-shrink-0"
          >
            {/* User Info */}
            <div className="p-6 border border-white/10 rounded-lg mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                  <User className="w-7 h-7 text-luxury-gold" />
                </div>
                <div>
                  <h2 className="text-luxury-cream font-display">{user.name}</h2>
                  <p className="text-luxury-gold text-sm">{user.tier}</p>
                </div>
              </div>
              <p className="text-luxury-cream/50 text-sm">Member since {user.memberSince}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-luxury-gold/10 text-luxury-gold'
                      : 'text-luxury-cream/70 hover:bg-white/5 hover:text-luxury-cream'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-light tracking-[0.1em] text-luxury-cream mb-2">
                    Welcome back, {user.name.split(' ')[0]}
                  </h1>
                  <p className="text-luxury-cream/60">
                    Manage your account, view orders, and update your preferences.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Orders', value: '12' },
                    { label: 'Wishlist Items', value: '5' },
                    { label: 'Loyalty Points', value: '2,450' },
                    { label: 'Reviews', value: '8' },
                  ].map((stat, index) => (
                    <div key={index} className="p-4 border border-white/10 rounded-lg text-center">
                      <p className="text-2xl font-display text-luxury-gold mb-1">{stat.value}</p>
                      <p className="text-xs text-luxury-cream/50 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-display text-luxury-cream">Recent Orders</h2>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-luxury-gold text-sm hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="p-4 border border-white/10 rounded-lg flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded bg-luxury-charcoal flex-shrink-0">
                          <Image
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-luxury-cream">{order.items[0].name}</p>
                          <p className="text-luxury-cream/50 text-sm">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            order.status === 'Delivered' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                          <p className="text-luxury-cream mt-1">${order.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-light tracking-[0.1em] text-luxury-cream mb-8">
                  Order History
                </h1>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-6 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-luxury-cream font-display">Order #{order.id}</p>
                          <p className="text-luxury-cream/50 text-sm">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-sm ${
                          order.status === 'Delivered' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 py-4 border-t border-white/10">
                        <div className="w-20 h-20 relative rounded bg-luxury-charcoal">
                          <Image
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="text-luxury-cream">{order.items[0].name}</p>
                          <p className="text-luxury-cream/50 text-sm">{order.items[0].size}</p>
                        </div>
                        <p className="ml-auto text-luxury-gold">${order.total}</p>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button className="text-luxury-gold text-sm hover:underline">
                          View Details
                        </button>
                        <button className="text-luxury-cream/50 text-sm hover:text-luxury-cream">
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl md:text-3xl font-display font-light tracking-[0.1em] text-luxury-cream">
                    Saved Addresses
                  </h1>
                  <button className="luxury-button py-2 px-4 flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-6 border rounded-lg relative ${
                        address.isDefault ? 'border-luxury-gold/50' : 'border-white/10'
                      }`}
                    >
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 px-2 py-1 bg-luxury-gold/20 text-luxury-gold text-xs rounded">
                          Default
                        </span>
                      )}
                      <p className="text-luxury-gold text-sm mb-2">{address.type}</p>
                      <p className="text-luxury-cream font-display mb-2">{address.name}</p>
                      <p className="text-luxury-cream/70 text-sm">{address.address}</p>
                      <p className="text-luxury-cream/70 text-sm">{address.city}</p>
                      <p className="text-luxury-cream/70 text-sm">{address.country}</p>
                      <div className="flex gap-4 mt-4">
                        <button className="text-luxury-gold text-sm hover:underline flex items-center gap-1">
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button className="text-red-400 text-sm hover:underline flex items-center gap-1">
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-light tracking-[0.1em] text-luxury-cream mb-4">
                  My Wishlist
                </h1>
                <p className="text-luxury-cream/60 mb-8">
                  View and manage your saved items.
                </p>
                <Link href="/wishlist" className="luxury-button inline-flex items-center gap-2">
                  View Full Wishlist
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-light tracking-[0.1em] text-luxury-cream mb-8">
                  Account Settings
                </h1>
                <div className="space-y-6">
                  <div className="p-6 border border-white/10 rounded-lg">
                    <h3 className="text-luxury-cream font-display mb-4">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-luxury-cream/50 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream focus:outline-none focus:border-luxury-gold/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-luxury-cream/50 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream focus:outline-none focus:border-luxury-gold/50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-luxury-cream/50 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john.doe@email.com"
                          className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream focus:outline-none focus:border-luxury-gold/50"
                        />
                      </div>
                    </div>
                    <button className="luxury-button mt-6">Save Changes</button>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h3 className="text-luxury-cream font-display mb-4">Password</h3>
                    <button className="text-luxury-gold hover:underline">Change Password</button>
                  </div>

                  <div className="p-6 border border-white/10 rounded-lg">
                    <h3 className="text-luxury-cream font-display mb-4">Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Order updates', description: 'Receive updates about your orders' },
                        { label: 'Promotions', description: 'Exclusive deals and new arrivals' },
                        { label: 'Newsletter', description: 'Weekly fragrance tips and stories' },
                      ].map((item, index) => (
                        <label key={index} className="flex items-center justify-between cursor-pointer">
                          <div>
                            <p className="text-luxury-cream">{item.label}</p>
                            <p className="text-luxury-cream/50 text-sm">{item.description}</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5 accent-luxury-gold" />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border border-red-500/20 rounded-lg">
                    <h3 className="text-red-400 font-display mb-2">Delete Account</h3>
                    <p className="text-luxury-cream/50 text-sm mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors rounded">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'payment') && (
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-light tracking-[0.1em] text-luxury-cream mb-8">
                  Payment Methods
                </h1>
                <div className="p-6 border border-dashed border-white/20 rounded-lg text-center">
                  <CreditCard className="w-12 h-12 text-luxury-cream/30 mx-auto mb-4" />
                  <p className="text-luxury-cream/70 mb-4">No payment methods saved yet</p>
                  <button className="luxury-button py-2 px-6 text-sm">Add Payment Method</button>
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  )
}
