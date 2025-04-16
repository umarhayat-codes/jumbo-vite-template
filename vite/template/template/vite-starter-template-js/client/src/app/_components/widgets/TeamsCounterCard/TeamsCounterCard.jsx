import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const TeamsCounterCard = ({ subheader }) => {
  return (
    <JumboCard bgcolor={["#E73145"]} contentSx={{ p: 3 }} contentWrapper>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <img
          alt={""}
          width={48}
          height={48}
          src={`${ASSET_IMAGES}/dashboard/teamsIcon.svg`}
        />
        <Div sx={{ ml: 2, flex: 1 }}>
          <Typography color={"common.white"} variant={"h2"} mb={0.5}>
            13
          </Typography>
          <Typography color={"common.white"} variant={"h5"} mb={0}>
            {subheader}
          </Typography>
        </Div>
      </Div>
    </JumboCard>
  );
};

export { TeamsCounterCard };

TeamsCounterCard.propTyeps = {
  subheader: PropTypes.node.isRequired,
};
