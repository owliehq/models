import { IBasicObject } from '../interfaces/basicObject'

export const registeredCallbacks: IBasicObject = {}

/** Registers a callback for the given modelName */
export function registerCallbacks(modelName: string, callback: Function) {
  registeredCallbacks[modelName.toString()] = callback
}