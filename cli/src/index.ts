import path from 'path'
import { execSync } from 'child_process'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs-extra'

async function main() {
  console.log(chalk.cyanBright('\n🚀 Starting project with create-t3-app\n'))

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What do you want to name your project?',
      default: 'my-app',
    },
  ])

  const currentDir = process.cwd()
  const targetDir = path.join(currentDir, projectName)

  // Check if folder already exists
  if (fs.existsSync(targetDir)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `The folder "${projectName}" already exists. Do you want to overwrite it?`,
        default: false,
      },
    ])

    if (!overwrite) {
      console.log(chalk.red('❌ Installation cancelled.'))
      process.exit(0)
    }

    await fs.remove(targetDir)
  }

  // Step 1: create-next-app in the new folder
  console.log(chalk.cyanBright('\n📦 Creating base project with Next.js\n'))
  execSync(
    `pnpm create next-app ${projectName} -- --typescript --app --tailwind --eslint --no-src-dir`,
    { stdio: ['inherit', 'inherit', 'ignore'] },
  )

  // Step 2: Ask if user wants ShadCN
  const { useShadcn } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useShadcn',
      message: 'Do you want to install ShadCN UI?',
      default: true,
    },
  ])

  if (useShadcn) {
    console.log(chalk.gray('🎨 Installing ShadCN UI...'))
    execSync(`cd ${projectName} && npx shadcn@latest init -y`, {
      stdio: ['inherit', 'inherit', 'ignore'],
    })
  }

  console.log(chalk.greenBright('\n✅ Project successfully created!'))
  console.log(`\n👉 cd ${projectName}`)
  console.log(`👉 pnpm dev\n`)
}

main().catch((err) => {
  console.error(chalk.red('❌ Something went wrong:'), err.message)
  process.exit(1)
})
