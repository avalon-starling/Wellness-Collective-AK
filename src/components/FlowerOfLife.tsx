// The Collective's recurring background motif, carried over from the brand
// exploration. Pure decoration — always aria-hidden.
export function FlowerOfLife({
  size = 200,
  stroke = "#fff",
  opacity = 0.3,
  strokeWidth = 0.5,
  className,
}: {
  size?: number;
  stroke?: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const r = 30;
  const hexPoints: [number, number][] = [
    [0, 0],
    [r, 0],
    [-r, 0],
    [r * 0.5, r * 0.866],
    [-r * 0.5, r * 0.866],
    [r * 0.5, -r * 0.866],
    [-r * 0.5, -r * 0.866],
    [r * 1.5, r * 0.866],
    [-r * 1.5, r * 0.866],
    [r * 1.5, -r * 0.866],
    [-r * 1.5, -r * 0.866],
    [0, r * 1.732],
    [0, -r * 1.732],
    [r, r * 1.732],
    [-r, r * 1.732],
    [r, -r * 1.732],
    [-r, -r * 1.732],
    [r * 0.5, r * 2.598],
    [-r * 0.5, r * 2.598],
    [r * 0.5, -r * 2.598],
    [-r * 0.5, -r * 2.598],
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      style={{ opacity }}
      className={className}
    >
      {hexPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      ))}
      <circle cx={0} cy={0} r={90} fill="none" stroke={stroke} strokeWidth={strokeWidth * 1.6} />
    </svg>
  );
}
