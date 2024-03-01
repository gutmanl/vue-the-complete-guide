<template>
    <!-- No v-if because BaseDialog wants a show prop, and !! to convert to boolean -->
    <BaseDialog :show="!!error" title="Error!" @close="errorAcknowledged">
        <p> {{ error }}</p>
    </BaseDialog>
    <section>
        <coach-filter @change-filter="setFilters" />
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button>
            </div>
            <BaseSpinner v-if="isLoading" />
            <ul v-else-if="hasCoaches">
                <CoachItem v-for="coach in filteredCoaches" :key="coach.id"
                :id="coach.id"
                :firstName="coach.firstName"
                :lastName="coach.lastName"
                :rate="coach.hourlyRate"
                :areas="coach.areas" />
            </ul>
            <h3 v-else>No coaches in system</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) return true;
                if (this.activeFilters.backend && coach.areas.includes('backend')) return true;
                if (this.activeFilters.career && coach.areas.includes('career')) return true;
                return false;
            })
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        }
    },
    created() {
        this.loadCoaches();
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches');
            } catch(error) {
                this.error = error.message || "Unknown error! Please try again later.";
            } finally {
                this.isLoading = false;
            }
        },
        errorAcknowledged() {
            this.error = null;
        }
    }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>