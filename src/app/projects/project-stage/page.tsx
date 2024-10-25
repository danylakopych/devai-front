import { redirect } from "next/navigation";
import { auth } from "../../../../auth";


const ProjectStagePage = async () => { 

  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <div>
      Project stage
    </div>
  );
};

export default ProjectStagePage;