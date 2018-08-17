<template>
    <div class="container gray-border">
        <h1 class="text-center">Usage Report</h1>
        <div class="row list-wrapper">
            <div class="col-md-3 list-option form-group" v-if="this.role == 2">
                <h3 class="text-center">Select Level</h3>
                <select name="school level" v-model="filter.level" @change="getFilterSchools" id="school_level">
                    <option v-for="level in levels" :value="level.id" :key="level.id">{{level.name}}</option>
                    <option value="0">School Level(No Selected)</option>
                </select>
            </div>
            <div class="col-md-3 list-option form-group" v-if="this.role == 2">
                <h3 class="text-center">Select Schools</h3>
                <select name="school name" id="school_name" @change="getFilterMentors" v-model="filter.schoolId" :disabled="filter.exportFormat==null"
                >
                    <option v-for="school in schools" :value="school.id" :key="school.id">{{school.name}}</option>
                    <option value="0">School Name(No Selected)</option>
                </select>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Report Options</h3>
                <div class="gray-border">
                    <div class="checkbox">
                        <label><input type="checkbox" value="site_facilitator_name" v-model="filter.selectedReportOptions">Name of Site Facilitators</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="numMentor" v-model="filter.selectedReportOptions">Number of Mentors</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="mentor_name" v-model="filter.selectedReportOptions">Mentors Name Last Log in Date</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="numActiveStudents" v-model="filter.selectedReportOptions">Number of Active Students</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="student_name" v-model="filter.selectedReportOptions">Student Name Last Log in Date</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Export Format</h3>
                <div class="gray-border">
                    <div class="radio">
                        <label><input type="radio" value="word" v-model="filter.exportFormat" >Word</label>
                    </div>
                    <div class="radio">
                        <label><input type="radio" value="csv" v-model="filter.exportFormat" >CSV</label>
                    </div>
                    <div class="radio">
                        <label><input type="radio" value="excel" v-model="filter.exportFormat" >Excel</label>
                    </div>
                    <div class="radio">
                        <label><input type="radio" value="pdf" v-model="filter.exportFormat" >PDF</label>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row list-wrapper">
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large reselect" @click="clearFilter">Re-select</button>
            </div>
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large btn-blue preview action" @click="filterValidation">Preview Report</button>
            </div>
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large print action" @click="filterValidation">Print</button>
            </div>
        </div>
    </div>
</template>

<script>

import Axios from "axios";
export default {
    props: [
        'role'
    ],

    data () {
        return {
            levels: [],
            schools: [],
            mentors: [],
            students: [],
            filter: {
                level: 0,
                schoolId: 0,
                mentorId: 0,
                selectedMentors: [],
                selectedStudents: [],
                selectedReportOptions: [],
                exportFormat: '',
            }
        }
    },
    created() {
        if (this.role == 2) {
            this.getFilterLevels();
        } else {
            this.getFilterMentors();
        }
    },

    methods: {
        getFilterLevels: function() {
            this.filter.level = 0;
            Axios.get('/my-students/get-filter-levels').then(response => {
                this.levels = response.data;
            });
        },

        getFilterSchools: function() {
            this.filter.schoolId = 0;
            if(this.filter.level == 0){
                return;
            }
            Axios.post('/my-students/get-filter-schools', this.filter).then(response => {
                this.schools = response.data;
                this.getFilterMentors();
            });
        },
        getFilterMentors: function() {
            this.filter.selectedMentors = [];
            this.mentors = [];
            if(this.filter.schoolId == 0 && this.role == 2) return;
            Axios.post('/my-students/get-filter-mentors', this.filter).then(response => {
                this.mentors = response.data;
            });
        },
        getFilterStudents: function() {
            this.filter.selectedStudents = [];
            this.students = [];
            if(this.filter.selectedMentors === undefined || this.filter.selectedMentors.length == 0) return;

            Axios.post('/my-students/get-filter-students', this.filter).then(response => {
                this.students = response.data;
            });
        },
        filterValidation: function() {
            if (this.role == 2) {
                if(this.filter.level == 0)
                    toastr["error"]("Please select school level!", "Error!");
                if(this.filter.schoolId == 0)
                    toastr["error"]("Please select a school name!", "Error!");
            }
            if(this.filter.selectedReportOptions === undefined || this.filter.selectedReportOptions.length == 0)
                toastr["error"]("Please select a Report Option!", "Error!");
            if(this.filter.exportFormat == 0)
                toastr["error"]("Please select the Export Format!", "Error!");
            else
                toastr["success"]("Preview Coming Soon!", "Success!");
        },
        clearFilter() {
            if(this.role == 2) {
                this.schools = [];
                this.mentors = [];
            }
            this.students = [];
            this.filter = {
                level: 0,
                schoolId: 0,
                mentorId: 0,
                selectedMentors: [],
                selectedStudents: [],
                selectedReportOptions: [],
                exportFormat: '',
            }
        },
    }

}
</script>

<style lang="scss">
    .homeheading {
        margin-bottom: 20px;
    }
</style>

<style lang="scss" scoped>
    .report-title {
        margin-bottom: 40px;
    }

    select {
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 18px;
        border-radius: 0px;
        outline: 1px inset black;
        outline-offset: -1px;
    }

    .list-wrapper {
        margin: 20px;

        .list-option {
            padding: 0px 10px;

            h3 {
                font-size: 1.4em;
                font-weight: 600;
            }
            .gray-border {
                height: 200px;
                padding: 0px 10px;
            }

            button {
                display: block;
            }

            .reselect {
                margin: 20px 0px;
            }

            .preview {
                margin: 20px auto;
                padding: 5px 20px;
            }

            .print {
                margin: 20px auto;
                padding: 5px 70px;
            }
        }
    }


</style>
