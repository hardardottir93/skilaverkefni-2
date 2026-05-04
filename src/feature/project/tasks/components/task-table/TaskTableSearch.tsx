import { Input } from '@/shared/components/ui/input';

type TaskTableSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TaskTableSearch({ value, onChange }: TaskTableSearchProps) {
  return (
    <Input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tasks by title, description, or priority…"
      className="max-w-sm"
      aria-label="Search tasks"
    />
  );
}
