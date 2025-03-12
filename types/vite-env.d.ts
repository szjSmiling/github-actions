/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.svg?url' {
  const url: string;
  export default url;
}

declare module 'vue-router'
declare module 'vuepress/client'
declare module 'vuepress/core'
declare module 'vuepress/shared'
declare module 'vuepress/client-types'

interface ImportMetaEnv {
  SSR: boolean;
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_API: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_STATIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  _HR_router: any
  $message: any
  $notification: any
}