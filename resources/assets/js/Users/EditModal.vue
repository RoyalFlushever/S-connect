<template>
<transition name="modal">
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container edit-modal">
				<div class="modal-header">
					<slot name="header">
						Editing User
					</slot>
				</div>
				<div class="modal-body">
					<slot name="body">
						<v-form>
							<v-container>
								<v-layout row wrap justify-center>
									<h2 v-if="!userInfo.is_enabled">(Disabled)</h2>
								</v-layout>
								<v-layout row wrap mb-3>
									<v-flex xs12 sm6 md6>
										<v-text-field
											label="First Name"
											v-model="userInfo.first_name"
											:rules="firstNameRules"
											required
										></v-text-field>
									</v-flex>
									<v-flex xs12 sm6 md6>
										<v-text-field
											label="Last Name"
											v-model="userInfo.last_name"
											:rules="lastNameRules"
											required
										></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row wrap mb-3>
									<select v-model="userInfo.user_role_id" name="user_role" id="user_role" class="form-control">
										<option value="0">Choose User Role(No Selected)</option>
										<option v-for="user_role in user_roles" :key="user_role.id" :value="user_role.id" :disabled="auth.user_role_id != 1 && user_role.id <= auth.user_role_id">{{user_role.name}}</option>
									</select>
								</v-layout>
								<v-layout row wrap mb-3>
									<v-flex xs12 sm6 md3>
										<!-- <v-select 
											:items="states"
											item-value="id"
											item-text="name"
											>
										</v-select> -->
										<select 
											v-model="userInfo.state_id" 
											:disabled="auth.user_role_id > 1" 
											class="form-control" 
											@change="changeState()">
											<option value="0">State(No Selected)</option>
											<option v-for="state in states" :key="state.id" :value="state.id">{{state.name}}</option>
										</select>
									</v-flex>
									<v-flex xs12 sm6 md3>
										<select 
											v-model="userInfo.county_id" 
											:disabled="auth.user_role_id > 1 || userInfo.state_id==0" 
											class="form-control" 
											:rules="[v => v>0 || 'Item is required']"
											required
											@change="changeCounty()">
											<option value="0">County(No Selected)</option>
											<option v-for="county in counties" :key="county.id" :value="county.id">{{county.name}}</option>
										</select>
									</v-flex>
									<v-flex xs12 sm6 md3>
										<select v-model="userInfo.district_id" :disabled="auth.user_role_id > 1 || userInfo.county_id==0" class="form-control" @change="changeDistrict()">
											<option value="0">District(No Selected)</option>
											<option v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
										</select>
									</v-flex>
									<v-flex xs12 sm6 md3>
										<select v-model="userInfo.school_id" :disabled="auth.user_role_id > 2 || userInfo.district_id==0" name="school" id="school" class="form-control">
											<option value="0">School(No Selected)</option>
											<option v-for="school in schools" :key="school.id" :value="school.id">{{school.name}}</option>
										</select>
									</v-flex>
								</v-layout>
								<v-layout row wrap mb-3>
									<a class="modal-default-button btn btn-cta" :class="{'btn-red' : userInfo.is_enabled, 'btn-lightblue' : !userInfo.is_enabled}" style="width: max-content;" @click="userInfo.is_enabled=!userInfo.is_enabled">
											{{userInfo.is_enabled ? 'Disable' : 'Enable'}}
									</a>
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
								Exit Edit User (Does NOT save)
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
	name: "edit-modal",
	props: {
		auth: {
			required: true,
			type: Object,
		},
		user: {
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
				id: 0,
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				user_role: 0,
				state_id: 0,
				county_id: 0,
				district_id: 0,
				school_id: 0,
				is_enabled: 1,
			},


			valid: false,
			firstNameRules: [
				v => !!v || 'First name is required',
				// v => v.length <= 10 || 'Name must be less than 10 characters'
			],
			lastNameRules: [
				v => !!v || 'Last name is required',
				// v => v.length <= 10 || 'Name must be less than 10 characters'
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
			this.userInfo.password = this.userInfo.email;
			this.userInfo.is_enabled = this.userInfo.is_enabled ? 1 : 0;
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
			this.userInfo.county_id = 0;
			this.userInfo.district_id = 0;
			this.userInfo.school_id = 0;
			this.loadCounties();
		},
		loadCounties: function() {
			if(this.userInfo.state_id == 0) return;
			Axios.post("/counties", { state_id: this.userInfo.state_id }).then(
				result => {
					this.counties = result.data;
				}
			);
		},
		changeCounty: function() {
			this.userInfo.district_id = 0;
			this.userInfo.school_id = 0;
			this.loadDistricts();
		},
		loadDistricts: function() {
			if(this.userInfo.county_id == 0) return;
			Axios.post("/districts", { county_id: this.userInfo.county_id }).then(
				result => {
					this.districts = result.data;
				}
			);
		},
		changeDistrict: function() {
			this.userInfo.school_id = 0;
			this.loadSchools();
		},
		loadSchools: function() {
			if(this.userInfo.district_id == 0) return;
			Axios.post("/schools", { district_id: this.userInfo.district_id }).then(
				result => {
					this.schools = result.data;
				}
			);
		},
		loadUserInfo: function() {
			Axios.post("/users/get-location", this.userInfo).then(
				result => {
					this.userInfo = result.data;

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
		this.userInfo = Object.assign(this.userInfo, this.user);
		this.userInfo.is_enabled = this.userInfo.is_enabled == 1;
		this.loadUserRoles();
		this.loadUserInfo();
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
