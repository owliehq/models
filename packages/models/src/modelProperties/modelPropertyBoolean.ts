import { ModelProperty } from '../engine/modelProperty'

export class ModelPropertyBoolean extends ModelProperty {
  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): boolean | null {
    return false
  }

  /** Clones 'value' */
  public clone(value: boolean | null): boolean | null {
    return value
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: boolean | null): any {
    return value
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): boolean | null {
    if (data === undefined) {
      return this.createProperty()
    }
    if (data === null) {
      return null
    }
    if (typeof data !== 'boolean') {
      throw new Error('Wrong data type in fromDatabase(), "Boolean", got ' + typeof data)
    }
    return data
  }
}
