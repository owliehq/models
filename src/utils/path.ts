import { IBasicObject } from '../base'

/**
 *
 * @param paths
 */
export function deconstructPath(paths: Array<string>): IBasicObject {
  const _paths: IBasicObject = {}

  paths.forEach(path => {
    let currentObject: any = _paths
    path.split('.').forEach(subpath => {
      const _subpath = subpath.trim()
      if (_subpath === '') {
        return
      }
      if (!currentObject[_subpath]) {
        currentObject[_subpath] = {}
      }
      currentObject = currentObject[_subpath]
    })
  })

  return _paths
}
