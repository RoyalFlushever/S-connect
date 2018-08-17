<template>
    <div class="container gray-border">
        <h1 class="text-center report-title">Demographic Report</h1>
        <div class="row list-wrapper" v-if="this.role == 2">
            <div class="form-group col-md-2 col-md-offset-2">
                <select name="school level" v-model="filter.level" @change="getFilterSchools" id="school_level">
                    <option v-for="level in levels" :value="level.id" :key="level.id">{{level.name}}</option>
                    <option value="0">School Level(No Selected)</option>
                </select>
            </div>
            <div class="form-group col-md-2 col-md-offset-2">
                <select name="school name" id="school_name" @change="getFilterMentors" v-model="filter.schoolId" :disabled="filter.exportFormat==null">
                    <option v-for="school in schools" :value="school.id" :key="school.id">{{school.name}}</option>
                    <option value="0">School Name(No Selected)</option>
                </select>
            </div>
        </div>
        <div class="row list-wrapper">
            <div class="col-md-3 list-option">
                <h3 class="text-center">Select Mentors</h3>
                <div class="gray-border">
                    <div v-for="mentor in mentors" :key="mentor.id" class="checkbox">
                        <label><input type="checkbox" v-model="filter.selectedMentors" @change="getFilterStudents" :value="mentor.id">{{mentor.first_name}}&nbsp;{{mentor.last_name}}</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Select Students</h3>
                <div class="gray-border">
                    <div v-for="student in students" :key="student.id" class="checkbox">
                        <label><input type="checkbox" v-model="filter.selectedStudents"
                         :value="student.id">{{student.first_name}}&nbsp;{{student.last_name}}</label>
                    </div>
                </div>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Report Options</h3>
                <div class="gray-border">
                    <div class="checkbox">
                        <label><input type="checkbox" value="fullname" v-model="filter.selectedReportOptions">Student Full Name</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="iep" v-model="filter.selectedReportOptions">IEP</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="ethnicity" v-model="filter.selectedReportOptions">Ethnicity</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="age" v-model="filter.selectedReportOptions">Age</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="gender" v-model="filter.selectedReportOptions">Gender</label>
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="bdate" v-model="filter.selectedReportOptions">Birth Dates</label>
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
                searchKeyword: "",

                page: 1,
                rowCount: 4,
            },
            time3: '',
            shortcuts: [
                {
                    text: 'Today',
                    onClick: () => {
                        this.time3 = [ new Date(), new Date() ]
                    }
                }
            ],
            lang: {
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                placeholder: {
                date: 'Select Date',
                dateRange: 'Select Date Range'
                }
            },
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
            console.log('students');
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
            if(this.filter.selectedMentors === undefined || this.filter.selectedMentors.length == 0)
                toastr["error"]("Please select a mentor!", "Error!");
            if(this.filter.selectedStudents === undefined || this.filter.selectedStudents.length == 0)
                toastr["error"]("Please select a student!", "Error!");
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
                overflow: auto;
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


