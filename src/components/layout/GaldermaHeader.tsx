'use client';
import { baseTreatmentCategories } from '@/data/treatments';
import { baseConditions } from '@/data/conditions';
import { GaldermaHeaderClient } from './GaldermaHeaderClient';

const treatmentMegaMenuItems = [
  {
    title: 'All Treatments',
    href: '/treatments',
    description: 'View the full treatment portfolio and browse every category.',
  },
  ...baseTreatmentCategories.map((category) => ({
    title: category.name,
    href: `/treatments#${category.slug}`,
    description: category.description,
  })),
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
