'use client'

import React, { useState } from 'react'
import { generateSendStoreEmail } from '@/graphql/vendor' // make sure this works correctly

type Props = {
  data: string
}

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

const regex = /[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/gis

function jsonFromString(str: any) {
  const matches = str.match(regex)
  const parsed = Object.assign({}, ...matches.map((m: any) => JSON.parse(m)))
  const _data = [...Object.values(parsed)]
  return _data
}

function GoogleTrendsLine(props: { keyword: string }) {
  return (
    <iframe
      width={'100%'}
      height={420}
      src={`https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22${props.keyword}%22%2C%22geo%22%3A%22PK%22%2C%22time%22%3A%22today%2012-m%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=-300&eq=geo%3DPK%26q%3D${props.keyword}%26hl%3Den%26date%3Dtoday%2012-m`}
    ></iframe>
  )
}

function GoogleTrendsGeo(props: { keyword: string }) {
  return (
    <iframe
      width={'100%'}
      height={420}
      src={`https://trends.google.com:443/trends/embed/explore/GEO_MAP?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22${props.keyword}%22%2C%22geo%22%3A%22PK%22%2C%22time%22%3A%22today%2012-m%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=-300&eq=geo%3DPK%26q%3D${props.keyword}%26hl%3Den%26date%3Dtoday%2012-m`}
    ></iframe>
  )
}

export default function GoogleTrendsGraph(props: Props) {
  const data = jsonFromString(props.data)
  console.log('Data:', data)
  const [formData, setFormData] = useState<GenerateSendStoreEmailInput>({
    email: 'bsai23108126@szabist.pk',
    brand: 'My Brand',
    vendorName: 'My Vendor',
    companyName: 'My Company',
    shippingAddress: '123 Main Street',
    cityStateZip: 'City, ST 12345',
    tax: 5,
    shippingRate: 15,
    paymentMethod: 'Bank Transfer',
    paymentDate: new Date().toISOString().split('T')[0],
    note: 'This is a static note',
    phoneNumber: '1234567890',
    contactName: 'John Doe',
    contactTitle: 'Purchasing Manager',
    contactEmail: 'john@example.com',
    products: [],
  })

  const handleSendOrder = async (item: any) => {
    const payload: GenerateSendStoreEmailInput = {
      ...formData,
      products: [
        {
          name: item.product_name,
          quantity: 1,
          price: item.product_cost,
          salePrice: item.selling_cost,
        },
      ],
    }

    try {
      const response = await generateSendStoreEmail(payload)
      console.log('✅ Order sent successfully:', response)
      alert('Order Sent!')
    } catch (error) {
      console.error('❌ Failed to send order:', error)
      alert('Failed to send order')
    }
  }

  return (
    <div className="p-6 bg-gray-100 drop-shadow-md w-full grid grid-cols-1 gap-5">
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-5 bg-white drop-shadow-md"
        >
          <h3 className="font-semibold">Product Name</h3>
          <span>{item.product_name}</span>

          <h3 className="font-semibold">Product Description</h3>
          <p>{item.short_description}</p>

          <h3 className="font-semibold">Average Rating</h3>
          <span>⭐ {item.average_rating}</span>

          <h3 className="font-semibold">User Review Summary</h3>
          <span>{item.user_review_summary}</span>

          <h3 className="font-semibold">Trending Reason</h3>
          <span>{item.trending_reason}</span>

          <div className="flex gap-5 justify-between items-start">
            <div className="flex gap-5">
              <div>
                <h3 className="font-semibold">Product Cost</h3>
                <span>{item.product_cost}</span>
              </div>
              <div>
                <h3 className="font-semibold">Selling Cost</h3>
                <span>{item.selling_cost}</span>
              </div>
              <div>
                <h3 className="font-semibold">Max Discount</h3>
                <span>
                  {((item.discount_cost * 100) / item.selling_cost).toFixed(2)} %
                </span>
              </div>
            </div>
            <button
              className="bg-green-500 px-4 py-2 rounded-full text-white hover:bg-green-600"
              onClick={() => handleSendOrder(item)}
            >
              Send Purchase Order
            </button>
          </div>

          <div className="flex gap-3 py-5">
            <GoogleTrendsLine keyword={item.product_name} />
            <GoogleTrendsGeo keyword={item.product_name} />
          </div>
        </div>
      ))}
    </div>
  )
}
