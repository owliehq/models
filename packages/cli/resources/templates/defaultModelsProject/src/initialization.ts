import { InitializeModelProperties, RegisterModel, IBasicObject } from '@owlie/models'
import * as Models from './models/index'

/** Initializes the models */
export function initialize() {
  // Init owlie modelProperties
  InitializeModelProperties()

  // Init Models
  for (const key in Models) {
    RegisterModel(key, (Models as IBasicObject)[key])
  }
}
