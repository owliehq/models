import { Model } from '@owlie/models'

/** The schema used for creating a MyFirstModel */
const MyFirstModelSchema = {
  /** The object id */
  id: String,
  /** A Number field */
  num: Number,
  /** a String field */
  str: String
}

/**
 * MyFirstModel description (see MyFirstModelSchema for details)
 */
export class MyFirstModel extends Model {
  constructor() {
    super()
    this.loadSchema(MyFirstModelSchema)
  }
}
