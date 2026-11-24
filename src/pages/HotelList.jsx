import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import HotelForm from '../components/HotelForm.jsx'
import HotelCard from '../components/HotelCard.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Pagination from '../components/pagination.jsx'

const HOTELS_PER_PAGE = 5

function HotelList({ search }) {

  const hotels = useSelector((state) => state.hotels.list)

  const [showForm, setShowForm] = useState(false)
  const [editingHotel, setEditingHotel] = useState(null)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title.toLowerCase().includes(search.toLowerCase())
    const matchesMin = minPrice === '' || hotel.price >= Number(minPrice)
    const matchesMax = maxPrice === '' || hotel.price <= Number(maxPrice)
    return matchesSearch && matchesMin && matchesMax
  })

  const totalPages = Math.ceil(filteredHotels.length / HOTELS_PER_PAGE)
  const startIndex = (currentPage - 1) * HOTELS_PER_PAGE
  const currentHotels = filteredHotels.slice(startIndex, startIndex + HOTELS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [search, minPrice, maxPrice])

  function handleAddClick() {
    setEditingHotel(null)
    setShowForm(true)
  }

  function handleEditClick(hotel) {
    setEditingHotel(hotel)
    setShowForm(true)
  }

  function handleBack() {
    setShowForm(false)
    setEditingHotel(null)
  }

  function handleClearFilter() {
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <div className="page">
      <Helmet>
        <title>Hotel List</title>
        <meta name="description" content="Browse and search hotels. Filter by price, view locations and book your perfect stay." />
        <meta name="keywords" content="hotels, hotel list, book hotel, hotel search" />
      </Helmet>

      {showForm ? (
        <div className="form-view">
          <button className="btn-back" onClick={handleBack}>
            ← Back
          </button>
          <HotelForm editingHotel={editingHotel} onClose={handleBack} />
        </div>

      ) : (

        <div className="layout">

          <Sidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinChange={(e) => setMinPrice(e.target.value)}
            onMaxChange={(e) => setMaxPrice(e.target.value)}
            onClear={handleClearFilter}
            hasFilter={minPrice !== '' || maxPrice !== ''}
          />

          <div className="main-content">
            <div className="page-header">
              <button className="btn-add" onClick={handleAddClick}>
                + Add Hotel
              </button>
            </div>

            {hotels.length === 0 ? (
              <p className="empty-msg">No hotels yet.</p>
            ) : filteredHotels.length === 0 ? (
              <p className="empty-msg">No hotels match your search or filter.</p>
            ) : (
              <>
                <div className="hotel-grid">
                  <h2>Available Hotels</h2>
                  {currentHotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onEdit={handleEditClick}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>

        </div>
      )}

    </div>
  )
}

export default HotelList
