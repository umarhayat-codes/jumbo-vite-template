import Login1 from "@app/pages/auth/login1";
import { createBrowserRouter } from "react-router-dom";
// import SamplePage from "@app/pages";
import { StretchedLayout } from "@app/_layouts/StretchedLayout";
import { SoloLayout } from "@app/_layouts/SoloLayout"; 
import withAuth from "@app/_hoc/withAuth";
import { Page, NotFound404 } from "@app/_components/_core";
import MiscPage from "@app/pages/dashboards/misc";
import CryptoPage from "@app/pages/dashboards/crypto";
import ListingPage from "@app/pages/dashboards/listing";
import IntranetPage from "@app/pages/dashboards/intranet";
import EcommercePage from "@app/pages/dashboards/ecommerce";
import NewsPage from "@app/pages/dashboards/news";
import Login2 from "@app/pages/auth/login2";
import Signup1 from "@app/pages/auth/signup1";
import Signup2 from "@app/pages/auth/signup2";
import ForgotPassword from "@app/pages/auth/forgot-password";
import ResetPassword from "@app/pages/auth/reset-password";
import ForgotPasswordForm from "@app/_components/auth/ForgetPassword/ForgetPassword";
import withGuest from "@app/_hoc/withGuest";
import UserProfile1 from "@app/pages/user/profile-1";
import PublicProfile from "@app/pages/user/settings/public-profile";
import { ActiveLogin, AdvertisingSettings, EmailAccessSettings, InvoiceSettings, MembershipPlans, NotificationSettings, OrganizationSettings, PaymentMethodSettings, ResetPasswordSettings, StatementSettings, TeamSettings, TwoFactorAuth } from "@app/_components/user/settings";
import { SettingsLayout } from "@app/_layouts/SettingsLayout";
import TwoFA from "@app/_components/user/settings/components/TwoFactorAuth/2FA";
import { AmountDeposit } from "@app/_components/user/settings/components/AmountDeposit/AmountDeposit";
// import { SettingsLayout } from "@app/_layouts/SettingsLayout";


const routes = [
  {
    path: "/",
    element: <StretchedLayout />,
    children: [
      {
        path: "/dashboards/misc",
        element: <Page Component={MiscPage} hoc={withAuth} />,
      },
      // {
      //   path: "/dashboards/crypto",
      //   element: <Page Component={CryptoPage} hoc={withAuth} />,
      // },
      // {
      //   path: "/dashboards/listing",
      //   element: <Page Component={ListingPage} hoc={withAuth} />,
      // },
      // {
      //   path: "/dashboards/crm",
      //   element: <Page Component={CrmPage} hoc={withAuth} />,
      // },
      // {
      //   path: "/dashboards/intranet",
      //   element: <Page Component={IntranetPage} hoc={withAuth} />,
      // },
      // {
      //   path: "/dashboards/ecommerce",
      //   element: <Page Component={EcommercePage} hoc={withAuth} />,
      // },
      // {
      //   path: "/dashboards/news",
      //   element: <Page Component={NewsPage} hoc={withAuth} />,
      // },
      {
        path: "/user/profile-1",
        element: <Page Component={UserProfile1} hoc={withAuth} />,
      },
      {
        path: "/user/settings",
        element: <SettingsLayout />,
        children: [
          {
            path: "public-profile",
            element: <Page Component={PublicProfile} hoc={withAuth} />,
          },
          // {
          //   path: "team",
          //   element: <Page Component={TeamSettings} hoc={withAuth} />,
          // },
          // {
          //   path: "login-devices",
          //   element: <Page Component={ActiveLogin} hoc={withAuth} />,
          // },
          // {
          //   path: "organizations",
          //   element: <Page Component={OrganizationSettings} hoc={withAuth} />,
          // },
          {
            path: "emails",
            element: <Page Component={EmailAccessSettings} hoc={withAuth} />,
          },
          {
            path: "reset-password",
            element: <Page Component={ResetPasswordSettings} hoc={withAuth} />,
          },
          {
            path: "2-factor-auth",
            element: <Page Component={TwoFA} hoc={withAuth} />,
          },
          // {
          //   path: "membership-plans",
          //   element: <Page Component={MembershipPlans} hoc={withAuth} />,
          // },
          {
            path: "payment-methods",
            element: <Page Component={PaymentMethodSettings} hoc={withAuth} />,
          },
          {
            path: "deposit-amount",
            element: <Page Component={AmountDeposit} hoc={withAuth} />,
          },
          // {
          //   path: "invoices",
          //   element: <Page Component={InvoiceSettings} hoc={withAuth} />,
          // },
          // {
          //   path: "statements",
          //   element: <Page Component={StatementSettings} hoc={withAuth} />,
          // },
          // {
          //   path: "advertising",
          //   element: <Page Component={AdvertisingSettings} hoc={withAuth} />,
          // },
          // {
          //   path: "notifications",
          //   element: <Page Component={NotificationSettings} hoc={withAuth} />,
          // },
        ],
      },
    ],
  },




  {
    path: "/auth",
    element: <SoloLayout />,
    children: [
      {
        path: "login-1",
        element:<Login1/>,
      },
      {
        path: "login-2",
        element: <Login2 />,
      },
      {
        path: "signup-1",
        element: <Signup1 />,
      },
      {
        path: "signup-2",
        element: <Signup2 />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "forget-password",
        element: <ForgotPasswordForm />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
];

export const router = createBrowserRouter(routes);
