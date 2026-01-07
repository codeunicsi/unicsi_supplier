"use client"

import { useState } from "react"
import { Box, Grid, TextField, Alert } from "@mui/material"

export default function PersonalDetails() {
    const [formData, setFormData] = useState({
        supplierId: "8016330938",
        phoneNumber: "9220774381",
        storeName: "Shop20774381",
        storeEmail: "niyamul.haque98@gmail.com",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Supplier Id"
                        name="supplierId"
                        value={formData.supplierId}
                        onChange={handleChange}
                        disabled
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Store Name (As per GST)"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Store Email"
                        name="storeEmail"
                        value={formData.storeEmail}
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Email is verified
                    </Alert>
                </Grid>
            </Grid>
        </Box>
    )
}
