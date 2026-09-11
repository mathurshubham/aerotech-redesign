"use client";

import { Clock, Globe, Video } from "lucide-react";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

import { btnPrimary } from "./styles";

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const SLOTS = ["10:00", "10:30", "11:30", "14:00", "15:30", "16:00"];

type DayCell = {
  date: Date;
  inMonth: boolean;
  isPast: boolean;
  isWeekend: boolean;
  isAvailable: boolean;
};

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/** Monday-first weekday index, 0–6. */
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function buildMonth(anchor: Date, today: Date, availableCount: number): DayCell[] {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const leading = mondayIndex(first);
  const trailing = 6 - mondayIndex(last);

  const cells: DayCell[] = [];
  for (let i = leading; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    cells.push({ date, inMonth: false, isPast: true, isWeekend: false, isAvailable: false });
  }

  let availableAssigned = 0;
  for (let day = 1; day <= last.getDate(); day++) {
    const date = new Date(year, month, day);
    const isPast = startOfDay(date) < today;
    const dow = date.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const isAvailable =
      !isPast && !isWeekend && availableAssigned < availableCount ? (availableAssigned++, true) : false;
    cells.push({ date, inMonth: true, isPast, isWeekend, isAvailable });
  }

  for (let i = 1; i <= trailing; i++) {
    const date = new Date(year, month + 1, i);
    cells.push({ date, inMonth: false, isPast: false, isWeekend: false, isAvailable: false });
  }

  return cells;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const MONTH_LABEL_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export function BookingMock({
  name = "Ashwani Khanna",
  eventTitle = "Consultation — 30 min",
  durationMin = 30,
  timezone = "Asia/Kolkata (GMT+5:30)",
  calLink,
}: {
  name?: string;
  eventTitle?: string;
  durationMin?: number;
  timezone?: string;
  calLink?: string;
}) {
  const [today, setToday] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    // Client-only: computed after mount to avoid a server/client hydration
    // mismatch on "today". The server renders a stable skeleton instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(startOfDay(new Date()));
  }, []);

  const monthCells = useMemo(() => {
    if (!today) return [];
    return buildMonth(today, today, 9);
  }, [today]);

  useEffect(() => {
    if (!today || selectedDay) return;
    const firstAvailable = monthCells.find((c) => c.isAvailable);
    // Derives the default selected day once "today" resolves on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (firstAvailable) setSelectedDay(firstAvailable.date);
  }, [today, monthCells, selectedDay]);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function selectDay(date: Date) {
    setSelectedDay(date);
    setSelectedSlot(null);
    setConfirmed(false);
  }

  function handleDayKeyDown(e: KeyboardEvent, index: number) {
    const deltas: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 7,
      ArrowUp: -7,
    };
    if (e.key in deltas) {
      e.preventDefault();
      const next = index + deltas[e.key];
      const cell = monthCells[next];
      if (cell && !cell.isPast && !cell.isWeekend) {
        setFocusIndex(next);
        selectDay(cell.date);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const cell = monthCells[index];
      if (cell && !cell.isPast && !cell.isWeekend) selectDay(cell.date);
    }
  }

  return (
    <div className="min-h-[560px] rounded-lg border border-line bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 font-mono text-sm font-medium text-white"
          >
            {initials}
          </span>
          <div>
            <p className="text-[0.9375rem] font-semibold text-ink">{name}</p>
            <p className="mt-0.5 text-base font-semibold text-ink">{eventTitle}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8125rem] text-body">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} strokeWidth={1.6} aria-hidden="true" className="text-orange-500" />
                {durationMin} min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Video size={15} strokeWidth={1.6} aria-hidden="true" className="text-orange-500" />
                Google Meet
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe size={15} strokeWidth={1.6} aria-hidden="true" className="text-orange-500" />
                {timezone}
              </span>
            </div>
          </div>
        </div>
        {calLink && (
          <a
            href={calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-orange-600 transition-colors duration-150 hover:text-orange-500"
          >
            Open full calendar
          </a>
        )}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_220px]">
        {/* Calendar */}
        <div>
          <p className="font-mono text-[0.8125rem] font-medium text-ink">
            {today ? MONTH_LABEL_FORMAT.format(today) : " "}
          </p>
          <div className="mt-3 grid grid-cols-7 gap-1 font-mono text-[0.6875rem] text-subtle">
            {WEEKDAY_LABELS.map((d, i) => (
              <div key={`${d}-${i}`} className="flex h-6 items-center justify-center">
                {d}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {today
              ? monthCells.map((cell, i) => {
                  const isSelected = selectedDay ? sameDay(cell.date, selectedDay) : false;
                  const disabled = cell.isPast || cell.isWeekend || !cell.inMonth;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabled}
                      tabIndex={
                        focusIndex === i || (focusIndex === null && isSelected) ? 0 : -1
                      }
                      onClick={() => !disabled && selectDay(cell.date)}
                      onFocus={() => setFocusIndex(i)}
                      onKeyDown={(e) => handleDayKeyDown(e, i)}
                      aria-pressed={isSelected}
                      aria-label={cell.date.toDateString()}
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors duration-150",
                        !cell.inMonth && "text-navy-300",
                        disabled && cell.inMonth && "text-navy-300",
                        !disabled && !isSelected && "text-ink hover:bg-navy-100",
                        cell.isAvailable && !isSelected && "bg-navy-100 font-medium",
                        isSelected && "bg-orange-500 font-semibold text-white hover:bg-orange-500",
                      )}
                    >
                      {cell.date.getDate()}
                      {cell.isAvailable && !isSelected && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-1 h-1 w-1 rounded-full bg-orange-500"
                        />
                      )}
                    </button>
                  );
                })
              : Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="h-10 w-10 rounded-lg" />
                ))}
          </div>
        </div>

        {/* Slots */}
        <div>
          <p className="font-mono text-[0.8125rem] font-medium text-ink">
            {selectedDay
              ? selectedDay.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              : " "}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    setSelectedSlot(slot);
                    setConfirmed(false);
                  }}
                  aria-pressed={isSelected}
                  className={cn(
                    "h-11 w-full rounded-lg border text-sm font-medium transition-colors duration-150",
                    isSelected
                      ? "border-orange-500 text-orange-600"
                      : "border-line text-body hover:border-navy-400",
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          {selectedSlot && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className={cn(btnPrimary, "h-11 w-full px-4 text-sm")}
              >
                Confirm {selectedSlot} IST
              </button>
            </div>
          )}

          {confirmed && (
            <p
              role="status"
              className="mt-3 rounded-lg border border-orange-500 bg-orange-100 px-3 py-2.5 text-[0.8125rem] leading-[1.5] text-orange-600"
            >
              Sample widget — booking goes live with Cal.com. Use the form or
              WhatsApp to reach us now.
            </p>
          )}
        </div>
      </div>

      <p className="mt-6 border-t border-line pt-3 font-mono text-[0.6875rem] text-subtle">
        Powered by Cal.com · sample
      </p>
    </div>
  );
}
