import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'

import type { PackageManager } from '@/prompts'
import { runCommand } from '@/utils/exec'

export async function installPrisma(
  projectPath: string,
  provider: string,
  packageManager: PackageManager,
) {
  try {
    runCommand('add -D prisma', projectPath, packageManager, [
      'ignore',
      'ignore',
      'ignore',
    ])

    runCommand('prisma init', projectPath, packageManager, [
      'ignore',
      'ignore',
      'ignore',
    ])

    // Atualiza o provider no schema.prisma
    const schemaPath = path.join(projectPath, 'prisma', 'schema.prisma')
    if (fs.existsSync(schemaPath)) {
      let schemaContent = await fs.readFile(schemaPath, 'utf-8')

      schemaContent = schemaContent.replace(
        /provider = ".*"/,
        `provider = "${provider}"`,
      )

      await fs.writeFile(schemaPath, schemaContent)
    } else {
      console.warn(
        chalk.yellow('⚠️ Could not find schema.prisma to update provider.'),
      )
    }
  } catch (error) {
    console.error(
      chalk.red('❌ Failed to install or configure Prisma.'),
      (error as Error).message,
    )

    process.exit(1)
  }
}
