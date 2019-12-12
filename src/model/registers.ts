import { IBasicObject } from '../base/index'
import { ModelProperty } from './modelProperty'

export const registeredCallbacks: IBasicObject = {}

export function registerCallbacks(modelName: string, callback: Function) {
  registeredCallbacks[modelName.toString()] = callback
}

export interface IRegisteredModelProperty {
  class: new () => ModelProperty
  managesType: (type: Function) => boolean
}

export const registeredModelProperties: Array<IRegisteredModelProperty> = new Array<IRegisteredModelProperty>()

export function RegisterModelProperty(
  modelPropertyClass: new () => ModelProperty,
  propertyClass: Function,
  forceOverride = false
) {
  const index = registeredModelProperties.findIndex(element => {
    return element.managesType(propertyClass)
  })

  if (index !== -1) {
    if (!forceOverride) {
      throw new Error(
        'A ModelProperty managing "' +
          propertyClass +
          '" already exists. Pass "true" as the "forceOverride" paramter of this function to force overriding the ModelProperty'
      )
    }
    registeredModelProperties[index] = {
      class: modelPropertyClass,
      managesType: (typeClass: Function) => {
        return typeClass === propertyClass
      }
    }
  } else {
    registeredModelProperties.push({
      class: modelPropertyClass,
      managesType: (typeClass: Function) => {
        return typeClass === propertyClass
      }
    })
  }
}
