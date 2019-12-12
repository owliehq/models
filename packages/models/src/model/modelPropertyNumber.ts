import { ModelProperty } from './modelProperty'
import { IBasicObject } from '../base'

export class ModelPropertyNumber extends ModelProperty {
  private isInteger = false
  /** Returns an basic empty property of type managed by the modelProperty */
  protected createEmptyProperty(): number | null {
    return 0
  }

  /** Clones 'value' */
  public clone(value: number | null): number | null {
    return value
  }

  /** Translates 'value' in a database form and returns it*/
  public toDatabase(value: number | null): any {
    if (value === null) {
      return null
    }
    if (this.isInteger) {
      return Math.floor(value.valueOf())
    }
    return value
  }

  /** Translate 'data' from a database form to a property form and returns it */
  public fromDatabase(data: any): number | null {
    if (data === undefined) {
      return this.createProperty()
    }

    if (data === null) {
      return null
    }

    if (typeof data === 'number') {
      let result = data
      if (this.isInteger) {
        result = Math.floor(data)
      }
      return result
    }

    if (typeof data === 'string') {
      let result = 0
      if (this.isInteger) {
        result = parseInt(data)
      } else {
        result = parseFloat(data)
      }
      if (isNaN(result)) {
        throw new Error(
          'Wrong data type in fromDatabase(), expected a number formatted "string", got malformated "string"'
        )
      }
      return result
    }
    throw new Error(
      'Wrong data type in fromDatabase(), "Number" or number formatted "string" expected, got ' + typeof data
    )
  }

  /** Loads the schema in the model Property */
  public loadSchema(schema: IBasicObject) {
    super.loadSchema(schema)
    if (schema.hasOwnProperty('integer') && schema.integer === true) {
      this.isInteger = true
    }
  }
}
