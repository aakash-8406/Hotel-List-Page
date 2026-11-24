import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './HotelDetail.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function HotelDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const hotel = useSelector((state) =>
    state.hotels.list.find((h) => h.id === Number(id))
  )

  if (!hotel) {
    return (
      <div className="detail-page">
        <p className="detail-not-found">Hotel not found.</p>
        <button className="btn-back" onClick={() => navigate('/')}>← Back to List</button>
      </div>
    )
  }

  const lat = Number(hotel.latitude)
  const lng = Number(hotel.longitude)

  return (
    <div className="detail-page">

      <button className="btn-back" onClick={() => navigate('/')}>
        ← Back to List
      </button>

      <div className="detail-card">

        {hotel.imagePreview && (
          <img src={hotel.imagePreview} alt={hotel.title} className="detail-img" />
        )}

        <div className="detail-body">
          <h1 className="detail-title">{hotel.title}</h1>
          <p className="detail-desc">{hotel.description}</p>

          <div className="detail-info">
            <div className="detail-row">
              <span className="detail-label">Latitude & Longitude</span>
              <span className="detail-value">{hotel.latitude}, {hotel.longitude}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Price</span>
              <div className="detail-price-stack">
                <span className="detail-price">₹{hotel.price}</span>
                <span className="detail-price-type">{hotel.priceType}</span>
              </div>
            </div>
          </div>

          <div className="detail-map-section">
            <h3 className="detail-map-title">Hotel Location</h3>
            <div className="detail-map">
              <MapContainer
                center={[lat, lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                  <Popup>{hotel.title}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HotelDetail
