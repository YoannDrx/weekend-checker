"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatTimeRemaining,
  getNextFriday,
  getTimeRemaining,
  getWeekendEnd,
  isWeekend,
} from "@/lib/weekend";

const formatLocalTime = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

export default function WeekendWidget() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const timeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    [],
  );

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const weekend = currentTime ? isWeekend(currentTime, timeZone) : false;
  const target = currentTime
    ? weekend
      ? getWeekendEnd(currentTime, timeZone)
      : getNextFriday(currentTime, timeZone)
    : null;
  const countdown =
    currentTime && target
      ? formatTimeRemaining(getTimeRemaining(currentTime, target))
      : "--:--:--";

  return (
    <main className="weekend-shell">
      <section className="status-card" aria-labelledby="weekend-title">
        <div className="eyebrow">
          <span className={`status-dot ${weekend ? "is-on" : ""}`} />
          Statut local
        </div>

        <h1 id="weekend-title">C&apos;est le week-end&nbsp;?</h1>
        <p className={`answer ${weekend ? "is-weekend" : ""}`}>
          {currentTime ? (weekend ? "OUI" : "PAS ENCORE") : "VÉRIFICATION"}
        </p>

        <div className="countdown-panel">
          <p>{weekend ? "Fin du week-end dans" : "Vendredi, 12 h, dans"}</p>
          <p className="countdown" role="timer" aria-label={countdown}>
            {countdown}
          </p>
        </div>

        <dl className="context-grid">
          <div>
            <dt>Heure locale</dt>
            <dd>{currentTime ? formatLocalTime(currentTime, timeZone) : "…"}</dd>
          </div>
          <div>
            <dt>Fuseau détecté</dt>
            <dd>{timeZone}</dd>
          </div>
        </dl>

        <aside className="rule-card" aria-label="Règle appliquée">
          <span>Règle appliquée</span>
          <strong>Vendredi 12:00 → lundi 00:00</strong>
          <p>Le changement d’heure est calculé dans votre fuseau local.</p>
        </aside>
      </section>
    </main>
  );
}
