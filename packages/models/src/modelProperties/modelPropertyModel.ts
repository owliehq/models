import {IBasicObject} from '../interfaces/basicObject'
import { registeredCallbacks } from '../engine/callbackRegister'
import { Model } from '../engine/model'
import { ModelProperty } from '../engine/modelProperty'

export class ModelPropertyModel extends ModelProperty {
  private _model: new () => Model = Model
  private isReference = false
  private isPopulated = false

  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): any {
    if (this.isReference) {
      return null
    } else {
      return new this._model()
    }
  }

  /**
   *
   * @param value
   */
  public update(value: any) {
    if (value === null) {
      return null
    }

    if (this.isReference) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error('Cannot update a reference ModelPropertyModel with something else than a string')
      }
      this.isPopulated = false
      return value
    }
    throw new Error('Cannot update a non reference ModelPropertyModel')
  }

  /** Clones 'value' */
  public clone(value: any): any {
    if (value === null) {
      return null
    }
    if (typeof value === 'string' || typeof value === 'number') {
      if (!this.isReference) {
        throw new Error('ModelPropertyModel cannot clone a string or number if isReference is false')
      }
      return value
    }
    return value.clone()
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: any): any {
    if (value === null) {
      return null
    }
    if (typeof value === 'string' || typeof value === 'number') {
      if (!this.isReference) {
        throw new Error('ModelPropertyModel cannot toDatabase a string or number if isReference is false')
      }
      return value
    }
    if (this.isReference) {
      return value[value.getForeignKey()]
    }
    return value.toDatabase()
  }

  /**
   *
   * @param value
   */
  public async populate(value: any, path: string | IBasicObject): Promise<any> {
    if (this.isPopulated) {
      const model = value
      const name = model.constructor.name
      const fromPopulation = await registeredCallbacks[name](model[model.getForeignKey().toString()])
      model.loadFromDatabase(fromPopulation)
      await model.populate(path)
      this.isPopulated = true
      return model
    }

    const model = new this._model()
    const name = model.constructor.name
    const fromPopulation = await registeredCallbacks[name](value)
    model.loadFromDatabase(fromPopulation)
    await model.populate(path)
    this.isPopulated = true
    return model
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): any {
    if (data === undefined) {
      return this.createProperty()
    }

    if (data === null) {
      return null
    }

    if (typeof data === 'string' || typeof data === 'number') {
      return this.update(data)
    }

    if (typeof data !== 'object') {
      throw new Error('Wrong data type in fromDatabase(), "Object" expected, got ' + typeof data)
    }

    const model = new this._model()
    model.loadFromDatabase(data)
    return model
  }

  /** Loads the schema in the model Property */
  public loadSchema(schema: IBasicObject) {
    super.loadSchema(schema)
    if (!schema.hasOwnProperty('model')) {
      throw new Error('Defining a "model" property in a ModelPropertyModel is mandatory')
    }

    if (!(schema.model.prototype instanceof Model)) {
      throw new Error('Wrong type for ModelPropertyModel "model" property, should be an inherited Model')
    }

    this._model = schema.model

    if (schema.reference === true) {
      this.isReference = true
    }
  }
}
