'use client'

import {
  alpha,
  Box,
  Center,
  type CenterProps,
  Flex,
  Group,
  PasswordInput,
  Stack,
  Switch,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core'
import { useMounted } from '@mantine/hooks'
import {
  IconBrandGmail,
  IconBrandMailgun,
  IconBrandTwilio,
  IconCheck,
  IconLock,
  IconMail,
  IconMoonStars,
  IconSun,
} from '@tabler/icons-react'
import { icon, sizes } from '@/app/(frontend)/design'

const c = {
  border: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.1
  )}, ${alpha('var(--mantine-color-gray-0)', 0.1)})`,
  borderDashed: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.14
  )}, ${alpha('var(--mantine-color-gray-0)', 0.14)})`,
  borderSubtle: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.06
  )}, ${alpha('var(--mantine-color-gray-0)', 0.06)})`,
  text: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.55
  )}, ${alpha('var(--mantine-color-gray-0)', 0.45)})`,
  textDim: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.4
  )}, ${alpha('var(--mantine-color-gray-0)', 0.3)})`,
  textFaint: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.25
  )}, ${alpha('var(--mantine-color-gray-0)', 0.2)})`,
  bg: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.03
  )}, ${alpha('var(--mantine-color-gray-0)', 0.03)})`,
  bgSubtle: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.04
  )}, ${alpha('var(--mantine-color-gray-0)', 0.02)})`,
  line: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.12
  )}, ${alpha('var(--mantine-color-gray-0)', 0.1)})`,
  lineSubtle: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.08
  )}, ${alpha('var(--mantine-color-gray-0)', 0.05)})`,
  lineMedium: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.14
  )}, ${alpha('var(--mantine-color-gray-0)', 0.08)})`,
  codeKeyword: `light-dark(${alpha(
    'var(--mantine-color-blue-8)',
    0.8
  )}, ${alpha('var(--mantine-color-blue-4)', 0.7)})`,
  codeType: `light-dark(${alpha(
    'var(--mantine-color-green-8)',
    0.8
  )}, ${alpha('var(--mantine-color-green-4)', 0.7)})`,
  codeVar: `light-dark(${alpha(
    'var(--mantine-color-gray-9)',
    0.65
  )}, ${alpha('var(--mantine-color-gray-0)', 0.55)})`,
}

function Dot({ color }: { color: string }) {
  return (
    <Box
      w={10}
      h={10}
      style={{
        borderRadius: '50%',
        backgroundColor: color,
      }}
    />
  )
}

function PlusBadge({ count }: { count: string }) {
  return (
    <Center
      w={30}
      h={30}
      bdrs={'sm'}
      bd={`1px dashed ${c.borderDashed}`}
      ff={'monospace'}
      fz={'xs'}
      c={c.textDim}
    >
      {count}
    </Center>
  )
}

function TerminalCodeblock({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      justify="center"
      bdrs={'xs'}
      bd={`1px solid ${c.border}`}
      bg={`light-dark(${alpha(
        'var(--mantine-color-gray-9)',
        0.04
      )}, ${alpha('var(--mantine-color-gray-0)', 0.04)})`}
      ff={'monospace'}
      lh={1.2}
      fz={10}
      px={sizes.x2}
      py={sizes.x2}
      w="100%"
    >
      {children}
    </Stack>
  )
}

export function NextJsVisual() {
  return (
    <TerminalCodeblock>
      <Group gap={sizes.x1_5}>
        <IconCheck size={sizes.x2_5} color="var(--mantine-color-green-6)" />
        <Box c={c.text}>compiled in 42ms</Box>
      </Group>
    </TerminalCodeblock>
  )
}

export function MantineVisual() {
  return (
    <Flex gap={8} wrap="wrap" maw={120}>
      <Dot color="var(--mantine-color-blue-5)" />
      <Dot color="var(--mantine-color-green-5)" />
      <Dot color="var(--mantine-color-orange-5)" />
      <Dot color="var(--mantine-color-violet-5)" />
      <Dot color="var(--mantine-color-pink-5)" />
      <Dot color="var(--mantine-color-cyan-5)" />
      <Dot color="var(--mantine-color-yellow-5)" />
      <Dot color="var(--mantine-color-red-5)" />
      <Dot color="var(--mantine-color-green-4)" />
      <Dot color="var(--mantine-color-violet-6)" />
    </Flex>
  )
}

export function BetterAuthVisual() {
  return (
    <Stack gap={sizes.x2} w="100%" style={{ pointerEvents: 'none' }}>
      <TextInput
        leftSection={<IconMail size={sizes.x3} color={c.textFaint} />}
        radius={'xs'}
        readOnly
        size="xs"
        value="user@email.com"
        styles={{
          input: {
            fontFamily: 'monospace',
            fontSize: 10,
            cursor: 'default',
          },
        }}
      />
      <PasswordInput
        leftSection={<IconLock size={sizes.x3} color={c.textFaint} />}
        radius={'xs'}
        readOnly
        size="xs"
        value="password123"
        styles={{
          input: {
            fontFamily: 'monospace',
            fontSize: 10,
            cursor: 'default',
            letterSpacing: 2,
          },
        }}
      />
    </Stack>
  )
}

function CollectionCard({ label, count }: { label: string; count: string }) {
  return (
    <Stack
      align="center"
      bd={`1px solid ${c.border}`}
      bdrs={'xs'}
      bg={c.bg}
      gap={sizes.x1_5}
      px={sizes.x3}
      pt={sizes.x2}
      pb={sizes.x1_5}
    >
      <Box c={c.textDim} lh={1.2} fz={10} ff={'monospace'}>
        {label}
      </Box>
      <Box fz={12} fw={500} ff={'monospace'} lh={1.2}>
        {count}
      </Box>
    </Stack>
  )
}

export function PayloadVisual() {
  return (
    <Flex align="center" gap={sizes.x1_5}>
      <CollectionCard label="Posts" count="12" />
      <CollectionCard label="Media" count="48" />
      <CollectionCard label="Users" count="3" />
    </Flex>
  )
}

export function PaymentsVisual() {
  return (
    <Box
      bd={`1px solid ${c.border}`}
      bg={c.bg}
      px={sizes.x2}
      py={sizes.x1}
      bdrs={'xs'}
      w="100%"
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <Box
            w={28}
            h={20}
            pos="relative"
            bdrs={2}
            bg={`linear-gradient(135deg, var(--mantine-color-dark-9), var(--mantine-color-blue-9))`}
          >
            <Box
              pos="absolute"
              top={sizes.x1}
              left={sizes.x1}
              w={sizes.x1_5}
              h={sizes.x1}
              bdrs={1}
              bg={`linear-gradient(135deg, var(--mantine-color-yellow-6), var(--mantine-color-yellow-2))`}
            />
            <Box
              pos="absolute"
              bottom={sizes.x1_5}
              left={sizes.x1}
              w={sizes.x2_5}
              h={sizes.x0_5}
              bdrs={1}
              bg={alpha('var(--mantine-color-white)', 0.5)}
            />
            <Box
              pos="absolute"
              bottom={sizes.x1_5}
              right={sizes.x1_5}
              w={sizes.x1_5}
              h={sizes.x0_5}
              bdrs={1}
              bg={alpha('var(--mantine-color-white)', 0.5)}
            />
          </Box>
          <Box
            fz={10}
            c={c.textDim}
            ff="monospace"
            style={{
              letterSpacing: 1,
            }}
          >
            •••• •••• •••• 4242
          </Box>
        </Flex>
        <Box ff="monospace" fz={10} fw={600} c={c.text}>
          $29
        </Box>
      </Flex>
    </Box>
  )
}

function TextBox({ children, ...rest }: React.PropsWithChildren<CenterProps>) {
  return (
    <Center
      bdrs={'xs'}
      bd={`1px solid ${c.border}`}
      bg={c.bg}
      c={c.text}
      h={30}
      w={30}
      style={{
        lineHeight: 1,
      }}
      {...rest}
    >
      {children}
    </Center>
  )
}

export function EmailsVisual() {
  return (
    <Flex align="center" gap={sizes.x1_5}>
      <TextBox>
        <IconBrandGmail size={sizes.x4} />
      </TextBox>
      <TextBox>
        <IconBrandMailgun size={sizes.x4} />
      </TextBox>
      <TextBox>
        <IconBrandTwilio size={sizes.x4} />
      </TextBox>
      <TextBox>
        <IconMail size={sizes.x4} />
      </TextBox>
      <PlusBadge count="+2" />
    </Flex>
  )
}

/**
 * A simple visual representation of an article, with header and content area.
 */
function ArticleVisual() {
  return (
    <Box h={sizes.x10} w="100%">
      <Box mb={sizes.x1} h={sizes.x1_5} w="50%" bg={c.lineMedium} />
      <Box mb={sizes.x1} h={sizes.x1} w="100%" bg={c.lineSubtle} />
      <Box mb={sizes.x1} h={sizes.x1} w="100%" bg={c.lineSubtle} />
      <Box h={sizes.x1} w="60%" bg={c.lineSubtle} />
    </Box>
  )
}

/**
 * Visual representation of a blog page, just reuse the ArticleVisual.
 */
export function BlogVisual() {
  return <ArticleVisual />
}

/**
 * Visual representation of a documentation page, with a sidebar and content area.
 *
 * This visual just re-use the same line and box components from the Blog
 * visual, but arranged to look like a docs page with a sidebar on the left and
 * content on the right.
 */
export function DocsVisual() {
  return (
    <Flex gap={sizes.x1_5} w="100%">
      <Box
        w={sizes.x6}
        h={sizes.x10}
        bdrs={'xs'}
        bd={`1px solid ${c.borderSubtle}`}
        bg={c.bgSubtle}
      />
      <ArticleVisual />
    </Flex>
  )
}

export function I18nVisual() {
  return (
    <Flex align="center" gap={sizes.x1_5} wrap="wrap">
      <TextBox ff={'monospace'} fz={'xs'}>
        en
      </TextBox>
      <TextBox ff={'monospace'} fz={'xs'}>
        fr
      </TextBox>
      <TextBox ff={'monospace'} fz={'xs'}>
        ja
      </TextBox>
      <TextBox ff={'monospace'} fz={'xs'}>
        zh
      </TextBox>
      <PlusBadge count="+10" />
    </Flex>
  )
}

export function TypeScriptVisual() {
  return (
    <TerminalCodeblock>
      <Box>
        <Box component="span" style={{ color: c.codeKeyword }}>
          const
        </Box>{' '}
        <Box component="span" style={{ color: c.codeVar }}>
          config
        </Box>
        :{' '}
        <Box component="span" style={{ color: c.codeType }}>
          Config
        </Box>
      </Box>
    </TerminalCodeblock>
  )
}

export function DarkModeVisual() {
  const mounted = useMounted()
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const isDark = colorScheme === 'dark'

  if (!mounted) {
    return <Switch size="md" disabled />
  }

  return (
    <Switch
      checked={isDark}
      color="dark.4"
      onChange={() => setColorScheme(isDark ? 'light' : 'dark')}
      offLabel={<IconMoonStars size={icon.sizes.sm} stroke={icon.strokes.md} />}
      onLabel={<IconSun size={icon.sizes.sm} stroke={icon.strokes.md} />}
      size="lg"
    />
  )
}

export function RichTextVisual() {
  return (
    <Group gap={sizes.x1_5}>
      {['B', 'I', 'U', 'H1', '•'].map((label) => (
        <TextBox
          key={label}
          fw={label === 'B' ? 700 : label === 'I' ? 400 : 500}
          fs={label === 'I' ? 'italic' : 'normal'}
          fz={'xs'}
          td={label === 'U' ? 'underline' : 'none'}
        >
          {label}
        </TextBox>
      ))}
    </Group>
  )
}
