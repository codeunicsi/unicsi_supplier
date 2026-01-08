"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Grid,
  TextField,
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack
} from "@mui/material"
import { updatePersonalDetails, fetchProfile } from "../../../services/prodile/profile.service"

export default function PersonalDetails() {
  const [editMode, setEditMode] = useState(false)

  const [formData, setFormData] = useState({
    supplierId: "",
    phoneNumber: "",
    storeName: "",
    storeEmail: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      await updatePersonalDetails(formData)
      setEditMode(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetchProfile()
      const data = res.data.data

      setFormData({
        supplierId: data.supplierId || "SUP-XXXX",
        phoneNumber: data.number || "",
        storeName: data.name || "",
        storeEmail: data.email || "",
      })
    }

    loadProfile()
  }, [])

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        title="Personal Details"
        subheader="Manage your store information"
      />

      <Divider />

      <CardContent>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              label="Supplier ID"
              fullWidth
              value={formData.supplierId}
              size="small"
              disabled
            />
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleChange}
              size="small"
              disabled={!editMode}
            />
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              label="Store Name (As per GST)"
              name="storeName"
              fullWidth
              value={formData.storeName}
              onChange={handleChange}
              size="small"
              disabled={!editMode}
            />
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              label="Store Email"
              name="storeEmail"
              fullWidth
              value={formData.storeEmail}
              onChange={handleChange}
              size="small"
              disabled
            />
          </Grid>

          <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
            <Alert severity="success">
              Email is verified ✔
            </Alert>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          {!editMode ? (
            <Button
              variant="outlined"
              onClick={() => setEditMode(true)}
            >
              Edit Details
            </Button>
          ) : (
            <>
              <Button
                variant="text"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
