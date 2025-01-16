import { configureStore } from "@reduxjs/toolkit";
import branchSlice from "./branchSlice";
import employeesSlice from "./employeesSlice";
import eventsSlice from "./eventSlice";
import groupSlice from "./groupSlice";
import kindergartensSlice from "./kindergartensSlice";
import leadsSlice from "./leadsSlice";
import librarySlice from "./librarySlice";
import studentSlice from "./studentSlice";
import { authorizeSuperAdmin } from "./superAdminSlice";
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
        transaction : transactionSlice,
        events: eventsSlice
    }
    
})