const getDiff = (current: number, target: number) => {
  if (current + Math.PI < target) {
    return target - (current + Math.PI * 2)
  } 
  return target - current
}

export const getCloserAngle = (current: number, target: number) => {
  const diff = getDiff(current, target)

  if (-0.001 < diff && diff < 0.001) {
    return target
  }
  return current + diff / 15
}