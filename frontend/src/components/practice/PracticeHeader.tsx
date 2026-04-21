import { Badge } from "@/components/ui/badge";

export function PracticeHeader() {
  return (
    <nav className="practice-navbar">
      <p className="practice-brand">COMPKAR</p>
      <span className="badge-exam" style={{ padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(0,184,107,0.3)", background: "rgba(0,184,107,0.12)", color: "var(--lc-green)" }}>
        Student View
      </span>
    </nav>
  );
}