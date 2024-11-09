/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string
    readonly VITE_FIREBASE_API: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    // other env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
