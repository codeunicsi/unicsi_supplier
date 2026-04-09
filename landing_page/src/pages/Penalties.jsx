"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

const TEAL = "#0097b2";
const LIME = "#7ed957";
const GRADIENT = "linear-gradient(135deg, #0097b2 0%, #7ed957 100%)";
const BORDER = "1.5px solid #e0f4f7";
const MUTED = "#5c6b70";

function SectionCard({ icon, title, children, accent = TEAL }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: BORDER,
        borderRadius: "16px",
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: "0 2px 12px rgba(0,151,178,0.06)",
      }}
    >
      <Box
        sx={{
          height: 4,
          background: GRADIENT,
          opacity: 0.9,
        }}
      />
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${TEAL}18 0%, ${LIME}22 100%)`,
              color: accent,
              flexShrink: 0,
            }}
          >
            {React.createElement(icon, { sx: { fontSize: 24 } })}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                fontSize: "1.05rem",
                lineHeight: 1.35,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}

function TimelineBand({ label, sublabel, tone }) {
  const tones = {
    calm: { bg: "rgba(0,151,178,0.08)", border: "rgba(0,151,178,0.25)", chip: TEAL },
    watch: { bg: "rgba(126,217,87,0.12)", border: "rgba(126,217,87,0.35)", chip: "#5a9e3a" },
    strict: { bg: "rgba(0,151,178,0.04)", border: "#e0f4f7", chip: MUTED },
  };
  const t = tones[tone] || tones.calm;

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: 140 },
        p: 2,
        borderRadius: "12px",
        bgcolor: t.bg,
        border: `1px solid ${t.border}`,
      }}
    >
      <Chip
        label={label}
        size="small"
        sx={{
          bgcolor: "#fff",
          color: t.chip,
          fontWeight: 600,
          fontSize: "0.7rem",
          border: `1px solid ${t.border}`,
          mb: 0.75,
        }}
      />
      <Typography variant="body2" sx={{ color: MUTED, lineHeight: 1.55, fontSize: "0.8125rem" }}>
        {sublabel}
      </Typography>
    </Box>
  );
}

function FeeRow({ range, amount, emphasis }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      sx={{
        py: 1.25,
        alignItems: { sm: "center" },
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f9fb",
        "&:last-of-type": { borderBottom: "none", pb: 0 },
        "&:first-of-type": { pt: 0 },
      }}
    >
      <Typography sx={{ color: MUTED, fontSize: "0.875rem", flex: 1 }}>
        {range}
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
          color: emphasis ? TEAL : "#0f172a",
          fontSize: "0.9rem",
          textAlign: { xs: "left", sm: "right" },
          minWidth: { sm: 140 },
        }}
      >
        {amount}
      </Typography>
    </Stack>
  );
}

export default function Penalties() {
  return (
    <Box sx={{ maxWidth: 1040, mx: "auto", pb: 5, px: { xs: 0, sm: 0.5 } }}>
      {/* Hero */}
      <Box
        sx={{
          borderRadius: "20px",
          p: { xs: 3, sm: 4 },
          mb: 3,
          background: GRADIENT,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,151,178,0.25)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.12)",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.12em",
              fontWeight: 700,
              opacity: 0.95,
              fontSize: "0.7rem",
            }}
          >
            Supplier policy
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.65rem", sm: "2rem" },
              lineHeight: 1.2,
              mt: 0.5,
              mb: 1,
            }}
          >
            Penalties &amp; SLA
          </Typography>
          <Typography
            sx={{
              opacity: 0.95,
              maxWidth: 560,
              lineHeight: 1.65,
              fontSize: "0.9375rem",
            }}
          >
            Understand how Unicsi applies charges when dispatch or order outcomes fall
            outside agreed timelines. Dispatching on time protects your margin and
            customer experience.
          </Typography>
        </Box>
      </Box>

      {/* Intro */}
      <Card
        elevation={0}
        sx={{
          border: BORDER,
          borderRadius: "16px",
          mb: 3,
          bgcolor: "#fff",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", mb: 1.5 }}>
            Why deductions happen
          </Typography>
          <Typography sx={{ color: MUTED, lineHeight: 1.75, fontSize: "0.9375rem" }}>
            A <strong style={{ color: "#0f172a" }}>penalty</strong> is a fee or percentage
            withheld from your payout when an order breaks platform rules or misses the
            dispatch window we commit to buyers. Penalties are not meant to punish
            one-off issues—they keep service levels predictable for everyone on the
            network.
          </Typography>
        </CardContent>
      </Card>

      {/* Timeline explainer — own visual, not a copy of external grids */}
      <SectionCard icon={ScheduleOutlinedIcon} title="How we count dispatch days">
        <Typography sx={{ color: MUTED, mb: 2, lineHeight: 1.7, fontSize: "0.9375rem" }}>
          &ldquo;Day from order&rdquo; is the number of calendar days after the order is
          confirmed. The first two days are treated as your standard fulfilment window;
          anything beyond that is considered an SLA breach for pricing purposes.
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mt: 1 }}
        >
          <TimelineBand
            tone="calm"
            label="Days 0 – 1"
            sublabel="Normal SLA window. Aim to hand over to courier within this period."
          />
          <TimelineBand
            tone="watch"
            label="Day 2"
            sublabel="Breach window begins. Some outcomes stay neutral; others start accruing fees."
          />
          <TimelineBand
            tone="strict"
            label="Day 3 onward"
            sublabel="Later dispatch typically attracts higher charges or percentages."
          />
        </Stack>
      </SectionCard>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#0f172a",
          mt: 4,
          mb: 2,
          fontSize: "1.05rem",
        }}
      >
        Charges by outcome
      </Typography>
      <Typography sx={{ color: MUTED, mb: 2.5, fontSize: "0.9rem", lineHeight: 1.65 }}>
        Amounts below are illustrative slabs used for supplier statements. Your contract
        and in-app notices always prevail if they differ.
      </Typography>

      <Stack spacing={2.5}>
        <SectionCard icon={LocalShippingOutlinedIcon} title="Successful delivery">
          <FeeRow range="Dispatched on day 0 or 1 (within SLA)" amount="No penalty" emphasis />
          <FeeRow range="Dispatched on day 2" amount="No penalty" emphasis />
          <FeeRow
            range="Dispatched day 3 or later"
            amount="Per breach policy — prioritize on-time handoff"
          />
        </SectionCard>

        <SectionCard icon={UndoOutlinedIcon} title="RTO (return to origin)">
          <FeeRow range="RTO when dispatched within SLA (days 0 – 1)" amount="No penalty" emphasis />
          <FeeRow range="RTO when dispatched on day 2" amount="₹70" />
          <FeeRow range="RTO when dispatched on day 3" amount="₹140" />
          <FeeRow range="RTO when dispatched day 4 or later" amount="Higher slab applies" />
        </SectionCard>

        <SectionCard icon={BlockOutlinedIcon} title="Cancellation (warehouse or platform-initiated)">
          <Typography sx={{ color: MUTED, fontSize: "0.8125rem", mb: 1, lineHeight: 1.6 }}>
            Applies only to cancellations attributed to supplier or fulfilment for
            eligible reason codes—not buyer-initiated cancels.
          </Typography>
          <FeeRow range="Cancelled while still in SLA window" amount="15% of order value" />
          <FeeRow range="Cancelled after day 2 dispatch delay" amount="20%" />
          <FeeRow range="Cancelled after day 3+" amount="30%" />
          <FeeRow range="Repeated or severe cases" amount="Review + possible restrictions" />
        </SectionCard>

        <SectionCard icon={AssignmentReturnOutlinedIcon} title="Returns">
          <Typography sx={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.7, mb: 1 }}>
            When a return is accepted and linked to late dispatch or breach windows,
            return handling fees may apply by shipment weight.
          </Typography>
          <Divider sx={{ borderColor: "#f0f9fb", my: 1 }} />
          <FeeRow range="Shipment weight up to 500 g" amount="₹110" />
          <FeeRow range="Shipment weight above 500 g" amount="₹150" />
        </SectionCard>
      </Stack>

      <Box
        sx={{
          mt: 3,
          p: 2.5,
          borderRadius: "12px",
          bgcolor: "rgba(0,151,178,0.06)",
          border: "1px solid rgba(0,151,178,0.15)",
        }}
      >
        <Typography sx={{ fontSize: "0.8125rem", color: MUTED, lineHeight: 1.65 }}>
          <strong style={{ color: TEAL }}>Note:</strong> Slabs and percentages can change
          with policy updates. You will see applied penalties itemized on payouts and
          statements inside the supplier panel.
        </Typography>
      </Box>
    </Box>
  );
}
