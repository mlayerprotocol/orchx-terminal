import React, { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  duration?: number; // Duration in milliseconds (default 3000ms)
}

const Notification: React.FC<NotificationProps> = ({
  message,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide notification after the specified duration
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [duration]);

  if (!visible) return null; // Don't render if not visible

  return (
    <div className="fixed max-w-[80vw] top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
      {message}
    </div>
  );
};

export default Notification;
