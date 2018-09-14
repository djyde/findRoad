import * as path from 'path'
import getLongestRoad from './'

const resolve = (mapName) => path.resolve(__dirname, `../test/fixtures/${mapName}.txt`)

console.time('demo 4x4')
getLongestRoad(resolve('demo'))
console.timeEnd('demo 4x4')

console.time('real 1000x1000')
getLongestRoad(resolve('real'))
console.timeEnd('real 1000x1000')

