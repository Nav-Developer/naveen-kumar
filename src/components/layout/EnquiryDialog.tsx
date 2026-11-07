"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

export type EnquiryChannel = "whatsapp" | "email";

export interface EnquiryDialogProps {
  open: boolean;
  onClose: () => void;

  title: string;
  subtitle?: string;

  header?: ReactNode;

  defaultSubject: string;
  defaultMessage: string;

  enquiryLabel: string;

  whatsappNumber: string;
  email: string;

  recipientName?: string;

  defaultChannel?: EnquiryChannel;
}

const accent = {
  whatsapp: {
    bg: "linear-gradient(90deg, #16a34a, #22c55e)",
    hover: "#15803d",
  },
  email: {
    bg: "linear-gradient(90deg, #2563eb, #3b82f6)",
    hover: "#1d4ed8",
  },
} as const;

export default function EnquiryDialog({
  open,
  onClose,
  title,
  subtitle = "Tell me about your project. Let's make it happen.",
  header,
  defaultSubject,
  defaultMessage,
  enquiryLabel,
  whatsappNumber,
  email,
  recipientName = "there",
  defaultChannel = "whatsapp",
}: EnquiryDialogProps) {
  const [channel, setChannel] = useState<EnquiryChannel>(defaultChannel);
  const [subject, setSubject] = useState(defaultSubject);
  const [description, setDescription] = useState(defaultMessage);

  // Re-prefill every time the dialog opens (or the target item changes)
  useEffect(() => {
    if (open) {
      setSubject(defaultSubject);
      setDescription(defaultMessage);
      setChannel(defaultChannel);
    }
  }, [open, defaultSubject, defaultMessage, defaultChannel]);

  const canSend = subject.trim() !== "" && description.trim() !== "";

  const handleSend = () => {
    if (!canSend) return;

    if (channel === "whatsapp") {
      const message = [
        `Hi ${recipientName}!`,
        ``,
        `*${enquiryLabel}*`,
        ``,
        `*Subject:* ${subject.trim()}`,
        ``,
        `*Project Description:*`,
        description.trim(),
        ``,
        `Looking forward to discussing this project with you!`,
      ].join("\n");

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const body = [
        `Hi ${recipientName},`,
        ``,
        description.trim(),
        ``,
        `Enquiry type: ${enquiryLabel}`,
        ``,
        `Looking forward to discussing this project with you!`,
      ].join("\n");

      window.location.href = `mailto:${email}?subject=[NAVEEN-PORTFOLIO] : ${encodeURIComponent(
        subject.trim(),
      )}&body=${encodeURIComponent(body)}`;
    }

    onClose();
  };

  const isWhatsApp = channel === "whatsapp";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#171229",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 4,
            backgroundImage:
              "linear-gradient(145deg, rgba(99,102,241,0.08), transparent)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
            {title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: 12 }}>
            {subtitle}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{ color: "#fff" }}
          aria-label="Close enquiry"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {header && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              mb: 2,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {header}
          </Box>
        )}

        {/* CHANNEL TOGGLE */}
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={channel}
          onChange={(_, value: EnquiryChannel | null) => {
            if (value) setChannel(value);
          }}
          aria-label="Send enquiry via"
          sx={{
            mb: 1,
            "& .MuiToggleButton-root": {
              color: "rgba(255,255,255,0.6)",
              borderColor: "rgba(255,255,255,0.12)",
              textTransform: "none",
              fontWeight: 600,
              gap: 1,
              py: 0.9,
            },
            "& .MuiToggleButton-root.Mui-selected": {
              color: "#fff",
              bgcolor: "rgba(99,102,241,0.28)",
              borderColor: "rgba(129,140,248,0.6)",
            },
            "& .MuiToggleButton-root.Mui-selected:hover": {
              bgcolor: "rgba(99,102,241,0.38)",
            },
          }}
        >
          <ToggleButton value="whatsapp">
            <WhatsAppIcon sx={{ fontSize: 18 }} />
            WhatsApp
          </ToggleButton>
          <ToggleButton value="email">
            <EmailIcon sx={{ fontSize: 18 }} />
            Email
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          fullWidth
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
          size="small"
        />

        <TextField
          fullWidth
          multiline
          rows={5}
          label="Project Description"
          placeholder="Tell me what you're looking for..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />

        <Typography color="text.secondary" sx={{ mt: 1, fontSize: 11 }}>
          {isWhatsApp
            ? "Your enquiry will be opened directly in WhatsApp. You can review and send the message there."
            : "Your enquiry will open in your email app. You can review and send it from there."}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{ color: "text.secondary", textTransform: "none" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={isWhatsApp ? <WhatsAppIcon /> : <EmailIcon />}
          onClick={handleSend}
          disabled={!canSend}
          sx={{
            background: accent[channel].bg,
            color: "#fff",
            borderRadius: 2,
            px: 2.5,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { background: accent[channel].hover },
            "&.Mui-disabled": { color: "rgba(255,255,255,0.4)" },
          }}
        >
          {isWhatsApp ? "Send via WhatsApp" : "Send via Email"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
