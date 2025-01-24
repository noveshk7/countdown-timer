function Timer({ 
  time, 
  handleTimeChange, 
  running, 
  remainingSeconds,
  startTimer,
  pauseTimer,
  resetTimer
}) {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const totalTime = time.hours * 3600 + time.minutes * 60 + time.seconds
  const progress = totalTime > 0 ? (remainingSeconds / totalTime) * 100 : 0

  const handleInputFocus = (e) => {
    if (e.target.value === '0') {
      e.target.value = ''
    }
  }

  const handleInputBlur = (e, field) => {
    if (e.target.value === '') {
      handleTimeChange({ target: { value: '0' } }, field)
    }
  }

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const inputs = {
        hours: document.querySelector('input[placeholder="00"]:nth-of-type(1)'),
        minutes: document.querySelector('input[placeholder="00"]:nth-of-type(2)'),
        seconds: document.querySelector('input[placeholder="00"]:nth-of-type(3)')
      }
      const startBtn = document.querySelector('.start')

      switch(field) {
        case 'hours':
          inputs.minutes?.focus()
          break
        case 'minutes':
          inputs.seconds?.focus()
          break
        case 'seconds':
          startBtn?.focus()
          break
      }
    }
  }

  return (
    <div className="timer-container">
      {!running && remainingSeconds === totalTime ? (
        <div className="time-input">
          <div className="input-group">
            <input
              type="number"
              min="0"
              max="23"
              value={time.hours || ''}
              // onChange={(e) => handleTimeChange(e, 'hours')}
              onChange={(e) => e.target.value.length <= 3 && handleTimeChange(e, 'hours')}
              onFocus={handleInputFocus}
              onBlur={(e) => handleInputBlur(e, 'hours')}
              onKeyDown={(e) => handleKeyDown(e, 'hours')}
              placeholder="00"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={time.minutes || ''}
              // onChange={(e) => handleTimeChange(e, 'minutes')}
              onChange={(e) => e.target.value.length <= 3 && handleTimeChange(e, 'minutes')}
              onFocus={handleInputFocus}
              onBlur={(e) => handleInputBlur(e, 'minutes')}
              onKeyDown={(e) => handleKeyDown(e, 'minutes')}
              placeholder="00"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={time.seconds || ''}
              // onChange={(e) => handleTimeChange(e, 'seconds')}
              onChange={(e) => e.target.value.length <= 3 && handleTimeChange(e, 'seconds')}
              onFocus={handleInputFocus}
              onBlur={(e) => handleInputBlur(e, 'seconds')}
              onKeyDown={(e) => handleKeyDown(e, 'seconds')}
              placeholder="00"
            />
          </div>
        </div>
      ) : (
        <div className="countdown-display">
          {formatTime(remainingSeconds)}
        </div>
      )}
      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="controls">
        {running ? (
          <button className="pause" onClick={pauseTimer}>Pause</button>
        ) : remainingSeconds > 0 && remainingSeconds < totalTime ? (
          <button className="resume" onClick={startTimer}>Resume</button>
        ) : (
          <button className="start" onClick={startTimer}>Start</button>
        )}
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default Timer