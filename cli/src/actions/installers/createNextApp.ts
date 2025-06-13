import { execSync } from 'child_process'
import chalk from 'chalk'

export function createNextApp(projectName: string) {
  console.log(chalk.cyanBright('\n📦 Creating base project with Next.js...\n'))

  try {
    execSync(
      `pnpm create next-app ${projectName} -- --typescript --app --tailwind --eslint --no-src-dir`,
      { stdio: ['inherit', 'inherit', 'ignore'] },
    )
  } catch (error) {
    console.error(chalk.red('❌ Failed to create Next.js project.'))
    process.exit(1)
  }
}
