"use client";
import Image from "next/image";
import { useState } from "react";

export function DiagramView({
  src,
  width,
  height,
  title,
  description,
}: {
  src: string;
  width: number;
  height: number;
  title: string;
  description: string;
}) {
  const [enlarged, setEnlarged] = useState(false);
  return (
    <>
      <div className="diagram-controls">
        <button
          type="button"
          aria-pressed={enlarged}
          onClick={() => setEnlarged(!enlarged)}
        >
          {enlarged ? "Fit diagram" : "Enlarge diagram"}
          <span className="sr-only">: {title}</span>
        </button>
        <span>Enlarge to inspect labels; scroll within the diagram.</span>
      </div>
      <div
        className="diagram-viewport"
        role="region"
        aria-label={`${title} diagram`}
        tabIndex={0}
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={`${title}: ${description}`}
          style={{ minWidth: enlarged ? width : undefined }}
        />
      </div>
    </>
  );
}
