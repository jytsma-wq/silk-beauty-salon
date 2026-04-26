'use client';

interface NumberedListItem {
  number: string;
  title: string;
  description: string;
  href?: string;
}

interface NumberedListProps {
  items: NumberedListItem[];
  className?: string;
}

export function NumberedList({ items, className = '' }: NumberedListProps) {
  return (
    <ul className={`editorial-list ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="editorial-list-item group cursor-pointer">
          <span className="editorial-list-number">{item.number}</span>
          <div className="editorial-list-content">
            <h3 className="editorial-list-title">{item.title}</h3>
            <p className="editorial-list-desc">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
