import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "오늘의 일정",
    short_name: "오늘의 일정",
    description: "일정과 할 일을 관리하세요.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F6FF",
    theme_color: "#8062E8",
  };
}
