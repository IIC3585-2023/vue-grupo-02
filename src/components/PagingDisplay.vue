<template>
    <div class="paging-container">
        <img class="paging-img" :class="{ active: showBackArrow }" :src="imgBackUrl" alt="Paging Image" @click="previousPage">
        <div class="page">{{ page }}</div>
        <img class="paging-img" :class="{ active: showForwardArrow }" :src="imgForwardUrl" alt="Paging Image" @click="nextPage">
    </div>
</template>

<style> 

.paging-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.paging-img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.5rem;
    cursor: pointer;
    background-color: #9fd0cc;
    border-radius: 10px;
    padding: 0.5rem;
}

.paging-img.active {
    background-color: #0fb6a8;
}

.page {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0.5rem;
}


</style>


<script> 
export default {
    name: 'PagingDisplay',
    props: {
        page: {
            type: Number,
            required: true
        },
        maxPages: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            imgBackUrl: 'arrowLeft.png',
            imgForwardUrl: 'arrowRight.png',
        }
    },
    methods: {
        nextPage() {
            if (this.page < this.maxPages) {
                this.$emit('next-page');
            }
        },
        previousPage() {
            if (this.page > 1) {
                this.$emit('previous-page');
            }
        },
    },
    computed: {
        showBackArrow() {
            return this.page > 1;
        },
        showForwardArrow() {
            return this.page < this.maxPages;
        }
    }
}


</script>