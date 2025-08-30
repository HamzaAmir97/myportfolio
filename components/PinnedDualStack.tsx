"use client";

import { useEffect, useState } from "react";
import DesktopPinnedDualStack from "./pinned-dual-stack/DesktopPinnedDualStack";
import MobilePinnedDualStack from "./pinned-dual-stack/MobilePinnedDualStack";

function useIsDesktop(query = "(min-width: 768px)") {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [query]);

  return isDesktop;
}

export default function PinnedDualStack() {
  const isDesktop = useIsDesktop();

  // لتفادي وميض الـSSR/CSR
  if (isDesktop === null) return null;

  return isDesktop ? <DesktopPinnedDualStack /> : <MobilePinnedDualStack />;
}
