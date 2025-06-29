import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css'

import { Button } from '@nextui-org/react'
import { Icon } from '@/components/commons/icon'
import { Sidebar } from './sidebar'
import { useAppLayout } from './use-app-layout'

export const AppLayout = () => {
  const { isDrawerOpen, closeDrawer, handleMenuClick } = useAppLayout()

  return (
    <div className='relative flex bg-zinc-50 h-screen'>
      <div className='hidden md:block'>
        <Sidebar />
      </div>
      <div className='absolute top-1 left-1 pl-3 pt-3 md:hidden'>
        <Button isIconOnly size='sm' className='bg-transparent' onClick={handleMenuClick}>
          <Icon name='menu' />
        </Button>
        <Drawer direction='left' open={isDrawerOpen} onClose={closeDrawer}>
          <Sidebar />
        </Drawer>
      </div>
      <main className='w-full pl-6 md:pl-56 md:pr-8 pt-12 md:pt-8'>
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  )
}
