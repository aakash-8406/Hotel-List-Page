import './navbar.css'

function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h2 className="nav-logo"><strong>HOTELS</strong></h2>
      <div className="nav-center">
        <input
          type="text"
          placeholder="Search hotels by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nav-search-input"
        />
      </div>
      <div className="nav-buttons">
        <button className="nav-btn nav-btn-primary">Sign Up</button>
      </div>
    </nav>
  )
}

export default Navbar
