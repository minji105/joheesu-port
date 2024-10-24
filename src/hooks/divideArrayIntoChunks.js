import { useState, useEffect } from "react";

const divideArrayIntoChunks = (array, chunkCount) => {
  const chunks = Array.from({ length: chunkCount }, () => []);
  array.forEach((item, index) => {
    chunks[index % chunkCount].push(item);
  });
  return chunks;
};

export const useChunkCount = (initialChunkCount = 4) => {
  const [chunkCount, setChunkCount] = useState(initialChunkCount);

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
  }, [initialChunkCount, chunkCount]);

  return chunkCount;
}


export default divideArrayIntoChunks;