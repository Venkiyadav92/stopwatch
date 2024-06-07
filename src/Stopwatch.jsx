import React, { useState, useRef, useEffect } from 'react';

function Watch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartClick = () => {
    setIsRunning(true);
  };

  const handleStopClick = () => {
    setIsRunning(false);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="timer">Time: {formatTime(elapsedTime)}</div>
      <div className="buttons">
        {isRunning ? (
          <button onClick={handleStopClick}>Stop</button>
        ) : (
          <button onClick={handleStartClick}>Start</button>
        )}
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
}

export default Watch;