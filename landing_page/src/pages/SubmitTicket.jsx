"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const GRADIENT_HOVER = "linear-gradient(135deg, #007a91 0%, #65c040 100%)";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fff",
    "&:hover fieldset": { borderColor: "#0097b2" },
    "&.Mui-focused fieldset": {
      borderColor: "#0097b2",
      boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
    },
    "&.Mui-disabled": {
      background: "#f4fbfc",
      "& fieldset": { borderColor: "#e0f4f7" },
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0097b2" },
  "& .MuiInputBase-input": { color: "#000" },
  "& .MuiInputBase-input.Mui-disabled": {
    color: "#555",
    WebkitTextFillColor: "#555",
  },
};

function FieldLabel({ children, required }) {
  return (
    <Box
      sx={{
        fontSize: "0.78rem",
        fontWeight: 600,
        color: "#0097b2",
        mb: 0.7,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {children}
      {required && <span style={{ color: "#e53935", marginLeft: 3 }}>*</span>}
    </Box>
  );
}

function GradientButton({
  children,
  onClick,
  secondary = false,
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 28px",
        borderRadius: "10px",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.5 : 1,
        ...(secondary
          ? {
              background: hovered ? GRADIENT : "transparent",
              color: hovered ? "#fff" : "#0097b2",
              border: "1.5px solid #0097b2",
              boxShadow: "none",
            }
          : {
              background: disabled
                ? "#ccc"
                : hovered
                  ? GRADIENT_HOVER
                  : GRADIENT,
              color: "#fff",
              border: "none",
              boxShadow: disabled
                ? "none"
                : hovered
                  ? "0 4px 14px rgba(0,151,178,0.3)"
                  : "0 2px 8px rgba(0,151,178,0.18)",
            }),
      }}
    >
      {children}
    </button>
  );
}

// ── Quill Rich Text Editor ────────────────────────────────────────────────────
function QuillEditor({ value, onChange, resetKey }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Load Quill CSS
    if (!document.getElementById("quill-css")) {
      const link = document.createElement("link");
      link.id = "quill-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
      document.head.appendChild(link);
    }

    // Load Quill JS
    const loadQuill = () => {
      if (window.Quill) {
        initQuill();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
      script.onload = initQuill;
      document.head.appendChild(script);
    };

    const initQuill = () => {
      if (quillRef.current) return; // already init
      if (!editorRef.current) return;

      const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ];

      const quill = new window.Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Describe your issue in detail…",
        modules: {
          toolbar: toolbarOptions,
        },
      });

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange(html === "<p><br></p>" ? "" : html);
      });

      quillRef.current = quill;
    };

    loadQuill();
  }, []);

  // Reset editor content when resetKey changes
  useEffect(() => {
    if (quillRef.current && resetKey > 0) {
      quillRef.current.setText("");
      quillRef.current.root.innerHTML = "";
      onChange("");
    }
  }, [resetKey]);

  return (
    <Box
      sx={{
        "& .ql-toolbar": {
          borderRadius: "10px 10px 0 0",
          border: "1.5px solid #d0eef3 !important",
          borderBottom: "1px solid #e8f6f9 !important",
          background: "#f8fdfe",
          padding: "8px 12px",
          flexWrap: "wrap",
        },
        "& .ql-container": {
          borderRadius: "0 0 10px 10px",
          border: "1.5px solid #d0eef3 !important",
          borderTop: "none !important",
          fontSize: "0.875rem",
          fontFamily: "inherit",
        },
        "& .ql-editor": {
          minHeight: "140px",
          color: "#000",
          lineHeight: 1.7,
          padding: "14px 16px",
          "&.ql-blank::before": {
            color: "#bbb",
            fontStyle: "normal",
            fontSize: "0.875rem",
          },
        },
        "& .ql-editor:focus": {
          outline: "none",
        },
        "&:focus-within .ql-toolbar": {
          borderColor: "#0097b2 !important",
          borderBottom: "1px solid #d0eef3 !important",
        },
        "&:focus-within .ql-container": {
          borderColor: "#0097b2 !important",
          boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
        },
        // Toolbar button colours
        "& .ql-toolbar button:hover .ql-stroke, & .ql-toolbar button.ql-active .ql-stroke":
          {
            stroke: "#0097b2 !important",
          },
        "& .ql-toolbar button:hover .ql-fill, & .ql-toolbar button.ql-active .ql-fill":
          {
            fill: "#0097b2 !important",
          },
        "& .ql-toolbar .ql-picker-label:hover, & .ql-toolbar .ql-picker-label.ql-active":
          {
            color: "#0097b2 !important",
          },
        "& .ql-toolbar .ql-picker-label:hover .ql-stroke": {
          stroke: "#0097b2 !important",
        },
        "& .ql-toolbar button": {
          borderRadius: "6px",
          transition: "background 0.15s",
          "&:hover": { background: "rgba(0,151,178,0.08) !important" },
        },
        "& .ql-snow .ql-picker.ql-expanded .ql-picker-options": {
          border: "1.5px solid #d0eef3",
          borderRadius: "8px",
          boxShadow: "0 4px 16px rgba(0,151,178,0.12)",
        },
        "& blockquote": {
          borderLeft: "3px solid #0097b2 !important",
          color: "#555 !important",
          paddingLeft: "12px !important",
          marginLeft: "0 !important",
          background: "rgba(0,151,178,0.04)",
          borderRadius: "0 6px 6px 0",
        },
        "& pre.ql-syntax": {
          background: "#1e1e2e !important",
          color: "#cdd6f4 !important",
          borderRadius: "8px !important",
          fontSize: "0.82rem !important",
          padding: "12px 16px !important",
        },
      }}
    >
      <div ref={editorRef} />
    </Box>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const ISSUE_TYPES = [
  "Order Issue",
  "Payment Issue",
  "Shipping Issue",
  "Product Issue",
  "Account Issue",
  "Return / Refund",
  "Other",
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function SubmitTicket() {
  const [showCC, setShowCC] = useState(false);
  const [ccEmail, setCcEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const fileRef = useRef(null);

  const requesterEmail = "dispute@unicsi.com";

  const handleAttach = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (idx) =>
    setAttachments((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    if (!subject || !issueType || !description) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setSubject("");
    setIssueType("");
    setDescription("");
    setCcEmail("");
    setShowCC(false);
    setAttachments([]);
    setResetKey((k) => k + 1);
  };

  const handleCancel = () => {
    setSubject("");
    setIssueType("");
    setDescription("");
    setCcEmail("");
    setShowCC(false);
    setAttachments([]);
    setResetKey((k) => k + 1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4fbfc",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Box>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#000",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Submit a Ticket
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#666", mt: 0.2 }}>
            Our support team will get back to you shortly
          </Typography>
        </Box>
      </Box>

      {/* Success banner */}
      {submitted && (
        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            background: "rgba(126,217,87,0.12)",
            border: "1.5px solid rgba(126,217,87,0.4)",
            borderRadius: "12px",
            px: 2.5,
            py: 1.5,
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#7ed957,#4caf50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Box>
          <Box sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#2e7d1e" }}>
            Ticket submitted successfully! We'll reach out to you soon.
          </Box>
        </Box>
      )}

      {/* Form card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1.5px solid #e0f4f7",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,151,178,0.08)",
          maxWidth: 760,
        }}
      >
        {/* Card header */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            background:
              "linear-gradient(135deg, rgba(0,151,178,0.06) 0%, rgba(126,217,87,0.06) 100%)",
            borderBottom: "1.5px solid #e0f4f7",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,151,178,0.2)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </Box>
          <Box>
            <Box sx={{ fontSize: "1rem", fontWeight: 700, color: "#000" }}>
              New Support Request
            </Box>
            <Box sx={{ fontSize: "0.8rem", color: "#666", mt: 0.2 }}>
              Fill in the details below and we'll respond within 24 hours
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            {/* Requester */}
            <Box>
              <FieldLabel required>Requester</FieldLabel>
              <TextField
                fullWidth
                size="small"
                value={requesterEmail}
                disabled
                sx={fieldSx}
              />
            </Box>

            {/* CC Toggle */}
            <Box>
              <button
                type="button"
                onClick={() => setShowCC((v) => !v)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1.5px solid #0097b2",
                  background: "transparent",
                  color: "#0097b2",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GRADIENT;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "transparent";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#0097b2";
                  e.currentTarget.style.borderColor = "#0097b2";
                }}
              >
                {showCC ? "Hide CC" : "Add CC"}
              </button>

              {showCC && (
                <Box
                  sx={{
                    mt: 1.5,
                    display: "flex",
                    alignItems: "center",
                    border: "1.5px solid #d0eef3",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "#fff",
                    "&:focus-within": {
                      borderColor: "#0097b2",
                      boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1,
                      background: "#f0fafc",
                      borderRight: "1.5px solid #d0eef3",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#0097b2",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Cc
                  </Box>
                  <input
                    type="email"
                    value={ccEmail}
                    onChange={(e) => setCcEmail(e.target.value)}
                    placeholder="For example: abc@gmail.com"
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      padding: "9px 12px",
                      fontSize: "0.875rem",
                      color: "#000",
                      background: "transparent",
                    }}
                  />
                </Box>
              )}
            </Box>

            <Divider sx={{ borderColor: "#e8f6f9" }} />

            {/* Subject */}
            <Box>
              <FieldLabel required>Subject</FieldLabel>
              <TextField
                fullWidth
                size="small"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your issue"
                sx={fieldSx}
              />
            </Box>

            {/* Issue Type */}
            <Box>
              <FieldLabel required>Issue Type</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  displayEmpty
                  renderValue={(v) =>
                    v || <span style={{ color: "#aaa" }}>Choose…</span>
                  }
                  sx={{
                    borderRadius: "10px",
                    background: "#fff",
                    "& fieldset": { borderColor: "#d0eef3" },
                    "&:hover fieldset": { borderColor: "#0097b2" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0097b2",
                      boxShadow: "0 0 0 3px rgba(0,151,178,0.1)",
                    },
                    "& .MuiSelect-select": {
                      color: issueType ? "#000" : "#aaa",
                    },
                  }}
                >
                  {ISSUE_TYPES.map((t) => (
                    <MenuItem
                      key={t}
                      value={t}
                      sx={{
                        fontSize: "0.875rem",
                        "&:hover": { background: "rgba(0,151,178,0.07)" },
                        "&.Mui-selected": {
                          background: "rgba(0,151,178,0.1)",
                          color: "#0097b2",
                          fontWeight: 600,
                        },
                      }}
                    >
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Description — Quill RTE */}
            <Box>
              <FieldLabel required>Description</FieldLabel>
              <QuillEditor
                value={description}
                onChange={setDescription}
                resetKey={resetKey}
              />
              <Box sx={{ fontSize: "0.72rem", color: "#aaa", mt: 0.8 }}>
                Supports bold, italic, lists, code blocks, links, and more
              </Box>
            </Box>

            {/* Attachments */}
            <Box>
              <input
                ref={fileRef}
                type="file"
                hidden
                multiple
                onChange={handleAttach}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: "8px",
                  border: "1.5px dashed #b8e8f0",
                  background: "#f8fdfe",
                  color: "#0097b2",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0097b2";
                  e.currentTarget.style.background = "#edf8fb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#b8e8f0";
                  e.currentTarget.style.background = "#f8fdfe";
                }}
              >
                <AttachFileIcon sx={{ fontSize: 15 }} />
                Attachment
              </button>

              {attachments.length > 0 && (
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}
                >
                  {attachments.map((f, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.8,
                        background: "rgba(0,151,178,0.08)",
                        border: "1px solid rgba(0,151,178,0.25)",
                        borderRadius: "20px",
                        px: 1.5,
                        py: 0.4,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#0097b2",
                      }}
                    >
                      📎 {f.name}
                      <span
                        onClick={() => removeAttachment(i)}
                        style={{
                          cursor: "pointer",
                          color: "#e53935",
                          fontWeight: 800,
                          marginLeft: 2,
                          fontSize: "0.85rem",
                        }}
                      >
                        ×
                      </span>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            <Divider sx={{ borderColor: "#e8f6f9" }} />

            {/* Actions */}
            <Stack direction="row" spacing={1.5}>
              <GradientButton secondary onClick={handleCancel}>
                Cancel
              </GradientButton>
              <GradientButton
                onClick={handleSubmit}
                disabled={!subject || !issueType || !description}
              >
                Submit Ticket
              </GradientButton>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
