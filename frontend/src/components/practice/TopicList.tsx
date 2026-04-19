type Topic = {
  id: string;
  name: string;
  subject: {
    name: string;
  };
};

type TopicListProps = {
  topics: Topic[];
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
};

export function TopicList({ topics, selectedTopic, onSelectTopic }: TopicListProps) {
  return (
    <aside className="topic-panel">
      <h2>Topics</h2>
      <p className="panel-subtext">Jump chapter-wise like LeetCode tags.</p>
      <div className="topic-list">
        <button className={selectedTopic === "ALL" ? "topic-chip active" : "topic-chip"} onClick={() => onSelectTopic("ALL")}>
          All Topics
        </button>
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={selectedTopic === topic.name ? "topic-chip active" : "topic-chip"}
            onClick={() => onSelectTopic(topic.name)}
          >
            {topic.subject.name}: {topic.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
