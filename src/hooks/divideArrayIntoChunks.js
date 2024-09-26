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
      if (window.innerWidth <= 768) {
        setChunkCount(initialChunkCount - 1);
      } else {
        setChunkCount(initialChunkCount);
      }
    };

    window.addEventListener('resize', updateChunkCount);
    updateChunkCount();

    return () => {
      window.removeEventListener('resize', updateChunkCount);
    };
  }, [initialChunkCount]);

  return chunkCount;
}


export default divideArrayIntoChunks;