"use client"

import { useState, useEffect } from "react"
import { Box, Button, Grid, TextField, Typography, Divider } from "@mui/material"
import { AddGstDetails, getGstDetails } from "../../../services/prodile/profile.service";
import axios from "axios";


export default function GstDetails() {
    const [formData, setFormData] = useState({
        gstName: "DemoShop",
        gstNumber: "",
        panCardNumber: "",
        adharCardNumber: "",
        gstCertificate: "",
        panCardNumberImage: "",
        adharCardNumberImage: "",
        gstStatus: false
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }

    const handleSubmit = () => {
        const payload = new FormData();

        payload.append("gstName", formData.gstName);
        payload.append("gstNumber", formData.gstNumber);
        payload.append("panCardNumber", formData.panCardNumber);
        payload.append("adharCardNumber", formData.adharCardNumber);

        payload.append("gstCertificate", formData.gstCertificate);
        payload.append("panCardNumberImage", formData.panCardNumberImage);
        payload.append("adharCardNumberImage", formData.adharCardNumberImage);

        console.log(payload, "payload-data")
        const token = "Bearer " + localStorage.getItem("token");

        axios.post(`${import.meta.env.VITE_API_URL}/suppliers/stores/gstDetails`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: token,
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

    };

    useEffect(() => {

        //return case


        getGstDetails()
            .then(res => {
                console.log(res.data?.data)
                console.log(res.data?.data, "API DATA");

                setFormData({
                    gstName: res.data?.data?.gst_name,
                    gstNumber: res.data?.data?.gst_number,
                    panCardNumber: res.data?.data?.pan_number,
                    adharCardNumber: res.data?.data?.andhar_number,
                    gstCertificate: res.data?.data?.gst_image,
                    panCardNumberImage: res.data?.data?.pan_image,
                    adharCardNumberImage: res.data?.data?.andhar_image,
                    gstStatus: res.data?.data?.gst_status,
                });


                // console.log(formData, "form-data")
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        console.log(formData);
    }, [formData]);


    return (
        <div>
            <Grid container spacing={3} height="100%">
                {/* Name Information */}
                <label className="mb-[5px] inline-block mb-4 font-medium text-[#424242]">
                    Name (As per printed on GST Certificate)
                </label>

                <div className="flex gap-4 justify-start w-full">
                    <Grid item size={8}>
                        <TextField
                            label="GST Name"
                            name="gstName"
                            fullWidth
                            value={formData.gstName}
                            onChange={handleChange}
                            size="small"
                            disabled={formData.gstStatus}
                        />
                    </Grid>
                </div>

                {/* Gst Information */}
                <div className="col-span-2">
                    <p className="inline-block text-[14px] leading-[16px]">
                        GST Information
                    </p>
                </div>

                <div className="flex gap-4 justify-end w-full">
                    <Grid item size={6}>
                        <TextField
                            label="GST ID"
                            name="gstNumber"
                            fullWidth
                            value={formData.gstNumber}
                            onChange={handleChange}
                            size="small"
                            disabled={formData.gstStatus}
                        />
                    </Grid>

                    <Grid item size={6}>
                        <FileInput
                            name="gstCertificate"
                            file={formData.gstCertificate}
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
                            name="panCardNumber"
                            fullWidth
                            value={formData.panCardNumber}
                            onChange={handleChange}
                            size="small"
                            disabled={formData.gstStatus}
                        />
                    </Grid>

                    <Grid item size={6}>
                        <FileInput
                            name="panCardNumberImage"
                            file={formData.panCardNumberImage}
                            onChange={handleChange}
                            disabled={formData.gstStatus}
                        />
                    </Grid>
                </div>

                {/* adhar card */}
                <div className="col-span-2">
                    <p className="inline-block text-[14px] leading-[16px]">
                        Adhar Card Information
                    </p>
                </div>

                <div className="flex gap-4 justify-end w-full">
                    <Grid item size={6}>
                        <TextField
                            label="Adhar Card"
                            name="adharCardNumber"
                            fullWidth
                            value={formData.adharCardNumber}
                            onChange={handleChange}
                            size="small"
                            disabled={formData.gstStatus}
                        />
                    </Grid>

                    <Grid item size={6}>
                        <FileInput
                            name="adharCardNumberImage"
                            file={formData.adharCardNumberImage}
                            onChange={handleChange}
                            disabled={formData.gstStatus}
                        />
                    </Grid>
                </div>

                {/* update button */}
                <div className="flex justify-end w-full">
                    <Button variant="contained" onClick={handleSubmit} disabled={formData.gstStatus}>
                        Update
                    </Button>
                </div>
            </Grid>
        </div>
    )
}

function FileInput({ name, file, onChange, disabled }) {
    // console.log(file, "file");
    return (
        <Box>
            <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ justifyContent: "flex-start" }}
            >
                Choose File
                <input
                    type="file"
                    name={name}
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={onChange}
                    disabled={disabled}
                />
            </Button>

            {/* File name visibility */}
            {file && (
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 1, color: "text.secondary" }}
                >
                    Selected: {file.name || "FILE"}
                </Typography>
            )}

            {!file && (
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 1, color: "textSecondary" }}
                >
                    JPG, PNG | Max size 200kb
                </Typography>
            )}
        </Box>
    )
}

