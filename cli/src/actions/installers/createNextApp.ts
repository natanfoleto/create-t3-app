import chalk from 'chalk'

import type { PackageManager } from '@/prompts'
import { runCommand } from '@/utils/exec'

export function createNextApp(
  projectName: string,
  packageManager: PackageManager,
) {
  try {
    runCommand(
      `create next-app ${projectName} -- --typescript --app --tailwind --eslint --no-src-dir`,
      process.cwd(),
      packageManager,
    )
  } catch (error) {
    console.error(chalk.red('❌ Failed to create Next.js project.'))
    process.exit(1)
  }
}
