/**
 * 用户相关Routers
 */

import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/list',
  name: 'Users',
  meta: {
    title: '会员管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/users/list'),
      meta: { title: '会员列表' }
    },
    {
      path: 'new',
      name: 'New',
      component: () => import('@/views/users/new'),
      meta: { title: '新建会员' }
    },
    {
      path: 'edit/:id(\\d+)',
      name: 'Edit',
      component: () => import('@/views/users/new'),
      meta: { title: '修改会员' },
      hidden: true
    }
  ]
}

export default usersRouter
