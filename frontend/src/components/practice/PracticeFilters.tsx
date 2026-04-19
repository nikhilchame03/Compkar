type FilterProps = {
  examFilter: string;
  difficultyFilter: string;
  topicFilter: string;
  topicOptions: string[];
  onExamChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onTopicChange: (value: string) => void;
};

export function PracticeFilters({
  examFilter,
  difficultyFilter,
  topicFilter,
  topicOptions,
  onExamChange,
  onDifficultyChange,
  onTopicChange,
}: FilterProps) {
  return (
    <section className="filter-row">
      <label>
        Exam
        <select value={examFilter} onChange={(e) => onExamChange(e.target.value)}>
          <option value="ALL">All</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value="BOTH">Both</option>
        </select>
      </label>

      <label>
        Difficulty
        <select value={difficultyFilter} onChange={(e) => onDifficultyChange(e.target.value)}>
          <option value="ALL">All</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </label>

      <label>
        Topic
        <select value={topicFilter} onChange={(e) => onTopicChange(e.target.value)}>
          <option value="ALL">All</option>
          {topicOptions.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
