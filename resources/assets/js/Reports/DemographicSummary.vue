<template>
    <div class="container gray-border">
        <h1 class="text-center">Student Demographic Summary</h1>
        <div class="row list-wrapper">
            <div class="col-md-3 list-option" v-if="this.role == 2">
                <h3 class="text-center">School Level</h3>
                <select name="school level" @change="getFilterSchools" id="school_level" v-model="filter.level" class="form-control">
                    <option v-for="level in levels" :value="level.id" :key="level.id">{{level.name}}</option>
                    <option value="0">School Level(No Selected)</option>
                </select>
            </div>
            <div class="col-md-3 list-option" v-if="this.role == 2">
                <h3 class="text-center">School Name</h3>
                <select name="school name" id="school_name" class="form-control">
                    <option value="0">School Name(No Selected)</option>
                </select>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Report Options</h3>
                <div class="gray-border"></div>
            </div>
            <div class="col-md-6 list-option" v-if="this.role == 3">
                <h3 class="text-center">Select Date or Date Range</h3>
                <div class="text-center">
                    <date-picker v-model="time3" range :shortcuts="shortcuts" :lang="lang"></date-picker>
                </div>
            </div>
            <div class="col-md-3 list-option">
                <h3 class="text-center">Export Format</h3>
                <div class="gray-border"></div>
            </div>
        </div>
        <div class="row list-wrapper" v-if="this.role == 2">
            <h3>Select Date or Date Range</h3>
            <date-picker v-model="time3" range :shortcuts="shortcuts" :lang="lang"></date-picker>
        </div>
        <hr>
        <div class="row list-wrapper">
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large reselect">Re-select</button>
            </div>
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large btn-blue preview action">Preview Report</button>
            </div>
            <div class="col-md-3 list-option">
                <button class="btn btn-cta btn-large print action">Print</button>
            </div>
        </div>
    </div>
</template>

<script>

import Axios from "axios";
import DatePicker from 'vue2-datepicker';

export default {
    components: {
        DatePicker
    },

    props: [
        'role'
    ],

    data () {
        return {
            levels: [],
            schools: [],
            filter: {
                level: 0,
                schoolId: 0,
                mentorId: 0,
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
        console.log(this.role);
        console.log(this.selectedDate);
        switch (this.role) {
            case '2':
                this.getFilterLevels();
                break;
        
            case '3':
                break;
        }
    },

    methods: {
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
                // this.getFilterMentors();
            });
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
        h3 {
            font-size: 1.4em;
            font-weight: 600;
        }

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


