"use client"

import { useState } from "react"
import { Box, Button, Grid, TextField, Typography, Paper, Alert, Stack } from "@mui/material"

export default function BankDetails() {
  const [mode, setMode] = useState("EMPTY")

  const [bankData, setBankData] = useState({
    holderName: "",
    accountNumber: "",
    reAccountNumber: "",
    ifsc: "",
    proof: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setBankData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSave = () => {
    console.log("Saving bank data", bankData)
    setMode("VIEW")
  }

  if (mode === "EMPTY") {
    return (
      <Box>
        <Button variant="contained" onClick={() => setMode("EDIT")}>
          Add Bank Details
        </Button>
      </Box>
    )
  }

  if (mode === "VIEW") {
    return (
      <Paper sx={{ p: { xs: 2, md: 3 }, maxWidth: { xs: "100%", md: 400 } }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Bank details will be used for all payments (Margin, Refunds)
        </Typography>

        <DetailField label="Account Holder Name" value={bankData.holderName} />
        <DetailField label="Bank Account Number" value="********4544" />
        <DetailField label="IFSC Code" value={bankData.ifsc} />

        <Button fullWidth variant="contained" onClick={() => setMode("EDIT")} sx={{ mt: 3 }}>
          Edit Bank Details
        </Button>

        <Typography variant="caption" display="block" sx={{ mt: 2, color: "textSecondary" }}>
          OTP will be sent to your registered mobile number.
        </Typography>
      </Paper>
    )
  }

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        Please enter bank details carefully. This will be used for all kinds of payments.
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Account Holder Name"
            name="holderName"
            value={bankData.holderName}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Bank Account Number"
            name="accountNumber"
            value={bankData.accountNumber}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Re-enter Bank Account Number"
            name="reAccountNumber"
            value={bankData.reAccountNumber}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="IFSC Code"
            name="ifsc"
            value={bankData.ifsc}
            onChange={handleChange}
            size="small"
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Upload Bank Detail Proof (Statement / Passbook / Cheque)
        </Typography>
        <Button component="label" variant="outlined" fullWidth sx={{ justifyContent: "flex-start" }}>
          Choose File
          <input type="file" name="proof" onChange={handleChange} hidden />
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 1, color: "textSecondary" }}>
          JPG, PNG | Max size 200kb
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 0.5, color: "textSecondary" }}>
          Uploaded image should clearly show account holder's name & account number
        </Typography>
      </Box>

      <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={() => setMode("VIEW")} sx={{ order: { xs: 2, sm: 1 } }}>
          Cancel
        </Button>

        <Button variant="contained" color="primary" onClick={handleSave} sx={{ order: { xs: 1, sm: 2 } }}>
          Update
        </Button>
      </Stack>
    </Box>
  )
}

function DetailField({ label, value }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  )
}
