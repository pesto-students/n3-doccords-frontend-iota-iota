import { Box, Container, Grid, Typography, Divider } from "@material-ui/core";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 3, sm: 5 }}
        mt={10}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg" justify="center">
          <Typography varient="h4" component="h4" align="center" mb={2}>
            Build by
          </Typography>
          <Divider mt={3} pb={3} />
          <Grid container spacing={5} color="inherit">
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="h6">Raghu</Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2">Mentor</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="h6">Elango</Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2">Team Member</Typography>
                <Typography variant="body2">3elango@gmail.com</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="h6">Navtej</Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2">Team Member</Typography>
                <Typography variant="body2">coderhulk@gmail.com</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={3} mt={5} mb={0} p={0}>
            Pesto Project &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
