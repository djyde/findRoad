const path = require('path')
const findLongestRoad = require('../lib').default

const resolve = (mapName) => path.resolve(__dirname, `./fixtures/${mapName}.txt`)

describe('roadmap', () => {
  test('demo', () => {
    const longest = findLongestRoad(resolve('demo'))
    expect(longest).toEqual([9, 5, 3, 2, 1])
  })

  test('real', () => {
    const longest = findLongestRoad(resolve('real'))
    expect(longest).toEqual([1422, 1412, 1316, 1304, 1207, 1162, 965, 945, 734, 429, 332, 310, 214, 143, 0])
  })
})