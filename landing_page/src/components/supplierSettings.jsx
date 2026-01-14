"use client"

import { useState } from "react"
import {
    Container,
    Paper,
    Box,
    Grid,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
    Stack,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Chip,
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SettingsIcon from "@mui/icons-material/Settings"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

export default function SupplierSettings() {
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [pickupAddresses, setPickupAddresses] = useState([])
    const [editingAddressId, setEditingAddressId] = useState(null)

    const [newAddress, setNewAddress] = useState({
        id: null,
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "IN",
        isDefault: false,
        isEnabled: true,
    })

    // Shipping Label State
    const [shippingLabel, setShippingLabel] = useState({
        labelProvider: "dhl",
        defaultSize: "a4",
        autoGenerate: true,
        labelFormat: "pdf",
    })

    // Auto Shipping State
    const [autoShipping, setAutoShipping] = useState({
        enabled: false,
        autoShipAfterPayment: true,
        autoShipDelay: "0",
        generateLabel: true,
        notifyCustomer: true,
        defaultCarrier: "dhl",
    })

    const handleShippingLabelChange = (e) => {
        const { name, value, type, checked } = e.target
        setShippingLabel({
            ...shippingLabel,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleAutoShippingChange = (e) => {
        const { name, value, type, checked } = e.target
        setAutoShipping({
            ...autoShipping,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target
        setNewAddress({
            ...newAddress,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSaveSettings = () => {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
    }

    const handleAddAddress = () => {
        setEditingAddressId(null)
        setNewAddress({
            id: null,
            fullName: "",
            companyName: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "IN",
            isDefault: false,
            isEnabled: true,
        })
        setOpenDialog(true)
    }

    const handleEditAddress = (address) => {
        setEditingAddressId(address.id)
        setNewAddress(address)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setEditingAddressId(null)
    }

    const handleSaveAddress = () => {
        if (!newAddress.fullName || !newAddress.street || !newAddress.city) {
            alert("Please fill in all required fields")
            return
        }

        if (editingAddressId !== null) {
            // Update existing address
            setPickupAddresses(pickupAddresses.map((addr) => (addr.id === editingAddressId ? newAddress : addr)))
        } else {
            // Add new address
            const addressWithId = {
                ...newAddress,
                id: Date.now(),
            }
            setPickupAddresses([...pickupAddresses, addressWithId])
        }

        handleSaveSettings()
        handleCloseDialog()
    }

    const handleDeleteAddress = (id) => {
        setPickupAddresses(pickupAddresses.filter((addr) => addr.id !== id))
        handleSaveSettings()
    }

    const handleToggleAddress = (id) => {
        setPickupAddresses(pickupAddresses.map((addr) => (addr.id === id ? { ...addr, isEnabled: !addr.isEnabled } : addr)))
    }

    const handleSetDefault = (id) => {
        setPickupAddresses(
            pickupAddresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            })),
        )
        handleSaveSettings()
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {saveSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Settings saved successfully!
                </Alert>
            )}

            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <SettingsIcon />
                    Settings
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Manage your shipping labels, auto-shipping preferences, and pickup addresses
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Shipping Label Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            avatar={<LocalShippingIcon sx={{ color: "primary.main" }} />}
                            title="Shipping Label Settings"
                            subheader="Configure label generation preferences"
                        />
                        <Divider />
                        <CardContent>
                            <Stack spacing={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Label Provider</InputLabel>
                                    <Select
                                        name="labelProvider"
                                        value={shippingLabel.labelProvider}
                                        onChange={handleShippingLabelChange}
                                        label="Label Provider"
                                    >
                                        <MenuItem value="dhl">DHL</MenuItem>
                                        <MenuItem value="fedex">FedEx</MenuItem>
                                        <MenuItem value="ups">UPS</MenuItem>
                                        <MenuItem value="usps">USPS</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>Default Label Size</InputLabel>
                                    <Select
                                        name="defaultSize"
                                        value={shippingLabel.defaultSize}
                                        onChange={handleShippingLabelChange}
                                        label="Default Label Size"
                                    >
                                        <MenuItem value="a4">A4</MenuItem>
                                        <MenuItem value="a6">A6 (4x6)</MenuItem>
                                        <MenuItem value="letter">Letter</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>Label Format</InputLabel>
                                    <Select
                                        name="labelFormat"
                                        value={shippingLabel.labelFormat}
                                        onChange={handleShippingLabelChange}
                                        label="Label Format"
                                    >
                                        <MenuItem value="pdf">PDF</MenuItem>
                                        <MenuItem value="zpl">ZPL</MenuItem>
                                        <MenuItem value="png">PNG</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="autoGenerate"
                                            checked={shippingLabel.autoGenerate}
                                            onChange={handleShippingLabelChange}
                                        />
                                    }
                                    label="Auto-generate labels for new orders"
                                />

                                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
                                    Save Label Settings
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Auto Shipping Settings */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader
                            avatar={<LocalShippingIcon sx={{ color: "success.main" }} />}
                            title="Auto Shipping Settings"
                            subheader="Enable automatic order shipping"
                        />
                        <Divider />
                        <CardContent>
                            <Stack spacing={3}>
                                <FormControlLabel
                                    control={<Switch name="enabled" checked={autoShipping.enabled} onChange={handleAutoShippingChange} />}
                                    label="Enable Auto Shipping"
                                />

                                {autoShipping.enabled && (
                                    <>
                                        <FormControl fullWidth>
                                            <InputLabel>Default Carrier</InputLabel>
                                            <Select
                                                name="defaultCarrier"
                                                value={autoShipping.defaultCarrier}
                                                onChange={handleAutoShippingChange}
                                                label="Default Carrier"
                                            >
                                                <MenuItem value="dhl">DHL</MenuItem>
                                                <MenuItem value="fedex">FedEx</MenuItem>
                                                <MenuItem value="ups">UPS</MenuItem>
                                                <MenuItem value="usps">USPS</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <InputLabel>Auto Ship After Payment (hours)</InputLabel>
                                            <Select
                                                name="autoShipDelay"
                                                value={autoShipping.autoShipDelay}
                                                onChange={handleAutoShippingChange}
                                                label="Auto Ship After Payment (hours)"
                                            >
                                                <MenuItem value="0">Immediately</MenuItem>
                                                <MenuItem value="1">1 hour</MenuItem>
                                                <MenuItem value="4">4 hours</MenuItem>
                                                <MenuItem value="24">24 hours</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    name="generateLabel"
                                                    checked={autoShipping.generateLabel}
                                                    onChange={handleAutoShippingChange}
                                                />
                                            }
                                            label="Auto-generate shipping label"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    name="notifyCustomer"
                                                    checked={autoShipping.notifyCustomer}
                                                    onChange={handleAutoShippingChange}
                                                />
                                            }
                                            label="Notify customer when shipped"
                                        />
                                    </>
                                )}

                                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
                                    Save Shipping Settings
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Pickup Address Settings */}
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            avatar={<LocationOnIcon sx={{ color: "info.main" }} />}
                            title="Pickup Addresses"
                            subheader="Manage addresses for order pickups"
                        />
                        <Divider />
                        <CardContent>
                            <Stack spacing={3}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="subtitle1">Saved Addresses ({pickupAddresses.length})</Typography>
                                    <Button variant="outlined" onClick={handleAddAddress}>
                                        Add New Address
                                    </Button>
                                </Box>

                                {pickupAddresses.length === 0 ? (
                                    <Paper sx={{ p: 3, bgcolor: "background.default", textAlign: "center" }}>
                                        <Typography color="textSecondary">
                                            No pickup addresses added yet. Click "Add New Address" to get started.
                                        </Typography>
                                    </Paper>
                                ) : (
                                    <Stack spacing={2}>
                                        {pickupAddresses.map((address) => (
                                            <Paper
                                                key={address.id}
                                                sx={{ p: 3, bgcolor: address.isEnabled ? "background.paper" : "action.hover" }}
                                            >
                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                                                            <Typography variant="h6">{address.fullName}</Typography>
                                                            {address.isDefault && <Chip label="Default" size="small" color="primary" />}
                                                            {!address.isEnabled && <Chip label="Disabled" size="small" color="error" />}
                                                        </Box>
                                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                                            {address.companyName}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            {address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {address.email} | {address.phone}
                                                        </Typography>
                                                    </Box>
                                                    <Stack direction="row" spacing={1}>
                                                        <IconButton size="small" onClick={() => handleEditAddress(address)} title="Edit address">
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDeleteAddress(address.id)}
                                                            title="Delete address"
                                                            color="error"
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Stack>
                                                </Box>

                                                <Divider sx={{ my: 2 }} />

                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch checked={address.isEnabled} onChange={() => handleToggleAddress(address.id)} />
                                                        }
                                                        label={address.isEnabled ? "Enabled" : "Disabled"}
                                                    />
                                                    {!address.isDefault && (
                                                        <Button size="small" onClick={() => handleSetDefault(address.id)}>
                                                            Set as Default
                                                        </Button>
                                                    )}
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Stack>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{editingAddressId !== null ? "Edit Pickup Address" : "Add New Pickup Address"}</DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={newAddress.fullName}
                            onChange={handleAddressChange}
                            placeholder="John Doe"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="companyName"
                            value={newAddress.companyName}
                            onChange={handleAddressChange}
                            placeholder="Your Company"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            name="email"
                            value={newAddress.email}
                            onChange={handleAddressChange}
                            placeholder="john@example.com"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={newAddress.phone}
                            onChange={handleAddressChange}
                            placeholder="+91 98765 43210"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            label="Street Address"
                            name="street"
                            value={newAddress.street}
                            onChange={handleAddressChange}
                            placeholder="123 Business Street"
                            size="small"
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={newAddress.city}
                                    onChange={handleAddressChange}
                                    placeholder="Mumbai"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="state"
                                    value={newAddress.state}
                                    onChange={handleAddressChange}
                                    placeholder="Maharashtra"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="ZIP Code"
                            name="zipCode"
                            value={newAddress.zipCode}
                            onChange={handleAddressChange}
                            placeholder="400001"
                            size="small"
                        />
                        <FormControl fullWidth size="small">
                            <InputLabel>Country</InputLabel>
                            <Select name="country" value={newAddress.country} onChange={handleAddressChange} label="Country">
                                <MenuItem value="IN">India</MenuItem>
                                <MenuItem value="US">United States</MenuItem>
                                <MenuItem value="UK">United Kingdom</MenuItem>
                                <MenuItem value="CA">Canada</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveAddress} variant="contained">
                        {editingAddressId !== null ? "Update Address" : "Save Address"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
