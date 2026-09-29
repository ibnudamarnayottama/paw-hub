'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { products } from '@/lib/data'

type CartContextValue = {
  items: Record<string, number>
  count: number
  total: number
  add: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({})

  const value = useMemo<CartContextValue>(() => {
    const entries = Object.entries(items)
    return {
      items,
      count: entries.reduce((sum, [, qty]) => sum + qty, 0),
      total: entries.reduce((sum, [id, qty]) => sum + (products.find((p) => p.id === id)?.price ?? 0) * qty, 0),
      add: (id) => setItems((prev) => ({ ...prev, [id]: Math.min((prev[id] ?? 0) + 1, 20) })),
      remove: (id) =>
        setItems((prev) => {
          const next = { ...prev }
          if ((next[id] ?? 0) <= 1) delete next[id]
          else next[id] -= 1
          return next
        }),
      clear: () => setItems({}),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
