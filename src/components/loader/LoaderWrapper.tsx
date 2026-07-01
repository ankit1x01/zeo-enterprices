'use client';

import React, { useState, useEffect } from 'react';
import LoaderOverlay from './LoaderOverlay';

export default function LoaderWrapper() {
  const [showLoader, setShowLoader] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !showLoader) return null;

  return <LoaderOverlay onComplete={() => setShowLoader(false)} />;
}
