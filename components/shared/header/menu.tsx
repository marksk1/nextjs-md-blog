import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Menu = () => {
  return (
    <>
      <div className='flex justify-end gap-3'>
        <nav className='md:flex hidden w-full max-w-xs gap-1'>
          {/* <Button asChild variant='ghost'>
            <Link href='/blog'>Blog</Link>
          </Button> */}
          <ModeToggle />
        </nav>
        <nav className='md:hidden'>
          <Sheet>
            <SheetTrigger className='align-middle'>
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col items-start p-6'>
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              {/* <Button asChild variant='ghost'>
                <Link href='/blog'>Blog</Link>
              </Button> */}
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
