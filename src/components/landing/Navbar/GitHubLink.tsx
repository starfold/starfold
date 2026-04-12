import { ActionIcon } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import { sizes } from '@/app/(frontend)/design'

export function GitHubLink() {
  return (
    <ActionIcon
      aria-label="GitHub"
      color="gray"
      component="a"
      href="https://github.com/starfold/starfold"
      target="_blank"
      rel="noopener noreferrer"
      size={sizes.x8}
      variant="subtle"
    >
      <IconBrandGithub size={sizes.x5} data-testid="icon-github" />
    </ActionIcon>
  )
}
