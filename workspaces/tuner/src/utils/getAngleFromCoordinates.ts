export const getAngleFromCoordinates = (x: number, y: number) => {
  const angle = Math.atan2(x, y);
  if (angle < 0) {
    return angle + Math.PI * 2;
  }
  return angle;
}

