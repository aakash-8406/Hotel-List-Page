import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import HotelList from './pages/HotelList.jsx'
import HotelDetail from './pages/HotelDetail.jsx'
import './App.css'

export default function App() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<HotelList search={search} />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
      </Routes>
    </div>
  )
}