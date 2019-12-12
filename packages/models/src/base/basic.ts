export interface IBasicObject {
  [key: string]: any
}

export class Base {
  public static newObjectFromObjectType<T>(object: any) {
    const newObject = new (object.constructor as { new (): T })()
    return newObject
  }
}
