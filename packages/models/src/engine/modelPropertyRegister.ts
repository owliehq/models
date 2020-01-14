import { ModelProperty } from './modelProperty'

export interface IRegisteredModelProperty {
  class: new () => ModelProperty
  managesType: (type: Function) => boolean
}

export const registeredModelProperties: Array<IRegisteredModelProperty> = new Array<IRegisteredModelProperty>()

/** Registers a ModelProperty
 * If override is true, then forces the modelProperty to override any previously registered modelProperty for the given propertyClass
 * If override is false, then if a modelProperty has already been registered for the given propertyClass, it returns an error
*/
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
