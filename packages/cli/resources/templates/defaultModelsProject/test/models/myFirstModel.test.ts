import Models, { MyFirstModel } from '../../src/index'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if we can Initialize the library', () => {
    let result = true
    try {
      Models.initialize()
    } catch (error) {
      result = false
      console.log(error)
    }
    expect(result).toBeTruthy()
  })
  it('works if we can create a MyFirstModel Model', () => {
    let result = true
    try {
      new MyFirstModel()
    } catch (error) {
      result = false
      console.log(error)
    }
    expect(result).toBeTruthy()
  })
})
