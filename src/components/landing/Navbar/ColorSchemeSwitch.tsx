'use client'

import {
  Center,
  type MantineColorScheme,
  SegmentedControl,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core'
import { useMounted } from '@mantine/hooks'
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react'
import { sizes } from '@/app/(frontend)/design'

type ColorSchemeSwitchSegmentedControlProps = {
  value?: MantineColorScheme
  onChange?: (value: MantineColorScheme) => void
}

function ColorSchemeSwitchSegmentedControl({
  value,
  onChange,
}: ColorSchemeSwitchSegmentedControlProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={onChange}
      h={sizes.x8}
      styles={{
        label: {
          paddingTop: sizes.x1,
          paddingBottom: sizes.x1,
        },
      }}
      data={[
        {
          value: 'light',
          label: (
            <Center>
              <Tooltip label="Light mode">
                <IconSun size={sizes.x4} />
              </Tooltip>
            </Center>
          ),
        },
        {
          value: 'dark',
          label: (
            <Center>
              <Tooltip label="Dark mode">
                <IconMoon size={sizes.x4} />
              </Tooltip>
            </Center>
          ),
        },
        {
          value: 'auto',
          label: (
            <Center>
              <Tooltip label="System preference">
                <IconDeviceDesktop size={sizes.x4} />
              </Tooltip>
            </Center>
          ),
        },
      ]}
      aria-label="Select color scheme"
    />
  )
}

export function ColorSchemeSwitch() {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  if (!useMounted()) {
    // Avoid hydration mismatch by rendering a non-interactive version on the
    // server
    return <ColorSchemeSwitchSegmentedControl />
  }

  return (
    <ColorSchemeSwitchSegmentedControl
      value={colorScheme}
      onChange={setColorScheme}
    />
  )
}
