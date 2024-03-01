<template>
    <div>
    <BaseDialog :show="!!error" title="Error!" @close="errorAcknowledged">
        {{ error }}
    </BaseDialog>
    <section>
        <base-card>
            <header>
                <h2></h2>
            </header>
            <BaseSpinner v-if="isLoading" />
            <ul v-else-if="hasRequests">
                <RequestItem v-for="request in receivedRequests" :key="request.id"
                :email="request.userEmail" :message="request.message" />
            </ul>
            <h3 v-else>No requests received so far</h3>
        </base-card>
    </section>
    </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';

export default {
    components: {
    RequestItem,
    BaseSpinner,
    BaseDialog
},
    data() {
        return {
            isLoading: false,
            error: null
        };
    },
    computed: {
        receivedRequests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/fetchRequests');
            }
            catch(error) {
                this.error = error.message || "Unknown error! Please try again later.";
            } finally {
                this.isLoading = false;
            }
        },
        errorAcknowledged() {
            this.error = null;
        }
    },
    created() {
        this.loadRequests();
    }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>