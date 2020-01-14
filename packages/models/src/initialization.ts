import { Model } from './engine/model'
import { RegisterModelProperty } from './engine/modelPropertyRegister'
import { ModelPropertyArray } from './modelProperties/modelPropertyArray'
import { ModelPropertySet } from './modelProperties/modelPropertySet'
import { ModelPropertyDate } from './modelProperties/modelPropertyDate'
import { ModelPropertyNumber } from './modelProperties/modelPropertyNumber'
import { ModelPropertyObject } from './modelProperties/modelPropertyObject'
import { ModelPropertyBoolean } from './modelProperties/modelPropertyBoolean'
import { ModelPropertyString } from './modelProperties/modelPropertyString'
import { ModelPropertyMap } from './modelProperties/modelPropertyMap'
import { ModelPropertyModel } from './modelProperties/modelPropertyModel'

// Initializes all default ModelProperties
export function InitializeModelProperties() {
  RegisterModelProperty(ModelPropertyString, String)
  RegisterModelProperty(ModelPropertyNumber, Number)
  RegisterModelProperty(ModelPropertyBoolean, Boolean)
  RegisterModelProperty(ModelPropertyDate, Date)
  RegisterModelProperty(ModelPropertyModel, Model)
  RegisterModelProperty(ModelPropertyArray, Array)
  RegisterModelProperty(ModelPropertySet, Set)
  RegisterModelProperty(ModelPropertyMap, Map)
  RegisterModelProperty(ModelPropertyObject, Object)
}
