import { ModelProperty } from './modelProperty'
import { IBasicObject } from '../base/index'
import { ModelPropertyBuilder } from './modelPropertyBuilder'

export class ModelPropertySet extends ModelProperty {
  private _of?: ModelProperty

  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): Set<any> | null {
    return new Set<any>()
  }

  /** Clones 'value' */
  public clone(value: Set<any> | null): Set<any> | null {
    if (value === null) {
      return null
    }

    const arr = new Set<any>()
    if (this._of === undefined) {
      value.forEach(property => {
        if (typeof property === 'object') {
          // TODO: if Object or array basic clone by copying everything in the hierarchy
          throw new Error('ModelPropertySet.clone() : Objects/Arrays are not yet supported')
        }
        arr.add(property)
      })
    } else {
      const of = this._of
      value.forEach(property => {
        arr.add(of.clone(property))
      })
    }
    return arr
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: Set<any> | null): Set<any> | null {
    if (value === null) {
      return null
    }

    const arr = new Set()
    if (this._of === undefined) {
      value.forEach(property => {
        if (typeof property === 'object') {
          // TODO: if Object or array basic clone by copying everything in the hierarchy
          throw new Error('ModelPropertySet.toDatabase() : Objects/Arrays are not yet supported')
        }
        arr.add(property)
      })
    } else {
      const of = this._of
      value.forEach(property => {
        arr.add(of.toDatabase(property))
      })
    }
    return arr
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): Set<any> | null {
    if (data === undefined) {
      return this.createProperty()
    }

    if (data === null) {
      return null
    }

    if (!(data instanceof Set)) {
      throw new Error('Wrong data type in fromDatabase(), "Set" expected, got ' + typeof data + ' : ' + data)
    }

    const arr = new Set<any>()
    if (this._of === undefined) {
      data.forEach(property => {
        if (typeof property === 'object') {
          // TODO: if Object or array basic clone by copying everything in the hierarchy
          throw new Error('ModelPropertySet.fromDatabase() : Objects/Arrays are not yet supported')
        }
        arr.add(property)
      })
    } else {
      const of = this._of
      data.forEach(property => {
        arr.add(of.fromDatabase(property))
      })
    }
    return arr
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
