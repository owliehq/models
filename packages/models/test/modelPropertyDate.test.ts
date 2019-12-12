import { InitializeModelProperties, ModelPropertyDate } from '../src/models'

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
  it('works if creating a ModelPropertyDate works', () => {
    let result = true
    try {
      new ModelPropertyDate()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyBoolean schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      result = model.createProperty() === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      const clone = model.clone(new Date('1995-12-17T03:24:00'))
      if (!clone) {
        result = false
      } else {
        result = clone.getTime() === new Date('1995-12-17T03:24:00').getTime()
      }
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      result = model.toDatabase(new Date('1995-12-17T03:24:00')) === new Date('1995-12-17T03:24:00').getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      const fromDatabase = model.fromDatabase(new Date('1995-12-17T03:24:00').getTime())
      if (!fromDatabase) {
        result = false
      } else {
        result = fromDatabase.getTime() === new Date('1995-12-17T03:24:00').getTime()
      }
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyDate works', () => {
    let result = true
    try {
      const model = new ModelPropertyDate()
      result = model.fromDatabase(undefined) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyDate with invalid data type returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyDate()
      model.fromDatabase(true)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyDate with a malformed string returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyDate()
      model.fromDatabase('string')
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
})
