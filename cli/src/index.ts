import path from 'path'
import chalk from 'chalk'
import { askProjectName, askUseShadcn } from './prompts.js'
import { checkAndPrepareFolder } from './actions/utils/checkFolder.js'
import { createNextApp } from './actions/installers/createNextApp.js'
import { installShadcn } from './actions/installers/installShadcn.js'

async function main() {
  console.log(chalk.cyanBright('\n🚀 Starting project with create-t3-app\n'))

  const projectName = await askProjectName()
  const currentDir = process.cwd()
  const targetDir = path.join(currentDir, projectName)

  await checkAndPrepareFolder(targetDir, projectName)

  createNextApp(projectName)

  const useShadcn = await askUseShadcn()

  if (useShadcn) {
    installShadcn(targetDir)
  }

  console.log(chalk.greenBright('\n✅ Project successfully created!'))
  console.log(`\n👉 cd ${projectName}`)
  console.log(`👉 pnpm dev\n`)
}

main().catch((err) => {
  console.error(chalk.red('❌ Something went wrong:'), err.message)
  process.exit(1)
})
