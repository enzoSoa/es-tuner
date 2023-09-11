export const getCoordinatesFromAngle = (radius: number, radiant: number): {x:number, y:number} => ({
  x: radius * Math.sin(radiant),
  y: radius * Math.cos(radiant)
})