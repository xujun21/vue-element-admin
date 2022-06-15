/**
 * 用户相关Routers
 */

import Layout from '@/layout'

const membersRouter = {
  path: '/members',
  component: Layout,
  redirect: '/members/list',
  name: 'Members',
  meta: {
    title: '会员管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/members/list'),
      meta: { title: '会员列表' }
    },
    {
      path: 'new',
      name: 'New',
      component: () => import('@/views/members/new'),
      meta: { title: '新建会员' }
    },
    {
      path: 'edit/:id(\\d+)',
      name: 'Edit',
      component: () => import('@/views/members/new'),
      meta: { title: '修改会员' },
      hidden: true
    }
  ]
}

export default membersRouter
