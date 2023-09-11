const getLeftTravelDistance = (current: number, target: number) => {
  if (target < current) {
    return current - target;
  }
  return current + (Math.PI * 2 - target);
}

const getDiff = (current: number, target: number) => {
  const rightTravelDistance = target - current;
  const leftTravelDistance = getLeftTravelDistance(current, target);
  
  if (leftTravelDistance < rightTravelDistance) { 
    return -leftTravelDistance;
  }
  return rightTravelDistance;
}

export const getCloserAngle = (current: number, target: number) => {
  const diff = getDiff(current, target)

  if (-0.0001 < diff && diff < 0.0001) {
    return target
  }
  return current + diff / 20
}