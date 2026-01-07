"use client"

import { useState } from "react"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"

export default function GstDetails() {
    const [formData, setFormData] = useState({
        gstName: "Shop20774381",
        gstId: "00NOTPROVIDE1Z5",
        panCard: "ABCDE1234F",
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Name (As per GST Certificate)"
                        name="gstName"
                        value={formData.gstName}
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="GST Provisional ID"
                        name="gstId"
                        value={formData.gstId}
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FileInput label="Upload GST Certificate Photo" name="gstCert" onChange={handleChange} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="PAN Card No."
                        name="panCard"
                        value={formData.panCard}
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FileInput label="Upload PAN Card Photo" name="panPhoto" onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Update
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

function FileInput({ label, name, onChange }) {
    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {label}
            </Typography>
            <Button component="label" variant="outlined" fullWidth sx={{ justifyContent: "flex-start" }}>
                Choose File
                <input type="file" name={name} onChange={onChange} hidden />
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1, color: "textSecondary" }}>
                JPG, PNG | Max size 200kb
            </Typography>
        </Box>
    )
}
