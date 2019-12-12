import { ModelProperty } from './modelProperty'

export class ModelPropertyString extends ModelProperty {
  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): string | null {
    return ''
  }

  /** Clones 'value' */
  public clone(value: string | null): string | null {
    return value
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: string | null): any {
    return value
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): string | null {
    if (data === undefined) {
      return this.createProperty()
    }
    if (data === null) {
      return null
    }

    if (typeof data !== 'string') {
      throw new Error('Wrong data type in fromDatabase(), "string" expected, got ' + typeof data)
    }
    return data
  }
}
