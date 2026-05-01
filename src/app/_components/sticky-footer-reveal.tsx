"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function StickyFooterReveal({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setFooterHeight(entry.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div
        className="relative z-10 bg-[#fafafa]"
        style={{ marginBottom: footerHeight }}
      >
        {children}
      </div>
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0 w-full"
      >
        {footer}
      </div>
    </>
  );
}
