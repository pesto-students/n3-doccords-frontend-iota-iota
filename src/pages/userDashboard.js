import React from "react";
import StackedBar from "components/UserCharts/StackedBar";
import Polar from "components/UserCharts/Polar";
import PieChart from "components/UserCharts/Pie";
import LineChart from "components/UserCharts/Line";
// import DoughnutChart from "components/UserCharts/Doughnut";
import { Grid, Container, Paper, Box } from "@material-ui/core";

const UserDashboard = () => {
  return (
    <Container>
      <Grid container spacing={2} justify="spaceAround">
        <Grid item xs={12} md={6}>
          <Paper>
            <Box>
              <StackedBar />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box>
              <LineChart />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box>
              <Polar />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box>
              <PieChart />
            </Box>
          </Paper>
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <Paper>
            <Box>
              <DoughnutChart />
            </Box>
          </Paper>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default UserDashboard;
