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
                <div v-if="auth.user_role_id == 2" class="form-group col-md-2 text-center">
                    <select name="school level" @change="getFilterSchools" id="school_level" v-model="filter.level" class="form-control">
                        <option v-for="level in levels" :value="level.id" :key="level.id">{{level.name}}</option>
                        <option value="0">School Level(No Selected)</option>
                    </select>
                </div>
                <div v-if="auth.user_role_id == 2" class="form-group col-md-2 text-center">
                    <select name="school name" @change="getFilterMentors" id="school_name" class="form-control" v-model="filter.schoolId">
                        <option v-for="school in schools" :value="school.id" :key="school.id">{{school.name}}</option>
                        <option value="0">School Name(No Selected)</option>
                    </select>
                </div>
                <div v-if="auth.user_role_id == 2 || auth.user_role_id == 3" class="form-group col-md-2 text-center">
                    <select name="mentor" id="mentor" @change="reloadPage" class="form-control" v-model="filter.mentorId">
                        <option v-for="mentor in mentors" :value="mentor.id" :key="mentor.id">{{mentor.last_name}} {{mentor.first_name}}</option>
                        <option value="0">Mentor(No Selected)</option>
                    </select>
                </div>
                <div class="form-group col-md-2 text-center">
                    <input type="text" v-model="filter.searchKeyword" @change="reloadPage" placeholder="Search Students ...">
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
                        <a v-if="auth.user_role_id != 4" href="#" class="btn btn-large btn-cta" @click.prevent="newStudent(student.id)">Edit</a>
                        <a href="#" class="btn btn-large btn-blue">View Chart</a>
                        <a v-if="auth.user_role_id != 4" class="btn btn-large btn-yellow" @click="transfer(student)">Transfer</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <pagination :data="students" @pagination-change-page="updateList">
        <span slot="prev-nav">&lt; Previous</span>
        <span slot="next-nav">Next &gt;</span>
    </pagination>

    <div class="text-center">
        <a v-if="auth.user_role_id != 4" href="#" class="btn btn-lg btn-cta" @click="newStudent(0)">Add New Student</a>
    </div>

    <create-modal v-if="createModal" @close="createModal = false" :student-id="selected_student_id" @submit="editOk">
        <h1 slot="header" class="text-center">Add/Edit Student</h1>
    </create-modal>
    <transfer-modal v-if="transferModal" @close="transferModal = false" :student-info="selected_student" @submit="transferOk">
        <h1 slot="header" class="text-center">Transfer <span> {{selected_student.first_name}} {{selected_student.last_name}} </span> To</h1>
    </transfer-modal>
</div>
</template>

<script>
import CreateModal from "./CreateModal.vue";
import TransferModal from "./TransferModal.vue";
import Axios from "axios";

Vue.component('pagination', require('laravel-vue-pagination'));

export default {
    components: {
        CreateModal,
        TransferModal,
    },
    data: function () {
        return {
            createModal: false,
            transferModal: false,
            selected_student_id: 0,
            selected_mentor_id: 0,
            selected_student: {},

            auth: {},
            students: {},
            levels: [],
            schools: [],
            mentors: [],

            filter: {
                level: 0,
                schoolId: 0,
                mentorId: 0,
                searchKeyword: "",

                page: 1,
                rowCount: 4,
            }

        };
    },
    created() {
        Axios.get('/get-auth').then(response => {
            this.auth = response.data;
            switch(this.auth.user_role_id) {
                case 2:
                    this.getFilterLevels();
                    break;
                case 3:
                    this.getFilterMentors();
                    break;
                case 4:
                    this.reloadPage();
                    break;
            }
        });
    },
    methods: {
        newStudent: function(student_id) {
            this.selected_student_id = student_id;
            this.createModal = true;
        },
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
        getFilterLevels: function() {
            Axios.get('/my-students/get-filter-levels').then(response => {
                this.levels = response.data;
                this.filter.level = 0;
                this.filter.schoolId = 0;
                this.filter.mentorId = 0;
                this.getFilterSchools();
            });
        },
        getFilterSchools: function() {
            Axios.post('/my-students/get-filter-schools', this.filter).then(response => {
                this.schools = response.data;
                this.filter.schoolId = 0;
                this.filter.mentorId = 0;
                this.getFilterMentors();
            });
        },
        getFilterMentors: function() {
            Axios.post('/my-students/get-filter-mentors', this.filter).then(response => {
                this.mentors = response.data;
                this.filter.mentorId = 0;
                this.reloadPage();
            });
        },
        transfer: function (student) {
            this.selected_student = student;
            this.transferModal = true;
        },
        updateList: function (pgNum = 1) {
            this.filter.page = pgNum;
            Axios.post("/my-students/get-list", this.filter)
                .then(response => {
                    if(response.data.last_page != 0 && response.data.current_page > response.data.last_page) {
                        this.updateList(response.data.last_page);
                        return;
                    }
                    this.students = response.data;
                });
        },
        reloadPage: function () {
            this.updateList(this.filter.page);
        },
        no: function (rowNum) {
            return this.filter.rowCount * (this.filter.page - 1) + rowNum + 1;
        },
        editOk: function () {
            this.reloadPage();
            this.selected_student_id = 0;
            this.createModal = false;
        },
        transferOk: function () {
            this.reloadPage();
            this.selected_student_id = 0;
            this.transferModal = false;
        },
    },
};
</script>
