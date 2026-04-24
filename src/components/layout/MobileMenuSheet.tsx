'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';
import type { TreatmentCategory } from '@/data/treatments';
import type { Condition } from '@/data/conditions';

interface MobileMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  treatmentCategories: TreatmentCategory[];
  conditions: Condition[];
}

export function MobileMenuSheet({ 
  open, 
  onOpenChange, 
  treatmentCategories, 
  conditions 
}: MobileMenuSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-75 sm:w-100 p-0">
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
