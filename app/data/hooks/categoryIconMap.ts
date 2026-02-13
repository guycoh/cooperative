//data/hook/categoryIconMap.ts

import BakeryIcon from "@/public/svgFiles/categories/BakeryIcon";
import CleaningIcon from "@/public/svgFiles/categories/CleaningIcon";
import BabyProductsIcon from "@/public/svgFiles/categories/BabyProductsIcon";
import DisposableIcon from "@/public/svgFiles/categories/DisposabIcon";
import DairyAndEggsIcon from "@/public/svgFiles/categories/DairyAndEggsIcon";
import MeatAndFishIcon from "@/public/svgFiles/categories/MeatAndFishIcon";
import FruitsAndVegIcon from "@/public/svgFiles/categories/FruitsAndVegIcon";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export const categoryIconMap: Record<string, React.FC<IconProps>> = {
  "c46164c7-829e-4a60-ac37-9ca3e8d7a145": FruitsAndVegIcon,
  "9690ab56-212e-4f26-88b1-a7818e97537d": BakeryIcon,
  "2e6c23b5-6666-451e-8250-d2dd7d863319": MeatAndFishIcon,
  "7c62df3e-387a-4237-b4f2-ee065c87ea0c": CleaningIcon,
  "d73a87f1-d2ad-470c-8b65-aa329f48f96e": BabyProductsIcon,
  "cf0f06fa-7a5b-413c-915d-22b7a3012b6d": DisposableIcon,
  "f796d53a-0ec3-494c-bee4-4b1a879c843d": DairyAndEggsIcon,
};
