import { useTranslation } from "react-i18next";

function getSettingMenus() {
  const { t } = useTranslation();
  return [
    
    
    
    // {
    //   label: t("settingSidebar.menu.account"),
    //   children: [
    //     {
    //       label: t("settingSidebar.menuItem.publicProfile"),
    //       path: "/user/settings/public-profile",
    //       // icon: "public-profile",
    //     },
    //     {
    //       label: t("settingSidebar.menuItem.team"),
    //       path: "/user/settings/team",
    //       // icon: "team",
    //     },
    //     {
    //       label: t("settingSidebar.menuItem.loginDevices"),
    //       path: "/user/settings/login-devices",
    //       // icon: "active-login",
    //     },
    //     {
    //       label: t("settingSidebar.menuItem.organizations"),
    //       path: "/user/settings/organizations",
    //       // icon: "organizations",
    //     },
    //   ],
    // },
       {
      label: t("settingSidebar.menu.access"),
      children: [
        {
          label: t("settingSidebar.menuItem.emails"),
          path: "/user/settings/emails",
          
          // icon: "email",
        },
        {
          label: t("settingSidebar.menuItem.resetPassword"),
          path: "/user/settings/reset-password",
          // icon: "reset-password",
        },
        {
          label: t("settingSidebar.menuItem.twoFactorAuth"),
          path: "/user/settings/2-factor-auth",
          // icon: "2-factor-auth",
        },
        {
          label: ("Change Profile"),
          path: "/user/settings/payment-methods",
          // icon: "payment-methods",
        },
        {
          label: ("Deposit Amount"),
          path: "/user/settings/deposit-amount",
          // icon: "memberships-plan",
        },
      ],
    },
    // {
    //   label: t("settingSidebar.menu.financials"),
    //   children: [
    //     {
    //       label: t("settingSidebar.menuItem.membershipPlans"),
    //       path: "/user/settings/membership-plans",
    //       // icon: "memberships-plan",
    //     },
        
    //     {
    //       label: t("settingSidebar.menuItem.invoices"),
    //       path: "/user/settings/invoices",
    //       // icon: "invoices",
    //     },
    //     {
    //       label: t("settingSidebar.menuItem.statements"),
    //       path: "/user/settings/statements",
    //       // icon: "statements",
    //     },
    //   ],
    // },
    // {
    //   label: t("settingSidebar.menu.preferences"),
    //   children: [
    //     {
    //       label: t("settingSidebar.menuItem.advertising"),
    //       path: "/user/settings/advertising",
    //       // icon: "advertising",
    //     },
    //     {
    //       label: t("settingSidebar.menuItem.notifications"),
    //       path: "/user/settings/notifications",
    //       // icon: "notifications",
    //     },
      // ],
    // },
  // ];
// }
    // }
    
    ]
  }
export { getSettingMenus };
