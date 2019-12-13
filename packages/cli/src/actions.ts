import { pathExistsSync, ensureDirSync, copySync } from 'fs-extra'
import replace from 'replace-in-file'

export const createLernaPackage = (packageName = 'models') => {
  const isLernaExists = pathExistsSync('./lerna.json')

  if (!isLernaExists) {
    throw new Error('Current directory is does not contain a lerna.json file')
  }

  ensureDirSync(`./packages/${packageName}`)
  copySync(`${__dirname}/resources/templates/defaultModelsProject`, `./packages/${packageName}`)

  // Replace project name in package.json
  let options = {
    files: [`./packages/${packageName}/package.json`, `./packages/${packageName}/rollup.config.ts`],
    from: '${PROJECT_NAME}',
    to: 'ProjectName'
  }
  replace.sync(options)

  // Replace project author
  options = {
    files: [`./packages/${packageName}/package.json`],
    from: '${PROJECT_AUTHOR}',
    to: 'AuthorName'
  }
  replace.sync(options)

  // Replace project description
  options = {
    files: [`./packages/${packageName}/package.json`],
    from: '${PROJECT_DESCRIPTION}',
    to: 'Description'
  }
  replace.sync(options)
}
