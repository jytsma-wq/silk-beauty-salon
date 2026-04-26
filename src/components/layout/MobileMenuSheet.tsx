'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';
import type { TreatmentCategory } from '@/data/treatments';
import type { Condition } from '@/data/conditions';
import { cn } from '@/lib/utils';

interface MobileMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  treatmentCategories: TreatmentCategory[];
  conditions: Condition[];
  isScrolled?: boolean;
}

export function MobileMenuSheet({ 
  open, 
  onOpenChange, 
  treatmentCategories, 
  conditions,
  isScrolled = false
}: MobileMenuSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            'transition-colors duration-500',
            isScrolled ? 'text-stone-900' : 'text-white hover:bg-white/10'
          )}
        >
          <Menu className="w-6 h-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-75 sm:w-100 p-0 bg-white/95 backdrop-blur-xl border-l border-[#e8e4df] data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
        <MobileNav 
          onClose={() => onOpenChange(false)} 
          treatmentCategories={treatmentCategories}
          conditions={conditions}
        />
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenuSheet;
