import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/form',
      '@mantine/dates',
      '@mantine/notifications',
      '@mantine/code-highlight',
      '@mantine/tiptap',
      '@mantine/dropzone',
      '@mantine/carousel',
      '@mantine/spotlight',
      '@mantine/modals',
      '@mantine/nprogress',
      '@mantine/charts',
    ],
  },
}

export default withPayload(nextConfig)
