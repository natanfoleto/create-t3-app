import { execSync } from 'child_process'
import chalk from 'chalk'

export function installShadcn(projectPath: string) {
  console.log(chalk.gray('🎨 Installing ShadCN UI...'))

  try {
    execSync(`cd ${projectPath} && npx shadcn@latest init -y`, {
      stdio: ['inherit', 'inherit', 'ignore'],
    })
  } catch (error) {
    console.error(chalk.red('❌ Failed to install ShadCN UI.'))
    process.exit(1)
  }
}
