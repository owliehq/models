import { InitializeModelProperties, ModelProperty } from '../src/models'

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
  it('works if loading a modelProperty without a default property works', () => {
    let result = true
    try {
      const model = new myModelProperty()
      model.loadSchema({})
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if loading a modelProperty with a default property works', () => {
    let result = true
    try {
      const model = new myModelProperty()
      model.loadSchema({
        default: 0
      })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling modelProperty createProperty without a default property works', () => {
    let result = true
    try {
      const model = new myModelProperty()
      model.loadSchema({})
      result = model.createProperty() === 42
      model.loadSchema({ default: undefined })
      result = model.createProperty() === 42
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling modelProperty createProperty with a default property of type Function works', () => {
    let result = true
    try {
      const model = new myModelProperty()
      model.loadSchema({
        default: () => {
          return 45
        }
      })
      result = model.createProperty() === 45
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if calling modelProperty createProperty with a default property of type Object returns an error', () => {
    let result = false
    try {
      const model = new myModelProperty()
      model.loadSchema({
        default: {}
      })
      model.createProperty()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if calling modelProperty createProperty with a default property of type "Basic Type" returns an error', () => {
    let result = true
    try {
      const model = new myModelProperty()
      model.loadSchema({
        default: 45
      })
      result = model.createProperty() === 45
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('cannot call populate if the modelProperty does not implement it', async () => {
    const model = new myModelProperty()
    let throwedError = false
    try {
      await model.populate('', '')
    } catch (error) {
      throwedError = true
    }
    expect(throwedError).toBeTruthy()
  })
})

class myModelProperty extends ModelProperty {
  protected createEmptyProperty(): number {
    return 42
  }
  public clone(value: number): number {
    return 42
  }
  public toDatabase(value: number) {
    return 42
  }
  public fromDatabase(data: any): number {
    return 42
  }
}
