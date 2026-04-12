'use client'

import { ActionIcon, Menu, useMantineColorScheme } from '@mantine/core'
import { useMounted } from '@mantine/hooks'
import {
  IconCheck,
  IconDeviceDesktop,
  IconMoon,
  IconSun,
} from '@tabler/icons-react'
import { sizes } from '@/app/(frontend)/design'

const COLOR_SCHEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: IconSun },
  { value: 'dark', label: 'Dark', icon: IconMoon },
  { value: 'auto', label: 'Auto', icon: IconDeviceDesktop },
] as const

export function ColorSchemeSwitch() {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  if (!useMounted()) {
    return (
      <ActionIcon
        aria-label="Color scheme"
        color="gray"
        size="lg"
        variant="subtle"
      >
        <IconDeviceDesktop size={sizes.x5} />
      </ActionIcon>
    )
  }

  const CurrentIcon =
    /* v8 ignore start */
    COLOR_SCHEME_OPTIONS.find((opt) => opt.value === colorScheme)?.icon ??
    /* v8 ignore stop */
    IconDeviceDesktop

  return (
    <Menu
      arrowOffset={sizes.x3i}
      arrowSize={sizes.x2i}
      position="bottom-end"
      shadow="md"
      withArrow
    >
      <Menu.Target>
        <ActionIcon
          aria-label="Color scheme"
          color="gray"
          size={sizes.x8}
          variant="subtle"
        >
          <CurrentIcon size={sizes.x5} data-testid="icon-colorscheme" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown miw={40 * sizes.x1i}>
        {COLOR_SCHEME_OPTIONS.map((option) => {
          const isSelected = colorScheme === option.value
          const Icon = option.icon
          return (
            <Menu.Item
              key={option.value}
              leftSection={<Icon size={sizes.x4} />}
              rightSection={
                isSelected ? (
                  <IconCheck size={sizes.x4} data-testid="icon-check" />
                ) : null
              }
              onClick={() => setColorScheme(option.value)}
            >
              {option.label}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
