"use client"

import { useState } from "react"
import { Box, Button, Grid, TextField, Typography, Divider } from "@mui/material"
import { updateGstDetails, fetchProfile } from "../../../services/prodile/profile.service"

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
        <div>
            <Grid container spacing={3} height="100%">

                {/* Name Information */}
             <label className="mb-[5px] inline-block mb-4 font-medium text-[#424242]">Name (As per printed on GST Certificate)</label>
            
                <div className="flex gap-4 justify-start w-full">
                    <Grid item size={8}>
                        <TextField
                            label="GST Name"
                            name="gstName"
                            fullWidth
                            value={formData.gstName}
                            onChange={handleChange}
                            size="small"
                            disabled
                        />
                    </Grid>
                </div>

                

                {/* Gst Information */}
                <div className="col-span-2">
                    <hr className="w-[100%] border-[1px] border-[#E0E0E0] mb-[20px] mt-[6px]"/>
                    <p className="inline-block text-[14px] leading-[16px]">GST Information</p>
                    </div>
                <div className="flex gap-4 justify-end w-full">

                    <Grid item size={6}>
                        <TextField
                            label="GST ID"
                            name="gstId"
                            fullWidth
                            value={formData.gstId}
                            onChange={handleChange}
                            size="small"
                            enabled
                        />
                    </Grid>
                    <Grid item size={6}>
                        <FileInput
                            // label="Pan Card"
                            // name="panCard"
                            onChange={handleChange}
                        />
                    </Grid>
                </div>

                <Divider />

                {/* Pan Card Information */}
                <label className="col-span-2">Pan Card Information</label>
                <div className="flex gap-4 justify-end w-full">
                    <Grid item size={6}>
                        <TextField
                            label="Pan Card"
                            name="panCard"
                            fullWidth
                            value={formData.panCard}
                            onChange={handleChange}
                            size="small"
                            enabled
                        />
                    </Grid>
                    <Grid item size={6}>
                        <FileInput
                            // label="Pan Card"
                            // name="panCard"
                            onChange={handleChange}
                        />
                    </Grid>
                </div>

                {/* update button */}
                <div className="flex justify-end w-full">

                    {/* left bottom button */}
                    <Button
                        variant="contained"
                        className=""
                    // onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </div>

            </Grid>
        </div>
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
