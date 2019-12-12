import { pathExists, ensureDir } from 'fs-extra'

export const createLernaPackage = async (packageName = 'models') => {
  const isLernaExists = await pathExists('./lerna.json')

  if (!isLernaExists) throw new Error()

  await ensureDir(`./packages/${packageName}`)
}
