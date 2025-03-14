import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, CircularProgress, Box } from "@mui/material";

const SearchPage = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!jobTitle) return;
        setLoading(true);

        try {
            const response = await fetch(`https://job-board-backend-production.up.railway.app/api/jobs?title=${encodeURIComponent(jobTitle)}&page=0&size=1`);
            const data = await response.json();

            if (data.length === 0) {
                console.log("⚠️ No jobs found. Scraping...");
                await fetch(`https://job-board-backend-production.up.railway.app/api/jobs/scrape?title=${encodeURIComponent(jobTitle)}`);
            }

            navigate(`/results?title=${encodeURIComponent(jobTitle)}`);
        } catch (error) {
            console.error("❌ Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f4f5f7",
                textAlign: "center",
                padding: 3,
            }}
        >
            <Container maxWidth="sm" sx={{ backgroundColor: "#ffffff", padding: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                    Find Your Dream Job
                </Typography>

                <TextField
                    label="Enter Job Title"
                    variant="outlined"
                    fullWidth
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Button
                    onClick={handleSearch}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ height: 50, fontSize: "1rem", fontWeight: "bold" }}
                >
                    {loading ? <CircularProgress size={24} /> : "Search Jobs"}
                </Button>
            </Container>
        </Box>
    );
};

export default SearchPage;




