"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaPause, FaRecordVinyl } from "react-icons/fa";
import styled, { keyframes, ThemeProvider } from "styled-components";

const lightTheme = {
  background: "#f9f9f9",
  color: "#333",
  primary: "#6200ea",
  secondary: "#ccc",
  hoverShadow: "rgba(128, 0, 128, 0.5)",
};

const darkTheme = {
  background: "#333",
  color: "#f9f9f9",
  primary: "#bb86fc",
  secondary: "#444",
  hoverShadow: "rgba(255, 255, 255, 0.5)",
};

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useUser();

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/mp3" });
        setAudioBlob(audioBlob);
        uploadAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      intervalRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing the microphone", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const uploadAudio = async (audioBlob: Blob) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    const formData = new FormData();
    const uniqueFilename = `recording_${Date.now()}.mp3`;
    formData.append("file", audioBlob, uniqueFilename);
    formData.append("user_id", user.id);

    try {
      const response = await fetch(`http://localhost:3003/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Audio uploaded successfully");
      } else {
        console.error("Failed to upload audio");
      }
    } catch (error) {
      console.error("Error uploading audio", error);
    }
  };

  return {
    isRecording,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
  };
};

const AudioRecorder: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    isRecording,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

  const handleDone = () => {
    if (isRecording) {
      stopRecording();
    }
    console.log("Recording done:", audioBlob);
  };

  const handleRestart = () => {
    if (isRecording) {
      stopRecording();
    }
    startRecording();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <RecorderContainer>
        <MicrophoneIcon>
          <FaMicrophone size={50} />
        </MicrophoneIcon>
        <Visualization isRecording={isRecording} />
        <RecordingTime>{formatTime(recordingTime)}</RecordingTime>
        <Controls>
          {isRecording ? (
            <ControlButton onClick={stopRecording}>
              <FaPause size={40} />
            </ControlButton>
          ) : (
            <ControlButton onClick={startRecording}>
              <FaRecordVinyl size={40} />
            </ControlButton>
          )}
        </Controls>
        <ActionButtons>
          <ActionButton onClick={handleDone}>Done</ActionButton>
          <ActionButton onClick={handleRestart}>Restart</ActionButton>
        </ActionButtons>
      </RecorderContainer>
    </ThemeProvider>
  );
};

export default AudioRecorder;

const RecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.color};
  transition: box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:hover {
    box-shadow: 0 0 30px ${({ theme }) => theme.hoverShadow};
  }
`;

const MicrophoneIcon = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.background};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px ${({ theme }) => theme.hoverShadow};
  }
`;

const RecordingTime = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ControlButton = styled.button`
  background-color: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.color};
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.color};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px ${({ theme }) => theme.hoverShadow};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    opacity: 0.8;
    box-shadow: 0 0 10px ${({ theme }) => theme.hoverShadow};
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Visualization = styled.div<{ isRecording: boolean }>`
  width: 100px;
  height: 20px;
  background-color: ${({ isRecording, theme }) =>
    isRecording ? theme.primary : theme.secondary};
  border-radius: 10px;
  margin-bottom: 20px;
  animation: ${({ isRecording }) => (isRecording ? pulse : "none")} 1s infinite;
  transition: background-color 0.3s ease;
`;
