import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category?: string
  size?: string
  description?: string
  notes?: {
    top: string[]
    middle: string[]
    base: string[]
  }
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  subtotal: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      get subtotal() {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id && i.size === item.size)
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          set({ items: [...items, item] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'internity-cart',
    }
  )
)

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        if (!items.find((i) => i.id === item.id)) {
          set({ items: [...items, item] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      isInWishlist: (id) => get().items.some((item) => item.id === id),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'internity-wishlist',
    }
  )
)

interface UIStore {
  isMenuOpen: boolean
  isSearchOpen: boolean
  showIntro: boolean
  isPageTransitioning: boolean
  toggleMenu: () => void
  closeMenu: () => void
  toggleSearch: () => void
  closeSearch: () => void
  hideIntro: () => void
  startPageTransition: () => void
  endPageTransition: () => void
}

export const useUIStore = create<UIStore>((set, get) => ({
  isMenuOpen: false,
  isSearchOpen: false,
  showIntro: true,
  isPageTransitioning: false,
  toggleMenu: () => set({ isMenuOpen: !get().isMenuOpen }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),
  closeSearch: () => set({ isSearchOpen: false }),
  hideIntro: () => set({ showIntro: false }),
  startPageTransition: () => set({ isPageTransitioning: true }),
  endPageTransition: () => set({ isPageTransitioning: false }),
}))
