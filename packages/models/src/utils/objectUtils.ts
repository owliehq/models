/**
 *  Returns a new Object of the same type as the object passed in argument.
 *  Becomes handy when we want to make a new object of a type we don't actually know
 *
 * @export
 * @template T
 * @param {*} object
 * @returns
 */
export function newObjectFromObjectType<T>(object: any) {
  const newObject = new (object.constructor as { new (): T })()
  return newObject
}
