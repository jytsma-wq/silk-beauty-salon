'use client';
import { baseTreatmentCategories } from '@/data/treatments';
import { baseConditions } from '@/data/conditions';
import { GaldermaHeaderClient } from './GaldermaHeaderClient';

const treatmentMegaMenuItems = [
  ...baseTreatmentCategories.flatMap((category) =>
    category.treatments.map((treatment) => ({
      title: treatment.name,
      href: `/treatments/${treatment.slug}`,
      description: treatment.shortDescription,
    }))
  ),
];

const skinConditionMegaMenuItems = [
  {
    title: 'All Conditions',
    href: '/conditions',
    description: 'Browse the complete skin concerns library and treatment pathways.',
  },
  ...baseConditions.map((condition) => ({
    title: condition.name,
    href: `/conditions/${condition.slug}`,
    description: condition.shortDescription,
  })),
];

export function GaldermaHeader() {
  return (
    <GaldermaHeaderClient
      treatmentMegaMenuItems={treatmentMegaMenuItems}
      skinConditionMegaMenuItems={skinConditionMegaMenuItems}
    />
  );
}
