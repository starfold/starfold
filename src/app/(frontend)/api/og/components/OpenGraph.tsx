/**
 * A open graph generator powered by next/og
 *
 * @see https://vercel.com/docs/og-image-generation
 */

type OpenGraphProps = {
  title: string
}

export function OpenGraph({ title }: OpenGraphProps) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        background: 'linear-gradient(to bottom right, #121212, #2e2e2e)',
        padding: '48px 64px',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'radial-gradient(circle at 4px 8px, rgba(255, 255, 255, 0.8) 24px, transparent 1)',
          backgroundSize: '36px 36px',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* This svg is coming from the /public/static/assets/logo/starfold.svg
        file, with a slight modification to fit of height and width, you can
        replace it with your own logo or any svg you like. */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="48"
          height="48"
          aria-hidden="true"
          role="img"
        >
          <circle cx="256" cy="256" r="256" fill="#000000" />
          <g fill="#ffffff">
            <path d="M 256 60 L 268 112 L 320 124 L 268 136 L 256 188 L 244 136 L 192 124 L 244 112 Z" />
            <rect x="116" y="220" width="80" height="120" />
            <rect x="216" y="260" width="80" height="80" />
            <rect x="316" y="260" width="80" height="80" />
            <path d="M 86 360 L 146 430 L 366 430 L 426 360 Z" />
          </g>
        </svg>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#eaeaea',
            opacity: 0.95,
            margin: '0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Starfold
        </h1>
      </div>
      <p
        style={{
          alignSelf: 'center',
          color: '#ebebeb',
          fontSize: '64px',
          fontWeight: '800',
          textAlign: 'center',
        }}
      >
        {title}
      </p>
      <p />
    </div>
  )
}
