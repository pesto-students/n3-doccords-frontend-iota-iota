/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import StackedBar from "components/UserCharts/StackedBar";
import Polar from "components/UserCharts/Polar";
import PieChart from "components/UserCharts/Pie";
// import LineChart from "components/UserCharts/Line";
// import DoughnutChart from "components/UserCharts/Doughnut";
import { Grid, Container, Paper, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchAllProfilesAndDocuments } from "apiRequests/user";
import {
  fetchTopHealthTopicsForUserOrAdmin,
  fetchCommonHealthIssuesForUser,
} from "apiRequests/dashboards";
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
  console.log("healthTopic length", healthTopics.length);
  console.log("whats in Articles", articles);

  // eslint-disable-next-line react/prop-types
  // const {
  //   profiles,
  //   documents,
  //   healthTopics,
  //   articles,
  //   fetchAllProfilesAndDocuments,
  //   fetchHealthTopicsAndArticles,
  // } = props;
  // const [topHealthTopics, setTopHealthTopics] = useState({});
  // // const [healthtopic, setHealthTopic] = useState(healthTopics);
  // const [filteredTopics, setFilteredTopics] = useState([]);

  // console.log(`Total  profiles ${profiles.length}`);
  // console.log(`Total  documents ${documents.length}`);
  // // console.log(topHealthTopics);
  // let titlesArr;

  // useEffect(() => {
  //   fetchAllProfilesAndDocuments();
  //   fetchHealthTopicsAndArticles();
  //   (async () => {
  //     const data = await fetchTopHealthTopicsForUserOrAdmin();
  //     setTopHealthTopics(data);
  //   })();

  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   if (topHealthTopics !== undefined) {
  //     getHealthIDs(topHealthTopics);
  //   }

  //   return () => {};
  // }, [healthTopics, topHealthTopics]);

  // // useEffect(() => {
  // //   return () => {};
  // // }, [titlesArr]);

  // const getHealthIDs = (data) => {
  //   const keys = Object.keys(data);

  //   // console.log(keys.length);
  //   // console.log(healthTopics.length);
  //   console.log(articles.length);
  //   titlesArr = keys.map((key) => {
  //     return healthTopics.filter((topic) => {
  //       return topic.healthTopicId === key;
  //     });
  //     // .map((item) => item.title);
  //   });
  // console.log(
  //   "ites the filter arr",
  //   titles.map((t) => t.title)
  // );
  // titles.map((t, index) => console.log(t[index].title));
  // console.log(titlesArr[1][0].title);
  //   setFilteredTopics(titlesArr);
  // };

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
      console.log(
        "keys",
        healthKeysArr.map((key) => key)
      );
      console.log(
        "Articles keys",
        articles.map((article) => article.healthTopic)
      );
      let articleList = articles.filter(
        (article) => article.healthTopic === key
      );
      console.log("articleList", articleList);
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

  // const chartData = modifyProfiles();
  // console.log("this is the lastChart data", chartData);

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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={12}>
          <Paper>
            <Box>
              <StackedBar data={stackChartData} />
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
