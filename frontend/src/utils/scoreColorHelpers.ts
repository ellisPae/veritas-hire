export const getScoreColor = (value: number) => {
  if (value >= 80) return "text-green-600";
  if (value >= 60) return "text-amber-400";
  return "text-red-600";
};
