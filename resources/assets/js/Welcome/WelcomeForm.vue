<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 tos-form">
                <div class="panel panel-default form-wrapper">
                    <div id="heading-description" class="description heading">
                        i-Connect is a Self-Management Application for a smart phone or 
                        tablet. iConnect allows School-based Mentors and other individuals 
                        to set goals and monitor academic engagement and
                        social/behavioral growth of a student ages 5-25. For additional
                        information please go to iConnect.Ku.edu.
                    </div>
                    <form class="form-horizontal" action="/registration" method="GET">
                        <div class="form-group">
                            <div class="col-sm-offset-1  col-sm-10">
                                <div class="checkbox">
                                    <input type="checkbox" v-model="checkList" value="check1">
                                    <label class="description">
                                        Please acknowledge i-Connect can only be accessed with an internet
                                        connection. Before proceeding, understand your students must have access to
                                        internet for the application to operate.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-1  col-sm-10">
                                <div class="checkbox">
                                    <input type="checkbox" v-model="checkList" value="check2">
                                    <label class="description"> 
                                        Please read and accept the <a href="" onclick="window.open('/tos');">Terms and Conditions</a> 
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="text-center">
                                <button type="submit" class="btn btn-default btn-cta" @click="submit($event)">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  data: function() {
    return {
      checkList: []
    };
  },
  methods: {
    submit: function(e) {
      if (this.checkList.length < 2) {

        let check1 = true, check2 = true;

        this.checkList.forEach(element => {
            switch (element) {
                case 'check1':
                    check1 = false;
                    break;
                case 'check2':
                    check2 = false;
                    break;
            }
        });

        if(check1) {
            this.$toasted.show("Please acknowledge i-Connect can only be accessed with an internet connection.", {
                theme: "outline",
                position: "top-center",
                duration: 3000,
            });
        } else if(check2) {
            this.$toasted.show("Please read and accept the Terms and Conditions", {
                theme: "outline",
                position: "top-center",
                duration: 3000,
            });
        }

        e.preventDefault();
      } else {
      }
    }
  }
};
</script>