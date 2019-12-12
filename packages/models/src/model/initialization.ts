import { Model } from './model'
import { ModelPropertyArray } from './modelPropertyArray'
import { ModelPropertySet } from './modelPropertySet'
import { ModelPropertyDate } from './modelPropertyDate'
import { ModelPropertyNumber } from './modelPropertyNumber'
import { ModelPropertyObject } from './modelPropertyObject'
import { ModelPropertyBoolean } from './modelPropertyBoolean'
import { ModelPropertyString } from './modelPropertyString'
import { ModelPropertyMap } from './modelPropertyMap'
import { ModelPropertyModel } from './modelPropertyModel'
import { RegisterModelProperty } from './registers'

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
