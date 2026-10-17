type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  classname?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  classname,
}: Props) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow text-[#788B3D]">{eyebrow}</p>
      <h2
        className={`mt-4 text-3xl font-semibold leading-[1.05] tracking-[-.065em]  sm:text-5xl ${classname}`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base sm:leading-7">
          {description}
        </p>
      )}
    </div>
  );
}
