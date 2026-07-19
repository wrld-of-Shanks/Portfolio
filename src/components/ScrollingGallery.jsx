import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  wrap,
} from "motion/react";

const SPEED = 26;
const ITEM_HEIGHT = 160;
const GAP = 12;

function Column({ images, direction, onSelect }) {
  const baseY = useMotionValue(0);
  const loopHeight = images.length * ITEM_HEIGHT + (images.length - 1) * GAP;

  useAnimationFrame((_, delta) => {
    baseY.set(baseY.get() - (direction * SPEED * delta) / 1000);
  });

  const y = useTransform(baseY, (v) => wrap(-loopHeight, 0, v));

  return (
    <div
      style={{
        height: 500,
        overflow: "hidden",
        position: "relative",
        maskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        style={{ y, display: "flex", flexDirection: "column", gap: GAP }}
      >
        {[...images, ...images].map((img, i) => {
          const isOriginal = i < images.length;
          return (
            <motion.img
              key={i}
              layoutId={isOriginal ? img.id : undefined}
              src={img.src}
              alt=""
              draggable={false}
              onClick={() => onSelect(img)}
              style={{
                width: "100%",
                height: ITEM_HEIGHT,
                objectFit: "cover",
                borderRadius: 10,
                display: "block",
                flexShrink: 0,
                cursor: "pointer",
                userSelect: "none",
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export default function ScrollingGallery({ columns, onSelect }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gap: 16,
        width: "100%",
        maxWidth: 700,
        padding: 20,
        borderRadius: 24,
        background: "#111319",
      }}
    >
      {columns.map((col, i) => (
        <Column
          key={i}
          images={col.images}
          direction={col.direction}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export function GalleryLightbox({ selected, onClose }) {
  return (
    <AnimatePresence>
      {selected && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 110,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 111,
              pointerEvents: "none",
            }}
          >
            <img
              src={selected.src}
              alt=""
              onClick={onClose}
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                borderRadius: 14,
                pointerEvents: "auto",
                cursor: "zoom-out",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
