import {IBasicObject} from '../interfaces/basicObject'
import { ModelProperty } from '../engine/modelProperty'
import { ModelPropertyBuilder } from '../engine/modelPropertyBuilder'

export class ModelPropertyMap extends ModelProperty {
  private _of?: ModelProperty

  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): IBasicObject | null {
    return {}
  }

  /** Clones 'value' */
  public clone(value: IBasicObject | null): IBasicObject | null {
    if (value === null) {
      return null
    }

    const map = {} as IBasicObject
    if (this._of === undefined) {
      Object.entries(value).forEach(property => {
        if (typeof property[1] === 'object') {
          // TODO: if Object or array basic clone by copying everything in the hierarchy
          throw new Error('ModelPropertyMap.clone() : Objects/Arrays are not yet supported')
        }
        map[property[0]] = property[1]
      })
    } else {
      const of = this._of
      Object.entries(value).forEach(property => {
        map[property[0]] = of.clone(property[1])
      })
    }
    return map
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: IBasicObject | null): IBasicObject | null {
    if (value === null) {
      return null
    }

    const map = {} as IBasicObject
    if (this._of === undefined) {
      Object.entries(value).forEach(property => {
        if (typeof property[1] === 'object') {
          // TODO: if Object or array basic clone by copying everything in the hierarchy
          throw new Error('ModelPropertyMap.toDatabase() : Objects/Arrays are not yet supported')
        }
        map[property[0]] = property[1]
      })
    } else {
      const of = this._of
      Object.entries(value).forEach(property => {
        map[property[0]] = of.toDatabase(property[1])
      })
    }
    return map
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): IBasicObject | null {
    if (data === undefined) {
      return this.createProperty()
    }

    if (data === null) {
      return null
    }

    if (typeof data !== 'object') {
      throw new Error('Wrong data type in fromDatabase(), "Object" expected, got ' + typeof data)
    }

    const map = {} as IBasicObject
    if (this._of === undefined) {
      Object.entries(data).forEach(property => {
        if (typeof property[1] === 'object') {
          // TODO: if Object or array basic clone by copying everything in the hierarchy
          throw new Error('ModelPropertyMap.fromDatabase() : Objects/Arrays are not yet supported')
        }
        map[property[0]] = property[1]
      })
    } else {
      const of = this._of
      Object.entries(data).forEach(property => {
        map[property[0]] = of.fromDatabase(property[1])
      })
    }
    return map
  }

  /** Loads the schema in the model Property */
  public loadSchema(schema: IBasicObject) {
    super.loadSchema(schema)
    if (schema.hasOwnProperty('of')) {
      const modelPropertyBuilder = new ModelPropertyBuilder(schema.of, 'of')
      this._of = modelPropertyBuilder.build()
    }
  }
}
