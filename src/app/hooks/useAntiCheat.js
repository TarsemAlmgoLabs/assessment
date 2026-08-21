"use client";
import { useEffect } from "react";

export const useAntiCheat = () => {
  useEffect(() => {
    // 1. Block Right-Click (Context Menu)
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 2. Block Keyboard Shortcuts
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const isCtrlOrCmd = e.ctrlKey || e.metaKey; // Windows (Ctrl) aur Mac (Cmd) dono ke liye

      // Block F12 (Inspect Element)
      if (key === "f12") {
        e.preventDefault();
      }

      // Block Inspect Element Shortcuts (Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (isCtrlOrCmd && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
      }

      // Block View Source (Ctrl+U)
      if (isCtrlOrCmd && key === "u") {
        e.preventDefault();
      }

      // Block Copy, Paste, Cut, Select All, Print (Ctrl+C, V, X, A, P)
      if (isCtrlOrCmd && (key === "c" || key === "v" || key === "x" || key === "a" || key === "p")) {
        e.preventDefault();
      }
    };

    // Events ko puri window par attach kar do
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function: Jab candidate exam dekar wapas jaye toh ye restrictions hat jayein
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};