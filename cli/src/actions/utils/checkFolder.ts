import fs from 'fs-extra'
import inquirer from 'inquirer'
import chalk from 'chalk'

export async function checkAndPrepareFolder(
  targetDir: string,
  projectName: string,
) {
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
}
