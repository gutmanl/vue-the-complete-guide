<template>
    <div>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>${{ rate }}/hour</h3>
        </base-card>
    </section>
    <section>
        <base-card>
        <header>
            <h2>Interested? Reach out now!</h2>
            <base-button link :to="contactLink">
            Contact
            </base-button>
        </header>
            <router-view></router-view>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area"/>
            <p>{{ description }}</p>
        </base-card>
    </section>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
        },
        areas() {
            return this.selectedCoach.areas;
        },
        rate() {
            return this.selectedCoach.hourlyRate;
        },
        description() {
            return this.selectedCoach.description;
        },
        contactLink() {
            return this.$route.path + '/contact';
        }
    },
    data() {
        return {
            selectedCoach: null
        }
    },
    created() {
        this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id);
    },

}
</script>