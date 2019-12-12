import inquirer from 'inquirer'

import { createLernaPackage } from './actions'

export const askMonorepoTool = async (): Promise<void> => {
  const questions = [
    {
      name: 'monorepo',
      message: 'What monorepo tool do you use with your project?',
      type: 'list',
      choices: ['lerna', 'yarn', 'none']
    }
  ]

  const { monorepo: response } = await inquirer.prompt(questions)

  console.log(response)

  switch (response) {
    case 'lerna':
      createLernaPackage()
      break
    case 'yarn':
      throw Error('Not implemented yet!')

    default:
    // do something ?
  }
}
