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
    <>
      {/* Dropdowns row */}
      <section className="filter-row">
        <label>
          Exam
          <select value={examFilter} onChange={(e) => onExamChange(e.target.value)}>
            <option value="ALL">All</option>
            <option value="JEE">JEE</option>
            <option value="NEET">NEET</option>
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
            <option value="ALL">All Topics</option>
            {topicOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </section>

      {/* Topic tags — single select, no exam/difficulty tags here */}
      <div className="tags-strip">
        <button
          className={`lc-tag ${topicFilter === "ALL" ? "active" : ""}`}
          onClick={() => onTopicChange("ALL")}
        >
          All Topics
        </button>
        {topicOptions.map((topic) => (
          <button
            key={topic}
            className={`lc-tag ${topicFilter === topic ? "active" : ""}`}
            onClick={() => onTopicChange(topicFilter === topic ? "ALL" : topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </>
  );
}