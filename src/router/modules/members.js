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
      component: () => import('@/views/members/list'),
      name: 'MembersList',
      meta: { title: '会员列表', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/members/create'),
      name: 'CreateMember',
      meta: { title: '新建会员', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/members/edit'),
      name: 'EditMember',
      meta: { title: '修改会员', noCache: true, activeMenu: '/members/list' },
      hidden: true
    }
  ]
}

export default membersRouter
