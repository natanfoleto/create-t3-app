import chalk from 'chalk'
import { execSync, StdioOptions } from 'child_process'

import type { PackageManager } from '@/prompts.js'

export function runCommand(
  command: string,
  cwd: string,
  packageManager: PackageManager,
  stdio: StdioOptions = ['inherit', 'inherit', 'ignore'],
) {
  let fullCommand = command

  if (command.startsWith('create next-app')) {
    fullCommand = `${packageManager} ${command}`
  } else if (command.startsWith('add') || command.startsWith('install')) {
    fullCommand = `${packageManager} ${command}`
  } else if (command.startsWith('prisma')) {
    fullCommand = `${packageManager === 'npm' ? 'npx' : 'npx'} ${command}`
  } else if (command.startsWith('shadcn')) {
    fullCommand = `npx ${command}`
  }

  try {
    execSync(fullCommand, {
      cwd,
      stdio,
    })
  } catch (error) {
    console.error(chalk.red(`❌ Failed to run: ${fullCommand}`))
    process.exit(1)
  }
}
