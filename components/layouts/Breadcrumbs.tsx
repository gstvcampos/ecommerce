import Link from 'next/link'

export default function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <div className="text-sm breadcrumbs py-4">
      <ul>
        <li>
          <Link href={'/'}>página inicial</Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx}>
            {idx === 0 ? (
              <Link href={`/produtos/${encodeURIComponent(item)}`}>{item}</Link>
            ) : idx === 1 ? (
              <Link
                href={`/produtos/${encodeURIComponent(
                  items[0],
                )}/${encodeURIComponent(item)}`}
              >
                {item}
              </Link>
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
