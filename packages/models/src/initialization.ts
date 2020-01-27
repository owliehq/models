import { Model, RegisterModelProperty, DatabaseController, SetDatabaseController } from './engine'
import { ModelPropertyArray, ModelPropertySet, ModelPropertyDate, ModelPropertyNumber, ModelPropertyObject, ModelPropertyBoolean, ModelPropertyString, ModelPropertyMap, ModelPropertyModel } from './modelProperties'

// Initializes all default ModelProperties
export function InitializeModelProperties() {
  RegisterModelProperty(ModelPropertyString, String, true)
  RegisterModelProperty(ModelPropertyNumber, Number, true)
  RegisterModelProperty(ModelPropertyBoolean, Boolean, true)
  RegisterModelProperty(ModelPropertyDate, Date, true)
  RegisterModelProperty(ModelPropertyModel, Model, true)
  RegisterModelProperty(ModelPropertyArray, Array, true)
  RegisterModelProperty(ModelPropertySet, Set, true)
  RegisterModelProperty(ModelPropertyMap, Map, true)
  RegisterModelProperty(ModelPropertyObject, Object, true)
}

export function Initialize(databaseController: DatabaseController | null) {
  InitializeModelProperties()
  SetDatabaseController(databaseController)
}