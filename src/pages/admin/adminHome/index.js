/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import StackedBar from "components/UserCharts/StackedBar";
import Polar from "components/UserCharts/Polar";
import PieChart from "components/UserCharts/Pie";
import DoughnutChart from "components/UserCharts/Doughnut";
import { Grid, Container, Paper, Box } from "@material-ui/core";
import { connect } from "react-redux";
import {
  fetchCommonHealthIssuesForAdmin,
  fetchCompleteDataForAdmin,
  fetchDocumentDataForAdmin,
} from "apiRequests/dashboards";
import { fetchHealthTopicsAndArticles } from "apiRequests/home";

const AdminDashboard = (props) => {
  const {
    adminCommonHealthTopics,
    healthTopics,
    articles,
    adminCompleteData,
    adminDocumentData,
  } = props;

  const healthKeysArr = Object.keys(adminCommonHealthTopics);
  const [filteredHealthTopics, setFilteredHealthTopics] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filteredAdminDocumentData, setFilteredAdminDocumentData] = useState(
    []
  );

  useEffect(() => {
    props.fetchCommonHealthIssuesForAdmin();
    props.fetchHealthTopicsAndArticles();
    props.fetchDocumentDataForAdmin();
    props.fetchCompleteDataForAdmin();
  }, []);

  useEffect(() => {
    filterCommonHealthIssues();
    filterArticles();
    filterDocumentData();
    // setstackChartData(getStackedChartData());
  }, [healthTopics, articles, adminDocumentData]);

  const filterDocumentData = () => {
    const currentMonth = new Date().getMonth();
    const startArr = currentMonth > 4 ? currentMonth - 4 : 0;
    const endOfArr = currentMonth + 1;

    if (adminDocumentData !== null) {
      const slicedArr = adminDocumentData.slice(startArr, endOfArr);
      setFilteredAdminDocumentData(slicedArr);
    }
  };

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
              {adminCompleteData && (
                <DoughnutChart
                  labels={Object.keys(adminCompleteData)}
                  chartdata={adminCompleteData}
                  title={"Complete Data of App"}
                />
              )}
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
              {filteredAdminDocumentData && (
                <StackedBar
                  chartData={filteredAdminDocumentData}
                  Title={"Total Documents Uploaded And Shared"}
                  isAdmin={true}
                />
              )}
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
  adminCompleteData: state.dashboards.adminCompleteData,
  adminDocumentData: state.dashboards.adminDocumentData,
});
const mapDispatchToProps = (dispatch) => ({
  // fetchAllProfilesAndDocuments: () => dispatch(fetchAllProfilesAndDocuments()),
  fetchHealthTopicsAndArticles: () => dispatch(fetchHealthTopicsAndArticles()),
  fetchCommonHealthIssuesForAdmin: () =>
    dispatch(fetchCommonHealthIssuesForAdmin()),
  fetchDocumentDataForAdmin: () => dispatch(fetchDocumentDataForAdmin()),
  fetchCompleteDataForAdmin: () => dispatch(fetchCompleteDataForAdmin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
