export function InTheBox({
  items,
}: {
  items: { quantity: number; label: string }[];
}) {
  return (
    <div>
      <h3 className='heading-4'>IN THE BOX</h3>
      <ul className='mt-6 space-y-2'>
        {items.map((item,i) => (
          <li key={i} className='flex gap-4'>
            <span className='text-primary font-bold'>{item.quantity}x</span>
            <span className='text-black/70'>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
