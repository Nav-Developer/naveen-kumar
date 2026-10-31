"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { techStack } from "@/data/techStack";
import SectionHeader from "./SectionHeader";

const STAGE = 460;

/**
 * Standalone orbit section. Drop it anywhere:
 *   <TechStackOrbit />
 * Pass showHeader={false} to render only the orbit.
 */
export default function TechStackOrbit({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  return (
    <Box>
      {showHeader && (
        <SectionHeader
          eyebrow={techStack.eyebrow}
          heading={techStack.heading}
          subheading={techStack.subheading}
        />
      )}

      {/* Outer box reserves the scaled height so mobile doesn't overflow */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: { xs: STAGE * 0.7, sm: STAGE },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: STAGE,
            height: STAGE,
            flexShrink: 0,
            transformOrigin: "top center",
            transform: { xs: "scale(0.7)", sm: "scale(1)" },
            borderRadius: 6,
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.10), transparent 70%)",
          }}
        >
          {/* Orbit rings + nodes */}
          {techStack.rings.map((ring, ri) => (
            <Box key={ri}>
              {/* ring line */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: ring.radius * 2,
                  height: ring.radius * 2,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />

              {/* rotating layer */}
              <motion.div
                animate={{ rotate: ring.reverse ? -360 : 360 }}
                transition={{
                  duration: ring.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                }}
              >
                {ring.nodes.map((label, ni) => {
                  const angle = (360 / ring.nodes.length) * ni + ri * 25;
                  return (
                    <Box
                      key={label}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 0,
                        height: 0,
                        transform: `rotate(${angle}deg) translateY(-${ring.radius}px)`,
                      }}
                    >
                      {/* undo the angle so the label stays level,
                          then counter-spin against the ring rotation */}
                      <Box sx={{ transform: `rotate(${-angle}deg)` }}>
                        <motion.div
                          animate={{ rotate: ring.reverse ? 360 : -360 }}
                          transition={{
                            duration: ring.duration,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Box
                            sx={{
                              width: 46,
                              height: 46,
                              ml: "-23px",
                              mt: "-23px",
                              borderRadius: "50%",
                              display: "grid",
                              placeItems: "center",
                              fontSize: 10,
                              fontWeight: 600,
                              fontFamily: "monospace",
                              color: "rgba(255,255,255,0.85)",
                              bgcolor: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              backdropFilter: "blur(8px)",
                              transition: "all .25s",
                              "&:hover": {
                                borderColor: "#60a5fa",
                                boxShadow: "0 0 16px rgba(96,165,250,0.6)",
                              },
                            }}
                          >
                            {label}
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>
                  );
                })}
              </motion.div>
            </Box>
          ))}

          {/* Center */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 92,
              height: 92,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 18,
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              boxShadow: "0 0 50px rgba(139,92,246,0.55)",
            }}
          >
            {techStack.center}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
