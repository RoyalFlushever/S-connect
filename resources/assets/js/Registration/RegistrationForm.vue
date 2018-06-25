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
                                <button type="button" class="btn btn-default btn-cta">YES</button>
                                <button type="button" class="btn btn-default btn-cta btn-red">NO</button>
                            </div>
                            <a href="#" class="btn btn-info btn-lg">
                                <span class="glyphicon glyphicon-arrow-right"></span> Step 2/3
                            </a>
                        </div>
                        <div class="tab-pane fade" role="tabpanel" id="stepper-step-2">
                            <div class="action">
                                <div class="row">
                                    <div class="col-md-4 role">
                                        <div class="panel panel-default select-pannel gray-border">
                                            <div class="pannel-body select-pannel-body gray-border">
                                                <h3>FACLILTATOR</h3>
                                                <p>I will be mananging several Schools, Teachers/Mentors,
                                                    and Studnents in my district.
                                                </p>
                                            </div>
                                            <button type="button" class="btn btn-default btn-cta">Select</button>
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
                                            <button type="button" class="btn btn-default btn-cta">Select</button>
                                        </div>
                                    </div>
                                    <div class="col-md-4 role">
                                        <div class="panel panel-default select-pannel gray-border">
                                            <div class="pannel-body select-pannel-body gray-border">
                                                <h3>SCHOOL MENTOR</h3>
                                                <p>I will be mananging several Studnents in my school.
                                                </p>
                                            </div>
                                            <button type="button" class="btn btn-default btn-cta">Select</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="btn btn-info btn-lg">
                                <span class="glyphicon glyphicon-arrow-right"></span> Step 3/3
                            </a>
                        </div>
                        <div class="tab-pane fade" role="tabpanel" id="stepper-step-3">
                            <div class="action gray-border">
                                <div class="personal-info form-group row">
                                    <div class="col-xs-3">
                                        <input id="first_name" type="text" class="form-control" name="first_name" placeholder="First Name" autocomplete="given-name">
                                    </div>
                                    <div class="col-xs-3">
                                        <input id="last_name" type="text" class="form-control" name="last_name" placeholder="Last Name" autocomplete="family-name">
                                    </div>
                                    <div class="col-xs-6">
                                        <input id="school_email" type="email" class="form-control" name="email" placeholder="School Email Address" autocomplete="email" required>
                                    </div>
                                </div>
                                <div class="location form-group row">
                                    <div class="col-xs-3"><select name="state" id="state" class="form-control" autocomplete="address-level1" ><option value="state">State</option></select></div>
                                    <div class="col-xs-3"><select name="county" id="county" class="form-control" autocomplete="address-level1"><option value="county">County</option></select></div>
                                    <div class="col-xs-3"><select name="district" id="district" class="form-control" autocomplete="address-level2" ><option value="district">District</option></select></div>
                                    <div class="col-xs-3"><select name="school" id="school" class="form-control"><option value="school">School</option></select></div>
                                </div>
                                <div class="query form-group row">
                                    <div class="col-xs-10 col-xs-offset-1">
                                        <select name="site_facilitator" id="site_facilitator" class="form-control">
                                            <option value="">Select Site Facilitator</option>
                                        </select>
                                    </div>
                                    <div class="col-xs-10 col-xs-offset-1">
                                        <select name="referral_source" id="referral_source" class="form-control">
                                            <option value="">How did you hear about I-Connect</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button href="#" class="btn btn-lg btn-cta registration-btn"  id="show-modal" @click="showModal = true">
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
                                    Account Submitted An email has been sent to the email provided. 
                                    Please log in to your email and verify your account to begin using I-Connect. Your email will be
                                    your default username and you will be provided a temporary one-time use password. Once you log in to the 
                                    I-Connect Web page, click on "My Account" to set a new password.
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
                                <div class="col-xs-3"><select name="state" id="state_issue" class="form-control" autocomplete="address-level1" ><option value="state">State</option></select></div>
                                <div class="col-xs-3"><select name="county" id="county_issue" class="form-control" autocomplete="address-level1"><option value="county">County</option></select></div>
                                <div class="col-xs-3"><select name="district" id="district_issue" class="form-control" autocomplete="address-level2" ><option value="district">District</option></select></div>
                                <div class="col-xs-3"><select name="school" id="school_issue" class="form-control"><option value="school">School</option></select></div>
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

import VModal from '../components/VModal.vue';

export default {
    data: function() {
        return {
            showModal: false,
            issueModal: false
        }
    }
}
</script>
<style lang="scss" scoped>

    $iconnect-blue: #0275d8;      // blue - for step button
    $iconnect-middleblue: #2196f3;
    $iconnect-lightblue: #5bc0de;


    $iconnect-green: #5cb85c;     // call to action

    $iconnect-gray: #616161;      // font color
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
        margin:  auto;
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

    #stepper-step-3 .action{
        padding: 25px 30px;
    }

    #site_facilitator {
        margin-bottom: 15px; 
    }

    .stepper .nav-tabs [data-toggle='tab'] {
        width: 25px;
        height: 25px;
        margin: 20px auto;
        border: none;
        padding: 0px;
    }

    .stepper .nav-tabs {
        margin-bottom: 40px;
        border: none;
    }

    .stepper .round-tab {
        border-radius: 50%;
        width:60px;
        height:60px;
        line-height:60px;
        display: inline-block;
        z-index: 2;
        position: absolute;
        left: 0;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }

    .stepper .nav-tabs > li {
        width: 33%;
        position: relative;
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
