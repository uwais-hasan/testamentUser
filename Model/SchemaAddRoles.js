import mongoose from "mongoose";




const SchemaAddRoles=new mongoose.Schema({

    editor: {
        report: {view: false, delete: false},
        user: {add: false, update: false, view: false, delete: false},
        testament: {view: false, delete: false},
        contact: {view: false, delete: false},
    },
    observe: {
        report: {view: false, delete: null},
        user: {add: null, update: null, view: null, delete: null},
        testament: {view: null, delete: null},
        contact: {view: null, delete: null},
    }
});

export const AddRole=mongoose.models.addRoles||mongoose.model('addRoles',SchemaAddRoles)