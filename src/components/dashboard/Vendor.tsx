'use client'

import { generateSendStoreEmail } from '@/graphql/vendor'
import React, { useState } from 'react'

interface ProductDetail {
  name: string
  quantity: number
  price: number
  salePrice: number
}

interface GenerateSendStoreEmailInput {
  email: string
  brand: string
  vendorName: string
  companyName: string
  shippingAddress: string
  cityStateZip: string
  tax: number
  shippingRate: number
  paymentMethod: string
  paymentDate: string
  note: string
  phoneNumber: string
  contactName: string
  contactTitle: string
  contactEmail: string
  products: ProductDetail[]
}

const Vendor = () => {
  const [formData, setFormData] = useState<GenerateSendStoreEmailInput>({
    email: '',
    brand: '',
    vendorName: '',
    companyName: '',
    shippingAddress: '',
    cityStateZip: '',
    tax: 0,
    shippingRate: 0,
    paymentMethod: '',
    paymentDate: '',
    note: '',
    phoneNumber: '',
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    products: [{ name: '', quantity: 1, price: 0, salePrice: 0 }],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tax' || name === 'shippingRate' ? Number(value) : value,
    }))
  }

  const handleProductChange = (
    index: number,
    field: keyof ProductDetail,
    value: string
  ) => {
    const updatedProducts = [...formData.products]
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]:
        field === 'quantity' || field === 'price' || field === 'salePrice'
          ? Number(value)
          : value,
    }
    setFormData((prev) => ({ ...prev, products: updatedProducts }))
  }

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: 1, price: 0, salePrice: 0 }],
    }))
  }

  const handleSendEmail = async () => {
    if (!formData.email || !formData.brand) {
      alert('Please fill in the email and brand name.')
      return
    }

    try {
      const response = await generateSendStoreEmail(formData)
      if (response) {
        alert('✅ Email sent successfully!')
      } else {
        alert('❌ Failed to send email.')
      }
    } catch (error) {
      alert('❌ Error sending email: ' + error)
    }
  }

  return (
    <div className="w-full p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Purchase Order Details</h2>

      {/* Vendor & Contact Info */}
      <div className="grid grid-cols-3 gap-5">
        {[
          'email',
          'brand',
          'vendorName',
          'companyName',
          'shippingAddress',
          'cityStateZip',
          'tax',
          'shippingRate',
          'paymentMethod',
          'paymentDate',
          'note',
          'phoneNumber',
          'contactName',
          'contactTitle',
          'contactEmail',
        ].map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize font-medium">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              name={key}
              value={(formData as any)[key]}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              type={
                key === 'tax' || key === 'shippingRate' ? 'number' : 'text'
              }
            />
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mt-6">Products</h3>
        {formData.products.map((product, index) => (
          <div key={index} className="grid grid-cols-4 gap-5 items-end">
            <div>
              <label className="block font-medium mb-1">Product Name</label>
              <input
                value={product.name}
                onChange={(e) =>
                  handleProductChange(index, 'name', e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, 'quantity', e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleProductChange(index, 'price', e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Sale Price</label>
              <input
                type="number"
                value={product.salePrice}
                onChange={(e) =>
                  handleProductChange(index, 'salePrice', e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-gray-200 text-sm py-2 px-4 rounded hover:bg-gray-300"
        >
          + Add Another Product
        </button>
      </div>

      {/* Send Button */}
      <div className="space-x-4">
        <button
          onClick={handleSendEmail}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Send Email with Attachment
        </button>
      </div>
    </div>
  )
}

export default Vendor
