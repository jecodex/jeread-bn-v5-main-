"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, User, BellOff, Trash2, UserX, Flag, LogOut } from "lucide-react";
import Link from "next/link";

/**
 * Props:
 * - isGroup (bool) - show group-specific options (leave group)
 * - onViewProfile(userId)
 * - onMute()
 * - onClearChat()
 * - onDeleteChat()
 * - onBlockUser()
 * - onReport()
 * - onLeaveGroup()
 * - className (string) - extra classes for the trigger button
 * - triggerAriaLabel (string)
 */
export default function ThreeDotMenu({
  isGroup = false,
  onViewProfile = () => {},
  onMute = () => {},
  onClearChat = () => {},
  onDeleteChat = () => {},
  onBlockUser = () => {},
  onReport = () => {},
  onLeaveGroup = () => {},
  className = "",
  triggerAriaLabel = "Open chat options",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        aria-label={triggerAriaLabel}
        onClick={() => setOpen((s) => !s)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
      >
        <MoreVertical size={20} className="text-gray-600 dark:text-gray-400" />
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1"
        >
          <button
            onClick={() => { setOpen(false); onViewProfile(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
            role="menuitem"
          >
            <User size={16} /> <span className="text-sm">View profile</span>
          </button>

          <button
            onClick={() => { setOpen(false); onMute(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
            role="menuitem"
          >
            <BellOff size={16} /> <span className="text-sm">Mute notifications</span>
          </button>

          <button
            onClick={() => { setOpen(false); onClearChat(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
            role="menuitem"
          >
            <LogOut size={16} /> <span className="text-sm">Clear chat</span>
          </button>

          <button
            onClick={() => { setOpen(false); onDeleteChat(); }}
            className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3 text-red-600"
            role="menuitem"
          >
            <Trash2 size={16} /> <span className="text-sm">Delete conversation</span>
          </button>

          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

          <button
            onClick={() => { setOpen(false); onBlockUser(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
            role="menuitem"
          >
            <UserX size={16} /> <span className="text-sm">Block user</span>
          </button>

          <button
            onClick={() => { setOpen(false); onReport(); }}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3"
            role="menuitem"
          >
            <Flag size={16} /> <span className="text-sm">Report</span>
          </button>

          {isGroup && (
            <>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
              <button
                onClick={() => { setOpen(false); onLeaveGroup(); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-sm"
                role="menuitem"
              >
                <span>Leave group</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
