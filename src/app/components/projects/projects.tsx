'use client';
import React, { useEffect, useState } from "react";
import styles from "./projects.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createProject, deleteProject, fetchProjects, Project } from "@/app/services/projects/actions";
import { FaTrash } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineReload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error(`Failed to fetch projects ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
      setNewProject({ name: "", description: "", startDate: "", endDate: "" });
      setShowForm(false);
    } catch (error) {
      console.error(`Failed to create project ${error}`);
    }
  };

  async function handleDeleteProject(projectId: number) {
    try {
      await deleteProject(projectId);
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
    } catch (error) {
      console.error(`Failed to delete project ${error}`);
    }
  }

  if (loading) {
    return <div className={styles.loader}><AiOutlineReload size={50} /></div>;
  }

  return (
    <div className={styles.projectList}>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className={pathname === `/projects/${project.id}` ? styles.activeItem : {} as string}>
            <Link href={`/projects/${project.id}`}>
              <div className={styles.link}>{project.name}</div>
            </Link>
            <button onClick={() => handleDeleteProject(project.id)} className={styles.deleteButton}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      <div className="">
        <div className={styles.divider}></div>

        <button onClick={() => setShowForm(!showForm)} className={styles.createButton}>
          {showForm ?
            <AiFillMinusCircle size={50}/>
            :
            <AiFillPlusCircle size={50}/>
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
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Project description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <input
                type="datetime-local"
                placeholder="Project start date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                required
              />
              <input
                type="datetime-local"
                placeholder="Project end date"
                value={newProject.endDate}
                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                required
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