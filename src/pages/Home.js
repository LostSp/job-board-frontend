import React, { useState, useEffect } from "react";
import { fetchJobs } from "../api";
import SearchBar from "../components/SearchBar";
import JobList from "../components/JobList";
import { Container, Typography } from "@mui/material";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", location: "", experience: "" });

  useEffect(() => {
    fetchJobs(filters.keyword, filters.location, filters.experience).then(setJobs);
  }, [filters]);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>Job Board</Typography>
      <SearchBar setFilters={setFilters} />
      <JobList jobs={jobs} />
    </Container>
  );
}

export default Home;



