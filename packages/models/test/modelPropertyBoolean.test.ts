import { Initialize, ModelPropertyBoolean } from '../src/models'

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
  it('works if creating a ModelPropertyBoolean works', () => {
    let result = true
    try {
      new ModelPropertyBoolean()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyBoolean schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.createProperty() === false
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.clone(true) === true
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.toDatabase(true) === true
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of ModelPropertyBoolean with invalid data returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyBoolean()
      model.fromDatabase(42)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.fromDatabase(true) === true
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyBoolean works', () => {
    let result = true
    try {
      const model = new ModelPropertyBoolean()
      result = model.fromDatabase(undefined) === false
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
})
