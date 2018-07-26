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
									<span class="round-tab glyphicon glyphicon-book">1</span>
								</a>
							</li>
							<li role="presentation" class="disabled">
								<a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2" ref="navTab2">
									<span class="round-tab glyphicon glyphicon-pencil">2</span>
								</a>
							</li>
							<li role="presentation" class="disabled">
								<a class="persistant-disabled" href="#stepper-step-3" data-toggle="tab" aria-controls="stepper-step-3" role="tab" title="Step 3">
									<span class="round-tab glyphicon glyphicon-list-alt">3</span>
								</a>
							</li>
						</ul>
						<div class="modal-header">
							<slot name="header">
								default header
							</slot>
						</div>
						<div class="tab-content">
							<form class="tab-pane fade in active" role="tabpanel" id="stepper-step-1" ref="stepForm1">
								<v-container grid-list-md text-xs-center>
									<v-layout column>
										<v-layout row>
											<input type="text" name="first_name" id="first_name" placeholder="First name" required v-model="studentInfo.first_name">
											<input type="text" name="Last name" id="last_name" placeholder="Last name" required v-model="studentInfo.last_name">
										</v-layout>
										<v-layout row style="height: 35px;">
											<input type="text" placeholder="Midle name (Optional)">
											<input id="birthdate" name="birthdate" required
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
										</v-layout>
										<v-layout row wrap>
											<label><input type="radio" name="gender" id="gender-female" required v-model="studentInfo.gender_id" :value="1">Male</label>
											<label><input type="radio" name="gender" id="gender-male" required v-model="studentInfo.gender_id" :value="2">Femalw</label>
											<select name="ethnicity" id="ethnicity">
												<option>Ethnicity(optional)</option>
												<option v-for="ethnicity in options.ethnicities" :value="ethnicity.id" :key="ethnicity.id">{{ethnicity.name}}</option>
											</select>
											<select name="iep" id="iep">
												<option>IEP(optional)</option>
												<option v-for="iep in options.ieps" :value="iep.id" :key="iep.id">{{iep.contents}}</option>
											</select>
											<select name="designateMentor" id="designateMentor" required>
												<option value="" disabled selected>Designate Mentor</option>
												<option v-for="mentor in options.availableMentors" :value="mentor.id" :key="mentor.id">{{mentor.last_name}}, {{mentor.first_name}}</option>
											</select>
										</v-layout>
										<v-flex xs12>
											<input type="text" placeholder="iConnect UserName" v-model="studentInfo.username" name="username" id="username" required>
										</v-flex>
										<v-flex xs12>
											<input type="password" placeholder="iConnect Password" v-model="studentInfo.password" name="password" id="password" required>
										</v-flex>
										<v-layout justify-center>
											<button type="submit" class="btn btn-lg btn-cta btn-blue" @click="gotoStep2($event)">Next Step 2</button>
										</v-layout>
									</v-layout>
								</v-container>
							</form>
							<div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
								<span>Monitoring and Citizenship</span>
								<citizenship-value-fields
										:monitoring-location-names-by-id="options.monitoringLocationNamesById"
										:monitoring-locations-by-category="options.monitoringLocationsByCategory"
										:citizenship-values-by-type="options.citizenshipValuesByType"
								></citizenship-value-fields>
								<a class="btn btn-lg btn-cta btn-blue" @click="gotoStep3()">Next Step 3</a>

							</div>
							<div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
								Add stakeholder(s)
								<v-container>
									<v-layout v-for="i in 3" :key="i" row>
										<span>{{i}}:First name</span>
										<input type="text">
										<span>Last name</span>
										<input type="text">
										<span>Email Address</span>
										<input type="text">
										<span>Relationship</span>
										<select name="" id=""></select>
										<button class="btn btn-cta btn-green">Enable</button>
										<button class="btn btn-cta btn-yellow">Desable</button>
									</v-layout>
									<a class="btn btn-lg btn-cta btn-blue" @click="goto('stepper-step-3')">Save new student!!</a>
								</v-container>
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
						<a v-if="actionurl" class="modal-default-button btn btn-cta btn-blue" style="width: max-content;" @click="submit">
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
				first_name: '',
				middle_name: '',
				last_name: '',
				birthdate: '',
				gender_id: 0,
				mento_id: 0,

			},
		};
	},
  methods: {
    close: function() {
      this.$emit("close");
    },
    submit: function() {
      this.$emit("submit");
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

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  font-size: 30px !important;
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

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
</style>
