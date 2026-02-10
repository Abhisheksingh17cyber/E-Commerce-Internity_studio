'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronLeft, Lock, CreditCard, Truck, Gift, Check, AlertCircle } from 'lucide-react'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'

const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  address: z.string().min(5, 'Please enter your full address'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zipCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  saveInfo: z.boolean().optional(),
  shippingMethod: z.enum(['standard', 'express', 'overnight']),
  cardNumber: z.string().min(16, 'Please enter a valid card number'),
  cardName: z.string().min(2, 'Name on card is required'),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Please use MM/YY format'),
  cvv: z.string().min(3, 'CVV is required'),
  giftMessage: z.string().optional(),
  isGift: z.boolean().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 0 },
  { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 15 },
  { id: 'overnight', name: 'Overnight Shipping', time: 'Next business day', price: 35 },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  const { items, subtotal, clearCart } = useCartStore()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingMethod: 'standard',
      country: 'United States',
      saveInfo: true,
      isGift: false,
    },
  })

  const selectedShipping = watch('shippingMethod')
  const isGift = watch('isGift')
  const shippingCost = shippingMethods.find(m => m.id === selectedShipping)?.price || 0
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-luxury-black pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-luxury-gold/30 flex items-center justify-center mb-6">
              <Truck className="w-8 h-8 text-luxury-gold" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-luxury-cream mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-luxury-cream/60 mb-8">
              Add some luxurious fragrances to your cart before checkout.
            </p>
            <Link href="/products" className="luxury-button">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-luxury-black pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4 max-w-md"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-luxury-cream mb-4">
            Order Confirmed!
          </h1>
          <p className="text-luxury-cream/60 mb-2">
            Thank you for your purchase. Your order has been received.
          </p>
          <p className="text-luxury-gold mb-8">
            Order #INT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-luxury-cream/50 text-sm mb-8">
            You will receive an email confirmation shortly with your order details and tracking information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="luxury-button">
              Continue Shopping
            </Link>
            <Link
              href="/account/orders"
              className="px-8 py-3 border border-luxury-gold/30 text-luxury-cream hover:bg-luxury-gold/10 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div>
            <h1 className="text-3xl font-display font-light tracking-[0.1em] text-luxury-cream mb-8">
              Checkout
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact */}
              <div>
                <h2 className="text-lg font-display text-luxury-cream mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-black text-sm flex items-center justify-center">1</span>
                  Contact
                </h2>
                <div className="space-y-4">
                  <div>
                    <input
                      {...register('email')}
                      placeholder="Email address"
                      className="checkout-input"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('phone')}
                      placeholder="Phone number"
                      className="checkout-input"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-display text-luxury-cream mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-black text-sm flex items-center justify-center">2</span>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('firstName')}
                      placeholder="First name"
                      className="checkout-input"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('lastName')}
                      placeholder="Last name"
                      className="checkout-input"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <input
                      {...register('address')}
                      placeholder="Address"
                      className="checkout-input"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <input
                      {...register('apartment')}
                      placeholder="Apartment, suite, etc. (optional)"
                      className="checkout-input"
                    />
                  </div>
                  <div>
                    <input
                      {...register('city')}
                      placeholder="City"
                      className="checkout-input"
                    />
                    {errors.city && (
                      <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('state')}
                      placeholder="State / Province"
                      className="checkout-input"
                    />
                    {errors.state && (
                      <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('zipCode')}
                      placeholder="ZIP / Postal code"
                      className="checkout-input"
                    />
                    {errors.zipCode && (
                      <p className="text-red-400 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                  <div>
                    <select {...register('country')} className="checkout-input">
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
                
                <label className="flex items-center gap-3 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('saveInfo')}
                    className="w-4 h-4 accent-luxury-gold"
                  />
                  <span className="text-luxury-cream/70 text-sm">Save this information for next time</span>
                </label>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 className="text-lg font-display text-luxury-cream mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-black text-sm flex items-center justify-center">3</span>
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedShipping === method.id
                          ? 'border-luxury-gold bg-luxury-gold/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value={method.id}
                          {...register('shippingMethod')}
                          className="w-4 h-4 accent-luxury-gold"
                        />
                        <div>
                          <p className="text-luxury-cream">{method.name}</p>
                          <p className="text-luxury-cream/50 text-sm">{method.time}</p>
                        </div>
                      </div>
                      <span className="text-luxury-cream">
                        {method.price === 0 ? 'Free' : formatPrice(method.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gift Option */}
              <div className="p-4 border border-white/10 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('isGift')}
                    className="w-4 h-4 accent-luxury-gold"
                  />
                  <Gift className="w-5 h-5 text-luxury-gold" />
                  <span className="text-luxury-cream">This is a gift</span>
                </label>
                
                <AnimatePresence>
                  {isGift && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <textarea
                        {...register('giftMessage')}
                        placeholder="Add a gift message (optional)"
                        rows={3}
                        className="checkout-input mt-4 resize-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-lg font-display text-luxury-cream mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold text-luxury-black text-sm flex items-center justify-center">4</span>
                  Payment
                </h2>
                <div className="p-4 border border-white/10 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 text-luxury-cream/70 text-sm mb-2">
                    <Lock className="w-4 h-4" />
                    <span>All transactions are secure and encrypted</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-luxury-charcoal rounded">
                    <CreditCard className="w-5 h-5 text-luxury-gold" />
                    <span className="text-luxury-cream text-sm">Credit Card</span>
                    <div className="ml-auto flex gap-2">
                      <Image src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa" width={32} height={20} className="opacity-70" />
                      <Image src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="Mastercard" width={32} height={20} className="opacity-70" />
                      <Image src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="Amex" width={32} height={20} className="opacity-70" />
                    </div>
                  </div>
                  
                  <div>
                    <input
                      {...register('cardNumber')}
                      placeholder="Card number"
                      className="checkout-input"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardNumber.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('cardName')}
                      placeholder="Name on card"
                      className="checkout-input"
                    />
                    {errors.cardName && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardName.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register('expiry')}
                        placeholder="MM/YY"
                        className="checkout-input"
                      />
                      {errors.expiry && (
                        <p className="text-red-400 text-sm mt-1">{errors.expiry.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register('cvv')}
                        placeholder="CVV"
                        type="password"
                        maxLength={4}
                        className="checkout-input"
                      />
                      {errors.cvv && (
                        <p className="text-red-400 text-sm mt-1">{errors.cvv.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full luxury-button py-4 text-lg relative overflow-hidden disabled:opacity-70"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
                    />
                    Processing...
                  </span>
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </motion.button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:pl-8 lg:border-l lg:border-white/10">
            <div className="sticky top-28">
              <h2 className="text-lg font-display text-luxury-cream mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto luxury-scrollbar pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded bg-luxury-charcoal flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-luxury-gold rounded-full text-luxury-black text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-luxury-cream truncate">{item.name}</h3>
                      <p className="text-luxury-cream/50 text-sm">{item.size}</p>
                      <p className="text-luxury-cream mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 checkout-input"
                />
                <button className="px-6 border border-luxury-gold/30 text-luxury-cream hover:bg-luxury-gold/10 transition-colors">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 py-4 border-t border-white/10">
                <div className="flex justify-between text-luxury-cream/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-luxury-cream/70">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-luxury-cream/70">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>
              
              <div className="flex justify-between py-4 border-t border-white/10">
                <span className="text-lg text-luxury-cream">Total</span>
                <span className="text-xl font-display text-luxury-gold">{formatPrice(total)}</span>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Lock className="w-5 h-5 mx-auto text-luxury-gold mb-2" />
                    <p className="text-xs text-luxury-cream/50">Secure Checkout</p>
                  </div>
                  <div>
                    <Truck className="w-5 h-5 mx-auto text-luxury-gold mb-2" />
                    <p className="text-xs text-luxury-cream/50">Free Returns</p>
                  </div>
                  <div>
                    <Gift className="w-5 h-5 mx-auto text-luxury-gold mb-2" />
                    <p className="text-xs text-luxury-cream/50">Gift Wrapping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .checkout-input {
          @apply w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors;
        }
      `}</style>
    </div>
  )
}
