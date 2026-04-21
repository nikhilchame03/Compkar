import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { DailyQuestions } from "@/components/practice/DailyQuestions";
import { PracticeFilters } from "@/components/practice/PracticeFilters";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { QuestionTable } from "@/components/practice/QuestionTable";
import { GET_DAILY_QUESTIONS, GET_QUESTIONS, GET_TOPICS } from "@/graphql/queries";
import "@/styles/practice.css";

type Topic = {
  id: string;
  name: string;
  subject: {
    id: string;
    name: string;
    exam: string;
  };
};

type Question = {
  id: string;
  serialNumber: number;
  exam: string;
  difficulty: string;
  title: string;
  statement: string;
  explanation?: string;
  topic: { name: string };
  subject: { name: string };
};

type DailyQuestion = {
  id: string;
  date: string;
  question: { id: string; title: string };
};

export function PracticeDashboard() {
  const [examFilter, setExamFilter] = useState("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");
  const [topicFilter, setTopicFilter] = useState("ALL");
  const navigate = useNavigate();

  const { data: topicsData, loading: topicsLoading } = useQuery<{ topics: Topic[] }>(GET_TOPICS);
  const { data: questionsData, loading: questionsLoading } = useQuery<{ questions: Question[] }>(GET_QUESTIONS);
  const { data: dailyData, loading: dailyLoading } = useQuery<{ dailyQuestions: DailyQuestion[] }>(GET_DAILY_QUESTIONS);

  const topics = topicsData?.topics ?? [];
  const questions = questionsData?.questions ?? [];
  const dailyQuestions = dailyData?.dailyQuestions ?? [];

  const topicNames = useMemo(() => {
    return Array.from(new Set(topics.map((t) => t.name))).sort();
  }, [topics]);

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => a.serialNumber - b.serialNumber);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return sortedQuestions.filter((q) => {
      const matchExam = examFilter === "ALL" || q.exam === examFilter;
      const matchDifficulty = difficultyFilter === "ALL" || q.difficulty === difficultyFilter;
      const matchTopic = topicFilter === "ALL" || q.topic.name === topicFilter;
      return matchExam && matchDifficulty && matchTopic;
    });
  }, [sortedQuestions, examFilter, difficultyFilter, topicFilter]);

  const handleExamChange = (value: string) => setExamFilter(value);
  const handleDifficultyChange = (value: string) => setDifficultyFilter(value);
  const handleTopicChange = (value: string) => setTopicFilter(value);

  if (topicsLoading || questionsLoading || dailyLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "var(--lc-muted)" }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="practice-page">
      <PracticeHeader />

      {/* Full-width single column — no sidebar */}
      <div className="content-stack">
        <PracticeFilters
          examFilter={examFilter}
          difficultyFilter={difficultyFilter}
          topicFilter={topicFilter}
          topicOptions={topicNames}
          onExamChange={handleExamChange}
          onDifficultyChange={handleDifficultyChange}
          onTopicChange={handleTopicChange}
        />
        <DailyQuestions items={dailyQuestions} />
        <QuestionTable
          questions={filteredQuestions}
          onSelectQuestion={(serial) => navigate(`/question/${serial}`)}
        />
      </div>
    </div>
  );
}