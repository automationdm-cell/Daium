"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryLabel, priorityLabel, sampleSchedules, Schedule } from "../lib/schedules";
import { supabase } from "../lib/supabase";

const now = new Date();
const today = now.toISOString().slice(0, 10);
type CalendarRow = { id: string; title: string; schedule_date: string; start_time: string; priority: Schedule["priority"]; category: Schedule["category"]; location: string };

export default function Calendar() {
  const [schedules, setSchedules] = useState<Schedule[]>(sampleSchedules);
  const [selected, setSelected] = useState(today);
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      supabase.from("schedules").select("id,title,schedule_date,start_time,priority,category,location").order("schedule_date").then(({ data: rows }) => {
        if (rows) setSchedules((rows as CalendarRow[]).map(row => ({ ...sampleSchedules[0], id: row.id, title: row.title, date: row.schedule_date, startTime: row.start_time.slice(0, 5), priority: row.priority, category: row.category || "personal", location: row.location || "" })));
      });
    });
  }, []);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: first + days }, (_, i) => i < first ? null : i - first + 1);
  const selectedSchedules = schedules.filter(s => s.date === selected);
  return <main className="mx-auto min-h-screen max-w-[480px] bg-lilac-50 p-5"><Link href="/" className="text-sm font-bold text-violet-600">← 오늘</Link><div className="mt-4 flex items-center justify-between"><button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="rounded-xl bg-white px-3 py-2 font-bold text-violet-600">‹</button><h1 className="text-2xl font-black">{year}년 {month + 1}월</h1><button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="rounded-xl bg-white px-3 py-2 font-bold text-violet-600">›</button></div><p className="mt-2 text-sm text-slate-500">날짜를 선택한 뒤 새 일정 등록을 누르세요.</p><div className="mt-5 grid grid-cols-7 gap-1 text-center text-xs">{"일월화수목금토".split("").map(d => <b key={d} className="py-2 text-slate-400">{d}</b>)}{cells.map((day, i) => { const value = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : ""; const count = schedules.filter(s => s.date === value).length; return <button disabled={!day} onClick={() => setSelected(value)} key={i} className={`h-12 rounded-xl ${value === selected ? "bg-violet-500 text-white" : value === today ? "bg-violet-100 text-violet-700" : "bg-white"}`}>{day && <><span>{day}</span>{count > 0 && <small className="block text-[9px]">● {count}</small>}</>}</button>; })}</div><Link href={`/?new=1&date=${selected}`} className="mt-5 block rounded-xl bg-violet-500 py-3 text-center text-sm font-black text-white">＋ {selected}에 새 일정 등록</Link><h2 className="mt-7 font-black">{selected.slice(5).replace("-", "월 ")}일 일정</h2><div className="mt-3 space-y-2">{selectedSchedules.length ? selectedSchedules.map(s => <article key={s.id} className="rounded-2xl bg-white p-4 shadow-sm"><b>{s.startTime} · {s.title}</b><p className="mt-1 text-xs text-slate-500">{categoryLabel[s.category]} · {priorityLabel[s.priority]} · {s.location || "장소 미정"}</p></article>) : <p className="rounded-2xl bg-white p-5 text-center text-sm text-slate-400">등록된 일정이 없습니다.</p>}</div></main>;
}
