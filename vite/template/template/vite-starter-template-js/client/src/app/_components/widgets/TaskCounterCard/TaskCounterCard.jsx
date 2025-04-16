import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const TasksCounterCard = ({ subheader }) => {
  return (
    <JumboCard contentWrapper contentSx={{ p: 3 }} bgcolor={["#E44A77"]}>
      <Div sx={{ display: "flex", alignItems: "center" }}>
        <img
          alt={"Task Icon"}
          src={`${ASSET_IMAGES}/dashboard/tasksIcon.svg`}
          width={48}
          height={48}
        />
        <Div sx={{ ml: 2, flex: 1 }}>
          <Typography color={"common.white"} variant={"h2"} mb={0.5}>
            457
          </Typography>
          <Typography color={"common.white"} variant={"h5"} mb={0}>
            {subheader}
          </Typography>
        </Div>
      </Div>
    </JumboCard>
  );
};

export { TasksCounterCard };

TasksCounterCard.propTypes = {
  subheader: PropTypes.node.isRequired,
};
