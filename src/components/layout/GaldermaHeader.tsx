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
  // Add missing direct links for specific treatments
  {
    title: 'Hair Treatments',
    href: '/treatments/hair-treatments',
    description: 'Advanced hair restoration and scalp treatments.',
  },
  {
    title: 'Hair Extensions',
    href: '/treatments/hair-extensions',
    description: 'Color-matched extensions for fuller, longer, natural-looking hair.',
  },
  {
    title: 'Nails',
    href: '/treatments/nails',
    description: 'Manicure, pedicure, and nail finishing services with detailed care.',
  },
  {
    title: 'Lashes',
    href: '/treatments/lashes',
    description: 'Lash lift, styling, and finishing services shaped around your eyes.',
  },
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
