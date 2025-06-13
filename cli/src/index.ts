import chalk from 'chalk'
import path from 'path'

import { createNextApp } from '@/actions/installers/createNextApp.js'
import { installPrisma } from '@/actions/installers/installPrisma.js'
import { installShadcn } from '@/actions/installers/installShadcn'
import { checkAndPrepareFolder } from '@/actions/utils/checkFolder.js'
import {
  askDatabaseProvider,
  askPackageManager,
  askProjectName,
  askUsePrisma,
  askUseShadcn,
} from '@/prompts.js'

async function main() {
  console.log(chalk.cyanBright('\n🚀 Starting project with create-t3-app\n'))

  const projectName = await askProjectName()
  const currentDir = process.cwd()
  const targetDir = path.join(currentDir, projectName)

  await checkAndPrepareFolder(targetDir, projectName)

  const packageManager = await askPackageManager()

  createNextApp(projectName, packageManager)

  const useShadcn = await askUseShadcn()

  if (useShadcn) {
    installShadcn(targetDir, packageManager)
  }

  const usePrisma = await askUsePrisma()

  if (usePrisma) {
    const provider = await askDatabaseProvider()
    await installPrisma(targetDir, provider, packageManager)
  }

  console.log(chalk.greenBright('\n✅ Project successfully created!'))
  console.log(`\n👉 cd ${projectName}`)
  console.log(`👉 ${packageManager} dev`)
}

main().catch((err) => {
  console.error(chalk.red('❌ Something went wrong:'), err.message)
  process.exit(1)
})
