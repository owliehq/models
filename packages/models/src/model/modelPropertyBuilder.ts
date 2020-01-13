import { IBasicObject } from '../base'
import { registeredModelProperties } from './registers'
import { ModelProperty } from './modelProperty'
import { Model } from './model'

export class ModelPropertyBuilder {
  private _schema: IBasicObject
  private _propertyName: string

  /** The constructor */
  constructor(schema: any, propertyName: string) {
    this._schema = schema
    this._propertyName = propertyName
  }

  /** Builds and returns the ModelProperty according to the setted schema and propertyName */
  public build(): ModelProperty {
    // Detects a Model
    if (this._schema.prototype instanceof Model) {
      const modelSchema: IBasicObject = {
        type: Model,
        model: this._schema
      }
      const modelPropertyBuilder = new ModelPropertyBuilder(modelSchema, this._propertyName)
      return modelPropertyBuilder.build()
    }

    // detects a Class
    if (this._schema instanceof Function) {
      // search for direct value in registeredModelProperties
      const modelProperty = registeredModelProperties.find(registeredModelProperty => {
        return registeredModelProperty.managesType(this._schema as Function)
      })

      // if modelProperty is found then generate the generic schema and default Property
      if (!modelProperty) {
        throw new Error(
          'schemaProperty "' +
            this._propertyName +
            '" contains an unmanaged type, please create a ModelProperty which manages this type and register it. If its a Model, use a string containing the modelname'
        )
      }
      return new modelProperty.class()
    }

    // if is an Array
    if (this._schema instanceof Array) {
      if (this._schema.length > 1) {
        throw new Error('array schemaProperty "' + this._propertyName + '" cannot contain more than one type')
      }
      const arraySchema: IBasicObject = {
        type: Array
      }
      if (this._schema.length === 1) {
        arraySchema['of'] = this._schema[0]
      }
      const modelPropertyBuilder = new ModelPropertyBuilder(arraySchema, this._propertyName)
      return modelPropertyBuilder.build()
    }

    // if is an Object
    if (this._schema instanceof Object) {
      if (!this._schema.hasOwnProperty('type')) {
        const objectSchema: IBasicObject = {
          type: Object,
          schema: this._schema
        }
        const modelPropertyBuilder = new ModelPropertyBuilder(objectSchema, this._propertyName)
        return modelPropertyBuilder.build()
      }

      // search for direct value in registeredModelProperties
      const modelProperty = registeredModelProperties.find(registeredModelProperty => {
        return registeredModelProperty.managesType(this._schema['type'])
      })

      if (!modelProperty) {
        throw new Error(
          'schemaProperty "' +
            this._propertyName +
            '" contains an unmanaged type, please create a ModelProperty which manages this type and register it'
        )
      }

      const obj = new modelProperty.class()
      obj.loadSchema(this._schema)
      return obj
    }
    throw new Error(
      'schemaProperty "' + this._propertyName + '" should be a string / Class / Function / Array / Object'
    )
  }
}
