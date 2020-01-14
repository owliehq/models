import { InitializeModelProperties, ModelPropertyArray } from '../src/models'

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
  it('works if creating a ModelPropertyArray works', () => {
    let result = true
    try {
      new ModelPropertyArray()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyArray basic schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyArray advanced schema works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.loadSchema({
        of: String
      })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      const property = model.createProperty()
      result = !!property && property.length === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertyArray containing an Object works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.clone([{}])
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertyArray containing an Array works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.clone([[]])
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of a basic ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      const clone: Array<any> = model.clone([42]) as Array<any>
      result = clone.length === 1 && clone[0] === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of an advanced ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const clone: Array<any> = model.clone([date]) as Array<any>
      result = clone.length === 1 && clone[0] !== date && clone[0].getTime() === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertyArray containing an Object works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.toDatabase([{}])
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertyArray containing an Array works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.toDatabase([[]])
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of basic ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      const toDatabase: Array<any> = model.toDatabase([42]) as Array<any>
      result = toDatabase.length === 1 && toDatabase[0] === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of advanced ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const toDatabase: Array<any> = model.toDatabase([date]) as Array<any>
      result = toDatabase.length === 1 && toDatabase[0] === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of basic ModelPropertyArray containing an Object works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.fromDatabase([{}])
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of basic ModelPropertyArray containing an Array works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.fromDatabase([[]])
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of a basic ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      const fromDatabase: Array<any> = model.fromDatabase([42]) as Array<any>
      result = fromDatabase.length === 1 && fromDatabase[0] === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of an advanced ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      model.loadSchema({ of: Date })
      const date = new Date('1995-12-17T03:24:00')
      const fromDatabase: Array<any> = model.fromDatabase([date.getTime()]) as Array<any>
      result = fromDatabase.length === 1 && fromDatabase[0].getTime() === date.getTime()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyArray works', () => {
    let result = true
    try {
      const model = new ModelPropertyArray()
      const property = model.fromDatabase(undefined)
      result = !!property && property.length === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyArray with invalid data returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyArray()
      model.fromDatabase(42)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling populate() of a ModelPropertyArray with no model makes a deep copy', async () => {

    const model = new ModelPropertyArray()
    const arr = await model.populate([5, 10, 15, {coucou: 15}], '')
    expect(arr).toStrictEqual([5, 10, 15, {coucou: 15}])
  })
  it('works if calling populate(null) of ModelPropertyArray returns null', async () => {

    const model = new ModelPropertyArray()
    const arr = await model.populate(null, '')
    expect(arr).toBe(null)
  })
  it('works if calling populate() with another parameter than an array returns an error', async () => {
    const model = new ModelPropertyArray()
    let throwedError = false
    try {
      await model.populate('', '')
    } catch (error) {
      throwedError = true
    }
    expect(throwedError).toBeTruthy()
  })
})
