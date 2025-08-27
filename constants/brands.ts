// constants/brands.ts
export type BrandItem = {
    key: string;
    label: string;
    alt: string;
    src: string;     // من مجلد public
    href?: string;
  };
  
  export const BRANDS: BrandItem[] = [
    { key: "meta",         label: "Meta",               alt: "Meta",               src: "/brands/meta.png",          href: "https://about.facebook.com/meta/" },
    { key: "michigan",     label: "University of Michigan", alt: "University of Michigan", src: "/brands/michigan.png", href: "https://umich.edu/" },
    { key: "calarts",      label: "CalArts",           alt: "California Institute of the Arts", src: "/brands/calarts.png", href: "https://calarts.edu/" },
    { key: "georgia-tech", label: "Georgia Tech",      alt: "Georgia Institute of Technology",  src: "/brands/georgia-tech.png", href: "https://gatech.edu/" },
    { key: "youtube",      label: "YouTube",           alt: "YouTube",            src: "/brands/youtube.png",       href: "https://www.youtube.com/" },
    { key: "coursera",     label: "Coursera",          alt: "Coursera",           src: "/brands/coursera.png",      href: "https://www.coursera.org/" },
    { key: "ibm",          label: "IBM",               alt: "IBM",                src: "/brands/ibm.png",           href: "https://www.ibm.com/" },
    { key: "google",       label: "Google",            alt: "Google",             src: "/brands/google.png",        href: "https://www.google.com/" },
  ];
  