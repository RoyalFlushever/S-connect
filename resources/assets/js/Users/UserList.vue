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
            <div class="form-group col-xs-4">
                <h2>Users</h2>
            </div>
            <div class="form-group col-xs-3 text-center">
                <a v-if="auth.user_role_id != 4" href="#" class="btn btn-lg btn-cta" @click="addUser">Add New User</a>
            </div>
            <div class="form-group col-xs-5 text-center">
                <input type="text" v-model="filter.searchKeyword" @change="reloadPage" placeholder="Search Students ...">
            </div>
        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-hover my-users">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, key) in users.data" :key="user.id">
                    <td>{{no(key)}}</td>
                    <td>{{user.first_name}}</td>
                    <td>{{user.last_name}}</td>
                    <td>{{user.user_role.name}}</td>
                    <td class="actions text-center">
                        <a v-if="auth.user_role_id != 4" href="#" class="btn btn-large btn-cta" @click.prevent="editUser(student.id)">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <pagination :data="users" @pagination-change-page="updateList">
        <span slot="prev-nav">&lt; Previous</span>
        <span slot="next-nav">Next &gt;</span>
    </pagination>


    <create-modal v-if="createModal" :auth="auth" @close="createModal = false" @submit="onCreate">
        <h1 slot="header" class="text-center">Add New User</h1>
    </create-modal>
    <edit-modal v-if="transferModal" @close="transferModal = false" :student-info="selected_user" @submit="onEditSave">
        <h1 slot="header" class="text-center">Transfer Student {{selected_user.first_name}} {{selected_user.last_name}}</h1>
    </edit-modal>
</div>
</template>

<script>
    import CreateModal from "./CreateModal.vue";
    import editModal from "./EditModal.vue";
    import Axios from "axios";

    Vue.component('pagination', require('laravel-vue-pagination'));

    export default {
        components: {
            CreateModal,
            editModal,
        },
        data: function () {
            return {
                createModal: false,
                transferModal: false,
                selected_student_id: 0,
                selected_mentor_id: 0,
                selected_user: {},

                auth: {},
                users: {},
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
                this.reloadPage();
            });
        },
        methods: {
            addUser: function() {
                this.createModal = true;
            },
            editUser: function(student_id) {
                this.selected_student_id = student_id;
                if(student_id == 0) {
                    this.createModal = true;
                } else {
                    this.editModal = true;
                }
            },
            updateList: function (pgNum = 1) {
                console.log(pgNum);
                this.filter.page = pgNum;
                Axios.post("/users/get-list", this.filter)
                    .then(response => {
                        if(response.data.last_page != 0 && response.data.current_page > response.data.last_page) {
                            this.updateList(response.data.last_page);
                            return;
                        }
                        this.users = response.data;
                    });
            },
            reloadPage: function () {
                this.updateList(this.filter.page);
            },
            no: function (rowNum) {
                return this.filter.rowCount * (this.filter.page - 1) + rowNum + 1;
            },
            onCreate: function () {
                this.reloadPage();
                this.selected_student_id = 0;
                this.createModal = false;
            },
            onEditSave: function () {
                this.reloadPage();
                this.selected_student_id = 0;
                this.transferModal = false;
            },
        },
    };
</script>


<style lang="scss" scoped>
    .row {
        .form-group {
            * {
                margin-top: 20px;
            }
        }
    }
</style>