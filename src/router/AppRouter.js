import { Route, Routes } from "react-router-dom";
import { UserType } from "../config";
import KindergartenBranchAdminLayout from "../layout/BranchAdminLayout";
import KindergartenAdminLayout from "../layout/KindergartenAdminLayout";
import SuperAdminPageLayout from "../layout/SuperAdminPageLayout";
import BasicPage from "../pages/basicPage";
import EmployeeCreate from "../pages/employee/createEmployee";
import EditEmployee from "../pages/employee/editEmployee";
import EmployeeMain from "../pages/employee/employeeMain";
import CreateGroup from "../pages/groups/CreateGroup";
import EditGroup from "../pages/groups/EditGroup";
import GroupMain from "../pages/groups/GroupsMain";
import CreateKindergarten from "../pages/kindergarten/createKindergarten";
import UpdateKindergarten from "../pages/kindergarten/updateKindergarten";
import KindergartensAdminMainPage from "../pages/kindergartenAdminMainPage";
import EditKindergartenAndBranchData from "../pages/kindergartenAdminMainPage/editBranch";
import LeadsMainPage from "../pages/leadsPage/MainPage";
import CreateLeads from "../pages/leadsPage/createLead";
import EditLeads from "../pages/leadsPage/editLeads";
import CreateLibrary from "../pages/library/CreateLibrary";
import EditLibrary from "../pages/library/EditLibrary";
import LibraryMainPage from "../pages/library/LibraryMain";
import LoginPage from "../pages/login";
import StudentsCreate from "../pages/students/createStudent";
import StudentsEdit from "../pages/students/editStudent";
import StudentsMain from "../pages/students/studentsMain";
import Timetable from "../pages/timetable/timetableMain";
import TransactionCreate from "../pages/transactions/createTransaction";
import TransactionEdit from "../pages/transactions/edittTansaction";
import TransactionMain from "../pages/transactions/transactionsMain";
import { getAuthenticatedUser } from "../store/authUser";
import Settings from "../pages/settings";

export const AppRouter = () => {
  const { user, isAuthenticated } = getAuthenticatedUser();
  return (
    <Routes>
      {isAuthenticated && user?.roleCode === UserType.SuperAdmin && (
        <>
          <Route
            path="/superAdminPage"
            exact
            element={<SuperAdminPageLayout />}
          >
            {/* <Route path='' exact element={<LoginPage/>}/> */}
            <Route path="kindergartenTable" exact element={<BasicPage />} />
          </Route>
          <Route path="kindergarten">
            <Route path="create" exact element={<CreateKindergarten />} />
            <Route path="update/:id" element={<UpdateKindergarten />} />
          </Route>
        </>
      )}
      ,
      {isAuthenticated && user?.roleCode === UserType.KindergartenAdmin && (
        <>
          <Route
            path="/kindergartenAdminLayout"
            exact
            element={<KindergartenAdminLayout />}
          >
            <Route
              path="kindergartensAdminMainPage"
              exact
              element={<KindergartensAdminMainPage />}
            />
            <Route path="libraryMainPage" element={<LibraryMainPage />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="students" element={<StudentsMain />} />
            <Route path="groups" element={<GroupMain />} />
            <Route path="leads" element={<LeadsMainPage />} />
            <Route path="employees" element={<EmployeeMain />} />
            <Route path="transactions" element={<TransactionMain />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="kindergartenAdmin">
            <Route
              path="editKindergartenAndBranchData/:id"
              element={<EditKindergartenAndBranchData />}
            />
          </Route>
          <Route path="library">
            <Route path="create" element={<CreateLibrary />} />
            <Route path="edit/:id" element={<EditLibrary />} />
          </Route>
          <Route path="students">
            <Route path="create" element={<StudentsCreate />} />
            <Route path="edit/:id" element={<StudentsEdit />} />
          </Route>
          <Route path="group">
            <Route path="create" element={<CreateGroup />} />
            <Route path="edit/:id" element={<EditGroup />} />
          </Route>
          <Route path="leads">
            <Route path="create" element={<CreateLeads />} />
            <Route path="edit/:id" element={<EditLeads />} />
          </Route>
          <Route path="employee">
            <Route path="create" element={<EmployeeCreate />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>
          <Route path="transaction">
            <Route path="create" element={<TransactionCreate />} />
            <Route path="edit/:id" element={<TransactionEdit />} />
          </Route>
        </>
      )}
      {isAuthenticated && user?.roleCode === UserType.BranchAdmin && (
        <>
          <Route
            path="/branchAdminPage"
            exact
            element={<KindergartenBranchAdminLayout />}
          >
            <Route path="libraryMainPage" exact element={<LibraryMainPage />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="students" element={<StudentsMain />} />
            <Route path="groups" element={<GroupMain />} />
            <Route path="leads" element={<LeadsMainPage />} />
            <Route path="employees" element={<EmployeeMain />} />
            <Route path="transactions" element={<TransactionMain />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="library">
            <Route path="create" element={<CreateLibrary />} />
            <Route path="edit/:id" element={<EditLibrary />} />
          </Route>
          <Route path="students">
            <Route path="create" element={<StudentsCreate />} />
            <Route path="edit/:id" element={<StudentsEdit />} />
          </Route>
          <Route path="group">
            <Route path="create" element={<CreateGroup />} />
            <Route path="edit/:id" element={<EditGroup />} />
          </Route>
          <Route path="leads">
            <Route path="create" element={<CreateLeads />} />
            <Route path="edit/:id" element={<EditLeads />} />
          </Route>
          <Route path="employee">
            <Route path="create" element={<EmployeeCreate />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>
          <Route path="transaction">
            <Route path="create" element={<TransactionCreate />} />
            <Route path="edit/:id" element={<TransactionEdit />} />
          </Route>
        </>
      )}
      ,
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};
