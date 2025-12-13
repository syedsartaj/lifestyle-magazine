interface CategoryPillProps {
  category: string
  color: string
  count?: number
  large?: boolean
}

const colorClasses: Record<string, string> = {
  pink: 'bg-pink/20 text-pink border-pink/40 hover:bg-pink hover:text-white',
  coral: 'bg-coral/20 text-coral border-coral/40 hover:bg-coral hover:text-white',
  rose: 'bg-rose/20 text-rose border-rose/40 hover:bg-rose hover:text-white',
  purple: 'bg-purple/20 text-purple border-purple/40 hover:bg-purple hover:text-white',
  green: 'bg-green/20 text-green border-green/40 hover:bg-green hover:text-white',
  orange: 'bg-orange/20 text-orange border-orange/40 hover:bg-orange hover:text-white',
}

export default function CategoryPill({ category, color, count, large = false }: CategoryPillProps) {
  const baseClasses = "inline-flex items-center gap-2 font-semibold uppercase tracking-wider rounded-full border-2 transition-all"
  const sizeClasses = large
    ? "px-6 py-2.5 text-sm"
    : "px-4 py-1.5 text-xs"
  const colorClass = colorClasses[color] || colorClasses.pink

  return (
    <span className={`${baseClasses} ${sizeClasses} ${colorClass}`}>
      <span>{category}</span>
      {count !== undefined && (
        <>
          <span className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span className="font-bold">{count}</span>
        </>
      )}
    </span>
  )
}
