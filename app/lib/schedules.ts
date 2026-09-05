export type Priority = "low" | "normal" | "high" | "urgent";
export type Transport = "walk" | "car" | "bus" | "subway" | "taxi" | "train" | "air" | "other";
export type AlarmSound = "bell" | "soft" | "urgent" | "silent";
export type Task = { id: string; title: string; completed: boolean };
export type Schedule = { id: string; title: string; date: string; startTime: string; endTime: string; priority: Priority; people: string; location: string; transport: Transport; travelMinutes: number; alarmTime: string; alarmSound: AlarmSound; memo: string; status: "planned" | "completed"; tasks: Task[] };
const today = new Date().toISOString().slice(0, 10);
export const priorityLabel: Record<Priority, string> = { low: "낮음", normal: "보통", high: "높음", urgent: "긴급" };
export const transportLabel: Record<Transport, string> = { walk: "도보", car: "자가용", bus: "버스", subway: "지하철", taxi: "택시", train: "기차", air: "항공", other: "기타" };
export const soundLabel: Record<AlarmSound, string> = { bell: "기본 벨", soft: "부드러운 알림", urgent: "긴급 알림", silent: "무음" };
export const sampleSchedules: Schedule[] = [
  { id: "meeting", title: "사업 기획 회의", date: today, startTime: "14:00", endTime: "15:30", priority: "urgent", people: "다이음팀", location: "충주 회의실", transport: "car", travelMinutes: 35, alarmTime: "13:15", alarmSound: "urgent", memo: "발표자료와 회의 안건을 확인하세요.", status: "planned", tasks: [{ id: "slides", title: "발표자료 확인", completed: false }, { id: "agenda", title: "회의 안건 정리", completed: true }] },
  { id: "call", title: "김민수 님 통화", date: today, startTime: "17:30", endTime: "18:00", priority: "high", people: "김민수", location: "온라인", transport: "other", travelMinutes: 0, alarmTime: "17:20", alarmSound: "bell", memo: "다음 주 일정 조율", status: "planned", tasks: [{ id: "memo", title: "논의할 내용 메모", completed: false }] },
];
export function recommendedDeparture(startTime: string, travelMinutes: number) { const [h, m] = startTime.split(":").map(Number); const total = (h * 60 + m - travelMinutes + 1440) % 1440; return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`; }
