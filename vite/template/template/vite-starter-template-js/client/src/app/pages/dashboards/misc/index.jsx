import { FeaturedCard1 } from "@app/_components/cards";
import { MapProvider, MarkerClustererMap } from "@app/_components/maps";
import { AppUsers } from "@app/_components/widgets/AppUsers";
import { CafeStore1 } from "@app/_components/widgets/CafeStore1";
import { DailyFeed } from "@app/_components/widgets/DailyFeed";
import { ExplorePlaceCard } from "@app/_components/widgets/ExplorePlaceCard";
import { LastMonthSales } from "@app/_components/widgets/LastMonthSales";
import { LatestNotifications } from "@app/_components/widgets/LatestNotifications";
import { NewConnections } from "@app/_components/widgets/NewConnections";
import { NewVisitorsThisMonth } from "@app/_components/widgets/NewVisitorsThisMonth";
import { OnlineSignupsFilled } from "@app/_components/widgets/OnlineSignupsFilled";
import { Orders } from "@app/_components/widgets/Orders";
import { OurOffice1 } from "@app/_components/widgets/OurOffice1";
import { PopularProducts } from "@app/_components/widgets/PopularProducts";
import { ProductImage } from "@app/_components/widgets/ProductImage";
import { ProjectsListCard } from "@app/_components/widgets/ProjectsListCard";
import { RecentActivities } from "@app/_components/widgets/RecentActivities";
import { SalesOverview } from "@app/_components/widgets/SalesOverview";
import { SalesReport1 } from "@app/_components/widgets/SalesReport1";
import { ScheduleCard } from "@app/_components/widgets/ScheduleCard";
import { TotalRevenueThisYear } from "@app/_components/widgets/TotalRevenueThisYear";
import { UpgradePlan } from "@app/_components/widgets/UpgradePlan";
import { UserProfileAction } from "@app/_components/widgets/UserProfileAction";
import { UserProfileCard } from "@app/_components/widgets/UserProfileCard";
import { UserSummary } from "@app/_components/widgets/UserSummary";
import { WordOfTheDay } from "@app/_components/widgets/WordOfTheDay";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { EmojiObjectsOutlined, FolderOpen } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function MiscPage() {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Grid container spacing={3.75}>
        <Grid item xs={12} lg={7}>
          <SalesOverview title={t("widgets.title.salesOverview")} />
        </Grid>
        <Grid item xs={12} lg={2}>
          <Grid container spacing={3.75}>
            <Grid item xs={12} sm={6} lg={12}>
              <FeaturedCard1
                title={"250"}
                subheader="Docs"
                icon={<FolderOpen sx={{ fontSize: 36 }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <FeaturedCard1
                title={"23"}
                subheader="Ideas"
                icon={<EmojiObjectsOutlined sx={{ fontSize: 42 }} />}
                bgcolor={["135deg", "#FBC79A", "#D73E68"]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Grid container spacing={3.75}>
            <Grid item xs={12} sm={6} lg={12}>
              <Orders title={t("widgets.title.orders")} />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <UserSummary
                title={t("widgets.title.userSummary")}
                subheader={t("widgets.subheader.userSummary")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8}>
          <PopularProducts
            title={t("widgets.title.popularProducts")}
            subheader={t("widgets.subheader.popularProducts")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProjectsListCard title={t("widgets.title.projectsList")} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProductImage height={370} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CafeStore1 />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ExplorePlaceCard height={450} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LatestNotifications title={t("widgets.title.latestAlerts")} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <DailyFeed title={t("widgets.title.dailyFeed")} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ScheduleCard />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <UserProfileCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NewConnections title={t("widgets.title.newConnections")} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <RecentActivities title={t("widgets.title.recentActivities")} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <LastMonthSales subheader={t("widgets.subheader.latestMonthSales")} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <OnlineSignupsFilled
            subheader={t("widgets.subheader.onlineSignups")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <NewVisitorsThisMonth
            subheader={t("widgets.subheader.newVisitors")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TotalRevenueThisYear
            subheader={t("widgets.subheader.totalRevenueYear")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <UpgradePlan />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SalesReport1 title={t("widgets.title.salesReport1")} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <AppUsers
          
            title={t("widgets.title.appUsers")}
            subheader={t("widgets.subheader.appUsers")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <WordOfTheDay title={t("widgets.title.wordOfTheDay")} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OurOffice1 title={t("widgets.title.ourOffice1")} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <UserProfileAction height={282} />
        </Grid>

        {/* TODO: taking a lot of time  */}
        <Grid item xs={12}>
          <MapProvider>
            <MarkerClustererMap />
          </MapProvider>
        </Grid>
      </Grid>
    </Container>
  );
}
