import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

function JobList({ jobs }) {
  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      {jobs.length === 0 ? (
        <Typography variant="h6">No jobs found.</Typography>
      ) : (
        jobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.jobTitle}</Typography>
                <Typography color="textSecondary">{job.company}</Typography>
                <Typography color="textSecondary">{job.location || "Location: N/A"}</Typography>
                <Typography color="textSecondary">{job.experience || "Experience: N/A"}</Typography>
                <Button href={job.applicationLink} target="_blank" variant="contained" color="secondary" sx={{ marginTop: 1 }}>
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default JobList;




