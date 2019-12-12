import { IBasicObject } from '../base/index'

export abstract class ModelProperty {
  private default?: any

  /** Returns the default property value if no default value is provided in the schema */
  protected abstract createEmptyProperty(): any

  /** Clones 'value' */
  public abstract clone(value: any): any

  /** Translates 'value' in a database form and returns it*/
  public abstract toDatabase(value: any): any

  /** Translate 'data' from a database form to a property form and returns it */
  public abstract fromDatabase(data: any): any

  /** Update the ModelProperty value */
  public update(data: any): any {
    return data
  }

  /** Populates the modelProperty */
  public async populate(value: any, path: string | IBasicObject) {
    throw new Error(`Populate is not implemented for property: ${typeof value}`)
  }

  /** Loads the schema in the model Property */
  public loadSchema(schema: IBasicObject) {
    if (schema.hasOwnProperty('default')) {
      this.default = schema.default
    }
  }

  /** creates and initializes the property */
  public createProperty(): any {
    let property: any = null
    if (!this.hasOwnProperty('default') || this.default === undefined) {
      property = this.createEmptyProperty()
    } else if (this.default instanceof Function) {
      property = this.default()
    } else if (this.default instanceof Object) {
      throw new Error(
        'default property cannot be an object, it should be a basic type (string, number, ...) or a function returning a new object'
      )
    } else {
      property = this.default
    }
    return property
  }
}
