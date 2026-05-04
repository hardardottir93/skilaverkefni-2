'use client';

import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/ui/chart';
import { useGlobalContext } from '@/shared/context/useGlobalContext';
import chartConfig from '@/feature/project/chart/components/config';

export function ProjectTasksChart() {
  const { tasks } = useGlobalContext();

  const { chartData, total, completed, incomplete } = useMemo(() => {
    const completedCount = tasks.filter((t) => t.completed).length;
    const incompleteCount = tasks.filter((t) => !t.completed).length;
    return {
      total: tasks.length,
      completed: completedCount,
      incomplete: incompleteCount,
      chartData: [
        {
          name: 'completed' as const,
          value: completedCount,
          fill: 'var(--color-completed)',
        },
        {
          name: 'incomplete' as const,
          value: incompleteCount,
          fill: 'var(--color-incomplete)',
        },
      ],
    };
  }, [tasks]);

  const dataForPie = useMemo(
    () => chartData.filter((d) => d.value > 0),
    [chartData],
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tasks</CardTitle>
        <CardDescription>
          Complete vs incomplete across all projects
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {total === 0 ? (
          <p className="text-muted-foreground text-center text-sm py-8">
            No tasks yet. Add a project and tasks to see the breakdown.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent nameKey="name" hideLabel />}
              />
              <Pie data={dataForPie} dataKey="value" nameKey="name" />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {total} {total === 1 ? 'task' : 'tasks'} total
        </div>
        <div className="leading-none text-muted-foreground">
          {completed} complete · {incomplete} incomplete
        </div>
      </CardFooter>
    </Card>
  );
}
