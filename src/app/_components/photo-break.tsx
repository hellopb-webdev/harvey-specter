import Image from "next/image";

export function PhotoBreak() {
  return (
    <section className="relative w-full overflow-hidden aspect-[375/565] md:aspect-[1440/900]">
      <Image
        src="/images/photo-break.png"
        alt="Harvey shooting with a Nikon DSLR"
        fill
        sizes="100vw"
        className="object-cover object-[68%_center] md:object-center"
      />
    </section>
  );
}
