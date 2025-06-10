import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

const ProgressCircle = ({
  percentage = 0,
  stroke = 5,
  fontSize = "1rem",
}) => {
  const normalizedPercent = Math.min(100, Math.max(0, percentage));
  const radius = 40;
  const center = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - normalizedPercent / 100);

  const progress = useMotionValue(0);
  const [displayText, setDisplayText] = useState("0%");

  useEffect(() => {
    const controls = animate(progress, normalizedPercent, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayText(`${Math.round(v)}%`)
    });
    return () => controls.stop();
  }, [normalizedPercent]);

  return (
    <svg
      viewBox="0 0 100 100"
      className="text-primary mx-auto min-w-[150px] w-[50%] lg:w-[70%]"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background Circle */}
      <circle
        className="text-accent-lighter"
        strokeWidth={stroke}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />

      {/* Animated Progress Circle */}
      <motion.circle
        className="text-primary"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeLinecap="butt"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
        transform="rotate(-90 50 50)"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Animated Percentage Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontSize, fontWeight: "bold" }}
      >
        {displayText}
      </text>
    </svg>
  );
};

export default ProgressCircle;
