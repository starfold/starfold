import {
  IconArticle,
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandTypescript,
  IconCreditCardPay,
  IconLanguage,
  IconLock,
  IconMail,
  IconMoonStars,
  IconNotebook,
  IconTypography,
} from '@tabler/icons-react'
import { IconBrandPayload } from '@/components/common'
import {
  BetterAuthVisual,
  BlogVisual,
  DarkModeVisual,
  DocsVisual,
  EmailsVisual,
  I18nVisual,
  MantineVisual,
  NextJsVisual,
  PayloadVisual,
  PaymentsVisual,
  RichTextVisual,
  TypeScriptVisual,
} from './FeatureVisuals'

export interface FeatureItem {
  icon: React.ComponentType<{ size?: number; stroke?: number }>
  title: string
  description: string
  visual: React.ComponentType
}

export const featuresData: FeatureItem[] = [
  {
    icon: IconBrandNextjs,
    title: 'Next.js 16',
    description:
      'App Router, server components, and streaming SSR for production-grade performance.',
    visual: NextJsVisual,
  },
  {
    icon: IconBrandMantine,
    title: 'Mantine',
    description:
      'More than 120 customizable components and 70 hooks to cover you in any situation',
    visual: MantineVisual,
  },
  {
    icon: IconLock,
    title: 'Better Auth',
    description:
      'Type-safe auth with OAuth, magic links, password reset, and sessions.',
    visual: BetterAuthVisual,
  },
  {
    icon: IconBrandPayload,
    title: 'Payload CMS',
    description:
      'Headless CMS with PostgreSQL, auto admin, rich text, and typed API.',
    visual: PayloadVisual,
  },
  {
    icon: IconCreditCardPay,
    title: 'Payments',
    description:
      'Subscription billing, checkout sessions, and webhooks ready to monetize.',
    visual: PaymentsVisual,
  },
  {
    icon: IconMail,
    title: 'Emails',
    description:
      'Transactional emails for welcomes, password resets, and notifications.',
    visual: EmailsVisual,
  },
  {
    icon: IconArticle,
    title: 'Blogs',
    description:
      'SEO-optimized publishing with rich text editing and media management.',
    visual: BlogVisual,
  },
  {
    icon: IconNotebook,
    title: 'Docs',
    description: 'Turn your markdown into a polished documentation experience.',
    visual: DocsVisual,
  },
  {
    icon: IconLanguage,
    title: 'i18n',
    description:
      'Multi-language infrastructure with RTL support ready to extend.',
    visual: I18nVisual,
  },
  {
    icon: IconBrandTypescript,
    title: 'TypeScript',
    description:
      'End-to-end type safety from the database schema to UI components.',
    visual: TypeScriptVisual,
  },
  {
    icon: IconMoonStars,
    title: 'Dark Mode',
    description:
      'Auto-detecting color scheme toggle. Every component respects preferences.',
    visual: DarkModeVisual,
  },
  {
    icon: IconTypography,
    title: 'Rich Text Editor',
    description:
      'TipTap and Lexical-powered editing with embeds and custom blocks.',
    visual: RichTextVisual,
  },
]
