export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_DATABASE_URL: string
      PAYLOAD_SECRET: string
      BETTER_AUTH_SECRET: string
      BETTER_AUTH_URL: string
      BETTER_AUTH_DATABASE_URL: string
    }
  }
}
