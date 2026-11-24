export const formatTime = (totalSeconds: number): string => {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return '0:00';
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime && !isNaN(totalTime)) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }

  return '0:00 / 0:00';
};
