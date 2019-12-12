import { InitializeModelProperties } from '../src/models'

/**
 * Dummy test
 */
describe('Model', () => {
  it('works if Initialization works', () => {
    let result = true
    try {
      InitializeModelProperties()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
})
