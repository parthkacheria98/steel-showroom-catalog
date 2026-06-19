import { motion } from "framer-motion";
import { Award, Image as ImageIcon } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const galleryItems = [
  { title: "IHGF Delhi Fair 2025", category: "Trade Show" },
  { title: "Ambiente Frankfurt 2024", category: "Trade Show" },
  { title: "Excellence in Steelware Award", category: "Award" },
  { title: "Mumbai Houseware Expo", category: "Trade Show" },
  { title: "Best Manufacturer 2023", category: "Award" },
  { title: "India Kitchenware Summit", category: "Trade Show" },
  { title: "Innovation in Design", category: "Award" },
  { title: "Hospitality India Show", category: "Trade Show" },
];

const Gallery = () => (
  <div className="max-w-[1200px] mx-auto px-6 py-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="mb-12 max-w-2xl"
    >
      <span className="text-primary font-mono text-xs tracking-tighter uppercase">Shows & Recognition</span>
      <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mt-2">Gallery</h1>
      <p className="text-muted-foreground mt-4">
        Moments from trade shows, exhibitions and award ceremonies. Forty years of craftsmanship, recognised by the industry.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {galleryItems.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease }}
          className="group relative aspect-[16/10] overflow-hidden border border-border bg-muted shadow-soft"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {item.category === "Award" ? (
              <Award size={48} strokeWidth={1} className="text-muted-foreground/40" />
            ) : (
              <ImageIcon size={48} strokeWidth={1} className="text-muted-foreground/40" />
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent transition-opacity duration-300 group-hover:from-foreground/90" />
          <div className="absolute left-6 bottom-5 right-6">
            <h3 className="text-background text-xl font-heading font-semibold tracking-tight drop-shadow-sm">
              {item.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>

    <p className="text-xs text-muted-foreground mt-12 text-center font-mono">
      Photos coming soon. Replace placeholders in src/pages/Gallery.tsx with real images.
    </p>
  </div>
);

export default Gallery;
