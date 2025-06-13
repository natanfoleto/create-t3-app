import inquirer from 'inquirer'

export async function askProjectName(): Promise<string> {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What do you want to name your project?',
      default: 'my-app',
    },
  ])

  return projectName
}

export async function askUseShadcn(): Promise<boolean> {
  const { useShadcn } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useShadcn',
      message: 'Do you want to install ShadCN UI?',
      default: true,
    },
  ])

  return useShadcn
}
