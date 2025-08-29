// src/components/BookCardSkeleton.js
import React from 'react';
import './BookCardSkeleton.css';

const BookCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  );
};

export const SkeletonGrid = () => {
  // Render a grid of 12 skeleton cards
  return (
    <div className="book-grid">
      {Array.from({ length: 12 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
}