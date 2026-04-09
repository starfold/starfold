'use client'

import { Button, Group } from '@mantine/core'
import { IconArrowUpRight, IconRocket } from '@tabler/icons-react'
import Link from 'next/link'

import { sizes } from '@/app/(frontend)/theme'

import classes from './HeroCTA.module.css'

export function HeroCTA() {
  return (
    <Group gap="md" justify="center">
      <Button
        className={classes.button}
        color="blue"
        component={Link}
        href="/sign-in"
        leftSection={<IconRocket size={sizes.x4} />}
        size="md"
      >
        Get Started
      </Button>

      <Button
        className={classes.button}
        component={Link}
        href="https://github.com/starfold/starfold"
        target="_blank"
        rel="noopener noreferrer"
        rightSection={<IconArrowUpRight size={sizes.x4} />}
        size="md"
      >
        Try Demo
      </Button>
    </Group>
  )
}
