import { Initialize, ModelPropertyObject } from '../src/models'
import { IBasicObject } from '../src/interfaces/basicObject'

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
  it('works if creating a ModelPropertyObject works', () => {
    let result = true
    try {
      new ModelPropertyObject()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyBoolean schema witout a schema property returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({})
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyBoolean schema with an invalid schema property returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: 'hello'
      })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyBoolean advanced schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      const property = model.createProperty() as IBasicObject
      result = !!property && property.str === ''
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      const object = model.clone({ str: 'str' }) as IBasicObject
      result = object.str === 'str'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      const object = model.toDatabase({ str: 'str' }) as IBasicObject
      result = object.str === 'str'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      const object = model.fromDatabase({ str: 'str' }) as IBasicObject
      result = object.str === 'str'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyObject works', () => {
    let result = true
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      const property = model.fromDatabase(undefined) as IBasicObject
      result = !!property && property.str === ''
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyObject with invalid data returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyObject()
      model.loadSchema({
        schema: {
          str: String
        }
      })
      model.fromDatabase(42)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
})
