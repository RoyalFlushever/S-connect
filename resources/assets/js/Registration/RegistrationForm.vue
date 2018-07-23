<template>
	<div class="container">
		<div class="row text-center">
			<div class="col-md-9 stepper">
				<form action="POST">
					<div class="wizard-progress-with-circle">
						<div class="wizard-progress-bar" style="background-color: rgb(231, 76, 60); color: rgb(231, 76, 60); width: 16.6667%;">
						</div>
					</div>
					<ul class="nav nav-tabs" role="tablist">
						<li role="presentation" class="active">
							<a class="persistant-disabled" href="#stepper-step-1" data-toggle="tab" aria-controls="stepper-step-1" role="tab" title="Step 1">
								<span class="round-tab glyphicon glyphicon-book gray-border">1</span>
							</a>
						</li>
						<li role="presentation" class="disabled">
							<a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2">
								<span class="round-tab glyphicon glyphicon-pencil gray-border">2</span>
							</a>
						</li>
						<li role="presentation" class="disabled">
							<a class="persistant-disabled" href="#stepper-step-3" data-toggle="tab" aria-controls="stepper-step-3" role="tab" title="Step 3">
								<span class="round-tab glyphicon glyphicon-list-alt gray-border">3</span>
							</a>
						</li>
					</ul>
					
					<div class="tab-content">
						<div class="tab-pane fade in active" role="tabpanel" id="stepper-step-1">
							<h2 class="question">Are you a School District Employee?</h2>
							<div class="action">
								<button type="button" class="btn btn-default btn-cta" @click="selIsEmployee(1)">YES</button>
								<button type="button" class="btn btn-default btn-cta btn-red" @click="selIsEmployee(0)">NO</button>
							</div>
							<a href="#" class="btn btn-info btn-lg" @click="alertYN()">
								<span class="glyphicon glyphicon-arrow-right"></span> Step 2/3
							</a>
						</div>
						<div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
							<div class="action">
								<div v-if="userInfo.isEmployee" class="row">
									<div class="col-md-4 role">
										<div class="panel panel-default select-pannel gray-border">
											<div class="pannel-body select-pannel-body gray-border">
												<h3>FACLILTATOR</h3>
												<p>I will be mananging several Schools, Teachers/Mentors,
													and Studnents in my district.
												</p>
											</div>
											<button type="button" class="btn btn-default btn-cta" @click="selUserRole(2)">Select</button>
										</div>
									</div>
									<div class="col-md-4 role">
										<div class="panel panel-default select-pannel gray-border">
											<div class="pannel-body select-pannel-body gray-border">
												<h3>SITE FACLILTATOR</h3>
												<p>I will be mananging several Teachers/Mentors,
													and Studnents in my school.
												</p>
											</div>
											<button type="button" class="btn btn-default btn-cta" @click="selUserRole(3)">Select</button>
										</div>
									</div>
									<div class="col-md-4 role">
										<div class="panel panel-default select-pannel gray-border">
											<div class="pannel-body select-pannel-body gray-border">
												<h3>SCHOOL MENTOR</h3>
												<p>I will be mananging several Studnents in my school.
												</p>
											</div>
											<button type="button" class="btn btn-default btn-cta" @click="selUserRole(4)">Select</button>
										</div>
									</div>
								</div>
								<div v-else>
									<h2 class="question">I am going to register as a Stakeholder.</h2>
								</div>
							</div>
							<a href="#" class="btn btn-info btn-lg" @click="goto('stepper-step-3')">
								<span class="glyphicon glyphicon-arrow-right"></span> Step 3/3
							</a>
						</div>
						<div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
							<div class="action gray-border">
								<div class="personal-info form-group row">
									<div class="col-xs-3">
										<input id="first_name" type="text" class="form-control" v-model="userInfo.firstName" placeholder="First Name" autocomplete="given-name">
									</div>
									<div class="col-xs-3">
										<input id="last_name" type="text" class="form-control" v-model="userInfo.lastName" placeholder="Last Name" autocomplete="family-name">
									</div>
									<div class="col-xs-6">
										<input id="school_email" type="email" class="form-control" v-model="userInfo.schoolEmail" placeholder="School Email Address" autocomplete="email" required>
									</div>
								</div>
								<div class="location form-group row-box">
									<div class="col-xs-3">
										<select v-model="userInfo.stateId" class="form-control" autocomplete="address-level1" @change="selState()">
											<option value="0">State</option>
											<option v-for="state in states" :key="state.id" :value="state.id">{{state.name}}</option>
										</select>
									</div>
									<div class="col-xs-3">
										<select v-model="userInfo.countyId" :disabled="userInfo.stateId==0" class="form-control" autocomplete="address-level1" @change="selCounty()">
											<option value="0">County</option>
											<option v-for="county in counties" :key="county.id" :value="county.id">{{county.name}}</option>
										</select>
									</div>
									<div v-if="userInfo.isEmployee" class="col-xs-3">
										<select v-model="userInfo.districtId" :disabled="userInfo.countyId==0" class="form-control" autocomplete="address-level2" @change="selDistrict()">
											<option value="0">District</option>
											<option v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
										</select>
									</div>
									<div v-if="userInfo.roleId > 2 && userInfo.isEmployee" class="col-xs-3">
										<select v-model="userInfo.schoolId" :disabled="userInfo.districtId==0" name="school" id="school" class="form-control" @change="selSchool()">
											<option value="0">School</option>
											<option v-for="school in schools" :key="school.id" :value="school.id">{{school.name}}</option>
										</select>
									</div>
								</div>
								<div class="query form-group row">
									<div v-if="userInfo.isEmployee && userInfo.roleId == 4" class="col-xs-10 col-xs-offset-1">
										<select name="site_facilitator" id="site_facilitator" class="form-control">
											<option value="">Select Site Facilitator</option>
										</select>
									</div>
									<div class="col-xs-10 col-xs-offset-1">
										<select v-model="userInfo.selReferralSource" class="form-control">
											<option value="0">How did you hear about I-Connect</option>
											<option v-for="item in referralSource" v-if="item.is_employee==userInfo.isEmployee" :value="item.id" :key="item.id">{{item.contents}}</option>
										</select>
									</div>
								</div>
							</div>
							<button href="#" class="btn btn-lg btn-cta registration-btn"  id="show-modal" @click="regUser()">
								Finish Registration!
							</button>
							<div>
								<button id="issue-modal" type="button" class="btn btn-lg issue btn-red" @click="issueModal = true">
									Registration Issue
								</button>
							</div>
							<!-- use the modal component, pass in the prop -->
							<v-modal v-if="showModal" @close="showModal = false">
								<!--
								you can use custom content here to overwrite
								default content
								-->
								<div slot="body">
									<div class="gray-border">
										Account Submitted An email has been sent to the email provided. 
										Please log in to your email and verify your account to begin using I-Connect. Your email will be
										your default username and you will be provided a temporary one-time use password. Once you log in to the 
										I-Connect Web page, click on "My Account" to set a new password.
									</div>
									<br>
									<br>
									<div>
										If there are any issues, please email:
										<br>
										iConnect@ku.edu
									</div>
								</div>
								<h3 slot="header">Account Submitted!</h3>
							</v-modal>

							
						</div>
					</div>
				</form>

				<v-modal v-if="issueModal" @close="issueModal = false" actionurl="/login">
					<div slot="body">
							<div class="personal-info form-group row">
								<div class="col-xs-3">
									<input id="first_name_issue" type="text" class="form-control" name="first_name_issue" placeholder="First Name" autocomplete="given-name">
								</div>
								<div class="col-xs-3">
									<input id="last_name_issue" type="text" class="form-control" name="last_name_issue" placeholder="Last Name"  autocomplete="family-name">
								</div>
								<div class="col-xs-6">
									<input id="school_email" type="email" class="form-control" name="email" placeholder="School Email Address" autocomplete="email" required>
								</div>
							</div>
							<div class="location form-group row">
									<div class="col-xs-3">
										<select v-model="userInfo.stateId" class="form-control" autocomplete="address-level1" @change="selState()">
											<option value="0">State</option>
											<option v-for="state in states" :key="state.id" :value="state.id">{{state.name}}</option>
										</select>
									</div>
									<div class="col-xs-3">
										<select v-model="userInfo.countyId" :disabled="userInfo.stateId==0" class="form-control" autocomplete="address-level1" @change="selCounty()">
											<option value="0">County</option>
											<option v-for="county in counties" :key="county.id" :value="county.id">{{county.name}}</option>
										</select>
									</div>
									<div class="col-xs-3">
										<select v-model="userInfo.districtId" :disabled="userInfo.countyId==0" class="form-control" autocomplete="address-level2" @change="selDistrict()">
											<option value="0">District</option>
											<option v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
										</select>
									</div>
									<div v-if="userInfo.roleId > 2" class="col-xs-3">
										<select v-model="userInfo.schoolId" :disabled="userInfo.districtId==0" name="school" id="school" class="form-control" @change="selSchool()">
											<option value="0">School</option>
											<option v-for="school in schools" :key="school.id" :value="school.id">{{school.name}}</option>
										</select>
									</div>
							</div>
							<div class="location form-group row">
								<div class="col-xs-4">
									<div class="checkbox issue">
										<label><input type="checkbox" name="remember"> District not displayed</label>
									</div>
									<div class="checkbox issue">
										<label><input type="checkbox" name="remember"> School not displayed</label>
									</div>
									<div class="checkbox issue">
										<label><input type="checkbox" name="remember"> Outside of United States</label>
									</div>
									<div class="checkbox issue">
										<label><input type="checkbox" name="remember"> Other reason</label>
									</div>
								</div>
								<div class="col-xs-8">
									<textarea name="issue_text" id="issue_text"  class="form-control" cols="30" rows="6" placeholder="Please explain issue here..."></textarea>
								</div>
							</div>
					</div>
					<h3 slot="header">Having difficulties registering?</h3>
					<span slot="close">Cancel</span>
				</v-modal>
			</div>
		</div>
	</div>
</template>

<script>
import VModal from "../components/VModal.vue";
import Axios from "axios";

export default {
  data: function() {
    return {
      showModal: false,
      issueModal: false,
      userInfo: {
        isEmployee: 0,
				roleId: null,
				firstName: "",
				lastName: "",
				schoolEmail: "",
        stateId: 0,
        countyId: 0,
        districtId: 0,
				schoolId: 0,
				selReferralSource: 0,
      },
			referralSource: [],
      states: [],
      counties: [],
      districts: [],
      schools: [],
    };
  },
  methods: {
    alertYN: function() {
			this.$toasted.show("Please select your answer.", {
					theme: "outline",
					position: "top-center",
					duration: 3000,
			});
    },
    goto: function(tabName) {
			if(tabName == "stepper-step-3" && this.userInfo.isEmployee == 1) {
				this.$toasted.show("Please select your role!", {
						theme: "outline",
						position: "top-center",
						duration: 3000,
				});
				return;
			}
      $('.nav-tabs a[href="#' + tabName + '"]').tab("show");
    },
    selIsEmployee: function(employee) {
      this.userInfo.isEmployee = employee;
      this.goto("stepper-step-2");
    },
    selUserRole(roleId) {
      this.userInfo.roleId = roleId;
      $('.nav-tabs a[href="#stepper-step-3"]').tab("show");
    },

    selState: function() {
			this.userInfo.countyId = 0;
			this.userInfo.districtId = 0;
			this.userInfo.schoolId = 0;
      Axios.post("/counties", { stateId: this.userInfo.stateId }).then(
        result => {
          this.counties = result.data;
        }
      );
    },
    selCounty: function() {
			this.userInfo.districtId = 0;
			this.userInfo.schoolId = 0;
      Axios.post("/districts", { countyId: this.userInfo.countyId }).then(
        result => {
          this.districts = result.data;
        }
      );
    },
    selDistrict: function() {
			this.userInfo.schoolId = 0;
      Axios.post("/schools", { districtId: this.userInfo.districtId }).then(
        result => {
          this.schools = result.data;
        }
      );
    },
		selSchool: function () {},

		regUser: function () {
			this.showModal = true;
		},
		
  },
  mounted() {
    Axios.get("/states").then(result => {
      this.states = result.data;
    });
    Axios.get("/referralSource").then(result => {
      this.referralSource = result.data;
    });
  },
};
</script>
<style lang="scss" scoped>
$iconnect-blue: #0275d8; // blue - for step button
$iconnect-middleblue: #2196f3;
$iconnect-lightblue: #5bc0de;

$iconnect-green: #5cb85c; // call to action

$iconnect-gray: #616161; // font color
$iconnect-lightgray: #757575; // border color
$iconnect-red: #f44336;
$iconnect-yellow: #ffeb3b;

.stepper {
  margin-left: 12.5%;
}

.question {
  font-weight: 600;
  border: solid 1px $iconnect-lightgray;
  padding: 25px 30px;
  width: 90%;
  margin: auto;
}

.action {
  margin-top: 40px;
  margin-bottom: 100px;
}

.role {
  padding: 10px;
}

.panel {
  padding: 15px 5px;
}

.select-pannel-body {
  min-height: 130px;
  margin-bottom: 10px;
}

.registration-btn {
  margin: 20px 10px 0px;
  padding: 10px 40px;
  margin-bottom: 20px;
}

.issue {
  width: max-content;
  font-size: 1.2em;
  padding: 3px 15px;
}

#stepper-step-3 .action {
  padding: 25px 30px;
}

#site_facilitator {
  margin-bottom: 15px;
}

.stepper {
  .nav-tabs [data-toggle="tab"] {
    width: 25px;
    height: 25px;
    margin: 20px auto;
    border: none;
    padding: 0px;
  }
  .nav-tabs {
    margin-bottom: 40px;
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

  .row-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

.wizard-progress-with-circle {
  position: relative;
  top: 50px;
  height: 4px;
  margin: auto;
  width: 70%;
}

// Registration Issue
div.issue.checkbox {
  font-size: 12px;
}
</style>
