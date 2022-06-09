/**
 * 客服模块相关路由
 *  **/

import Layout from '@/layout'

const cicRouter = {
  path: '/cic',
  component: Layout,
  redirect: '/cic/orders/list',
  name: 'cic',
  meta: {
    title: '客服管理',
    icon: 'edit'
  },
  children: [
    {
      path: 'orders',
      component: () => import('@/views/cic/orders/list'),
      name: 'Orders',
      meta: { title: '工单管理' },
      redirect: '/cic/orders/list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/cic/orders/list'),
          name: 'List',
          meta: { title: '工单列表' }
        },
        //  {
        //    path: '待处理工单',
        //    component: () => import('@/views/cic/orders/todo'),
        //    name: 'Menu1-2',
        //    redirect: '/cic/menu1/menu1-2/menu1-2-1',
        //    meta: { title: 'Menu 1-2' },
        //    children: [
        //      {
        //        path: 'menu1-2-1',
        //        component: () => import('@/views/cic/orders/menu1-2/menu1-2-1'),
        //        name: 'Menu1-2-1',
        //        meta: { title: 'Menu 1-2-1' }
        //      },
        //      {
        //        path: 'menu1-2-2',
        //        component: () => import('@/views/cic/orders/menu1-2/menu1-2-2'),
        //        name: 'Menu1-2-2',
        //        meta: { title: 'Menu 1-2-2' }
        //      }
        //    ]
        //  },
        {
          path: 'new',
          component: () => import('@/views/cic/orders/new'),
          name: 'New',
          meta: { title: '新建工单' }
        }
      ]
    },
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
      path: 'reports',
      name: 'Reports',
      component: () => import('@/views/cic/reports/index'),
      meta: { title: '数据报表' }
    }

  ]
}

export default cicRouter
