export const sizes = {
  x0_5: '2px', // 2px   - micro adjustments
  x1: '4px', // 4px   - base unit
  x1_5: '6px', // 6px   - small gaps
  x2: '8px', // 8px   - small padding
  x3: '12px', // 12px  - medium gaps
  x4: '16px', // 16px  - standard gap (most common)
  x5: '20px', // 20px  - larger gaps
  x6: '24px', // 24px  - section padding
  x8: '32px', // 32px  - large gaps
  x10: '40px', // 40px  - container padding
  x12: '48px', // 48px  - large sections
  x16: '64px', // 64px  - major sections
  x20: '80px', // 80px  - page-level
  x24: '96px', // 96px  - large page sections
  x32: '128px', // 128px - hero spacing
  x40: '160px', // 160px - max spacing

  // pure number for convenience
  x0_5i: 2,
  x1i: 4,
  x1_5i: 6,
  x2i: 8,
  x3i: 12,
  x4i: 16,
  x5i: 20,
  x6i: 24,
  x8i: 32,
  x10i: 40,
  x12i: 48,
  x16i: 64,
  x20i: 80,
  x24i: 96,
  x32i: 128,
  x40i: 160,
} as const

export const icon = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  strokes: {
    xs: 1,
    sm: 1.25,
    md: 1.5,
    lg: 1.75,
    xl: 2,
  },
} as const
