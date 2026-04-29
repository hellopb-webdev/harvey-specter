import Image from "next/image";

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

export function News() {
  return (
    <section
      id="news"
      className="w-full bg-[#f3f3f3] px-4 py-16 md:px-8 lg:py-[120px]"
    >
      {/* Mobile/tablet: title above, horizontal-scroll cards */}
      <div className="flex flex-col gap-8 lg:hidden">
        <h2 className="font-light uppercase tracking-[-0.08em] leading-[0.86] text-black text-[clamp(28px,8vw,48px)]">
          Keep up with my latest news &amp; achievements
        </h2>
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {ARTICLES.map((a) => (
            <ArticleCard
              key={a.title}
              article={a}
              className="w-[300px] shrink-0"
            />
          ))}
        </div>
      </div>

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
