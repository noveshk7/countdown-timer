function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <h1>Countdown Timer</h1>
      <button 
        className="dark-mode-btn"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  )
}

export default Navbar