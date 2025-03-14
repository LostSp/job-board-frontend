
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, CircularProgress, Grid, Card, CardContent, Button, TextField } from "@mui/material";

const ResultsPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const jobTitle = params.get("title") || "";

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [locationFilter, setLocationFilter] = useState("");
    const [experienceFilter, setExperienceFilter] = useState("");
    const observer = useRef(null);

    // ✅ Fetch jobs function (Fixed API Response Handling)
    const fetchJobs = useCallback(async (reset = false) => {
        if (!jobTitle.trim() || loading) return;

        setLoading(true);
        try {
            const currentPage = reset ? 0 : page; // Reset page if needed
            const response = await fetch(
                `https://job-board-backend-production.up.railway.app/api/jobs?title=${encodeURIComponent(jobTitle)}&page=${currentPage}&size=10`
            );

            if (!response.ok) throw new Error("Failed to fetch jobs");

            const data = await response.json(); // Backend returns a Page<Job> object

            if (data && Array.isArray(data.content)) { // ✅ Correctly access `content`
                setJobs((prevJobs) => reset ? data.content : [...prevJobs, ...data.content]);
                setHasMore(data.content.length > 0); // ✅ `content.length`, not `data.length`
                setPage(currentPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("❌ Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    }, [jobTitle, page]);

    // ✅ Initial fetch when component mounts or jobTitle changes
    useEffect(() => {
        setJobs([]); // Clear previous results
        setPage(0);
        setHasMore(true);
        fetchJobs(true);
    }, [jobTitle]);

    // ✅ Infinite Scroll Observer (Fixes triggering issues)
    const lastJobRef = useCallback((node) => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => fetchJobs(), 500); // ✅ Small delay to avoid race conditions
                }
            },
            { threshold: 1.0 } // Ensures full visibility before fetching
        );

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // ✅ Filter jobs safely (Handles missing fields properly)
    const filteredJobs = jobs.filter(job =>
        job.location?.toLowerCase().includes(locationFilter.toLowerCase()) &&
        (job.experience ? job.experience.toLowerCase().includes(experienceFilter.toLowerCase()) : true)
    );

    return (
        <Container maxWidth="md" style={{ overflow: "hidden" }}>
            <Typography variant="h5" gutterBottom>Job results for: {jobTitle}</Typography>

            {/* Search filters */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
                <TextField 
                    label="Filter by Location" 
                    variant="outlined" 
                    size="small" 
                    value={locationFilter} 
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
                <TextField 
                    label="Filter by Experience" 
                    variant="outlined" 
                    size="small" 
                    value={experienceFilter} 
                    onChange={(e) => setExperienceFilter(e.target.value)}
                />
            </div>

            {/* Job List */}
            <Grid container spacing={2}>
                {filteredJobs.map((job, index) => (
                    <Grid item xs={12} md={6} key={job.id} ref={index === filteredJobs.length - 1 ? lastJobRef : null}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{job.title}</Typography>
                                <Typography variant="subtitle1">{job.company}</Typography>
                                <Typography variant="body2">{job.location}</Typography>
                                <Typography variant="body2">Experience: {job.experience || "N/A"}</Typography>
                                <Button href={job.applyLink} target="_blank" variant="contained">
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Loading Indicator (Avoids Layout Shift) */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", minHeight: "40px" }}>
                {loading && <CircularProgress />}
            </div>
        </Container>
    );
};

export default ResultsPage;


