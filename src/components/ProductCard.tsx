import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product, assetUrl } from "@/data/api";
import { imageForProduct } from "@/data/categoryImages";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const img = product.images[0] ? assetUrl(product.images[0]) : imageForProduct(product.categorySlug);
  const hasRealImage = product.images.length > 0;
  const toneClass = product.brandSlug === "deep" ? "text-deep" : "text-angel";
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link to={`/product/${product.brandSlug}/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] bg-muted overflow-hidden border border-border shadow-soft transition-shadow duration-300 group-hover:shadow-hover">
          <img
            src={img}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${hasRealImage ? "" : "mix-blend-multiply"}`}
            loading="lazy"
          />
        </div>
        <div className="mt-5 space-y-2">
          <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${toneClass}`}>
            {product.brand} · {product.category}
          </p>
          <h3 className="text-lg font-heading font-semibold leading-tight tracking-tight">{product.name}</h3>
          <p className="pt-1 text-sm font-semibold flex items-center gap-2 group-hover:text-primary transition-colors duration-200">
            View Product
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
