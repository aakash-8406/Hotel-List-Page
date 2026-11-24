import { createSlice } from '@reduxjs/toolkit'

const defaultHotels = [
  {
    id: 3,
    title: 'Mountain View Inn',
    description: 'A cozy mountain retreat perfect for nature lovers, with hiking trails and bonfire evenings.',
    latitude: 32.2190,
    longitude: 77.4875,
    price: 3200,
    priceType: 'Per Day',
    imagePreview: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'City Center Suites',
    description: 'Modern business hotel located near the financial district, ideal for corporate travelers.',
    latitude: 19.0760,
    longitude: 72.8777,
    price: 4500,
    priceType: 'Per Night',
    imagePreview: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Heritage Haveli',
    description: 'Experience royal Rajasthani hospitality in a restored 18th-century haveli with authentic decor.',
    latitude: 26.9124,
    longitude: 75.7873,
    price: 6000,
    priceType: 'Per Night',
    imagePreview: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Backpacker\'s Hub',
    description: 'Affordable and clean hostel-style accommodation perfect for solo travelers and budget trips.',
    latitude: 12.9716,
    longitude: 77.5946,
    price: 800,
    priceType: 'Per Night',
    imagePreview: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop',
  },
]

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    list: defaultHotels,
  },
  reducers: {
    addHotel(state, action) {
      state.list.push({ ...action.payload, id: Date.now() })
    },
    updateHotel(state, action) {
      const index = state.list.findIndex((hotel) => hotel.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    deleteHotel(state, action) {
      state.list = state.list.filter((hotel) => hotel.id !== action.payload)
    },
  },
})

export const { addHotel, updateHotel, deleteHotel } = hotelSlice.actions
export default hotelSlice.reducer
