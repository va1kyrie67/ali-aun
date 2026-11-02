'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CategoryId } from '@/types/portfolio';
import { categories, projects } from '@/data/siteData';

interface WorkFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export default function WorkFilter({ activeCategory, onSelectCategory }: WorkFilterProps) {
  const getCategoryCount = (id: CategoryId) => {
    if (id === 'all') return projects.length;
    return projects.filter((p) => p.category === id).length;
  };

  return (
    <div className="w-full flex justify-center py-6 px-4">
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-x-auto max-w-full scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20 shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
              <span
                className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-sky-400/20 text-sky-300' : 'bg-white/5 text-zinc-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
