import { Box, type BoxProps } from '@mantine/core'

/**
 * Payload icon in SVG.
 *
 * This is a workaround because @tabler/icons-react doesn't have a Payload icon,
 * and we want to avoid adding a new dependency just for one icon, so we have to
 * copy the SVG path data from the Payload logo and create our own icon
 * component with a small adjustment.
 */
export function IconBrandPayload({
  size = 20,
  stroke,
  color = 'currentColor',
  ...rest
}: BoxProps & { size?: number; stroke?: number; color?: string }) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 40"
      w={size}
      h={size}
      fill={color}
      {...rest}
    >
      <g transform="translate(6, 4) scale(0.8)">
        <path d="M18.01,35.63l-12.36-7.13c-.15-.09-.25-.25-.25-.43v-11.02c0-.19.21-.31.37-.22l14.35,8.28c.2.12.45-.03.45-.26v-5.37c0-.21-.11-.41-.3-.52L3.01,9c-.15-.09-.35-.09-.5,0l-2.26,1.31c-.15.09-.25.25-.25.43v20.47c0,.18.1.34.25.43l17.73,10.24c.15.09.35.09.5,0l14.89-8.6c.2-.12.2-.4,0-.52l-4.64-2.68c-.19-.11-.41-.11-.6,0l-9.61,5.55c-.15.09-.35.09-.5,0Z" />
        <path d="M36.21,10.3L18.48.07c-.15-.09-.35-.09-.5,0l-9.37,5.41c-.2.12-.2.4,0,.52l4.6,2.66c.19.11.41.11.6,0l4.2-2.42c.15-.09.35-.09.5,0l12.36,7.13c.15.09.25.25.25.43v11.07c0,.21.11.41.3.52l4.6,2.65c.2.12.45-.03.45-.26V10.74c0-.18-.1-.34-.25-.43Z" />
      </g>
    </Box>
  )
}
