'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Dashboard from '@/components/dashboard/Dashboard'
import Products from '@/components/dashboard/Products'
import GoogleTrend from '@/components/dashboard/GoogleTrend'
import Marketing from '@/components/dashboard/Marketing'
import { getProductsByBrand } from '@/graphql/Product'

export const sections = [
  {
    title: 'Overview',
    items: ['Dashboard', 'Product', 'Orders'],
  },
  {
    title: 'Ai Automation',
    items: ['Google Trend', 'Marketing'],
  },
  {
    title: 'Support',
    items: ['History', 'Help & Support'],
  },
]

const Page = () => {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('storeInfo')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (!parsed.ownerName || !parsed.email) {
          window.location.href = '/admin'
          return
        }

        // ✅ Fetch products based on brand (storeName)
        const fetchProducts = async () => {
          const brandName = parsed.storeName
          const result = await getProductsByBrand(brandName)
          console.log('Products:', result)
          setProducts(result)
        }

        fetchProducts()
      } catch (err) {
        window.location.href = '/admin'
      }
    } else {
      window.location.href = '/admin'
    }
  }, [])

  return (
    <div className='flex flex-row'>
      <Sidebar sections={sections} activeItem={activeItem} setActiveItem={setActiveItem} />
      {activeItem === 'Dashboard' && <Dashboard />}
      {activeItem === 'Product' && <Products products={products} />} {/* ✅ Brand based */}
      {activeItem === 'Customers' && <div>Customers Page Content</div>}
      {activeItem === 'Google Trend' && <GoogleTrend />}
      {activeItem === 'Marketing' && <Marketing />}
    </div>
  )
}

export default Page
