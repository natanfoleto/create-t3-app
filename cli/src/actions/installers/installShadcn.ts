import chalk from 'chalk'

import type { PackageManager } from '@/prompts'
import { runCommand } from '@/utils/exec'

export function installShadcn(
  projectPath: string,
  packageManager: PackageManager,
) {
  try {
    runCommand('shadcn@latest init -y', projectPath, packageManager)
  } catch (error) {
    console.error(chalk.red('❌ Failed to install ShadCN UI.'))
    process.exit(1)
  }
}
