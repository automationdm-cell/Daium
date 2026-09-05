import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "오늘의 일정", description: "일정과 할 일을 관리하는 모바일 플래너" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
