/**
 * 客服模块相关路由
 *  **/

import Layout from '@/layout'

const cicRouter = {
  path: '/cic',
  component: Layout,
  redirect: '/cic/orders/list',
  name: 'CIC',
  meta: {
    title: '客服管理',
    icon: 'edit'
  },
  children: [
    {
      path: 'records',
      name: 'Records',
      component: () => import('@/views/cic/records/list'),
      meta: { title: '业务记录' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/cic/records/list'),
          name: 'Records',
          meta: { title: '记录列表' }
        },
        {
          path: 'new',
          component: () => import('@/views/cic/records/new'),
          name: 'New',
          meta: { title: '新建记录' }
        }
      ]
    },
    {
      path: 'orders',
      component: () => import('@/views/cic/orders/index'),
      name: 'Orders',
      meta: { title: '工单管理' },
      redirect: '/cic/orders/list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/cic/orders/list/index'),
          name: 'List',
          meta: { title: '工单列表' }
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/cic/orders/new/index'),
          name: 'Edit',
          meta: { title: '编辑工单', noCache: true },
          hidden: true
        },
        {
          path: 'new',
          component: () => import('@/views/cic/orders/new/index'),
          name: 'New',
          meta: { title: '新建工单' }
        }
      ]
    },
    {
      path: 'reports',
      name: 'Reports',
      component: () => import('@/views/cic/reports/index'),
      meta: { title: '数据报表' }
    }

  ]
}

export default cicRouter
