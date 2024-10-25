'use client';
import React, { useEffect, useState } from "react";
import styles from "./projects.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createProject, deleteProject, fetchProjectsByUserId, Project } from "@/app/services/projects/actions";
import { FaTrash } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineReload } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { User } from "@/app/services/users/action";
import StagePage from "../stage/stage";


const Projects = ({currentUser}: {currentUser: User}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newProject, setNewProject] = useState({
    project_name: "",
    description: "",
    user_id: currentUser?.user_id,
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [openStageForProject, setOpenStageForProject] = useState<number | null>(null); 
  const pathname = usePathname();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjectsByUserId(currentUser.user_id);
        setProjects(data);
      } catch (error) {
        console.error(`Failed to fetch projects ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [currentUser.user_id]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser?.user_id) {
      console.error("User ID is not available.");
      return;
    }

    try {
      await createProject(newProject);
      
      const updatedProjects = await fetchProjectsByUserId(currentUser.user_id);
      setProjects(updatedProjects);
      setNewProject({ project_name: "", description: "", user_id: currentUser.user_id });
      setShowForm(false);
    } catch (error) {
      console.error(`Failed to create project ${error}`);
    }
  };

  async function handleDeleteProject(projectId: number) {
    try {
      await deleteProject(projectId);
      const updatedProjects = await fetchProjectsByUserId(currentUser.user_id);
      setProjects(updatedProjects);
    } catch (error) {
      console.error(`Failed to delete project ${error}`);
    }
  }

  const toggleStageDropdown = (projectId: number) => {
    setOpenStageForProject(openStageForProject === projectId ? null : projectId);
  };

  return (
    <div className={styles.projectList}>
      {loading ? (
        <div className={styles.loader}><AiOutlineReload size={50} /></div>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.project_id} className={pathname === `/projects/${project.project_id}` ? styles.activeItem : ""}>
              <div className={styles.item}>
                <Link href={`/projects/${project.project_id}`}>
                  <div className={styles.link}>{project.project_name}</div>
                </Link>
                <button onClick={() => handleDeleteProject(project.project_id)} className={styles.deleteButton}>
                  <FaTrash />
                </button>

                <button
                  className={styles.stageDropdownButton}
                  onClick={() => toggleStageDropdown(project.project_id)}
                >
                  {openStageForProject === project.project_id ?
                    <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              </div>

              {openStageForProject === project.project_id && (
                <div className={styles.stageDropdown}>
                  <StagePage currentProject={project} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div>
        <div className={styles.divider}></div>

        <button onClick={() => setShowForm(!showForm)} className={styles.createButton}>
          {showForm ?
            <AiFillMinusCircle size={50} />
            :
            <AiFillPlusCircle size={50} />
          }
        </button>
      </div>

      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={() => setShowForm(false)} className={styles.closeModal}>
              <IoMdClose />
            </button>
            <form onSubmit={handleCreateProject} className={styles.form}>
              <h2>Create new project</h2>
              <input
                type="text"
                placeholder="Project name"
                value={newProject.project_name}
                onChange={(e) => setNewProject({ ...newProject, project_name: e.target.value })}
                required
              />
              <textarea
                placeholder="Project description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Project userId"
                value={String(newProject.user_id)}
                onChange={() => setNewProject({ ...newProject, user_id: currentUser?.user_id })}
                required
                hidden
              />
              <button type="submit" className={styles.submitButton}>Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
