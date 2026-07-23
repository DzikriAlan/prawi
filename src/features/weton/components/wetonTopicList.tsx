// 2. Import Types
import type { DataWetonTopic } from "../types/wetonTypes";

const SPARKLINE_WIDTH = 56;
const SPARKLINE_HEIGHT = 20;

// 7. Props
interface Props {
  topics: DataWetonTopic[];
  onShowAllTopics: () => void;
}

export default function WetonTopicList({ topics, onShowAllTopics }: Props) {
  // 11. Methods / Handlers
  const getSparklinePoints = (trend: number[]) => {
    const maxValue = Math.max(...trend);
    const minValue = Math.min(...trend);
    const valueRange = maxValue - minValue || 1;
    const stepX = SPARKLINE_WIDTH / Math.max(trend.length - 1, 1);

    return trend
      .map((value, index) => {
        const x = index * stepX;
        const y =
          SPARKLINE_HEIGHT - ((value - minValue) / valueRange) * SPARKLINE_HEIGHT;

        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <div className="flex flex-col rounded-2xl border bg-background p-3.5">
      <div className="flex items-center justify-between pb-1.5">
        <span className="text-sm font-semibold text-foreground">Topik Populer</span>

        <button
          type="button"
          onClick={onShowAllTopics}
          className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          Lihat semua
        </button>
      </div>

      {topics.map((topic) => (
        <div key={topic.id} className="flex items-center gap-2.5 py-1.5">
          <span className="text-sm font-semibold text-primary">#</span>

          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground">
            {topic.name}
          </span>

          <span className="shrink-0 text-[11px] text-muted-foreground">
            {topic.postLabel}
          </span>

          <svg
            role="img"
            aria-label={`Tren ${topic.name}`}
            viewBox={`0 -2 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT + 4}`}
            width={SPARKLINE_WIDTH}
            height={SPARKLINE_HEIGHT}
            className="shrink-0 overflow-visible text-primary"
          >
            <polyline
              points={getSparklinePoints(topic.trend)}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
