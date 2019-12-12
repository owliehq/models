import { InitializeModelProperties, ModelPropertyMap } from '../src/models'

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
  it('works if creating a ModelPropertyMap works', () => {
    let result = true
    try {
      new ModelPropertyMap()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyMap basic schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyMap advanced schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      model.loadSchema({
        of: String
      })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      const property = model.createProperty()
      result = !!property && Object.keys(property).length === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertyMap containing an Object returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyMap()
      model.clone({ test: {} })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertyMap containing an Map returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyMap()
      model.clone({ test: [] })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      const clone = model.clone({ test: 42 })
      result = !!clone && Object.keys(clone).length === 1 && clone.test === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of an advanced ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const clone = model.clone({ test: date })
      result =
        !!clone && Object.keys(clone).length === 1 && clone.test !== date && clone.test.getTime() === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertyMap containing an Object returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyMap()
      model.toDatabase({ test: {} })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertyMap containing an Map returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyMap()
      model.toDatabase({ test: [] })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      const toDatabase = model.toDatabase({ test: 42 })
      result = !!toDatabase && Object.keys(toDatabase).length === 1 && toDatabase.test === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of advanced ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const toDatabase = model.toDatabase({ test: date })
      result = !!toDatabase && Object.keys(toDatabase).length === 1 && toDatabase['test'] === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of basic ModelPropertyMap containing an Object returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyMap()
      model.fromDatabase({ test: {} })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of basic ModelPropertyMap containing an Map returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyMap()
      model.fromDatabase({ test: [] })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of a basic ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      const fromDatabase = model.fromDatabase({ test: 42 })
      result = !!fromDatabase && Object.keys(fromDatabase).length === 1 && fromDatabase.test === 42
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of an advanced ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const fromDatabase = model.fromDatabase({ test: date.getTime() })
      result =
        !!fromDatabase && Object.keys(fromDatabase).length === 1 && fromDatabase.test.getTime() === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyMap works', () => {
    let result = true
    try {
      const model = new ModelPropertyMap()
      const property = model.fromDatabase(undefined)
      result = !!property && Object.keys(property).length === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyMap with invalid data returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyMap()
      model.fromDatabase(42)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
})
