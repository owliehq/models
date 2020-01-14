import { ModelProperty } from '../engine/modelProperty'
import {IBasicObject} from '../interfaces/basicObject'
import { ModelPropertyBuilder } from '../engine/modelPropertyBuilder'

export class ModelPropertyArray extends ModelProperty {
  private _of?: ModelProperty

  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): Array<any> | null {
    return []
  }

  /** Clones 'value' */
  public clone(value: Array<any> | null): Array<any> | null {
    // Manage cloning a null value
    if (value === null) {
      return null
    }

    //Manage cloning a array value
    if (this._of === undefined) {
      // If there is no specification of the values format inside the array we just make a simple deep copy
      const arr = value.map(property => {
        if (typeof property === 'object') {
          // Not the optimal solution to deep copy objects, but it will do the trick for now
          return JSON.parse(JSON.stringify(property))
        }
        return property
      })
      return arr
    }

    // If there is a specification of the values format inside the array we clone each array values
    const of = this._of
    const arr = value.map(property => {
      return of.clone(property)
    })
    return arr
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: Array<any> | null): Array<any> | null {
    // Manage translating a null value
    if (value === null) {
      return null
    }

    // Manage translating an array value
    if (this._of === undefined) {
      // If there is no specification of the values format inside the array we just make a simple deep copy
      const arr = value.map(property => {
        if (typeof property === 'object') {
          // Not the optimal solution to deep copy objects, but it will do the trick for now
          return JSON.parse(JSON.stringify(property))
        }
        return property
      })
      return arr
    }

    // If there is a specification of the values format inside the array we translate each array values
    const of = this._of
    const arr = value.map(property => {
      return of.toDatabase(property)
    })
    return arr
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any | null | undefined): Array<any> | null {
    // Manage translating an undefined value
    if (data === undefined) {
      return this.createProperty()
    }

    // Manage translating a null value
    if (data === null) {
      return null
    }

    // Be sure the value is an array
    if (!(data instanceof Array)) {
      throw new Error('Wrong data type in fromDatabase(), "Array" expected, got ' + typeof data)
    }

    // Manage translating an array value
    if (this._of === undefined) {
      // If there is no specification of the values format inside the array we just make a simple deep copy
      const arr = data.map(property => {
        if (typeof property === 'object') {
          // Not the optimal solution to deep copy objects, but it will do the trick for now
          return JSON.parse(JSON.stringify(property))
        }
        return property
      })
      return arr
    }

    // If there is a specification of the values format inside the array we translate each array values
    const of = this._of
    const arr = data.map(property => {
      return of.fromDatabase(property)
    })
    return arr
  }

  /** Loads the schema in the model Property */
  public loadSchema(schema: IBasicObject) {
    super.loadSchema(schema)

    // Manage array specific schema properties
    if (schema.hasOwnProperty('of')) {
      const modelPropertyBuilder = new ModelPropertyBuilder(schema.of, 'of')
      this._of = modelPropertyBuilder.build()
    }
  }

  /** Populates the modelProperty */
  public async populate(value: any, path: string | IBasicObject): Promise<any> {
    // Manage populating a null value
    if (value === null) {
      return null
    }

    // Be sure the value is an array
    if (!(value instanceof Array)) {
      throw new Error('Wrong data type in populate(), "Array" expected, got ' + typeof value)
    }

    // Manage translating an array value
    if (this._of === undefined) {
      // If there is no specification of the values format inside the array we just make a simple deep copy
      const arr = value.map(property => {
        if (typeof property === 'object') {
          // Not the optimal solution to deep copy objects, but it will do the trick for now
          return JSON.parse(JSON.stringify(property))
        }
        return property
      })
      return arr
    }

    // If there is a specification of the values format inside the array we populate each array values
    const of = this._of
    const promises = value.map(async property => {
      return of.populate(property, path)
    })
    const arr = await Promise.all(promises)
    return arr
  }
}
