import './Sidebar.css'

function Sidebar({ minPrice, maxPrice, onMinChange, onMaxChange, onClear, hasFilter }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Filters</h3>

      <div className="sidebar-section">
        <label className="sidebar-label">Price Range (₹)</label>

        <div className="price-row">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={onMinChange}
            className="price-input"
            min="0"
          />
          <span className="price-sep">—</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={onMaxChange}
            className="price-input"
            min="0"
          />
        </div>
      </div>

      {hasFilter && (
        <button className="btn-clear" onClick={onClear}>
          ✕ Clear Filter
        </button>
      )}
    </aside>
  )
}

export default Sidebar
