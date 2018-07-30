<template>
<transition name="modal">
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container create-modal">
				<div class="modal-body">
					<slot name="body">
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="active">
								<a class="persistant-disabled" href="#stepper-step-1" data-toggle="tab" aria-controls="stepper-step-1" role="tab" title="Step 1">
									<span class="round-tab glyphicon glyphicon-book gray-border">1</span>
								</a>
							</li>
							<li role="presentation" class="disabled">
								<a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2" ref="navTab2">
									<span class="round-tab glyphicon glyphicon-pencil gray-border">2</span>
								</a>
							</li>
							<li role="presentation" class="disabled">
								<a class="persistant-disabled" href="#stepper-step-3" data-toggle="tab" aria-controls="stepper-step-3" role="tab" title="Step 3" ref="navTab3">
									<span class="round-tab glyphicon glyphicon-list-alt gray-border">3</span>
								</a>
							</li>
						</ul>
						<div class="modal-header">
							<slot name="header">
								default header
							</slot>
						</div>
						<div class="tab-content no-border">
							<form class="tab-pane fade in active" role="tabpanel" id="stepper-step-1" ref="stepForm1">
								<div class="action">
									<div class="personal-info form-group row">
										<div class="col-xs-6">
											<input type="text" name="student_first_name" id="student_first_name" class="form-control" placeholder="First name" required v-model="studentInfo.first_name">
										</div>
										<div class="col-xs-6">
											<input type="text" name="student_Last name" id="student_last_name" class="form-control" placeholder="Last name" required v-model="studentInfo.last_name">
										</div>
									</div>	
									<div class="personal-info form-group row">
										<div class="col-xs-6">
											<input type="text" class="form-control" placeholder="Midle name (Optional)">
										</div>
										<div class="col-xs-6">
											<input id="birthdate" name="birthdate" class="form-control" required
												v-model="studentInfo.birthdate"
												placeholder="Select Birthdate"
												data-provide="datepicker"
												data-date-autoclose="true"
												data-date-disable-touch-keyboard="true"
												data-date-assume-nearby-year="true"
												data-date-end-date="0d"
												data-date-today-btn="linked"
												data-date-today-highlight="true"
											>
										</div>
									</div>
									<div class="options form-group row">
										<div class="col-xs-6 form-group">
											<label class="radio-inline"><input type="radio" name="gender" id="gender-female" required v-model="studentInfo.gender" :value="1">Male</label>
											<label class="radio-inline"><input type="radio" name="gender" id="gender-male" required v-model="studentInfo.gender" :value="2">Female</label>
										</div>
										<div class="col-xs-3 form-group">
											<select name="ethnicity" id="ethnicity"  class="form-control" >
												<option>Ethnicity(optional)</option>
												<option v-for="ethnicity in options.ethnicities" :value="ethnicity.id" :key="ethnicity.id">{{ethnicity.name}}</option>
											</select>
										</div>
										<div class="col-xs-3 form-group">
											<select name="iep" id="iep"  class="form-control">
												<option>IEP(optional)</option>
												<option v-for="iep in options.ieps" :value="iep.id" :key="iep.id">{{iep.contents}}</option>
											</select>
										</div>
									</div>
									<div class="form-group row">
										<div class="col-xs-8 col-xs-offset-2">
											<select name="designateMentor" id="designateMentor" class="form-control" required>
												<option v-for="mentor in options.availableMentors" :value="mentor.id" :key="mentor.id">{{mentor.last_name}}, {{mentor.first_name}}</option>
												<option value="0" selected>Designate Mentor(No Selected)</option>
											</select>
										</div>
									</div>
									<div class="form-group row">
										<div class="col-xs-8 col-xs-offset-2">
											<input type="text" placeholder="iConnect UserName" class="form-control" v-model="studentInfo.username" name="username" id="username" required>
										</div>
									</div>
									<div class="form-group row">
										<div class="col-xs-8 col-xs-offset-2">
											<input type="password" placeholder="iConnect Password" class="form-control" v-model="studentInfo.password" name="password" id="password" required>
										</div>
									</div>
										<v-layout justify-center>
											<button type="submit" class="btn btn-lg btn-cta btn-lightblue next iconnect-blue" @click="gotoStep2($event)">Next Step 2</button>
										</v-layout>
								</div>
							</form>
							<div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
								<span>Monitoring and Citizenship</span>
								<citizenship-value-fields
										:monitoring-location-names-by-id="options.monitoringLocationNamesById"
										:monitoring-locations-by-category="options.monitoringLocationsByCategory"
										:citizenship-values-by-type="options.citizenshipValuesByType"
								></citizenship-value-fields>
								<a class="btn btn-lg btn-cta btn-lightblue next" @click="gotoStep3()">Next Step 3</a>

							</div>
							<div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
								<h2>Add stakeholder(s)</h2>
								<div class="action" >
									<div class="personal-info row"  v-for="i in 3" :key="i">
										<div class="col-xs-2 form-group">
											<!-- <label for="first_name">{{i}}.First name</label> -->
											<input type="text" id="first_name" class="form-control" placeholder="First name">
										</div>
										<div class="col-xs-2 form-group">
											<!-- <label for="last_name">Last name</label> -->
											<input type="text" id="last_name" class="form-control" placeholder="Last name">
										</div>
										<div class="col-xs-2 form-group">
											<!-- <label for="stakeholder_email">Email Address</label> -->
											<input type="text" id="stakeholder_email" class="form-control" placeholder="Email Address">
										</div>
										<div class="col-xs-2 form-group">
											<!-- <label for="relationship">Relationship</label> -->
											<select id="relationship" class="form-control">
												<option value="" disabled selected>Relationship</option>
											</select>
										</div>
										<button class="btn btn-cta btn-green">Enable</button>
										<button class="btn btn-cta btn-yellow">Desable</button>
									</div>
								</div>
								<div>
									<a class="btn btn-lg btn-cta btn-lightblue next" @click="submit()">Save new student!</a>
								</div>
							</div>
						</div>
					</slot>
				</div>

				<div class="modal-footer">
					<slot name="footer">
						<!-- <a class="modal-default-button btn btn-red" href="/login" @click="close">
								<slot name="close">
									OK
								</slot>    
							</a> -->
						<a class="modal-default-button btn btn-red" @click="close">
							<slot name="close">
								Exit Add new Student (Does NOT save)
							</slot>
						</a>
						<a v-if="actionurl" class="modal-default-button btn btn-cta btn-lightblue" style="width: max-content;" @click="submit">
							<slot name="action">
								Submit
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
  components: { DatePicker },
  name: "create-modal",
  props: {
    actionurl: {
      type: String
    }
	},
	data: function () {
		return {
			options: {},
			studentInfo: {
				_token: window.Laravel.csrfToken,
				first_name: '',
				middle_name: null,
				last_name: '',
				birthdate: '',
				gender: 0,
				mentor: null,

			},
		};
	},
  methods: {
    close: function() {
      this.$emit("close");
    },
    submit: function() {
			Axios.post("/create-students/save-student", this.studentInfo);
		},
		gotoStep2: function (e) {
			if(this.$refs.stepForm1.checkValidity()) {
				e.preventDefault();
				$(this.$refs.navTab2).tab("show");
			}
		},
		gotoStep3: function () {
			$(this.$refs.navTab3).tab("show");
		}
	},
	mounted() {
    $('#birthdate').datepicker().on(
      'changeDate', () => { this.studentInfo.birthdate = $('#birthdate').val() }
    )
		Axios.get("/create-students/get-options")
			.then(
				result => {
					// console.log(result.data);
					// return;
					this.options = result.data;
				}
			);
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
	
	border-bottom: none!important;

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
.nav-tabs > li {
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
