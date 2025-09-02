import { TCard } from '@features/TodoList/model';
import { useState, useRef } from 'react';

export interface UseDragAndDropOptions {
  onReorder?: (items: TCard[]) => void;
}

export interface DragDropHandlers {
  handleDragStart: (e: React.DragEvent, item: TCard, index: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragEnter: (e: React.DragEvent, index: number) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  handleDragEnd: (e: React.DragEvent) => void;
  isDragging: boolean;
  dragOverIndex: number | null;
}

export const useDragAndDrop = (
  items: TCard[],
  options: UseDragAndDropOptions = {},
): DragDropHandlers => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const draggedItem = useRef<TCard | null>(null);
  const draggedIndex = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, item: TCard, index: number) => {
    setIsDragging(true);
    draggedItem.current = item;
    draggedIndex.current = index;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.9';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex.current === null || draggedItem.current === null) return;

    const dragIndex = draggedIndex.current;

    if (dragIndex !== dropIndex) {
      const newItems = [...items];
      const draggedItemData = newItems[dragIndex];

      newItems.splice(dragIndex, 1);

      const adjustedDropIndex =
        dragIndex < dropIndex ? dropIndex - 1 : dropIndex;
      newItems.splice(adjustedDropIndex, 0, draggedItemData);

      options.onReorder?.(newItems);
    }

    setDragOverIndex(null);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    setDragOverIndex(null);
    draggedItem.current = null;
    draggedIndex.current = null;

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
    isDragging,
    dragOverIndex,
  };
};
