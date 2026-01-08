"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Alert,
  Stack,
  Divider,
} from "@mui/material"

import { updateBankDetails, fetchBankDetails } from "../../../services/prodile/profile.service"

/**
 * UI States:
 * EMPTY → EDIT → VIEW
 */
const MODES = {
  EMPTY: "EMPTY",
  EDIT: "EDIT",
  VIEW: "VIEW",
}

export default function BankDetails() {
  const [mode, setMode] = useState(MODES.EMPTY)

  const [bankData, setBankData] = useState({
    holderName: "",
    accountNumber: "",
    reAccountNumber: "",
    ifsc: "",
    bank_details_status: false,
    proof: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setBankData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleIFSCChange = (e) => {
    setBankData((prev) => ({
      ...prev,
      ifsc: e.target.value.toUpperCase(),
    }))
  }

  useEffect(() => {
    // fetchBankDetails().then((res) => {
    //   if
    //   console.log("res", res.data?.data)
    //   setBankData({
    //     holderName: res.data?.data?.account_holder_name,
    //     accountNumber: res.data?.data?.account_number,
    //     reAccountNumber: res.data?.data?.account_number,
    //     ifsc: res.data?.data?.ifsc_code,
    //     bank_details_status: res.data?.data?.bank_details_status,
    //     // proof: res.data.proof, 
    //   })

    //   setMode(MODES.VIEW)
    // })
    const loadBankDetails = async () => {
      const res = await fetchBankDetails()
      console.log("res", res.data?.data)

      if(!res.data.success){
        setMode(MODES.EMPTY)
        return
      }

      setBankData({
        holderName: res.data?.data?.account_holder_name,
        accountNumber: res.data?.data?.account_number,
        reAccountNumber: res.data?.data?.account_number,
        ifsc: res.data?.data?.ifsc_code,
        bank_details_status: res.data?.data?.bank_details_status,
        // proof: res.data.proof, 
      })

      setMode(MODES.VIEW)
    }
    loadBankDetails()
  }, [])

  const handleSave = () => {
    // console.log("bankData", bankData)
    updateBankDetails(bankData)
    if (bankData.accountNumber !== bankData.reAccountNumber) return
    setMode(MODES.VIEW)
  }

  console.log("bankData", bankData)

  const maskedAccountNumber = bankData.accountNumber
    ? `**** **** ${bankData.accountNumber.slice(-4)}`
    : "—"

  /* ---------------- EMPTY STATE ---------------- */
  if (mode === MODES.EMPTY) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          textAlign: "center",
          maxWidth: 420,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          No Bank Details Added
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Add your bank account to receive margins, refunds and settlements.
        </Typography>

        <Button variant="contained" onClick={() => setMode(MODES.EDIT)}>
          Add Bank Details
        </Button>
      </Paper>
    )
  }

  /* ---------------- VIEW STATE ---------------- */
  if (mode === MODES.VIEW) {
    return (
      <Paper sx={{ p: 3, maxWidth: 420, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Bank Details
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Used for all payments and refunds
        </Typography>

        <Alert severity="success" sx={{ mb: 2 }}>
          Bank details are securely stored 🔒
        </Alert>

        <DetailField label="Account Holder Name" value={bankData.holderName} />
        <DetailField
          label="Bank Account Number"
          value={maskedAccountNumber}
        />
        <DetailField label="IFSC Code" value={bankData.ifsc} />

        <Divider sx={{ my: 2 }} />

        <Button fullWidth variant="contained" onClick={() => setMode(MODES.EDIT)}>
          Edit Bank Details
        </Button>

        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          OTP will be sent to your registered mobile number for verification.
        </Typography>
      </Paper>
    )
  }

  /* ---------------- EDIT STATE ---------------- */
  return (
    <Grid>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Add / Update Bank Details
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Please ensure the bank details are correct. These will be used for all
        payouts.
      </Alert>

      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Account Holder Name"
            name="holderName"
            value={bankData.holderName}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Bank Account Number"
            name="accountNumber"
            value={bankData.accountNumber}
            onChange={handleChange}
            size="small"
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Re-enter Account Number"
            name="reAccountNumber"
            value={bankData.reAccountNumber}
            onChange={handleChange}
            size="small"
            error={
              bankData.reAccountNumber &&
              bankData.accountNumber !== bankData.reAccountNumber
            }
            helperText={
              bankData.reAccountNumber &&
              bankData.accountNumber !== bankData.reAccountNumber
                ? "Account numbers do not match"
                : ""
            }
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="IFSC Code"
            name="ifsc"
            value={bankData.ifsc}
            onChange={handleIFSCChange}
            size="small"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Upload Bank Proof
        </Typography>

        <Button component="label" variant="outlined" fullWidth>
          Choose File
          <input hidden type="file" name="proof" onChange={handleChange} />
        </Button>

        {bankData.proof && (
          <Typography variant="caption" color="success.main" sx={{ mt: 1 }}>
            ✔ {bankData.proof.name} uploaded
          </Typography>
        )}

        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, color: "text.secondary" }}
        >
          JPG, PNG | Max size 200kb
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button fullWidth variant="outlined" onClick={() => setMode(MODES.VIEW)}>
          Cancel
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          disabled={
            !bankData.holderName ||
            !bankData.accountNumber ||
            bankData.accountNumber !== bankData.reAccountNumber
          }
        >
          Save Bank Details
        </Button>
      </Stack>
    </Grid>
  )
}

/* ---------------- Small UI Helper ---------------- */
function DetailField({ label, value }) {
  return (
    <Box size={{ xs: 12, sm: 6, md: 4 }} mb={2}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  )
}
