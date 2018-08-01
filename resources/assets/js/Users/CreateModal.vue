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
						<v-form>
							<v-container>
								<v-layout row wrap>
									<v-flex xs12 sm6 md4>
										<v-text-field
											label="First Name"
											v-model="userInfo.first_name"
											:rules="firstNameRules"
											:counter="10"
											required
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md4>
										<v-text-field
											label="Last Name"
											v-model="userInfo.last_name"
											:rules="lastNameRules"
											:counter="10"
											required
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md4>
										<v-text-field
											label="School E-mail"
											v-model="userInfo.email"
											:rules="emailRules"
											required
										></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row wrap>
									<select v-model="userInfo.user_role" :disabled="auth.user_role_id > 2 || location.district_id==0" name="user_role" id="user_role" class="form-control">
										<option value="0">Choose User Role(No Selected)</option>
										<option v-for="user_role in user_roles" :key="user_role.id" :value="user_role.id">{{user_role.name}}</option>
									</select>
								</v-layout>
								<v-layout row wrap>
									<v-flex xs12 sm6 md3>
										<!-- <v-select 
											:items="states"
											item-value="id"
											item-text="name"
											>
										</v-select> -->
										<select 
											v-model="location.state_id" 
											:disabled="auth.user_role_id > 1" 
											class="form-control" 
											@change="changeState()">
											<option value="0">State(No Selected)</option>
											<option v-for="state in states" :key="state.id" :value="state.id">{{state.name}}</option>
										</select>
									</v-flex>
									<v-flex xs12 sm6 md3>
										<select 
											v-model="location.county_id" 
											:disabled="auth.user_role_id > 1 || location.state_id==0" 
											class="form-control" 
											:rules="[v => v>0 || 'Item is required']"
											required
											@change="changeCounty()">
											<option value="0">County(No Selected)</option>
											<option v-for="county in counties" :key="county.id" :value="county.id">{{county.name}}</option>
										</select>
									</v-flex>
									<v-flex xs12 sm6 md3>
										<select v-model="location.district_id" :disabled="auth.user_role_id > 1 || location.county_id==0" class="form-control" @change="changeDistrict()">
											<option value="0">District(No Selected)</option>
											<option v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
										</select>
									</v-flex>
									<v-flex xs12 sm6 md3>
										<select v-model="location.school_id" :disabled="auth.user_role_id > 2 || location.district_id==0" name="school" id="school" class="form-control">
											<option value="0">School(No Selected)</option>
											<option v-for="school in schools" :key="school.id" :value="school.id">{{school.name}}</option>
										</select>
									</v-flex>
								</v-layout>
								<v-layout row wrap>
									<a class="modal-default-button btn btn-cta btn-lightblue" style="width: max-content;" @click="submit">
										<slot name="action">
											Submit
										</slot>
									</a>
								</v-layout>
							</v-container>
						</v-form>
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
// import VeeValidate from 'vee-validate';

// Vue.use(VeeValidate)

export default {
	name: "create-modal",
	props: {
		auth: {
			required: true,
			type: Object,
		},
	},
	data: function () {
		return {
			states: [],
			counties: [],
			districts: [],
			schools: [],
			user_roles: [],
			location: {
				state_id: 0,
				county_id: 0,
				district_id: 0,
				school_id: 0,
			},

			userInfo: {
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				user_role: 0,
				state_id: 0,
				county_id: 0,
				district_id: 0,
				school_id: 0,
			},


			valid: false,
			firstNameRules: [
				v => !!v || 'First name is required',
				v => v.length <= 10 || 'Name must be less than 10 characters'
			],
			lastNameRules: [
				v => !!v || 'Last name is required',
				v => v.length <= 10 || 'Name must be less than 10 characters'
			],
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
			],
		};
	},
	methods: {
		close: function () {
			this.$emit("close");
		},
		submit: function () {
			this.userInfo.school_id = this.location.school_id;
			this.userInfo.district_id = this.location.district_id;
			this.userInfo.password = this.userInfo.email;
			Axios.post("/users/save", this.userInfo)
			.then(response => {
				if(response.data.result == 'success') {
					this.$emit("submit");
				} else {
					this.$toasted.show(response.data.result, {
							theme: "outline",
							position: "top-center",
							duration: 3000,
					});
				}
			},
			error => {
				let maxErrorCount = 5;
				for (const key in error.response.data) {
					maxErrorCount--;
					this.$toasted.show(error.response.data[key], {
							theme: "outline",
							position: "top-center",
							duration: 3000,
					});
					if(maxErrorCount == 0) break;
				}
			});
		},
		changeState: function() {
			this.location.county_id = 0;
			this.location.district_id = 0;
			this.location.school_id = 0;
			this.loadCounties();
		},
		loadCounties: function() {
			Axios.post("/counties", { state_id: this.location.state_id }).then(
				result => {
					this.counties = result.data;
				}
			);
		},
		changeCounty: function() {
			this.location.district_id = 0;
			this.location.school_id = 0;
			this.loadDistricts();
		},
		loadDistricts: function() {
			Axios.post("/districts", { county_id: this.location.county_id }).then(
				result => {
					this.districts = result.data;
				}
			);
		},
		changeDistrict: function() {
			this.location.school_id = 0;
			this.loadSchools();
		},
		loadSchools: function() {
			Axios.post("/schools", { district_id: this.location.district_id }).then(
				result => {
					this.schools = result.data;
				}
			);
		},
		loadDefaultLocation: function() {
			Axios.get("/default-location").then(
				result => {
					this.location = result.data;

					Axios.get("/states").then(result => {
						this.states = result.data;
					});
					this.loadCounties();
					this.loadDistricts();
					this.loadSchools();
				}
			);
		},
		loadUserRoles: function() {
			Axios.get("/user-roles").then(
				result => {
					this.user_roles = result.data;
				}
			);
		},
	},
	created() {
		this.loadUserRoles();
		this.loadDefaultLocation();
	},
};
</script>

<style lang="scss" scoped>
@import '~vuetify/dist/vuetify.min.css';
.container {
	width: auto;
}
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
	margin: 0;
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

</style>
