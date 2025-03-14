import { useCallback, useEffect, useRef, useState } from 'react';

interface VirtualListOptions {
  itemHeight: number;
  overscan?: number;
}

interface VirtualItem<T> {
  index: number;
  data: T;
}

export function useVirtualList<T>(
  list: T[],
  { itemHeight, overscan = 3 }: VirtualListOptions
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: 10,
  });

  const getVirtualItems = useCallback(() => {
    const virtualItems: VirtualItem<T>[] = [];

    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      if (i >= 0 && i < list.length) {
        virtualItems.push({
          index: i,
          data: list[i],
        });
      }
    }

    return virtualItems;
  }, [list, visibleRange]);

  const calculateRange = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, clientHeight } = container;

    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      Math.ceil((scrollTop + clientHeight) / itemHeight) + overscan,
      list.length - 1
    );

    setVisibleRange({
      start: Math.max(0, start - overscan),
      end,
    });
  }, [itemHeight, overscan, list.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      calculateRange();
    };

    calculateRange();
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [calculateRange]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      container.scrollTop = index * itemHeight;
    },
    [itemHeight]
  );

  const totalHeight = list.length * itemHeight;
  const virtualItems = getVirtualItems();

  return {
    containerRef,
    virtualItems,
    totalHeight,
    scrollToIndex,
  };
}
