import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Timer from './components/Timer'
import Calendar from './components/Calendar'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [running, setRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [timerMode, setTimerMode] = useState('clock') // 'clock' or 'calendar'
  const [targetDate, setTargetDate] = useState(null)

  useEffect(() => {
    let interval
    if (running && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(prev => prev - 1)
      }, 1000)
    } else if (remainingSeconds === 0 && running) {
      setRunning(false)
      // Play notification sound when timer ends
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
      audio.play()
    }
    return () => clearInterval(interval)
  }, [running, remainingSeconds])

  const startTimer = () => {
    if (timerMode === 'clock') {
      const seconds = totalSeconds || (time.hours * 3600 + time.minutes * 60 + time.seconds)
      if (seconds > 0) {
        setRunning(true)
        setTotalSeconds(seconds)
        if (!remainingSeconds || remainingSeconds === 0) {
          setRemainingSeconds(seconds)
        }
      }
    } else if (timerMode === 'calendar' && targetDate) {
      const now = new Date()
      const diff = Math.floor((targetDate - now) / 1000)
      if (diff > 0) {
        setRunning(true)
        setRemainingSeconds(diff)
      }
    }
  }

  const pauseTimer = () => {
    setRunning(false)
  }

  const resetTimer = () => {
    setRunning(false)
    setRemainingSeconds(0)
    setTotalSeconds(0)
    setTime({ hours: 0, minutes: 0, seconds: 0 })
    setTargetDate(null)
  }

  const handleTimeChange = (e, field) => {
    const value = parseInt(e.target.value) || 0
    const newTime = { ...time, [field]: value }
    setTime(newTime)
    const newTotalSeconds = newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds
    setTotalSeconds(newTotalSeconds)
    if (!running) {
      setRemainingSeconds(newTotalSeconds)
    }
  }

  const handleDateChange = (date) => {
    setTargetDate(date)
    const now = new Date()
    const diff = Math.floor((date - now) / 1000)
    setTotalSeconds(diff > 0 ? diff : 0)
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="mode-switch">
        <button 
          className={`mode-btn ${timerMode === 'clock' ? 'active' : ''}`}
          onClick={() => setTimerMode('clock')}
        >
          ⏰ Timer
        </button>
        <button 
          className={`mode-btn ${timerMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setTimerMode('calendar')}
        >
          📅 Calendar
        </button>
      </div>
      {timerMode === 'clock' ? (
        <Timer 
          time={time}
          handleTimeChange={handleTimeChange}
          running={running}
          remainingSeconds={remainingSeconds}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
        />
      ) : (
        <Calendar 
          targetDate={targetDate}
          handleDateChange={handleDateChange}
          running={running}
          remainingSeconds={remainingSeconds}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
        />
      )}
    </div>
  )
}

export default App