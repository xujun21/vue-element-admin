/**
 * 客服模块相关路由
 *  **/

import Layout from '@/layout'

const cicRouter = {
  path: '/cic',
  component: Layout,
  name: 'Cic',
  meta: {
    title: '客服系统',
    icon: 'cic'
  },
  children: [
    {
      path: 'records',
      name: 'Records',
      component: () => import('@/views/cic/records/index'),
      meta: {
        title: '业务记录',
        icon: 'list'
      },
      children: [
        {
          path: 'list',
          component: () => import('@/views/cic/records/list/index'),
          name: 'RecordsList',
          meta: { title: '记录列表' }
        },
        {
          path: 'create',
          component: () => import('@/views/cic/records/create/index'),
          name: 'CreateRecord',
          meta: { title: '新建记录' }
        },
        {
          path: 'edit/:id(\\d+)',
          component: () => import('@/views/cic/records/edit/index'),
          name: 'EditRecord',
          meta: { title: '修改记录' },
          hidden: true
        }
      ]
    },
    {
      path: 'orders',
      name: 'Orders',
      component: () => import('@/views/cic/orders/index'),
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
