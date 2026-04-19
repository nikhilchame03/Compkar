import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { DailyQuestions } from "@/components/practice/DailyQuestions";
import { PracticeFilters } from "@/components/practice/PracticeFilters";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { QuestionTable } from "@/components/practice/QuestionTable";
import { TopicList } from "@/components/practice/TopicList";
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
  topic: {
    name: string;
  };
  subject: {
    name: string;
  };
};

type DailyQuestion = {
  id: string;
  date: string;
  question: {
    id: string;
    title: string;
  };
};

const examTopicMatch = (examFilter: string, topic: Topic) => {
  if (examFilter === "ALL") {
    return true;
  }

  if (examFilter === "BOTH") {
    return topic.subject.exam === "BOTH";
  }

  return topic.subject.exam === examFilter || topic.subject.exam === "BOTH";
};

const difficultyOrder = ["EASY", "MEDIUM", "HARD"];
const examOrder = ["JEE", "NEET", "BOTH"];

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

  const availableTopics = useMemo(() => {
    return topics.filter((topic) => examTopicMatch(examFilter, topic));
  }, [topics, examFilter]);

  const topicNames = useMemo(() => {
    return Array.from(new Set(availableTopics.map((topic) => topic.name))).sort();
  }, [availableTopics]);

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => a.serialNumber - b.serialNumber);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return sortedQuestions.filter((question) => {
      const matchExam = examFilter === "ALL" || question.exam === examFilter;
      const matchDifficulty = difficultyFilter === "ALL" || question.difficulty === difficultyFilter;
      const matchTopic = topicFilter === "ALL" || question.topic.name === topicFilter;
      return matchExam && matchDifficulty && matchTopic;
    });
  }, [sortedQuestions, examFilter, difficultyFilter, topicFilter]);

  const handleExamChange = (value: string) => {
    setExamFilter(value);
    setTopicFilter("ALL");
  };

  const handleTopicChange = (value: string) => {
    setTopicFilter(value);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficultyFilter(value);
  };

  if (topicsLoading || questionsLoading || dailyLoading) {
    return <div className="practice-page">Loading practice dashboard...</div>;
  }

  return (
    <div className="practice-page">
      <PracticeHeader />

      <PracticeFilters
        examFilter={examFilter}
        difficultyFilter={difficultyFilter}
        topicFilter={topicFilter}
        topicOptions={topicNames}
        onExamChange={handleExamChange}
        onDifficultyChange={handleDifficultyChange}
        onTopicChange={handleTopicChange}
      />

      <main className="practice-grid">
        <TopicList topics={availableTopics} selectedTopic={topicFilter} onSelectTopic={handleTopicChange} />

        <section className="content-stack">
          <DailyQuestions items={dailyQuestions} />
          <QuestionTable
            questions={filteredQuestions}
            onSelectQuestion={(serial) => navigate(`/question/${serial}`)}
          />
        </section>
      </main>
    </div>
  );
}
