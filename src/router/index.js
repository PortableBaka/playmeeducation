import { createBrowserRouter } from "react-router-dom";
import BasicPage from "../pages/basicPage";
import CreateKindergarten from "../pages/kindergarten/createKindergarten";
import ViewKindergarten from "../pages/kindergarten/viewKinderGartens";
import UpdateKindergarten from "../pages/kindergarten/updateKindergarten";
import KindergartensAdminMainPage from "../pages/kindergartenAdminMainPage";
import KindergartenAdminUpdatePage from "../pages/kindergartenAdminMainPage/kindergartenAdminUpdatePage";
import CreateLeads from "../pages/leadsPage/createLead";
import UpdateLeads from "../pages/leadsPage/updateLead";
import SuperAdminPageLayout from "../layout/SuperAdminPageLayout";

const SuperAdminUser = createBrowserRouter([
  {
    path: "/",
    element: <SuperAdminPageLayout />,
  },
  {
    path: "/kindergartenTable",
    element: <BasicPage />,
  },
  {
    path: "/createKindergartenPage",
    element: <CreateKindergarten />,
  },
  {
    path: "/viewKindergarten/:id",
    element: <ViewKindergarten />,
  },
  {
    path: "/updateKindergarten/:id",
    element: <UpdateKindergarten />,
  },
  {
    path: "/kindergartensAdminMainPage",
    element: <KindergartensAdminMainPage />,
  },
  {
    path: "/kindergartenAdminUpdatePage",
    element: <KindergartenAdminUpdatePage />,
  },
  {
    path: "/createLeadPage",
    element: <CreateLeads />,
  },
  {
    path: "/updateLeads",
    element: <UpdateLeads />,
  },
]);

export default SuperAdminUser;
