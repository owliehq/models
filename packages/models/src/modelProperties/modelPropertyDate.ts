import { ModelProperty } from '../engine/modelProperty'

export class ModelPropertyDate extends ModelProperty {
  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): Date | null {
    return null
  }

  /** Clones 'value' */
  public clone(value: Date | null): Date | null {
    if (value === null) {
      return null
    }
    return new Date(value)
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: Date | null): any {
    if (value === null) {
      return null
    }
    return value.getTime()
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): Date | null {
    if (data === undefined) {
      return this.createProperty()
    }

    if (data === null) {
      return null
    }

    if (typeof data !== 'string' && typeof data !== 'number') {
      throw new Error('Wrong data type in fromDatabase(), "string" or "number" expected, got ' + typeof data)
    }

    const result = new Date(data)
    if (isNaN(result.getTime())) {
      throw new Error('Wrong data type in fromDatabase(), got malformated "string" or invalid "number"')
    }
    return result
  }
}
