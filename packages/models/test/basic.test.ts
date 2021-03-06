import { newObjectFromObjectType } from '../src/utils/objectUtils'

/**
 * Dummy test
 */
describe('Model', () => {
  it('works if Base newObjectFromObjectType works', () => {
    let result = true
    try {
      const obj = new myObject()
      const newObj = newObjectFromObjectType(obj)
      if (!(newObj instanceof myObject)) {
        result = false
      }
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
})

class myObject {
  private test = 'lol'
  private test2 = 'lol'
}
