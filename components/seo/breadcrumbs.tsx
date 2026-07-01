import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string;
}

/** Accessible visual breadcrumb trail. Pair with breadcrumbSchema() for JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-cream-50/55">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-cream-50/80" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="transition hover:text-moss-300"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-cream-50/30" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
