'use client';
import { fetchGptIntegrationByStageId, GptIntegration } from "@/app/services/gptIntegration/actions";
import { Stage } from "@/app/services/stage/actions";
import { useEffect, useState } from "react";
import styles from "./gpt-integration.module.css";
import Chat from "../chat/chat";

const GptIntegrationPage = ({ currentStage }: { currentStage: Stage }) => { 

  const [gptIntegrations, setGptIntegrations] = useState<GptIntegration[]>([]);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<number | null>(null);

  useEffect(() => {
    const loadGptIntegrations = async () => {
      try {
        const data = await fetchGptIntegrationByStageId(currentStage.stage_id);
        setGptIntegrations(data);
        if (data.length > 0) setSelectedIntegrationId(data[0].gpt_session_id);
      } catch (error) {
        console.error(error);
      }
    };
    
    loadGptIntegrations();
   }, [currentStage.stage_id]);

  return (
     <div className={styles.gptIntegrationContainer}>
      {/* Tab Menu */}
      <div className={styles.tabMenu}>
        {gptIntegrations.map((integration) => (
          <div
            key={integration.gpt_session_id}
            className={`${styles.tabItem} ${
              selectedIntegrationId === integration.gpt_session_id ? styles.activeTab : ""
            }`}
            onClick={() => setSelectedIntegrationId(integration.gpt_session_id)}
          >
            {integration.gpt_name}
          </div>
        ))}
      </div>

      {/* Chat Display */}
      <div className={styles.chatContainer}>
        {selectedIntegrationId ? (
          <Chat gptSessionId={selectedIntegrationId} />
        ) : (
          <p>Select a tab to view the chat</p>
        )}
      </div>
    </div>
  )
};

export default GptIntegrationPage;