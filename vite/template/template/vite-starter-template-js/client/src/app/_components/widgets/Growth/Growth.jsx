import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Grid, Typography } from "@mui/material";
import { GrowthChart } from "./components";
import PropTypes from "prop-types";

const Growth = ({ title }) => {
  return (
    <JumboCard title={title} contentWrapper contentSx={{ px: 3, pb: 3, pt: 1 }}>
      <Grid container spacing={3.75}>
        <Grid item xs={4}>
          <Typography
            variant={"h3"}
            sx={{ color: "success.main", whiteSpace: "nowrap" }}
            mb={0}
          >
            37%
            <TrendingUpIcon
              fontSize={"small"}
              sx={{ verticalAlign: "middle", ml: 1 }}
            />
          </Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            sx={{ whiteSpace: "nowrap" }}
          >
            This year
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Div sx={{ m: -3, mt: -4 }}>
            <GrowthChart />
          </Div>
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { Growth };

Growth.propTypes = {
  title: PropTypes.node.isRequired,
};
