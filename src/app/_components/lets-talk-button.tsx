"use client";

import { useContactModal } from "./contact-modal";

const SOLID =
  "inline-flex items-center justify-center rounded-3xl bg-black px-4 py-3 " +
  "text-sm font-medium tracking-[-0.04em] text-white " +
  "transition-[transform,box-shadow,background-color] duration-300 ease-out " +
  "hover:bg-[#1f1f1f] hover:-translate-y-0.5 " +
  "hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] " +
  "focus-visible:bg-[#1f1f1f] focus-visible:-translate-y-0.5 " +
  "focus-visible:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] " +
  "focus-visible:outline-none";

const OUTLINE =
  "inline-flex items-center justify-center rounded-3xl border border-white " +
  "px-4 py-3 text-[14px] font-medium tracking-[-0.04em] text-white " +
  "transition-[transform,background-color,color] duration-300 ease-out " +
  "hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black " +
  "focus-visible:outline-none";

export function LetsTalkButton({
  variant = "solid",
  className,
}: {
  variant?: "solid" | "outline";
  className?: string;
}) {
  const { openModal } = useContactModal();
  const base = variant === "outline" ? OUTLINE : SOLID;
  return (
    <button
      type="button"
      onClick={openModal}
      className={className ?? base}
    >
      Let&rsquo;s talk
    </button>
  );
}
