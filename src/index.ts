import * as path from 'path'
import * as fs from 'fs'

type point = [number, number]

export default (mapFilePath: string) => {

  // format the map file to array
  const mapFile = fs.readFileSync(mapFilePath, 'utf8').split('\n');
  const [ rowLength, colLength ] = mapFile.shift().split(' ')  
  const roadmap = mapFile.map(road => {
    return road.split(' ').filter(Boolean)
  })
  
  const roads = []
  
  const canGo = (current: point, target: point) =>{
    return Number(roadmap[target[0]][target[1]]) < Number(roadmap[current[0]][current[1]])
  }
  
  const findRoad = (p: point, currentRoads: number[] = []) => {
  
    const [ roadIndex, pointIndex ] = p
  
    let current: point = [roadIndex, pointIndex]
  
    let left: point | undefined
    let right: point | undefined
    let top: point | undefined
    let bottom: point | undefined
  
    if (pointIndex !== 0) {
      const val: point = [roadIndex, pointIndex - 1]
      if (canGo(current, val)) {
        left = val
      }
    }
  
    if (pointIndex !== Number(colLength) - 1) {
      const val: point = [roadIndex, pointIndex + 1]
      if (canGo(current, val)) {
        right = val
      }
    }
  
    if (roadIndex !== 0) {
      const val: point = [roadIndex - 1, pointIndex]
      if (canGo(current, val)) {
        top = val
      }
    }
  
    if (roadIndex !== Number(rowLength) - 1) {
      const val: point = [roadIndex + 1, pointIndex]
      if (canGo(current, val)) {
        bottom = val
      }
    }
  
    const c = currentRoads.concat(Number(roadmap[roadIndex][pointIndex]))
  
    if (left) findRoad(left, c)
    if (right) findRoad(right, c)
    if (bottom) findRoad(bottom, c)
    if (top) findRoad(top, c)
  
    if (!left && !right && !bottom && !top) {
      roads.push(c)
    }
  }
  
  roadmap.forEach((road, roadIndex) => {
    road.forEach((point, pointIndex) => {
      const p: point = [roadIndex, pointIndex]
      findRoad(p)
    })
  })
  
  const findLongest = (acc, current, index, roads) => {
  
    if (index === 1) {
      return current
    }
  
    if (current.length > acc.length) {
      return current
    } else if (current.length === acc.length) {
      if (current[0] - current[current.length - 1] > acc[0] - acc[acc.length - 1]) {
        return current
      } else {
        return acc
      }
    } else {
      return acc
    }
  }
  
  const longest = roads.reduce(findLongest)
  
  return longest as number[]
}
