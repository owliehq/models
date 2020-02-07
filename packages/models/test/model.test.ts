import { Initialize, Model } from '../src/models'

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
  it('works if creating a model with an already defined property without defining "override: true" in the schema of the property returns an error', () => {
    let result = false
    try {
      const model = new Model()
      model.num = 42
      model.loadSchema({
        num: Number
      })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if creating a model with an already defined property without defining "override: true" in the schema of the property returns an error', () => {
    let result = true
    try {
      const model = new Model()
      model.num = 42
      model.loadSchema({
        num: {
          type: Number,
          override: true
        }
      })
      result = model.num === 0
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if cloning a model without loading a schema returns an error', () => {
    let result = false
    try {
      const model = new Model()
      model.clone()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if cloning a model works', () => {
    let result = true
    try {
      const model = new Car()
      const clone = model.clone()
      result = !!clone && clone instanceof Model && clone !== model && clone.name === ''
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase on a model without loading a schema returns an error', () => {
    let result = false
    try {
      const model = new Model()
      model.toDatabase()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase on a model works', () => {
    let result = true
    try {
      const model = new Model()
      model.loadSchema({
        num: Number,
        str: String
      })
      const toDatabase = model.toDatabase()
      result = !!toDatabase && !(toDatabase instanceof Model) && toDatabase.num === 0 && toDatabase.str === ''
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling loadFromDatabase on a model without loading a schema returns an error', () => {
    let result = false
    try {
      const model = new Model()
      model.loadFromDatabase({})
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling loadFromDatabase on a model works', () => {
    let result = true
    try {
      const model = new Model()
      model.loadSchema({
        num: Number,
        str: String
      })
      model.loadFromDatabase({ num: 42, str: 'hello' })
      result = !!model && model instanceof Model && model.num === 42 && model.str === 'hello'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling loadSchema twice on a model works', () => {
    let result = true
    try {
      const model = new Model()
      model.loadSchema({
        num: Number
      })
      model.loadSchema({
        num: {
          type: Number,
          default: 42,
          override: true
        },
        str: String
      })
      result = model.num === 42 && model.str === ''
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })

  it('should return instance of a model when fromDatabase method is called', () => {
    try {
      const car1 = Car.fromDatabase({ name: 'My beautiful car' })
      const car2 = Car.fromDatabase({ name: 'My ugly one' })
      const test = new Test()
      expect(car1.name).toBe('My beautiful car')
      expect(car2.name).toBe('My ugly one')
    } catch (err) {
      console.error(err)
    }
  })
})

class myModelWithAlreadyDefinedProperty extends Model {
  private num = 10
  constructor() {
    super()
    this.loadSchema({
      num: Number
    })
  }
}

class Car extends Model {
  constructor() {
    super()
    this.loadSchema({
      name: String
    })
  }
}

class Test extends Model {
  constructor() {
    super()
    this.loadSchema({
      name: String,
      car: {
        type: Model,
        model: Car,
        reference: true
      }
    })
  }
}
