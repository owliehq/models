import { Initialize } from '../src/models'

/**
 * Dummy test
 */
describe('Model', () => {
  it('works if Initialization works', () => {
    let result = true
    try {
      Initialize(null)
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
})
