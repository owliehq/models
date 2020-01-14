import { InitializeModelProperties, ModelPropertySet } from '../src/models'

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
  it('works if creating a ModelPropertySet works', () => {
    let result = true
    try {
      new ModelPropertySet()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertySet basic schema works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertySet advanced schema works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      model.loadSchema({
        of: String
      })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      const property = model.createProperty()
      result = !!property && property.size === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertySet containing an Object returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertySet()
      model.clone(
        new Set<Record<string, any>>([{}])
      )
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertySet containing an Set returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertySet()
      model.clone(
        new Set<Record<string, any>>([[]])
      )
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      const clone = model.clone(new Set([42]))
      result = !!clone && clone.size === 1 && clone.values().next().value === 42
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of an advanced ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const clone = model.clone(new Set([date]))
      result =
        !!clone &&
        clone.size === 1 &&
        clone.values().next().value !== date &&
        (clone.values().next().value as Date).getTime() === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertySet containing an Object returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertySet()
      model.toDatabase(new Set([{}]))
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertySet containing an Set returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertySet()
      model.toDatabase(new Set([[]]))
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      const toDatabase: Set<any> = model.toDatabase(new Set([42])) as Set<any>
      result = toDatabase.size === 1 && toDatabase.values().next().value === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of advanced ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const toDatabase: Set<any> = model.toDatabase(new Set([date])) as Set<any>
      result = toDatabase.size === 1 && toDatabase.values().next().value === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of basic ModelPropertySet containing an Object returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertySet()
      model.fromDatabase(new Set([{}]))
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of basic ModelPropertySet containing an Set returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertySet()
      model.fromDatabase(new Set([[]]))
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of a basic ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      const fromDatabase: Set<any> = model.fromDatabase(new Set([42])) as Set<any>
      result = fromDatabase.size === 1 && fromDatabase.values().next().value === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of an advanced ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const fromDatabase: Set<any> = model.fromDatabase(new Set([date.getTime()])) as Set<any>
      result =
        fromDatabase.size === 1 &&
        fromDatabase
          .values()
          .next()
          .value.getTime() === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertySet works', () => {
    let result = true
    try {
      const model = new ModelPropertySet()
      const property = model.fromDatabase(undefined)
      result = !!property && property.size === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertySet with invalid data returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertySet()
      model.fromDatabase(42)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
})
