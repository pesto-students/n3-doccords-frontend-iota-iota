/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import StackedBar from "components/UserCharts/StackedBar";
import Polar from "components/UserCharts/Polar";
import PieChart from "components/UserCharts/Pie";
import { Grid, Container, Paper, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchAllProfilesAndDocuments } from "apiRequests/user";
import { fetchCommonHealthIssuesForUser } from "apiRequests/dashboards";
import { fetchHealthTopicsAndArticles } from "apiRequests/home";

const UserDashboard = (props) => {
  const {
    userCommonHealthTopics,
    healthTopics,
    articles,
    profiles,
    documents,
  } = props;

  const healthKeysArr = Object.keys(userCommonHealthTopics);
  const [filteredHealthTopics, setFilteredHealthTopics] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [stackChartData, setstackChartData] = useState([]);

  useEffect(() => {
    props.fetchCommonHealthIssuesForUser();
    props.fetchAllProfilesAndDocuments();
    props.fetchHealthTopicsAndArticles();
  }, []);

  useEffect(() => {
    filterCommonHealthIssues();
    filterArticles();
    setstackChartData(getStackedChartData());
  }, [healthTopics, articles, profiles]);

  const commonHealthIssueArr = [];
  const filterCommonHealthIssues = () => {
    if (healthTopics !== undefined) {
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
    let fltArticles = healthKeysArr.map((key) => {
      let articleList = articles.filter(
        (article) => article.healthTopic === key
      );
      return { key: articleList.length };
    });
    setFilteredArticles(fltArticles);
  };

  const getStackedChartData = () => {
    const modified = profiles.map((profile) => {
      const filteredDocuments = documents.filter(
        (document) => document.profileId === profile.profileId
      );
      profile.uploadedDoc = filteredDocuments.length;
      let shared = 0;
      filteredDocuments.map((filtered) => {
        shared = shared + filtered.sharedList.length;
        return filtered;
      });
      return {
        name: profile.profileName,
        uploadedDoc: profile.uploadedDoc,
        sharedDoc: shared,
        profileId: profile.profileId,
      };
    });
    return modified;
  };

  return (
    <Container margin="auto">
      <Grid container spacing={4} justify="center">
        <Grid item xs={10} md={4}>
          <Paper>
            <Box>
              {filteredHealthTopics && (
                <Polar
                  labels={filteredHealthTopics}
                  data={userCommonHealthTopics}
                  title={"Common Health Issues In Family"}
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
        <Grid item xs={12} md={8}>
          <Paper>
            <Box>
              <StackedBar
                chartData={stackChartData}
                title={"Document Status Under Profiles"}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.user.profiles,
  documents: state.user.documents,
  healthTopics: state.common.healthTopics,
  articles: state.common.articles,
  userCommonHealthTopics: state.dashboards.userCommonHealthTopics,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllProfilesAndDocuments: () => dispatch(fetchAllProfilesAndDocuments()),
  fetchHealthTopicsAndArticles: () => dispatch(fetchHealthTopicsAndArticles()),
  fetchCommonHealthIssuesForUser: () =>
    dispatch(fetchCommonHealthIssuesForUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
