import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { useGlobalContext } from '@/shared/context/useGlobalContext';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import { useState } from 'react';
import ProjectForm from './ProjectForm';
import { Button } from '@/shared/components/ui/button';
import { ProjectTasksChart } from '@/feature/project/chart/components/Chart';

function ProjectList() {
  const { projects, activeProject, clearActiveProject } = useGlobalContext();
  const [addProjectOpen, setAddProjectOpen] = useState(false);

  function handleProjectDialogOpenChange(open: boolean) {
    setAddProjectOpen(open);
  }

  return (
    <>
      <Dialog
        open={addProjectOpen}
        onOpenChange={handleProjectDialogOpenChange}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Projects</CardTitle>
              {activeProject ? null : <AddProject />}
              {activeProject ? (
                <Button onClick={() => clearActiveProject()}>back</Button>
              ) : null}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <ProjectTasksChart />
              <div className="flex flex-col gap-4 w-full">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    Add a project to get started
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <DialogContent className="gap-0 sm:max-w-md">
          <ProjectForm onClose={() => setAddProjectOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectList;
