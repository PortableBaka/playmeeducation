import { configureStore } from "@reduxjs/toolkit";
import { authorizeSuperAdmin } from "./superAdminSlice";
import kindergartensSlice from "./kindergartensSlice";
import branchSlice from "./branchSlice";
import leadsSlice from "./leadsSlice";
import librarySlice from "./librarySlice";
import groupSlice from "./groupSlice";
import studentSlice from "./studentSlice";
import employeesSlice from "./employeesSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
    reducer:{
        superAdmin: authorizeSuperAdmin,
        kindergartens: kindergartensSlice,
        branches: branchSlice,
        leads: leadsSlice,
        library: librarySlice,
        group: groupSlice,
        students: studentSlice,
        employee: employeesSlice,
        transaction : transactionSlice
    }
    
})