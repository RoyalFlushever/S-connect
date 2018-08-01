<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container create-modal">
                <div class="modal-header">
                    <slot name="header">
                        Transfer Student
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <div class="location form-group row-box">
                            <span class="col-xs-3">State</span>
                            <span class="col-xs-3">County</span>
                            <span class="col-xs-3">District</span>
                            <span class="col-xs-3">School</span>
                        </div>
                        <div class="location form-group row-box">
                            <span class="col-xs-3">{{studentInfo.state_name}}</span>
                            <span class="col-xs-3">{{studentInfo.county_name}}</span>
                            <span class="col-xs-3">{{studentInfo.district_name}}</span>
                            <span class="col-xs-3">{{studentInfo.school_name}}</span>
                        </div>
                        <div class="location form-group row-box">
                            <div class="col-xs-3">
                                <select v-model="state_id" class="form-control" autocomplete="address-level1" @change="changeState()">
                                    <option value="0">State(No Selected)</option>
                                    <option v-for="state in states" :key="state.id" :value="state.id">{{state.name}}</option>
                                </select>
                            </div>
                            <div class="col-xs-3">
                                <select v-model="county_id" :disabled="state_id==0" class="form-control" autocomplete="address-level1" @change="changeCounty()">
                                    <option value="0">County(No Selected)</option>
                                    <option v-for="county in counties" :key="county.id" :value="county.id">{{county.name}}</option>
                                </select>
                            </div>
                            <div class="col-xs-3">
                                <select v-model="district_id" :disabled="county_id==0" class="form-control" autocomplete="address-level2" @change="changeDistrict()">
                                    <option value="0">District(No Selected)</option>
                                    <option v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
                                </select>
                            </div>
                            <div class="col-xs-3">
                                <select v-model="school_id" :disabled="district_id==0" name="school" id="school" class="form-control">
                                    <option value="0">School(No Selected)</option>
                                    <option v-for="school in schools" :key="school.id" :value="school.id">{{school.name}}</option>
                                </select>
                            </div>
                        </div>
                        <a class="modal-default-button btn btn-cta btn-lightblue" style="width: max-content;" @click="submit">
                            <slot name="action">
                                Submit
                            </slot>
                        </a>
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <!-- <a class="modal-default-button btn btn-red" href="/login" @click="close">		<slot name="close">		OK		</slot>    		</a> -->
                        <a class="modal-default-button btn btn-red" @click="close">
                            <slot name="close">
                                Exit Transfer Student (Does NOT save)
                            </slot>
                        </a>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import Axios from 'axios';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate)

export default {
    name: "create-modal",
    props: {
		studentInfo: {
            type: Object,
            required: true,
        },
    },
    data: function () {
        return {
            states: [],
            counties: [],
            districts: [],
            schools: [],
            state_id: 0,
            county_id: 0,
            district_id: 0,
            school_id: 0,
        };
    },
    methods: {
        close: function () {
            this.$emit("close");
        },
        submit: function () {
            if(this.school_id == 0) {
                this.$toasted.show('Please select a school', {
                        theme: "outline",
                        position: "top-center",
                        duration: 3000,
                });
                return;
            }
            this.studentInfo.school_id = this.school_id;
			Axios.post("/transfer-student", this.studentInfo)
			.then(response => {
				if(response.data.result) {
            		this.$emit("submit");
				}
			},
			error => {
				for (const key in error.response.data) {
					this.$toasted.show(error.response.data[key], {
							theme: "outline",
							position: "top-center",
							duration: 3000,
					});
				}
			});
        },
        changeState: function() {
            this.county_id = 0;
            this.district_id = 0;
            this.school_id = 0;
            this.loadCounties();
        },
        loadCounties: function() {
            Axios.post("/counties", { state_id: this.state_id }).then(
                result => {
                this.counties = result.data;
                }
            );
        },
        changeCounty: function() {
            this.district_id = 0;
            this.school_id = 0;
            this.loadDistricts();
        },
        loadDistricts: function() {
            Axios.post("/districts", { county_id: this.county_id }).then(
                result => {
                this.districts = result.data;
                }
            );
        },
        changeDistrict: function() {
            this.school_id = 0;
            this.loadSchools();
        },
        loadSchools: function() {
            Axios.post("/schools", { district_id: this.district_id }).then(
                result => {
                this.schools = result.data;
                }
            );
        },
    },
    created() {

        Axios.get("/states").then(result => {
            this.states = result.data;
        });

        this.state_id       = this.studentInfo.state_id;
        this.county_id      = this.studentInfo.county_id;
        this.district_id    = this.studentInfo.district_id;
        this.school_id      = this.studentInfo.school_id;

        this.loadCounties();
        this.loadDistricts();
        this.loadSchools();
    },
};
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 900px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
    border-bottom: none !important;
    h3 {
        margin-top: 0;
        color: #42b983;
        font-size: 30px !important;
    }
}

.modal-body {
    margin: 20px 0;
    font-size: 1.4em;
}

.modal-default-button {
    margin: auto;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-footer {
    text-align: center;
}

.tab-content {
    padding-top: 0px;
}

.btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4aae9b;
    background: transparent;
}

.no-border {
    border: none;
    padding-bottom: 0px;
}

.next {
    margin: 20px auto 0px auto;
    display: block;
}

.nav-tabs [data-toggle="tab"] {
    width: 25px;
    height: 25px;
    margin: 20px auto;
    border: none;
    padding: 0px;
}

.nav-tabs {
    margin-bottom: 15px;
    border: none;
}

.round-tab {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    display: inline-block;
    z-index: 2;
    position: absolute;
    left: 0;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

.nav-tabs>li {
    width: 33%;
    position: relative;
}

#stepper-step-3 {
    .action {
        font-size: .5em;
        min-height: 230px;
        .form-group {
            margin-right: 5px;
            margin-left: 5px;
            padding: 0px;
        }
        .btn-cta {
            padding: 6px;
        }
    }
}
</style>
