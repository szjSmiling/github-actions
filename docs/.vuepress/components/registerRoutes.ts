export const registerRoutes = (router:any) => {
  const routes:any[] = router.getRoutes()
  const hasLoginRoute = routes.find((route:any) => route.path.includes('/login'))
  // 注册其它自定义页面
  if (!hasLoginRoute) {
    router.addRoute({
      path: '/login',
      name: 'login',
      component: () => import('@/components/HsLogin.vue')
    })
  }
}