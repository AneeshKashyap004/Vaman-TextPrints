export default function ImageFrame({
  src,
  alt,
  className = '',
  aspect = 'aspect-[16/10]',
  rounded = 'rounded-2xl md:rounded-3xl',
  srcSet,
  sizes,
}) {
  return (
    <div
      className={`group relative overflow-hidden border border-line bg-charcoal/5 ${aspect} ${rounded} ${className}`}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className="h-full w-full object-cover transition duration-700 ease-luxury group-hover:scale-[1.04] group-hover:brightness-[1.05]"
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}
