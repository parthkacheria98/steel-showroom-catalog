import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGallery } from "@/data/useGallery";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const GallerySection = () => {
  const { data = [] } = useGallery();
  const previewItems = data.slice(0, 3);
  if (previewItems.length === 0) return null;
  return (
  <section className="max-w-[1200px] mx-auto px-6 py-20">
    <div className="flex items-end justify-between mb-10">
      <div>
        <span className="text-primary font-mono text-xs tracking-tighter uppercase">Recognition</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mt-2">Shows & Awards</h2>
      </div>
      <Link to="/gallery" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2">
        View Gallery <span>→</span>
      </Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {previewItems.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05, ease }}
          className="group relative aspect-[16/10] overflow-hidden border border-border bg-muted shadow-soft"
        >
          <img
            src={item.imageUrl}
            alt={item.caption}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent" />
          <div className="absolute left-5 bottom-4 right-5">
            <h3 className="text-background text-lg font-heading font-semibold tracking-tight drop-shadow-sm">
              {item.caption}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
  );
};
