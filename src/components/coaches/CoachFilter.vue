<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked v-model="filters.frontend"/>
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked v-model="filters.backend"/>
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked v-model="filters.career"/>
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    methods: {
    },
    watch: {
        filters: {
            handler(value) {
                this.$emit('change-filter', this.filters);
            },
            deep: true
        }
    }
}
</script>

<style scoped>

</style>