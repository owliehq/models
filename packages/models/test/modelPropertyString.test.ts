import { InitializeModelProperties, ModelPropertyString } from '../src/models'

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
  it('works if creating a ModelPropertyString works', () => {
    let result = true
    try {
      new ModelPropertyString()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyString schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.createProperty() === ''
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.clone('test') === 'test'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.toDatabase('test') === 'test'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.fromDatabase('test') === 'test'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyString works', () => {
    let result = true
    try {
      const model = new ModelPropertyString()
      result = model.fromDatabase(undefined) === ''
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyString with invalid data returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyString()
      model.fromDatabase(42)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
})
