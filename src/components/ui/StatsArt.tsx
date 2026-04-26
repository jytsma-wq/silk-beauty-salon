'use client';

interface StatItem {
  number: string;
  description: string;
}

interface StatsArtProps {
  stats: StatItem[];
  className?: string;
}

export function StatsArt({ stats, className = '' }: StatsArtProps) {
  return (
    <div className={`stats-art ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-desc">{stat.description}</div>
        </div>
      ))}
    </div>
  );
}
