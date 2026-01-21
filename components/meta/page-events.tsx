"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getCookie, sendMetaEvent } from "@/lib/meta-client";

export default function MetaPageEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() || "";

  useEffect(() => {
    void sendMetaEvent({
      event_name: "ViewContent",
      user_data: {
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      },
      custom_data: {
        content_type: "page",
        content_name: pathname || "/",
        query: queryString || undefined,
      },
    });
  }, [pathname, queryString]);

  return null;
}
