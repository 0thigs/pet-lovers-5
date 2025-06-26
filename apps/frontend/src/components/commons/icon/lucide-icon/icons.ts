import {
  HandPlatter,
  ScrollText,
  ShoppingBasket,
  SquareUser,
  Pencil,
  Trash,
  Plus,
  DollarSign,
  Menu,
  PawPrint,
  ClipboardList,
  type LucideProps,
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { IconName } from '../types'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  list: ClipboardList,
  product: ShoppingBasket,
  service: HandPlatter,
  customer: SquareUser,
  pet: PawPrint,
  orders: ScrollText,
  edit: Pencil,
  delete: Trash,
  add: Plus,
  menu: Menu,
  order: DollarSign,
}
