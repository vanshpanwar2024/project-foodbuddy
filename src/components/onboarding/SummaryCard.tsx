import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryCardProps = {
  title: string;
  value: string | string[];
};

export const SummaryCard = ({ title, value }: SummaryCardProps) => (
  <Card className="glass-panel border-white/10 bg-white/10">
    <CardHeader>
      <CardTitle className="text-sm text-white/70">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-base font-semibold text-white">
      {Array.isArray(value) ? value.join(", ") : value}
    </CardContent>
  </Card>
);
