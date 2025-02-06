import { useState, useEffect } from "react";

interface DivideArrayProps {
  array: any[],
  chunkCount: number
}

export default function divideArrayIntoChunks({ array, chunkCount }: DivideArrayProps) {
  const chunks = Array.from({ length: chunkCount }, () => []);
  array.forEach((item, index) => {
    chunks[index % chunkCount].push(item);
  });
  return chunks;
};

export function useChunkCount({ initialChunkCount = 4 }: { initialChunkCount: number }) {
  const [chunkCount, setChunkCount] = useState<number>(initialChunkCount);

  useEffect(() => {
    const updateChunkCount = () => {
      const newChunkCount = window.innerWidth <= 768 ? initialChunkCount - 1 : initialChunkCount;

      if (newChunkCount !== chunkCount) {
        setChunkCount(newChunkCount);
      }
    };

    window.addEventListener('resize', updateChunkCount);
    updateChunkCount();

    return () => window.removeEventListener('resize', updateChunkCount);
  }, [chunkCount, initialChunkCount]);

  return chunkCount;
}