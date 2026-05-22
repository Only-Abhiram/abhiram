type NavItem = {
  label: string;
  href: string;
};

type BottomNavProps = {
  items: NavItem[];
};

export default function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center gap-1 px-3 py-2 rounded-full    backdrop-blur-sm border border-gray-300 shadow-2xl  list-none m-0">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="block px-5 py-2 rounded-xl text-sm font-medium text-black hover:text-gray-400 hover:bg-white/15 hover:scale-110 transition-all duration-200 no-underline">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}