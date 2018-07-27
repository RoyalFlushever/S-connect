<template>
<div class="container">
    <div class="row" style="margin-bottom: 80px;">
        <div class="pull-left home-icon">
            <span class="round-tab">		<a href="/home">		<i class="fa fa-home fa-2x" aria-hidden="true"></i>		<br>		Home		</a>		</span>
        </div>
        <div class="pull-right help">
            <span class="round-tab"><i class="fa fa-question-circle fa-2x"></i> <br> Help</span>
        </div>
    </div>
    <div class="filter">
        <form action="">
            <div class="row">
                <template v-if="role == 2">
                    <div class="form-group col-xs-2 text-center">
                        <label for="school_level">School Level</label>
                        <select name="school level" id="school_level" class="form-control">
                            <option value="" selected disabled>Select</option>
                        </select>
                    </div>
                    <div class="form-group col-xs-2 col-xs-offset-1 text-center">
                        <label for="school_name">School Name</label>
                        <select name="school name" id="school_name" class="form-control">
                            <option value="" selected disabled>Select</option>
                        </select>
                    </div>
                    <div class="form-group col-xs-2 col-xs-offset-1 text-center">
                        <label for="mentor">Mentor</label>
                        <select name="mentor" id="mentor" class="form-control">]
                            <option value="" selected disabled>Select</option>
                        </select>
                    </div>
                </template>
                <template v-else-if="role == 3">
                    <div class="form-group col-xs-2 col-xs-offset-5 text-center">
                        <label for="mentor">Mentor</label>
                        <select name="mentor" id="mentor" class="form-control">
                            <option value="" selected disabled>Select</option>
                        </select>
                    </div>
                </template>
                <template v-else>
                    <div class="pull-right">
                        <a href="/students/create" class="btn btn-lg btn-cta pull-left">Add New Student</a>
                        <input type="text" placeholder="Search Students ...">
                    </div>
                </template>
                <template v-if="role != 4">
                    <div class="form-group col-xs-2 text-center">
                        <a href="#" class="btn btn-large btn-blue">View Students</a>
                    </div>
                </template>
            </div>

        </form>
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
                <tr v-for="(student, key) in students" :key="student.id">
                    <td>{{key + 1}}</td>
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

export default {
    data: function () {
        return {
            createModal: false,

            role: 2,
            students: [],

        };
    },
    created() {
        Axios.get("/my-students/get-list").then(response => {
            this.students = response.data.students;
        });
    },
    computed: {
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
        }
    },
};
</script>
