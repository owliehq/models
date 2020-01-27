import { Model } from './model'

export abstract class DatabaseController {
  /** Returns a list or a single object from the database according to the specified params and modelName
   * @param model Model to query
   * @param params Object of the DatabaseControllerParams form
   *
   * @returns A list of Object or a single object in the database form (not converted into a Model)
  */
  public abstract async query(modelName: String, params: Object) : Promise<any>

  /** Saves the specified model */
  public abstract async save(model: Model) : Promise<any>

  /** Saves all the specified models */
  public abstract async saveAll(models: Array<Model>) : Promise<any>

  /** Removes the specified model */
  public abstract async remove(model: Model) : Promise<any>

  /** Removes all the specified models */
  public abstract async removeAll(models: Array<Model>) : Promise<any>
}

