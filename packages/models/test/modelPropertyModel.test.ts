import { Initialize, ModelPropertyModel, Model, registerCallbacks } from '../src/models'

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
  it('works if creating a ModelPropertyModel works', () => {
    let result = true
    try {
      new ModelPropertyModel()
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyModel schema without a model property returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({})
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyModel schema with an invalid model property returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: 42 })
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a ModelPropertyModel schema with a reference model property works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({
        model: myModel,
        reference: true
      })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling createProperty of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      const property = model.createProperty()
      result = property instanceof myModel && property.num === 0 && property.id === ''
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      const myMod = new myModel()
      const clone = model.clone(myMod)
      result = clone !== myMod && clone instanceof myModel
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(null) of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      result = model.clone(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(string) of non reference ModelPropertyModel returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      model.clone('coucou')
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling clone(string) of reference ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({
        model: myModel,
        reference: true
      })
      result = model.clone('coucou') === 'coucou'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      const toDatabase = model.toDatabase(new myModel())
      result = !!toDatabase && Object.keys(toDatabase).length === 2 && toDatabase.num === 0 && toDatabase.id === ''
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(null) of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      result = model.toDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(string) of non reference ModelPropertyModel returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      model.toDatabase('coucou')
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(string) of reference ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({
        model: myModel,
        reference: true
      })
      result = model.toDatabase('coucou') === 'coucou'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling toDatabase(model) of reference ModelPropertyModel returns a string', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({
        model: myModel,
        reference: true
      })

      const modObject = new myModel()
      modObject.id = 'coucou'
      modObject.num = 42

      result = model.toDatabase(modObject) === 'coucou'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      const fromDatabase = model.fromDatabase({ id: 'coucou', num: 42 })
      result =
        !!fromDatabase && fromDatabase instanceof myModel && fromDatabase.num === 42 && fromDatabase.id === 'coucou'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(null) of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      result = model.fromDatabase(null) === null
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(undefined) of ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: myModel })
      const property = model.fromDatabase(undefined)
      result = property instanceof myModel && property.num === 0 && property.id === ''
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase() of ModelPropertyModel with invalid data retunrs an error', () => {
    let result = false
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: 'myModel' })
      model.fromDatabase(42)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(string) of non reference ModelPropertyModel returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({ model: 'myModel' })
      model.fromDatabase('coucou')
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(Boolean) of reference ModelPropertyModel returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({
        model: myModel,
        reference: true
      })
      model.fromDatabase(true)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling fromDatabase(string) of reference ModelPropertyModel works', () => {
    let result = true
    try {
      const model = new ModelPropertyModel()
      model.loadSchema({
        model: myModel,
        reference: true
      })
      result = model.fromDatabase('coucou') === 'coucou'
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if assigning null to a modelProperty assigns null', () => {
    let result = true
    try {
      const model = new mainModel()
      model.model = null
      result = model.model === null
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if assigning a boolean to a reference modelProperty throws an error', () => {
    let result = false
    try {
      const model = new mainModelReference()
      model.model = true
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if assigning a value to a non reference modelProperty returns an error', () => {
    let result = false
    try {
      const model = new mainModel()
      model.model = {}
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if assigning a value to a non reference modelProperty returns an error', () => {
    let result = false
    try {
      const model = new mainModel()
      model.model = {}
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if assigning a value to a populated reference modelProperty works', async () => {
    registerCallbacks('myModel', async (foreignKeyValue: string) => {
      return {
        id: foreignKeyValue,
        num: 10
      }
    })

    let result = true
    try {
      const model = new mainModelReference()
      model.model = 'abc'
      await model.populate('model')
      model.model = 'def'
    } catch (error) {
      console.error(error)
      result = false
    }
    expect(result).toBeTruthy()
  })
})

class myModel extends Model {
  constructor() {
    super()
    this.loadSchema({
      id: String,
      num: Number
    })
  }
}

class mainModel extends Model {
  constructor() {
    super()
    this.loadSchema({
      model: myModel,
    })
  }
}

class mainModelReference extends Model {
  constructor() {
    super()
    this.loadSchema({
      model: {
        type: Model,
        model: myModel,
        reference: true
      }
    })
  }
}
