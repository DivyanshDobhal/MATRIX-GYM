import { motion } from "framer-motion";

interface ChartPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: ChartPoint[];
  height?: number;
  color?: string;
  glowColor?: string;
  ySuffix?: string;
}

export function LineChart({
  data,
  height = 200,
  color = "#39FF14",
  glowColor = "rgba(57, 255, 20, 0.35)",
  ySuffix = ""
}: LineChartProps) {
  const values = data.map((d) => d.value);
  const max = Math.max(...values, 100);
  const min = Math.min(...values, 0);
  const range = max - min;

  const width = 500;
  const padding = 40;

  // Calculate points coordinates
  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return { x, y, label: d.label, val: d.value };
  });

  // Construct path string
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Smooth cubic bezier curves
      const cpX1 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
      const cpY1 = points[i - 1].y;
      const cpX2 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
      const cpY2 = points[i].y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
    }
  }

  // Construct area path for subtle gradient fill
  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : "";

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] p-5">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * (height - padding * 2);
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              className="stroke-white/10"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Area Fill */}
        {areaD && (
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            d={areaD}
            fill="url(#chart-area-grad)"
          />
        )}

        {/* Neon Line Path */}
        {pathD && (
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        )}

        {/* Value Points */}
        {points.map((p, i) => (
          <g key={i} className="group cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill="#ffffff"
              stroke={color}
              strokeWidth="2.5"
              className="transition duration-200 group-hover:scale-150"
            />
            {/* Tooltip on hover */}
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              className="fill-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {p.val}
              {ySuffix}
            </text>
          </g>
        ))}

        {/* X Axis Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 12}
            textAnchor="middle"
            className="fill-white/40 text-[10px] font-semibold tracking-wider"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function BarChart({
  data,
  height = 180,
  color = "#39FF14"
}: {
  data: ChartPoint[];
  height?: number;
  color?: string;
}) {
  const values = data.map((d) => d.value);
  const max = Math.max(...values, 10);
  const width = 400;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = (chartWidth / data.length) * 0.6;
  const gap = (chartWidth / data.length) * 0.4;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] p-5">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {data.map((d, i) => {
          const ratio = d.value / max;
          const barHeight = ratio * chartHeight;
          const x = padding + i * (barWidth + gap) + gap / 2;
          const y = height - padding - barHeight;

          return (
            <g key={i} className="group">
              {/* Tooltip value */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {d.value}
              </text>
              {/* Bar */}
              <motion.rect
                initial={{ height: 0, y: height - padding }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="4"
                fill={color}
                className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                style={{ transformOrigin: "bottom" }}
              />
              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                className="fill-white/40 text-[9px] font-bold tracking-wider"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
