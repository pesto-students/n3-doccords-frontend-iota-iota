import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  healthContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
});

const ArticleCard = () => {
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>Health Topic</CardContent>
      </Card>
    </Grid>
  );
};

const CardContainer = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.healthContainer}>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </Grid>
  );
};

export default CardContainer;
