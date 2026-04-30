"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Article = {
  title: string;
  image: string;
  excerpt: string;
  href: string;
};

const ARTICLES: Article[] = [
  {
    title: "Maker Space conference",
    image: "/images/news-1.png",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
  },
  {
    title: "Eames retrospective",
    image: "/images/news-2.png",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
  },
  {
    title: "Book recommendations",
    image: "/images/news-3.png",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "#",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13 L13 5" />
      <path d="M6 5 L13 5 L13 12" />
    </svg>
  );
}

function ArticleCard({
  article,
  className = "",
}: {
  article: Article;
  className?: string;
}) {
  return (
    <article className={`flex flex-col items-start gap-4 ${className}`}>
      <div className="relative aspect-[300/398] w-full lg:aspect-[353/469]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 353px, 300px"
          className="object-cover"
        />
      </div>
      <p className="font-normal leading-[1.3] tracking-[-0.04em] text-[14px] text-[#1f1f1f]">
        {article.excerpt}
      </p>
      <a
        href={article.href}
        className="inline-flex items-center justify-center gap-[10px] border-b border-black py-1 text-[14px] font-medium tracking-[-0.04em] text-black"
      >
        Read more
        <ArrowIcon />
      </a>
    </article>
  );
}

function MobileSlider({ articles }: { articles: Article[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = slideRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
          }
        }
        if (bestRatio > 0.5 && bestIdx !== -1) setActive(bestIdx);
      },
      { root, threshold: [0.5, 0.75, 1] },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (idx: number) => {
    slideRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:hidden">
      <h2 className="font-light uppercase tracking-[-0.08em] leading-[0.86] text-black text-[clamp(28px,8vw,48px)]">
        Keep up with my latest news &amp; achievements
      </h2>
      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[7.5vw] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {articles.map((a, i) => (
          <div
            key={a.title}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="flex w-[85vw] max-w-[340px] shrink-0 snap-center items-stretch py-2 [scroll-snap-stop:always]"
          >
            <ArticleCard article={a} className="w-full" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2" role="tablist" aria-label="News articles">
        {articles.map((a, i) => {
          const isActive = i === active;
          return (
            <button
              key={a.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show news article: ${a.title}`}
              onClick={() => goTo(i)}
              className={`size-2 rounded-full transition-[width,background-color] duration-200 ${
                isActive ? "w-5 bg-black" : "bg-black/25"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function News() {
  return (
    <section
      id="news"
      className="w-full bg-[#f3f3f3] px-4 py-16 md:px-8 lg:py-[120px]"
    >
      {/* Mobile/tablet: title above, snap-scrolling slider with dot indicators */}
      <MobileSlider articles={ARTICLES} />

      {/* Desktop: rotated title left, 3 cards right with separator lines */}
      <div className="hidden lg:flex lg:items-end lg:justify-between lg:gap-8">
        <div className="flex h-[706px] w-[110px] items-center justify-center">
          <h2 className="-rotate-90 whitespace-nowrap font-light uppercase tracking-[-0.08em] leading-[0.86] text-black text-[clamp(48px,4.4vw,64px)]">
            Keep up with my latest
            <br />
            news &amp; achievements
          </h2>
        </div>

        <div className="flex flex-1 items-stretch gap-8">
          <ArticleCard
            article={ARTICLES[0]}
            className="flex-1 basis-0 max-w-[353px]"
          />
          <div aria-hidden className="w-px self-stretch bg-black/30" />
          <ArticleCard
            article={ARTICLES[1]}
            className="flex-1 basis-0 max-w-[353px] pt-[120px]"
          />
          <div aria-hidden className="w-px self-stretch bg-black/30" />
          <ArticleCard
            article={ARTICLES[2]}
            className="flex-1 basis-0 max-w-[353px]"
          />
        </div>
      </div>
    </section>
  );
}
