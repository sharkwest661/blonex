// src/constants/categories.ts
import { Category } from "@/types/category.types";

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Nəqliyyat",
    slug: "neqliyyat",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638.svg",
    href: "/neqliyyat",
    order: 1,
  },
  {
    id: "2",
    name: "Daşınmaz Əmlak",
    slug: "dashinmaz-emlak",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9640.svg",
    href: "/dashinmaz-emlak",
    order: 2,
  },
  {
    id: "3",
    name: "Geyim",
    slug: "geyim",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9639.svg",
    href: "/geyim",
    order: 3,
  },
  {
    id: "4",
    name: "Uşaq aləmi",
    slug: "usaq-alemi",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_1.svg",
    href: "/usaq-alemi",
    order: 4,
  },
  {
    id: "5",
    name: "Kosmetika və sağlamlıq",
    slug: "kosmetika",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_2.svg",
    href: "/kosmetika",
    order: 5,
  },
  {
    id: "6",
    name: "İş Elanları",
    slug: "is-elanlari",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_3.svg",
    href: "/is-elanlari",
    order: 6,
  },
  {
    id: "7",
    name: "Elektronika",
    slug: "elektronika",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_4.svg",
    href: "/elektronika",
    order: 7,
  },
  {
    id: "8",
    name: "Ev və bağ üçün",
    slug: "ev-bag",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9639_1.svg",
    href: "/ev-bag",
    order: 8,
  },
  {
    id: "9",
    name: "Ərzaq",
    slug: "erzaq",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9640_2.svg",
    href: "/erzaq",
    order: 9,
  },
  {
    id: "10",
    name: "Heyvan, Bitki",
    slug: "heyvan-bitki",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_5.svg",
    href: "/heyvan-bitki",
    order: 10,
  },
  {
    id: "11",
    name: "İdman, musiqi, hobbi",
    slug: "idman-musiqi",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_8.svg",
    href: "/idman-musiqi",
    order: 11,
  },
  {
    id: "12",
    name: "Digər",
    slug: "diger",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_7.svg",
    href: "/diger",
    order: 12,
  },
  {
    id: "13",
    name: "Xidmətlər",
    slug: "xidmetler",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_6.svg",
    href: "/xidmetler",
    order: 13,
  },
  {
    id: "14",
    name: "Pulsuz",
    slug: "pulsuz",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_9.svg",
    href: "/pulsuz",
    order: 14,
  },
  {
    id: "15",
    name: "Super Fürsət",
    slug: "super-furset",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_10.svg",
    href: "/super-furset",
    order: 15,
  },
  {
    id: "16",
    name: "Mağaza və şirkətlər",
    slug: "magazalar",
    icon: "https://bolbol.az/media/2021/08/04/categories/Group_9638_11.svg",
    href: "/magazalar",
    order: 16,
  },
];

// Helper functions
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find((category) => category.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find((category) => category.id === id);
};

export const getVisibleCategories = (limit?: number): Category[] => {
  const visibleCategories = CATEGORIES.filter(
    (cat) => cat.isVisible !== false
  ).sort((a, b) => (a.order || 0) - (b.order || 0));

  return limit ? visibleCategories.slice(0, limit) : visibleCategories;
};
