import { format, formatDistanceToNow } from 'date-fns'
import { useEffect, useRef } from 'react'

function Calendar({ 
  targetDate, 
  handleDateChange, 
  running, 
  remainingSeconds,
  startTimer,
  pauseTimer,
  resetTimer
}) {
  const initialTotalTime = useRef(0)
  
  useEffect(() => {
    if (running && initialTotalTime.current === 0) {
      initialTotalTime.current = remainingSeconds
    }
    if (!running && remainingSeconds === 0) {
      initialTotalTime.current = 0
    }
  }, [running, remainingSeconds])

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600))
    const hours = Math.floor((seconds % (24 * 3600)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${days}d ${hours}h ${minutes}m ${secs}s`
  }

  const handleChange = (e) => {
    const date = new Date(e.target.value)
    handleDateChange(date)
  }

  const getMinDate = () => {
    const now = new Date()
    return format(now, 'yyyy-MM-dd\'T\'HH:mm')
  }

  const progress = initialTotalTime.current > 0 
    ? (remainingSeconds / initialTotalTime.current) * 100 
    : 0

  return (
    <div className="calendar-container">
      {!running && remainingSeconds === 0 ? (
        <div className="date-input">
          <input
            type="datetime-local"
            min={getMinDate()}
            value={targetDate ? format(targetDate, 'yyyy-MM-dd\'T\'HH:mm') : ''}
            onChange={handleChange}
            className="date-picker"
          />
          {targetDate && (
            <p className="date-info">
              Target: {format(targetDate, 'PPP pp')}
              <br />
              ({formatDistanceToNow(targetDate, { addSuffix: true })})
            </p>
          )}
        </div>
      ) : (
        <div className="countdown-display calendar-countdown">
          {formatTime(remainingSeconds)}
        </div>
      )}

      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="controls">
        {running ? (
          <button className="pause" onClick={pauseTimer}>Pause</button>
        ) : remainingSeconds > 0 ? (
          <button className="resume" onClick={startTimer}>Resume</button>
        ) : (
          <button 
            className="start" 
            onClick={startTimer}
            disabled={!targetDate || targetDate <= new Date()}
          >
            Start
          </button>
        )}
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default Calendar