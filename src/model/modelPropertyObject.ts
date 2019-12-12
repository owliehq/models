import { ModelProperty } from './modelProperty'
import { IBasicObject } from '../base/index'
import { ModelPropertyBuilder } from './modelPropertyBuilder'
export class ModelPropertyObject extends ModelProperty {
  private properties: {
    [key: string]: ModelProperty
  } = {}

  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): Record<string, any> | null {
    const obj: IBasicObject = {}
    Object.keys(this.properties).forEach(key => {
      obj[key] = this.properties[key].createProperty()
    })
    return obj
  }

  /** Clones 'value' */
  public clone(value: IBasicObject | null): Record<string, any> | null {
    if (value === null) {
      return null
    }

    const obj: IBasicObject = {}
    Object.keys(this.properties).forEach(key => {
      obj[key] = this.properties[key].clone(value[key])
    })
    return obj
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: IBasicObject | null): any {
    if (value === null) {
      return null
    }

    const obj: IBasicObject = {}
    Object.keys(this.properties).forEach(key => {
      obj[key] = this.properties[key].toDatabase(value[key])
    })
    return obj
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): Record<string, any> | null {
    if (data === undefined) {
      return this.createProperty()
    }

    if (data === null) {
      return null
    }

    if (typeof data !== 'object') {
      throw new Error('Wrong data type in fromDatabase(), "Object" expected, got ' + typeof data)
    }

    const obj: IBasicObject = {}
    Object.keys(this.properties).forEach(key => {
      obj[key] = this.properties[key].fromDatabase(data[key])
    })
    return obj
  }

  /** Loads the schema in the model Property */
  public loadSchema(schema: IBasicObject) {
    super.loadSchema(schema)
    if (!schema.hasOwnProperty('schema')) {
      throw new Error('Defining a "schema" property in a ModelPropertyObject is mandatory')
    }
    if (!(schema.schema instanceof Object)) {
      throw new Error('Wrong type for ModelPropertyObject "schema" property, should be an Object of the Object schema')
    }
    Object.keys(schema.schema).forEach(key => {
      const modelPropertyBuilder = new ModelPropertyBuilder(schema.schema[key], key)
      this.properties[key] = modelPropertyBuilder.build()
    })
  }
}
