import { Card, CardContent, CardFooter } from '@/shared/components/ui/card';
import type { Project } from '@/feature/project/list/model/project';
import { Button } from '@/shared/components/ui/button';
import { useGlobalContext } from '@/shared/context';
import { TrashIcon } from 'lucide-react';

function ProjectCard({ project }: { project: Project }) {
  const { removeProject, setActiveProject } = useGlobalContext();
  return (
    <Card
      className="flex flex-row justify-between hover:bg-accent cursor-pointer w-full"
      onClick={() => {
        setActiveProject(project);
      }}
    >
      <CardContent>
        <h3 className="text-lg font-semibold" key={project.id}>
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground" key={project.id}>
          {project.description}
        </p>
        <span className="text-sm text-muted-foreground" key={project.id}>
          {project.tasksCount} tasks
        </span>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            removeProject(project.id);
          }}
        >
          <TrashIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
