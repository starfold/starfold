import { ActionIcon } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import { sizes } from '@/app/(frontend)/theme'

export function GitHubLink() {
  return (
    <ActionIcon
      aria-label="GitHub"
      color="gray"
      component="a"
      href="https://github.com/starfold/starfold"
      target="_blank"
      rel="noopener noreferrer"
      size="lg"
      variant="subtle"
    >
      <IconBrandGithub size={sizes.x5} data-testid="icon-github" />
    </ActionIcon>
  )
}
