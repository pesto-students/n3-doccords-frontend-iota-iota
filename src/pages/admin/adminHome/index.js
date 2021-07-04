import React from "react";
import StackedBar from "components/AdminCharts/StackedBar";
import Polar from "components/AdminCharts/Polar";
import PieChart from "components/AdminCharts/Pie";
// import LineChart from "components/UserCharts/Line";
import DoughnutChart from "components/AdminCharts/Doughnut";
import { Grid, Container, Paper, Box } from "@material-ui/core";

const AdminDashboard = () => {
  return (
    <Container>
      <Grid container spacing={2} justify="spaceAround">
        {/* <Grid item xs={12} md={6}>
          <Paper>
            <Box>
              <LineChart />
            </Box>
          </Paper>
        </Grid> */}

        <Grid item xs={12} md={4}>
          <Paper>
            <Box>
              <DoughnutChart />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <Box>
              <Polar />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper>
            <Box>
              <PieChart />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper>
            <Box>
              <StackedBar />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
