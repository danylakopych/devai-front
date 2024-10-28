'use client';
import { useEffect, useState } from "react";
import styles from "./hat.module.css";

const Chat = ({ gptSessionId }: { gptSessionId: number }) => {
  const generateMockMessages = (sessionId: number) => [
    { id: 1, text: `Це повідомлення від GPT для сесії ${sessionId}`, sender: "GPT" },
    { id: 2, text: `Запит користувача для сесії ${sessionId}`, sender: "User" },
    { id: 3, text: `Відповідь від GPT для сесії ${sessionId}`, sender: "GPT" },
  ];

  const [messages, setMessages] = useState(generateMockMessages(gptSessionId));

  useEffect(() => {
    // Оновлюємо повідомлення при зміні gptSessionId
    setMessages(generateMockMessages(gptSessionId));
  }, [gptSessionId]);

  return (
    <div className={styles.chat}>
      {messages.length ? (
        messages.map((message) => (
          <div key={message.id} className={message.sender === "GPT" ? styles.gptMessage : styles.userMessage}>
            <p>{message.text}</p>
          </div>
        ))
      ) : (
        <p>Немає повідомлень для цієї сесії.</p>
      )}
    </div>
  );
};

export default Chat;
