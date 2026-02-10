'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  })
  
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { newsletter: true },
  })

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Login:', data)
    setIsLoading(false)
  }

  const onRegister = async (data: RegisterFormData) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Register:', data)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-luxury-black flex">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
          alt="INTERNITY"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-5xl font-display font-light tracking-[0.2em] text-luxury-cream mb-4">
              INTERNITY
            </h2>
            <p className="text-luxury-cream/70 tracking-widest uppercase text-sm">
              Where artistry meets eternity
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo - mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/">
              <h1 className="text-3xl font-display font-light tracking-[0.2em] text-luxury-cream">
                INTERNITY
              </h1>
            </Link>
          </div>

          {/* Toggle */}
          <div className="flex mb-8 border-b border-white/10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 text-center transition-colors relative ${
                isLogin ? 'text-luxury-gold' : 'text-luxury-cream/50 hover:text-luxury-cream'
              }`}
            >
              Sign In
              {isLogin && (
                <motion.div
                  layoutId="auth-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                />
              )}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 text-center transition-colors relative ${
                !isLogin ? 'text-luxury-gold' : 'text-luxury-cream/50 hover:text-luxury-cream'
              }`}
            >
              Create Account
              {!isLogin && (
                <motion.div
                  layoutId="auth-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                />
              )}
            </button>
          </div>

          {isLogin ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={loginForm.handleSubmit(onLogin)}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm text-luxury-cream/70 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-cream/40" />
                  <input
                    {...loginForm.register('email')}
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-luxury-cream/70 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-cream/40" />
                  <input
                    {...loginForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-cream/40 hover:text-luxury-cream"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...loginForm.register('rememberMe')}
                    className="w-4 h-4 accent-luxury-gold"
                  />
                  <span className="text-luxury-cream/70 text-sm">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-luxury-gold text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full luxury-button py-3.5 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={registerForm.handleSubmit(onRegister)}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-cream/70 mb-2">First Name</label>
                  <input
                    {...registerForm.register('firstName')}
                    className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="John"
                  />
                  {registerForm.formState.errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-luxury-cream/70 mb-2">Last Name</label>
                  <input
                    {...registerForm.register('lastName')}
                    className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="Doe"
                  />
                  {registerForm.formState.errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-luxury-cream/70 mb-2">Email</label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="your@email.com"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-luxury-cream/70 mb-2">Password</label>
                <div className="relative">
                  <input
                    {...registerForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 pr-12 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-cream/40 hover:text-luxury-cream"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-luxury-cream/70 mb-2">Confirm Password</label>
                <input
                  {...registerForm.register('confirmPassword')}
                  type="password"
                  className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="••••••••"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...registerForm.register('newsletter')}
                  className="w-4 h-4 accent-luxury-gold mt-0.5"
                />
                <span className="text-luxury-cream/70 text-sm">
                  Subscribe to our newsletter for exclusive offers and new arrivals
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full luxury-button py-3.5 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              <p className="text-luxury-cream/50 text-xs text-center">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="text-luxury-gold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-luxury-gold hover:underline">Privacy Policy</Link>
              </p>
            </motion.form>
          )}

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-luxury-black text-luxury-cream/50 text-sm">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded hover:border-white/30 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-luxury-cream text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded hover:border-white/30 transition-colors">
                <svg className="w-5 h-5" fill="#fff" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-luxury-cream text-sm">Facebook</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
