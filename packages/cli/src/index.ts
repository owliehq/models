#!/usr/bin/env node

import header from './header'
import { askMonorepoTool } from './inquirer'

const run = async (): Promise<void> => {
  header()

  await askMonorepoTool()
}

run()
