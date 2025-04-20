
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Drawer,
  DrawerContent,
  DrawerClose
} from '@/components/ui/drawer';
import Button from '../common/Button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  onBookNow: () => void;
}

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  navLinks, 
  isActive,
  onBookNow
}: MobileMenuProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[80vh] max-h-[80vh] bg-white rounded-t-[20px] pb-6">
        <div className="container-custom px-4 flex flex-col h-full">
          <div className="flex justify-end pt-4">
            <DrawerClose className="text-hotel-navy p-2">
              <X size={24} />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </div>
          <ScrollArea className="flex-grow">
            <div className="flex flex-col space-y-4 py-4 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={onClose}
                  className={cn(
                    'text-lg py-3 px-4 rounded-md transition-colors',
                    isActive(link.path)
                      ? 'bg-hotel-beige text-hotel-navy font-medium'
                      : 'text-muted-foreground hover:bg-hotel-beige hover:text-hotel-navy'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="pt-4 mt-auto">
            <Button 
              variant="accent" 
              size="lg" 
              onClick={onBookNow}
              className="w-full"
            >
              Book Now
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
