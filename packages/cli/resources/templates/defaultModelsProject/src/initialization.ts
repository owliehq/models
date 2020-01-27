import { Initialize, RegisterModel, IBasicObject } from '@owlie/models'
import * as Models from './models/index'

/** Initializes the models */
export function initialize() {
  // Init owlie modelProperties
  Initialize(null)

  // Init Models
  for (const key in Models) {
    RegisterModel(key, (Models as IBasicObject)[key])
  }
}
