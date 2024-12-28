import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { getAuthenticatedUser } from "../store/authUser";
import { UserType } from "../config";
import LoginPage from "../pages/login";
import BasicPage from "../pages/basicPage";
import CreateKindergarten from "../pages/kindergarten/createKindergarten";
import UpdateKindergarten from "../pages/kindergarten/updateKindergarten";
import SuperAdminPageLayout from "../layout/SuperAdminPageLayout";
import KindergartenAdminLayout from "../layout/KindergartenAdminLayout";
import KindergartensAdminMainPage from "../pages/kindergartenAdminMainPage";
import LibraryMainPage from "../pages/library/LibraryMain";
import CreateLibrary from "../pages/library/CreateLibrary";
import StudentsMain from "../pages/students/studentsMain";
<<<<<<< HEAD
// import Timetable from "../pages/timetable/timetableMain";
=======
import Timetable from "../pages/timetable/timetableMain";
>>>>>>> 71f0a63887c5e6fd5a7f80d10296c28462c56803
import StudentsCreate from "../pages/students/createStudent";
import GroupMain from "../pages/groups/GroupsMain";
import EditGroup from "../pages/groups/EditGroup";
import CreateGroup from "../pages/groups/CreateGroup";
import LeadsMainPage from "../pages/leadsPage/MainPage";
import CreateLeads from "../pages/leadsPage/createLead";
import EditLeads from "../pages/leadsPage/editLeads";
import EditLibrary from "../pages/library/EditLibrary";
import EditKindergartenAndBranchData from "../pages/kindergartenAdminMainPage/editBranch";
import EmployeeMain from "../pages/employee/employeeMain";
import EmployeeCreate from "../pages/employee/createEmployee";
import StudentsEdit from "../pages/students/editStudent";
import EditEmployee from "../pages/employee/editEmployee";
import TransactionMain from "../pages/transactions/transactionsMain";
import TransactionEdit from "../pages/transactions/edittTansaction";
import TransactionCreate from "../pages/transactions/createTransaction";
import KindergartenBranchAdminLayout from "../layout/BranchAdminLayout";
import TimeTable from "../pages/timetable/timeTablePage";

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
<<<<<<< HEAD
            <Route path="timetable" element={<TimeTable />} />
=======
            <Route path='timetable' element={<Timetable/>}/>
>>>>>>> 71f0a63887c5e6fd5a7f80d10296c28462c56803
            <Route path="students" element={<StudentsMain />} />
            <Route path="groups" element={<GroupMain />} />
            <Route path="leads" element={<LeadsMainPage />} />
            <Route path="employees" element={<EmployeeMain />} />
            <Route path="transactions" element={<TransactionMain />} />
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
<<<<<<< HEAD
            <Route path="timetable" element={<TimeTable />} />
=======
            <Route path="timetable" element={<Timetable />} />
>>>>>>> 71f0a63887c5e6fd5a7f80d10296c28462c56803
            <Route path="students" element={<StudentsMain />} />
            <Route path="groups" element={<GroupMain />} />
            <Route path="leads" element={<LeadsMainPage />} />
            <Route path="employees" element={<EmployeeMain />} />
            <Route path="transactions" element={<TransactionMain />} />
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
