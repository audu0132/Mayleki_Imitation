import React from "react";

export function lazyWithRetry(componentImport) {
  return React.lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.warn("Chunk load failure, retrying...", error);
      return await componentImport();
    }
  });
}
