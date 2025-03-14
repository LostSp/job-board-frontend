import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

function SearchBar({ setFilters }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const handleSearch = () => {
    setFilters({ keyword, location, experience });
  };

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 2 }}>
      <Grid item>
        <TextField label="Job Title" variant="outlined" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </Grid>
      <Grid item>
        <TextField label="Location" variant="outlined" value={location} onChange={(e) => setLocation(e.target.value)} />
      </Grid>
      <Grid item>
        <TextField label="Experience" variant="outlined" value={experience} onChange={(e) => setExperience(e.target.value)} />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;


