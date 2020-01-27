import {
  Initialize,
  RegisterModelProperty,
  ModelProperty,
  registeredModelProperties,
  Model
} from '../src/models'

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
  it('works if registering an already registered ModelProperty without forcing override returns an error', () => {
    let result = false
    try {
      RegisterModelProperty(myModelProperty, Number)
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if registering a ModelProperty works', () => {
    let result = true
    try {
      RegisterModelProperty(myModelProperty, Number, true)
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if registered ModelProperties managesType() works', () => {
    let result = true
    try {
      registeredModelProperties.forEach(modelProperty => {
        const managesNumber = modelProperty.managesType(Number)
        const isMyModelProperty = modelProperty.class === myModelProperty
        if (managesNumber !== isMyModelProperty) {
          result = false
        }
      })
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
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
