"use client";
import { useEffect } from "react";

export const useAntiCheat = (onViolation) => {
  useEffect(() => {
    // Common warning handler
    const handleWarning = (message) => {
      console.warn(`Anti-Cheat Warning: ${message}`);
      // Agar component se custom function bheja hai toh wo chalega, warna default alert aayega
      if (onViolation) {
        onViolation(message);
      } else {
        alert(`Warning: ${message}`);
      }
    };

    // 1. Block Right-Click (Context Menu)
    const handleContextMenu = (e) => {
      e.preventDefault();
      handleWarning("Right-click is disabled during the assessment.");
    };

    const handleWindowFocus = () => {
      // Jab user wapas aaye, toh check karo kya wo bahar gaya tha?
      if (sessionStorage.getItem("wentOut") === "true") {
        sessionStorage.removeItem("wentOut"); // Nishani hatao
        if (onViolation) {
          onViolation("You switched tabs or minimized the window!");
        }
      }
    };

    // 2. Block Keyboard Shortcuts (Inspect, Copy, Paste, etc.)
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const isCtrlOrCmd = e.ctrlKey || e.metaKey; // Support for both Windows & Mac

      // Block F12 (Inspect Element)
      if (key === "f12") {
        e.preventDefault();
        handleWarning("Inspect Element is disabled.");
      }

      // Block Ctrl+Shift+I / J / C (Dev Tools)
      if (isCtrlOrCmd && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
        handleWarning("Developer tools are disabled.");
      }

      // Block Ctrl+U (View Source)
      if (isCtrlOrCmd && key === "u") {
        e.preventDefault();
        handleWarning("Viewing source code is disabled.");
      }

      // Block Copy, Paste, Cut, Select All, Print (Ctrl+C, V, X, A, P)
      if (isCtrlOrCmd && ["c", "v", "x", "a", "p"].includes(key)) {
        e.preventDefault();
        handleWarning("Copy, Paste, Select All, and Print shortcuts are disabled.");
      }
    };

    // 3. Detect Tab Switching / Minimizing
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleWarning("You switched tabs! This violation has been recorded.");
      }
    };

    // 4. Detect Window Focus Loss (Clicking outside the browser)
    const handleWindowBlur = () => {
      // 👉 NAYI LINE: Agar screen par alert khula hai, toh isko ignore karo
      if (sessionStorage.getItem("warningActive") === "true") return;

      // Jab user bahar jaye, toh nishani chhod do
      sessionStorage.setItem("wentOut", "true");
    };


    // 5. Block Native Clipboard Actions (Mouse Copy/Paste)
    const handleClipboard = (e) => {
      e.preventDefault();
      handleWarning("Copying or pasting text is strictly prohibited.");
    };

    // 6. Block Drag and Drop (Dragging text or images)
    const handleDragAndDrop = (e) => {
      e.preventDefault();
    };

    // ==========================================
    // Attach All Event Listeners
    // ==========================================
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("copy", handleClipboard);
    document.addEventListener("cut", handleClipboard);
    document.addEventListener("paste", handleClipboard);
    document.addEventListener("dragstart", handleDragAndDrop);
    document.addEventListener("drop", handleDragAndDrop);
    window.addEventListener("focus", handleWindowFocus);

    // Disable text selection via CSS on the body while exam is active
    document.body.style.userSelect = "none";

    // ==========================================
    // Cleanup Function (When component unmounts)
    // ==========================================
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("copy", handleClipboard);
      document.removeEventListener("cut", handleClipboard);
      document.removeEventListener("paste", handleClipboard);
      document.removeEventListener("dragstart", handleDragAndDrop);
      document.removeEventListener("drop", handleDragAndDrop);
      window.removeEventListener("focus", handleWindowFocus);
      
      // Re-enable text selection when exam is over
      document.body.style.userSelect = "auto";
    };
  }, [onViolation]);
};