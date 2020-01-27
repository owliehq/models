import {IBasicObject} from '../interfaces/basicObject'
import {newObjectFromObjectType} from '../utils/objectUtils'
import { ModelProperty } from './modelProperty'
import { ModelPropertyBuilder } from './modelPropertyBuilder'
import { databaseController } from './modelContext'

export class Model {
  /** Class properties */
  [key: string]: any

  private __private__: {
    modelProperties: { [key: string]: ModelProperty }
    propertyValues: { [key: string]: any }
    foreignKey: string
    initialized: Boolean
  }

  /** Contructor */
  constructor() {
    this.__private__ = {
      modelProperties: {},
      propertyValues: {},
      foreignKey: 'id',
      initialized: false
    }

    // Configure __private__ property to be hidden
    Object.defineProperty(this, '__private__', {
      configurable: true,
      enumerable: false
    })
  }

  public static async query(params: Object): Promise<any> {
    if (!databaseController) {
      throw new Error('No DatabaseController hase been defined, please define it when calling Models.Initialize()')
    }

    return await databaseController.query(this.name, params)
  }

  public static async saveAll(models: Array<Model>): Promise<any> {
    if (!databaseController) {
      throw new Error('No DatabaseController hase been defined, please define it when calling Models.Initialize()')
    }

    const modelsInstanceOfThis = models.every(model => {
      return model instanceof this
    })

    if (!modelsInstanceOfThis) {
      throw new Error('Some specified models are not object from the expected model class, expected ' + this.name)
    }

    //TODO: check that each model in the array is from the expected Model class
    return await databaseController.saveAll(models)
  }

  public static async removeAll(models: Array<Model>): Promise<any> {
    if (!databaseController) {
      throw new Error('No DatabaseController hase been defined, please define it when calling Models.Initialize()')
    }

    const modelsInstanceOfThis = models.every(model => {
      return model instanceof this
    })

    if (!modelsInstanceOfThis) {
      throw new Error('Some specified models are not object from the expected model class, expected ' + this.name)
    }

    //TODO: check that each model in the array is from the expected Model class
    return await databaseController.removeAll(models)
  }

  public async save(): Promise<any> {
    if (!databaseController) {
      throw new Error('No DatabaseController hase been defined, please define it when calling Models.Initialize()')
    }

    return await databaseController.save(this)
  }

  public async remove(): Promise<any> {
    if (!databaseController) {
      throw new Error('No DatabaseController hase been defined, please define it when calling Models.Initialize()')
    }

    return await databaseController.remove(this)
  }

  /** Returns the foreignKey */
  public getForeignKey(): string {
    return this.__private__.foreignKey
  }

  /** Loads the schema into the model */
  public loadSchema(schema: IBasicObject) {
    // Load all subSchema
    Object.keys(schema).forEach(key => {
      // If there is already a property named 'propertyName' we throw an error
      if (this.hasOwnProperty(key) && (!(schema[key] instanceof Object) || !schema[key].override)) {
        throw new Error(
          `Property "${key}" already exists, use "override: true" in the property schema to force overriding this property`
        )
      }

      //Create modelProperty and store its value
      const modelPropertyBuilder = new ModelPropertyBuilder(schema[key], key)
      this.__private__.modelProperties[key] = modelPropertyBuilder.build()
      this.__private__.propertyValues[key] = this.__private__.modelProperties[key].createProperty()

      const __private__ = this.__private__
      //Create property accessor and set getter and setter hooks
      Object.defineProperty(this, key, {
        set: function(value) {
          __private__.propertyValues[key] = __private__.modelProperties[key].update(value)
        },
        get: function() {
          return __private__.propertyValues[key]
        },
        configurable: true,
        enumerable: true
      })
    })
    this.__private__.initialized = true
  }

  /** Returns a clone of this Model */
  public clone() {
    // Be sure the model is initialized
    if (!this.__private__.initialized) {
      throw new Error('Cannot clone a Model if no schema has been loaded')
    }

    // Create a clone
    const obj: IBasicObject = newObjectFromObjectType(this) //be sure to create an object from the correct class
    Object.keys(this.__private__.modelProperties).forEach(key => {
      obj.__private__.propertyValues[key] = this.__private__.modelProperties[key].clone(this[key])
    })
    return obj
  }

  /** Translate this Model into a database safe form and returns it */
  public toDatabase() {
    if (!this.__private__.initialized) {
      throw new Error('Cannot toDatabase a Model if no schema has been loaded')
    }

    const obj: IBasicObject = {} as IBasicObject
    Object.keys(this.__private__.modelProperties).forEach(key => {
      obj[key] = this.__private__.modelProperties[key].toDatabase(this[key])
    })
    return obj
  }

  /** Loads "data" into this Model, "data" is assumed to have the database form of this object (see toDatabase()) */
  public loadFromDatabase(data: IBasicObject) {
    if (!this.__private__.initialized) {
      throw new Error('Cannot loadFromDatabase a Model if no schema has been loaded')
    }

    Object.keys(this.__private__.modelProperties).forEach(key => {
      this.__private__.propertyValues[key] = this.__private__.modelProperties[key].fromDatabase(data[key])
    })
  }

  /** Loads "data" into a new Model and returns it, "data" is assumed to have the database form of this object (see toDatabase()) */
  public static fromDatabase(data: IBasicObject) {
    const model = new this()
    model.loadFromDatabase(data)
    return model
  }

  /**
   *
   * @param paths
   */
  private deconstructPath(paths: Array<string>): IBasicObject {
    const _paths: IBasicObject = {}

    paths.forEach(path => {
      let currentObject: any = _paths
      path.split('.').forEach(subpath => {
        const _subpath = subpath.trim()
        if (_subpath === '') {
          return
        }
        if (!currentObject[_subpath]) {
          currentObject[_subpath] = {}
        }
        currentObject = currentObject[_subpath]
      })
    })

    return _paths
  }

  /** Populates this model according to the populate string which is of form 'property1 property2 property3.subproperty1' */
  public async populate(populate: string | IBasicObject) {
    if (!this.__private__.initialized) {
      throw new Error('Cannot populate a Model if no schema has been loaded')
    }

    // Get all property paths from the populate string
    let paths = {} as IBasicObject
    if (typeof populate === 'string') {
      paths = this.deconstructPath(populate.split(' '))
    } else {
      paths = populate
    }

    // populate each provided path
    const promises = Object.keys(paths).map(async key => {
      const path: string = paths[key]
      this.__private__.propertyValues[key] = await this.__private__.modelProperties[key].populate(this[key], path)
    })

    await Promise.all(promises)
  }

  /**
   * Function to override the result of console.log()
   * Don't override
   */
  public inspect() {
    /* istanbul ignore next */
    return { ...this }
  }
}
