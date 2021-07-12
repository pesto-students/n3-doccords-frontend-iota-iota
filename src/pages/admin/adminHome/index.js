/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import StackedBar from "components/AdminCharts/StackedBar";
import Polar from "components/UserCharts/Polar";
import PieChart from "components/UserCharts/Pie";
import DoughnutChart from "components/AdminCharts/Doughnut";
import { Grid, Container, Paper, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchCommonHealthIssuesForAdmin } from "apiRequests/dashboards";
import { fetchHealthTopicsAndArticles } from "apiRequests/home";

const AdminDashboard = (props) => {
  const { adminCommonHealthTopics, healthTopics, articles } = props;

  const healthKeysArr = Object.keys(adminCommonHealthTopics);
  const [filteredHealthTopics, setFilteredHealthTopics] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    props.fetchCommonHealthIssuesForAdmin();
    props.fetchHealthTopicsAndArticles();
  }, []);

  useEffect(() => {
    filterCommonHealthIssues();
    filterArticles();
    // setstackChartData(getStackedChartData());
  }, [healthTopics, articles]);

  const commonHealthIssueArr = [];
  const filterCommonHealthIssues = () => {
    if (healthTopics !== undefined) {
      // eslint-disable-next-line no-unused-vars
      const filteredHT = healthKeysArr.map((key) => {
        commonHealthIssueArr.push(
          healthTopics.filter((topic) => topic.healthTopicId === key)
        );
        setFilteredHealthTopics(commonHealthIssueArr.flat(1));
        return commonHealthIssueArr;
      });
    }
  };
  const filterArticles = () => {
    const fltArticles = healthKeysArr.map((key) => {
      const articleList = articles.filter(
        (article) => article.healthTopic === key
      );
      return { key: articleList.length };
    });
    setFilteredArticles(fltArticles);
  };

  return (
    <Container>
      <Grid container spacing={2} justify="center">
        <Grid item xs={10} md={4}>
          <Paper>
            <Box>
              <DoughnutChart />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={10} md={4}>
          <Paper>
            <Box>
              {filteredHealthTopics && (
                <Polar
                  labels={filteredHealthTopics}
                  data={adminCommonHealthTopics}
                  title={"Common Health Issues"}
                />
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={10} md={4}>
          <Paper>
            <Box>
              {filteredHealthTopics && (
                <PieChart
                  labels={filteredHealthTopics}
                  chartdata={filteredArticles}
                  title={"Articles Under Common Health Issues"}
                />
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
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

const mapStateToProps = (state) => ({
  healthTopics: state.common.healthTopics,
  articles: state.common.articles,
  adminCommonHealthTopics: state.dashboards.adminCommonHealthTopics,
});
const mapDispatchToProps = (dispatch) => ({
  // fetchAllProfilesAndDocuments: () => dispatch(fetchAllProfilesAndDocuments()),
  fetchHealthTopicsAndArticles: () => dispatch(fetchHealthTopicsAndArticles()),
  fetchCommonHealthIssuesForAdmin: () =>
    dispatch(fetchCommonHealthIssuesForAdmin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
