import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FoodInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

export const FoodInput = ({
  value,
  onChange,
  onSubmit,
  isLoading,
}: FoodInputProps) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-center">
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Type a meal or craving (e.g., burger and fries)"
      className="bg-emerald-50/60"
    />
    <Button
      className="md:w-48"
      onClick={onSubmit}
      disabled={isLoading}
    >
      {isLoading ? "Analyzing..." : "Get recommendation"}
    </Button>
  </div>
);
