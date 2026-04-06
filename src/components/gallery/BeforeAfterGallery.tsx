'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BeforeAfterItem {
  id: number;
  category: string;
  treatment: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
}

const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 1,
    category: 'Facial Treatments',
    treatment: 'Hydrafacial',
    beforeImage: '/images/before-after/facial-1-before.jpg',
    afterImage: '/images/before-after/facial-1-after.jpg',
    description: 'Deep cleansing and hydration'
  },
  {
    id: 2,
    category: 'Facial Treatments',
    treatment: 'Anti-Aging Facial',
    beforeImage: '/images/before-after/facial-2-before.jpg',
    afterImage: '/images/before-after/facial-2-after.jpg',
    description: 'Reduced fine lines'
  },
  {
    id: 3,
    category: 'Skin Treatments',
    treatment: 'Laser Hair Removal',
    beforeImage: '/images/before-after/laser-1-before.jpg',
    afterImage: '/images/before-after/laser-1-after.jpg',
    description: 'Smooth skin results'
  },
  {
    id: 4,
    category: 'Skin Treatments',
    treatment: 'Chemical Peel',
    beforeImage: '/images/before-after/peel-1-before.jpg',
    afterImage: '/images/before-after/peel-1-after.jpg',
    description: 'Even skin tone'
  },
  {
    id: 5,
    category: 'Injectables',
    treatment: 'Dermal Fillers',
    beforeImage: '/images/before-after/fillers-1-before.jpg',
    afterImage: '/images/before-after/fillers-1-after.jpg',
    description: 'Volume restoration'
  },
  {
    id: 6,
    category: 'Injectables',
    treatment: 'Botox',
    beforeImage: '/images/before-after/botox-1-before.jpg',
    afterImage: '/images/before-after/botox-1-after.jpg',
    description: 'Wrinkle reduction'
  }
];

const categories = ['All', ...Array.from(new Set(beforeAfterData.map(item => item.category)))];

export function BeforeAfterGallery({ locale }: { locale: string }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<BeforeAfterItem | null>(null);

  const filteredItems = activeCategory === 'All' 
    ? beforeAfterData 
    : beforeAfterData.filter(item => item.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-gold text-white'
                : 'bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-gold'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Before/After Split */}
            <div className="relative h-64 flex">
              {/* Before */}
              <div className="relative w-1/2">
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  Before
                </div>
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Add image</span>
                </div>
              </div>
              {/* After */}
              <div className="relative w-1/2 border-l">
                <div className="absolute top-2 left-2 bg-[#25D366] text-white text-xs px-2 py-1 rounded">
                  After
                </div>
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Add image</span>
                </div>
              </div>
              {/* Divider Line */}
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white z-10" />
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-xs text-gold font-medium mb-1">{item.category}</p>
              <h3 className="font-semibold text-primary">{item.treatment}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found for this category.</p>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <p className="text-sm text-gold font-medium">{selectedItem.category}</p>
                <h3 className="font-semibold text-lg">{selectedItem.treatment}</h3>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="relative h-80 flex gap-4">
                <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-sm px-3 py-1 rounded">Before</div>
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Add before image</div>
                </div>
                <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                  <div className="absolute top-2 left-2 bg-[#25D366] text-white text-sm px-3 py-1 rounded">After</div>
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Add after image</div>
                </div>
              </div>
              {selectedItem.description && (
                <p className="mt-4 text-center text-muted-foreground">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
