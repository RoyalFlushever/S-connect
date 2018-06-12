<template>
    <div>
        <!-- Render a generic username field by default, but some user-forms may use email instead -->
        <div class="form-group" v-if="useEmail">
            <label for="email">Email address</label>
            <input type="email" v-model="username" class="form-control" name="email" id="email" required>
        </div>
        <div class="form-group" v-else>
            <label for="username">Username</label>
            <input type="text" v-model="username" class="form-control" name="username" id="username" required aria-describedby="username-help">
            <span id="username-help" class="help-block">Must contain at least 6 characters, including 1 letter and 1 number</span>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" name="password" id="password" required autocomplete="new-password">
            <div :class='ratingClass'>
                <span>{{passwordRating}}</span>
                <span :class='iconClass' aria-hidden="true"></span>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Username and password registration form fields. The password is also rated based on zxcvbn score.
     */

    import zxcvbn from 'zxcvbn';

    export default {
        created() {
            // Set up non-reactive properties
            this.passwordIndicators = {
                0: { label: 'Very poor'    , textClass: 'text-danger'  },
                1: { label: 'Poor'         , textClass: 'text-danger'  },
                2: { label: 'Satisfactory' , textClass: 'text-warning' },
                3: { label: 'Good'         , textClass: 'text-success' },
                4: { label: 'Excellent'    , textClass: 'text-success' }
            };

            // Set the username value based on an initial value (if provided)
            if (this.oldUsername) {
                this.username = this.oldUsername;
            }
        },

        props: [
            'oldUsername',
            'useEmail'
        ],

        data() {
            return {
                username: '',
                password: ''
            };
        },

        computed: {
            passwordScore() {
                return this.password.length === 0 ? null : zxcvbn(this.password, [ this.username ]).score;
            },

            passwordRating() {
                return this.passwordScore === null ? '' : this.passwordIndicators[this.passwordScore].label;
            },

            ratingClass() {
                return this.passwordScore === null ? '' : this.passwordIndicators[this.passwordScore].textClass;
            },

            iconClass() {
                return this.passwordScore === null ? '' : 'glyphicon glyphicon-lock';
            }
        }
    };
</script>
