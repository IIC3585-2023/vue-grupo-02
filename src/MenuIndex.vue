<template>
  <div class="index-container">
    <div class="options-container">
      <div class="dropdowns-container">
        <VueMultiselect
          class="dropdowns"
          :options = "sortOptions"
          :show-labels="false"
          placeholder="Ordenar por"
          v-model="selectedSort"
          label="name"
          />

          <VueMultiselect
          class="dropdowns"
          :options = "orderOptions"
          :show-labels="false"
          placeholder="Orden"
          v-model="selectedOrder"
          label="name"
          />
      </div>
      <PagingDisplay :page="page" :maxPages="maxPages" @next-page="nextPage" @previous-page="previousPage"/>
    </div>
  
    <div class="menus-container">
        <MenuCard v-for="menu in menus"
        :key="menu.id"
        :id="menu.id"
        :title="menu.name"
        :price="menu.price"
        @selected="onSelected"
        />
    </div>

    <div class="options-container" v-show="menus.length">
      <PagingDisplay :page="page" :maxPages="maxPages" @next-page="nextPage" @previous-page="previousPage"/>
    </div>
  </div>
  </template>
<style>

.index-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.menus-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.options-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins';
    font-size: 20px;
    font-weight: 600;
}

.dropdowns-container {
    height: 100%;
    width: 100%;
    gap: 2%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 1%;
}

.dropdowns {
    width: 40%;
}

@media screen and (max-width: 999px) {
    .dropdowns {
        margin-bottom: 2%;
    }
}

</style>

<script>
  import MenuCard from '../components/MenuCard.vue';
  import VueMultiselect from 'vue-multiselect'
  import PagingDisplay from '../components/PagingDisplay.vue';
  import TareaApiRequester from '../integrations/apiRequester';
  
  export default {
    name: 'MenuIndex',
    components: {
    MenuCard,
    VueMultiselect,
    PagingDisplay
},
    data() {
      return {
        menus: [],
        sortOptions: [{name: 'Nombre', value: 'name'}, {name: 'Precio', value: 'price'}],
        orderOptions: [{name: 'Ascendente', value: 'asc'}, {name: 'Descendente', value: 'desc'}],
        selectedSort: null,
        selectedOrder: null,
        page: 1,
        maxPages: 1,
        apiRequester: new TareaApiRequester(),
      }
    },
    methods: {
      async getMenus() {
        const sort = this.selectedSort? this.selectedSort.value : null;
        const order = this.selectedOrder? this.selectedOrder.value : null;
        return await this.apiRequester.getMenus(sort, order, this.page);
      },
      async getPages() {
        return await this.apiRequester.getMenusPages();
      },
      onSelected(id) {
        this.$router.push(`/menus/${id}`);
      },
      nextPage() {
        this.page++;
      },
      previousPage() {
        this.page--;
      }
    },
    async mounted() {
      this.menus = await this.getMenus();
      this.maxPages = await this.getPages();
    },
    watch: {
      async selectedSort() {
        this.menus = await this.getMenus();
      },
      async selectedOrder() {
        this.menus = await this.getMenus();
      },
      async page() {
        this.menus = await this.getMenus();
      }
    }
  }
  </script>
  