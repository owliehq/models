import { InitializeModelProperties, ModelPropertyNumber } from '../src/models'

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
  it('works if creating a ModelPropertyNumber works', () => {
    let result = true
    try {
      new ModelPropertyNumber()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyNumber schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyNumber schema with integer set to true works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      model.loadSchema({ integer: true })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.createProperty() === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.clone(42) === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.toDatabase(42) === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase() of an integer ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      model.loadSchema({
        integer: true
      })
      result = model.toDatabase(42.5) === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(number) of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.fromDatabase(42.5) === 42.5
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(string) of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.fromDatabase('42.5') === 42.5
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      result = model.fromDatabase(undefined) === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of an integer number ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      model.loadSchema({
        integer: true
      })
      result = model.fromDatabase(42.5) === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of an integer string ModelPropertyNumber works', () => {
    let result = true
    try {
      const model = new ModelPropertyNumber()
      model.loadSchema({
        integer: true
      })
      result = model.fromDatabase('42.5') === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyNumber with an invalid string returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyNumber()
      model.loadSchema({
        integer: true
      })
      model.fromDatabase('coucou')
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyNumber with an invalid data type returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyNumber()
      model.loadSchema({
        integer: true
      })
      model.fromDatabase(false)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
})
