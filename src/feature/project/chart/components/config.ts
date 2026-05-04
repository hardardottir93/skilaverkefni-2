import type { ChartConfig } from '@/shared/components/ui/chart';

const chartConfig = {
  completed: {
    label: 'Complete',
    color: 'var(--chart-1)',
  },
  incomplete: {
    label: 'Incomplete',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export default chartConfig;
