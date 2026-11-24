import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteHotel } from '../store/hotelSlice'
import './HotelCard.css'

function HotelCard({ hotel, onEdit }) {
  const dispatch = useDispatch()

  return (
    <div className="hotel-card">

      <Link to={`/hotel/${hotel.id}`} className="hotel-link">
        <div className="hotel-info">
          {hotel.imagePreview && (
            <img src={hotel.imagePreview} alt={hotel.title} className="hotel-img" />
          )}

          <div className="hotel-text">
            <h3 className="hotel-title">Hotel Name: {hotel.title}</h3>
            <p className="hotel-desc">Description: {hotel.description}</p>

            <div className="hotel-meta">
              <span className="hotel-location">Location: {hotel.latitude}, {hotel.longitude}</span>
              <div className="hotel-price-stack">
                <span className="hotel-price">₹{hotel.price}</span>
                <span className="hotel-price-type">{hotel.priceType || 'Per Night'}</span>
              </div>            </div>
          </div>
        </div>
      </Link>

      <div className="hotel-actions">
        <button className="btn-edit" onClick={() => onEdit(hotel)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => dispatch(deleteHotel(hotel.id))}>
          Delete
        </button>
      </div>

    </div>
  )
}

export default HotelCard
