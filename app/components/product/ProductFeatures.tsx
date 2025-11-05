export function ProductFeatures({ text }: { text: string }) {
  const paras = text.split("\n\n");
  return (
    <div>
      <h3 className='heading-4'>FEATURES</h3>
      {paras.map((p, i) => (
        <p key={i} className='body text-black/70 mt-6'>
          {p}
        </p>
      ))}
    </div>
  );
}
