import { ChevronDown } from "lucide-react";
import { Variant } from "@/data/api";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface VariantListProps {
  variants: Variant[];
}

export const VariantList = ({ variants }: VariantListProps) => (
  <Collapsible className="space-y-3 group">
    <CollapsibleTrigger className="flex w-full items-center justify-between border border-border px-4 py-3 text-sm font-heading font-semibold uppercase tracking-widest text-foreground hover:bg-muted transition-colors">
      <span>Available Variants ({variants.length})</span>
      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div className="border border-border divide-y divide-border">
        <div className="grid grid-cols-4 gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted">
          <span>Size</span>
          <span>Weight</span>
          <span>Capacity</span>
          <span>Dimensions</span>
        </div>
        {variants.map((v) => (
          <div key={v.id} className="grid grid-cols-4 gap-4 px-4 py-3 text-sm font-mono">
            <span>{v.size || "-"}</span>
            <span>{v.weight || "-"}</span>
            <span>{v.capacity || "-"}</span>
            <span className="text-muted-foreground">-</span>
          </div>
        ))}
      </div>
    </CollapsibleContent>
  </Collapsible>
);
