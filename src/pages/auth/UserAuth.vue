<template>
    <div>
    <base-dialog fixed :show="isLoading" title="Loading...">
    <p>Authenticating...</p>
    <base-spinner />
    </base-dialog>
    <base-dialog title="Error!" :show="!!error" @close="acknowledgeError">
    <p>
        {{ error }}
    </p>
    </base-dialog>
    <base-card>
        <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">
                E-Mail
            </label>
            <input type="email" id="email" v-model.trim="email"/>
        </div>
        <div class="form-control">
            <label for="passwprd">
                Password
            </label>
            <input type="password" id="password" v-model.trim="password"/>
        </div>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
            {{ switchModeButtonCaption }}
        </base-button>
        </form>
    </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
    },
    computed: {
        submitButtonCaption() {
            return this.mode === 'login' ? "Log in" : "Sign up";
        },
        switchModeButtonCaption() {
            return this.mode === 'login' ? "No account yet? Sign up instead" : "Already have an account? Log in instead"
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if(this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;

            try {
                if(this.mode === 'login') {
                    await this.$store.dispatch('logIn', {
                    email: this.email,
                    password: this.password
                    });
                }
                else {
                    await this.$store.dispatch('signUp', {
                    email: this.email,
                    password: this.password
                    });
                }
                const redirectUrl = '/' + (this.$route.query.redirect || "coaches");
                this.$router.replace(redirectUrl);
            }
            catch(error) {
                this.error = error.message || "Failed to execute login/signup! Please try again later."
            }
            finally {
                this.isLoading = false;
            }
            
        },
        switchAuthMode() {
            if(this.mode === 'login') {
                this.mode = 'signup';
            }
            else {
                this.mode = 'login';
            }
        },
        acknowledgeError() {
            this.error = null;
        }
    }
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>