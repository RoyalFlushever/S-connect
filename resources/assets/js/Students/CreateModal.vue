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
								<a class="persistant-disabled" href="#stepper-step-2" data-toggle="tab" aria-controls="stepper-step-2" role="tab" title="Step 2">
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
							<div class="fade in active" role="tabpanel" id="stepper-step-1">
								<v-container grid-list-md text-xs-center>
									<v-layout column>
										<v-layout row>
											<input type="text" placeholder="First name">
											<input type="text" placeholder="Last name">
										</v-layout>
										<v-layout row style="height: 35px;">
											<input type="text" placeholder="Midle name (Optional)">
											<date-picker
												lang="en"
												v-model="birthdate"
											></date-picker>
										</v-layout>
										<v-layout row wrap>
											<label><input type="radio">Male</label>
											<label><input type="radio">Femalw</label>
											<label>
												Ethnicity(optional)
												<select name="" id="">
													<option>Select</option>
												</select>
											</label>
											<label>
												IEP(optional)
												<select name="" id="">
													<option>Select</option>
												</select>
											</label>
										</v-layout>
										<v-flex xs12>
											<select name="" id="">
												<option value="">Designate Mentor</option>
											</select>
										</v-flex>
										<v-flex xs12>
											<input type="text" placeholder="iConnect UserName">
										</v-flex>
										<v-flex xs12>
											<input type="text" placeholder="iConnect Password">
										</v-flex>
										<v-layout justify-center>
											<button class="btn btn-lg btn-cta btn-blue" @click.prevent="regUser()">Next Step 2</button>
										</v-layout>
									</v-layout>
								</v-container>
							</div>
							<div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
								2
							</div>
							<div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
								3
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
import axios from "axios";
import DatePicker from 'vue2-datepicker'
	
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
			birthdate: "",
		};
	},
  methods: {
    close: function() {
      this.$emit("close");
    },
    submit: function() {
      this.$emit("submit");
    }
  }
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
