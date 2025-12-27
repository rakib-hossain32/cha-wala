interface MenuCategoryProps {
  category: string;
  categoryBengali: string;
  isActive: boolean;
  onClick: () => void;
}

export default function MenuCategory({
  category,
  categoryBengali,
  isActive,
  onClick,
}: MenuCategoryProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center px-6 py-3 rounded-lg cultural-transition
        ${
          isActive
            ? "bg-primary text-primary-foreground shadow-warm"
            : "bg-card text-foreground hover:bg-muted"
        }
      `}
    >
      <span className="font-bengali font-semibold text-base">
        {categoryBengali}
      </span>
      <span className="text-xs font-heading opacity-80">{category}</span>
    </button>
  );
}
