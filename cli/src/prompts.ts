import inquirer from 'inquirer'

export type PackageManager = 'pnpm' | 'npm' | 'yarn'
export type DatabaseProvider = 'postgresql' | 'mysql' | 'sqlite'

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

export async function askPackageManager(): Promise<PackageManager> {
  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager do you want to use?',
      choices: [
        { name: 'pnpm', value: 'pnpm' },
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
      ],
      default: 'pnpm',
    },
  ])

  return packageManager
}

export async function askUseShadcn(): Promise<boolean> {
  const { useShadcn } = await inquirer.prompt([
    {
      type: 'list',
      name: 'useShadcn',
      message: 'Do you want to install ShadCN UI?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
      default: 0,
    },
  ])
  return useShadcn
}

export async function askUsePrisma(): Promise<boolean> {
  const { usePrisma } = await inquirer.prompt([
    {
      type: 'list',
      name: 'usePrisma',
      message: 'Do you want to install Prisma and initialize it?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
      default: 0,
    },
  ])
  return usePrisma
}

export async function askDatabaseProvider(): Promise<string> {
  const { provider } = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Which database do you want to use with Prisma?',
      choices: [
        { name: 'PostgreSQL', value: 'postgresql' },
        { name: 'MySQL', value: 'mysql' },
        { name: 'SQLite', value: 'sqlite' },
      ],
      default: 'postgresql',
    },
  ])

  return provider
}
