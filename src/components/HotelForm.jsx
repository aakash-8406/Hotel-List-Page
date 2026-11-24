import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addHotel, updateHotel } from '../store/hotelSlice'
import './HotelForm.css'

const EMPTY_FORM = {
  title: '',
  description: '',
  latitude: '',
  longitude: '',
  price: '',
  priceType: 'Per Night',
  imagePreview: '',
}

function validate(form) {
  const errors = {}

  if (!form.title.trim()) {
    errors.title = 'Hotel name is required.'
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required.'
  }

  if (form.latitude === '') {
    errors.latitude = 'Latitude is required.'
  } else if (Number(form.latitude) < -90 || Number(form.latitude) > 90) {
    errors.latitude = 'Latitude must be between -90 and 90.'
  }

  if (form.longitude === '') {
    errors.longitude = 'Longitude is required.'
  } else if (Number(form.longitude) < -180 || Number(form.longitude) > 180) {
    errors.longitude = 'Longitude must be between -180 and 180.'
  }

  if (form.price === '') {
    errors.price = 'Price is required.'
  } else if (Number(form.price) <= 0) {
    errors.price = 'Price must be greater than 0.'
  }

  if (!form.imagePreview) {
    errors.image = 'Please upload a hotel image.'
  }

  return errors
}

function HotelForm({ editingHotel, onClose }) {
  const dispatch = useDispatch()

  const isEditMode = editingHotel !== null && editingHotel !== undefined

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditMode) {
      setForm({
        title: editingHotel.title,
        description: editingHotel.description,
        latitude: editingHotel.latitude,
        longitude: editingHotel.longitude,
        price: editingHotel.price,
        priceType: editingHotel.priceType || 'Per Night',
        imagePreview: editingHotel.imagePreview,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editingHotel])

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, imagePreview: reader.result })
      setErrors({ ...errors, image: '' })
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const hotelData = {
      title: form.title.trim(),
      description: form.description.trim(),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      price: Number(form.price),
      priceType: form.priceType,
      imagePreview: form.imagePreview,
    }

    if (isEditMode) {
      dispatch(updateHotel({ ...hotelData, id: editingHotel.id }))
    } else {
      dispatch(addHotel(hotelData))
    }

    onClose()
  }

  return (
    <div className="form-card">
      <h2>{isEditMode ? 'Edit Hotel' : 'Add New Hotel'}</h2>

      <form onSubmit={handleSubmit} noValidate>

        <div className="field">
          <label>Hotel Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {errors.image && <p className="error">{errors.image}</p>}
          {form.imagePreview && (
            <img src={form.imagePreview} alt="Hotel preview" className="image-preview" />
          )}
        </div>

        <div className="field">
          <label>Hotel Name</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter Hotel Name"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="field">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the hotel..."
            rows={4}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="field-row">
          <div className="field">
            <label>Latitude</label>
            <input
              type="number"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="Enter a Latitude : -90 to 90"
              step="any"
            />
            {errors.latitude && <p className="error">{errors.latitude}</p>}
          </div>

          <div className="field">
            <label>Longitude</label>
            <input
              type="number"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="Enter a Longitude : -180 to 180"
              step="any"
            />
            {errors.longitude && <p className="error">{errors.longitude}</p>}
          </div>
        </div>

        <div className="field">
          <label>Price (₹)</label>
          <div className="price-field-row">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 150"
              min="1"
              className="price-number-input"
            />
            <select
              name="priceType"
              value={form.priceType}
              onChange={handleChange}
              className="price-type-select"
            >
              <option value="Per Night">Per Night</option>
              <option value="Per Day">Per Day</option>
              <option value="Per Hour">Per Hour</option>
            </select>
          </div>
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {isEditMode ? 'Save Changes' : 'Add Hotel'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default HotelForm
