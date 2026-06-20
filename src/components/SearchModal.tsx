import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useCatalog } from "@/data/useCatalog";
import { imageForProduct } from "@/data/categoryImages";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { data } = useCatalog();
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.toLowerCase().trim();
  const results = useMemo(() => {
    if (!data) return [];
    if (q.length < 2) return data.products.slice(0, 6);
    return data.products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sizes.some((s) => s.toLowerCase().includes(q)) ||
          p.variants.some((v) => v.sku.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [data, q]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const p = results[active];
        if (p) {
          e.preventDefault();
          navigate(`/product/${p.brandSlug}/${p.slug}`);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      onMouseDown={onClose}
    >
      <div
        className="mt-[80px] w-[92%] max-w-[640px] bg-background border border-border shadow-hover rounded-lg overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={18} className="text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by product, brand, category, size or SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            <>
              {q.length < 2 && (
                <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Suggested
                </p>
              )}
              {results.map((p, idx) => {
                const toneClass = p.brandSlug === "deep" ? "text-deep" : "text-angel";
                const isActive = idx === active;
                return (
                  <button
                    key={p.id}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => {
                      navigate(`/product/${p.brandSlug}/${p.slug}`);
                      onClose();
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-4 border-b border-border last:border-0 transition-colors ${
                      isActive ? "bg-muted" : "hover:bg-muted"
                    }`}
                  >
                    <img
                      src={imageForProduct(p.categorySlug)}
                      alt={p.name}
                      className="w-10 h-10 object-cover mix-blend-multiply bg-muted"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className={`text-[10px] uppercase tracking-widest font-bold ${toneClass}`}>
                        {p.brand} · {p.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>

        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[11px] text-muted-foreground bg-muted/40">
          <span><kbd className="px-1.5 py-0.5 border border-border rounded bg-background font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 border border-border rounded bg-background font-mono">↓</kbd> navigate</span>
          <span><kbd className="px-1.5 py-0.5 border border-border rounded bg-background font-mono">↵</kbd> select</span>
          <span><kbd className="px-1.5 py-0.5 border border-border rounded bg-background font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};