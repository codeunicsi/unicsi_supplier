"use client"

import { useState } from "react"
import { Tabs, Tab, Box, Paper } from "@mui/material"
import PersonalDetails from "./personal/personalDetails"
import BankDetails from "./bank/BankDetails"
import GstDetails from "./gst/GstDetails"

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    )
}

export default function ProfileTabs() {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Paper sx={{ borderRadius: 2 }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="profile tabs"
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    "& .MuiTab-root": {
                        minHeight: 48,
                        textTransform: "none",
                        fontSize: "0.95rem",
                    },
                }}
            >
                <Tab label="Personal Details" />
                <Tab label="Bank Details" />
                <Tab label="GST Details" />
            </Tabs>

            <TabPanel value={value} index={0}>
                <PersonalDetails />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <BankDetails />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <GstDetails />
            </TabPanel>
        </Paper>
    )
}
