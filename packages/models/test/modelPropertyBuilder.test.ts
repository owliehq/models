import {
  InitializeModelProperties,
  ModelPropertyBuilder,
  Model,
  ModelProperty,
  RegisterModelProperty,
  ModelPropertyObject,
  ModelPropertyArray
} from '../src/models'

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
  it('works if creating a ModelPropertyBuilder works', () => {
    let result = true
    try {
      new ModelPropertyBuilder(String, 'test')
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if building a unregistered modelPropertyType from its class returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyBuilder(myType, 'test')
      model.build()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if building a unregistered modelPropertyType from its classic schema form returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyBuilder({ type: myType }, 'test')
      model.build()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if building a registered modelPropertyType from its class works', () => {
    let result = true
    try {
      RegisterModelProperty(myModelProperty, myType)
      const model = new ModelPropertyBuilder(myType, 'test')
      result = model.build() instanceof myModelProperty
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if building a registered modelPropertyType from its classic schema form works', () => {
    let result = true
    try {
      const model = new ModelPropertyBuilder({ type: myType }, 'test')
      result = model.build() instanceof myModelProperty
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if building an Array with more than 1 value returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyBuilder([String, Number], 'test')
      model.build()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if building a valid empty Array works', () => {
    let result = true
    try {
      const model = new ModelPropertyBuilder([], 'test')
      result = model.build() instanceof ModelPropertyArray
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if building a valid filled Array works', () => {
    let result = true
    try {
      const model = new ModelPropertyBuilder([String], 'test')
      result = model.build() instanceof ModelPropertyArray
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if building an Object works', () => {
    let result = true
    try {
      const model = new ModelPropertyBuilder(
        {
          str: String
        },
        'test'
      )
      result = model.build() instanceof ModelPropertyObject
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if building something else than String / Class / Function / Array / Object returns an error', () => {
    let result = false
    try {
      const model = new ModelPropertyBuilder(42, 'test')
      model.build()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
})

class myType {
  private string = 'hello'
  constructor() {}
}

class myModel extends Model {
  constructor() {
    super()
    this.loadSchema({
      num: Number
    })
  }
}

class myModelProperty extends ModelProperty {
  protected createEmptyProperty(): myType {
    return new myType()
  }
  public clone(value: myType): myType {
    return new myType()
  }
  public toDatabase(value: myType) {
    return 42
  }
  public fromDatabase(data: any): myType {
    return new myType()
  }
}
