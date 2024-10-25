'use client'
import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineReload } from "react-icons/ai";
import styles from "./stage.module.css";
import { useEffect, useState } from "react";
import { createStage, deleteProjectStage, fetchProjectStageByProjectId, Stage } from "@/app/services/stage/actions";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Project } from "@/app/services/projects/actions";
import { IoMdClose } from "react-icons/io";

const StagePage = ({ currentProject }: { currentProject: Project }) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [stages, setStages] = useState<Stage[]>([]);
  const pathname = usePathname();
  const [newStage, setNewStage] = useState({
    stage_name: "",
    start_date: "",
    end_date: "",
    project_id: currentProject?.project_id,
  });

  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const loadStages = async () => {
      try {
        const data = await fetchProjectStageByProjectId(currentProject.project_id);
        setStages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStages();
  }, [currentProject.project_id]);

  const handleCreateStage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentProject?.project_id) {
      console.error("Project ID is not available.");
      return;
    }

    try {
      await createStage(newStage);

      const updatedStages = await fetchProjectStageByProjectId(currentProject.project_id);
      setStages(updatedStages);
      setNewStage({
        stage_name: "",
        start_date: "",
        end_date: "",
        project_id: currentProject?.project_id,
      });
      setShowForm(false);
    } catch (error) {
      console.error(`Failed to create project ${error}`);
    }
  };

  async function handleDeleteStage(stage_id: number) {
    try {
      await deleteProjectStage(stage_id);
      const updateStage = await fetchProjectStageByProjectId(currentProject.project_id);
      setStages(updateStage);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.stageList}>
      {loading ? (
        <div className={styles.loader}><AiOutlineReload size={50} /></div>
      ) : (
          <ul>
            {stages.map((stage) => (
            <li key={stage.stage_id} className={pathname === `/projects/project-stage/${stage.stage_id}` ? styles.activeItem : ""}>
              
              <Link href={`/projects/project-stage/${stage.stage_id}`}>
                <div className={styles.link}>{stage.stage_name}</div>
              </Link>
              <button onClick={() => handleDeleteStage(stage.stage_id)} className={styles.deleteButton}>
                <FaTrash />
              </button>
            </li>
          ))}
            
            <div className={styles.divider}></div>
            
          <button onClick={() => setShowForm(!showForm)} className={styles.createButton}>
            {showForm ?
              <p>
                <AiFillMinusCircle size={50} />
              </p>
                :
                <p>
                  Додати стадію
                <AiFillPlusCircle size={50} />                
              </p>

            }
          </button>
        </ul>
      )}

      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={() => setShowForm(false)} className={styles.closeModal}>
              <IoMdClose />
            </button>
            <form onSubmit={handleCreateStage} className={styles.form}>
              <h2>Create new stage</h2>
              <input
                type="text"
                placeholder="Stage name"
                value={newStage.stage_name}
                onChange={(e) => setNewStage({ ...newStage, stage_name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Stage projectId"
                value={String(newStage.project_id)}
                onChange={() => setNewStage({ ...newStage, project_id: currentProject?.project_id })}
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

export default StagePage;
