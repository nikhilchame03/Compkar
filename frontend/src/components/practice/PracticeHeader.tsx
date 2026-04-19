import { Badge } from "@/components/ui/badge";

export function PracticeHeader() {
  return (
    <header className="practice-header">
      <div>
        <p className="practice-brand">COMPKAR</p>
        <h1 className="practice-title">JEE / NEET Practice Hub</h1>
        <p className="practice-subtitle">Pick a topic, solve questions, and stay consistent with daily practice.</p>
      </div>
      <Badge className="bg-primary text-primary-foreground">Student View</Badge>
    </header>
  );
}
