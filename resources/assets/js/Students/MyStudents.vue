<template>
<div class="container">
    <div class="row" style="margin-bottom: 80px;">
        <div class="pull-left home-icon">
            <span class="round-tab">
                <a href="/home"><i class="fa fa-home fa-2x" aria-hidden="true"></i><br>Home</a>
            </span>
        </div>
        <div class="pull-right help">
            <span class="round-tab"><i class="fa fa-question-circle fa-2x"></i><br>Help</span>
        </div>
    </div>
    <div class="filter">
        <div class="row">
            <template>
                <div v-if="role == 2" class="form-group col-xs-2 text-center">
                    <select name="school level" id="school_level" v-model="filter.level" class="form-control">
                        <option value="0" selected disabled>School Level</option>
                        <option v-for="level in levels" :value="level.id" :key="level.id">{{level.name}}</option>
                    </select>
                </div>
                <div  v-if="role == 2" class="form-group col-xs-2 text-center">
                    <select name="school name" id="school_name" class="form-control">
                        <option value="" selected disabled>School Name</option>
                    </select>
                </div>
                <div v-if="role == 2 || role == 3" class="form-group col-xs-2 text-center">
                    <select name="mentor" id="mentor" class="form-control">]
                        <option value="" selected disabled>Mentor</option>
                    </select>
                </div>
                <div class="form-group col-xs-2 text-center">
                    <input type="text" placeholder="Search Students ...">
                </div>
            </template>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-hover my-students">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Age</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, key) in students.data" :key="student.id">
                    <td>{{no(key)}}</td>
                    <td>{{student.first_name}}</td>
                    <td>{{student.last_name}}</td>
                    <td>{{getAge(student.birthdate)}}</td>
                    <td class="actions text-center">
                        <a href="#" class="btn btn-large btn-cta">Edit</a>
                        <a href="#" class="btn btn-large btn-blue">View Chart</a>
                        <a  class="btn btn-large btn-yellow" @click="goTransfer(student.id)">Transfer</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <pagination :data="students" @pagination-change-page="updateList">
        <span slot="prev-nav">&lt; Previous</span>
        <span slot="next-nav">Next &gt;</span>
    </pagination>

    <div v-if="role != 4" class="text-center">
        <a href="#" class="btn btn-lg btn-cta" @click="createModal = true">Add New Student</a>
    </div>

    <create-modal v-if="createModal" @close="createModal = false">
        <h1 slot="header" class="text-center">Add/Edit Student</h1>
    </create-modal>
</div>
</template>

<script>
import CreateModal from "./CreateModal.vue";
import Axios from "axios";

Vue.component('pagination', require('laravel-vue-pagination'));

export default {
    data: function () {
        return {
            createModal: false,

            role: 2,
            students: {},
            levels: [],

            filter: {
                level: 0,
                schoolId: 0,
                mentoId: 0,

                page: 1,
                rowCount: 4,
            }

        };
    },
    created() {
        Axios.get('/my-students/get-levels').then(response => {
            this.levels = response.data;
        });
        this.updateList();
    },
    mounted: function() {
    },
    methods: {
        getAge: function (birthdate) {
            let today = new Date();
            let birthDate = new Date(birthdate);
            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        goTransfer: function (studentId) {
            console.log(studentId);
            let form = document.createElement("form");
            form.method = 'post';
            form.action = '/transfer';
            $("<input />").attr('type', 'hidden')
                .attr('name', "something")
                .attr('value', "something")
                .appendTo(form);
        },
        updateList: function (pgNum = 1) {
            this.filter.page = pgNum;
            Axios.post("/my-students/get-list", this.filter).then(response => {
                this.students = response.data;
            });
        },
        no: function (rowNum) {
            return this.filter.rowCount * (this.filter.page - 1) + rowNum + 1;
        }
    },
};
</script>
