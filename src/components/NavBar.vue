<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" @click="redirect('home')">
            <img :src="require('@/assets/logo.png')"
            alt="" width="60" height="60" class="d-inline-block align-text-top">
            </a>
            <a class="navbar-brand" @click="redirect('home')" style="color: white;">
                Pokedex
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" @click="redirect('home')">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item search-bar" @submit.prevent="searchPokemon">
                    <form>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
                    </form>
                </li>
                <li v-if="user && !loading" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img :src="computedPhotoURL" alt="Profile" class="profile-img">
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" @click="redirect('profile')">Profile</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" @click="logout">Log Out</a></li>
                    </ul>
                </li>
                <li v-if="!user && !loading" class="nav-item dropdown">
                    <button class="btn btn-light" @click="login">Sign In</button>
                </li>
            </ul>
            </div>
        </div>
        </nav>
</template>

<script>

import { mapState, mapActions } from 'vuex';
export default {
  name: 'NavBar',
  data() {
    return {
      search: '',
    };
  },
  methods: {
		...mapActions(['signIn', 'signOut']),
		async login() {
			this.signIn()
		},
		async logout() {
			this.signOut()
			this.redirect('home')
		},
		redirect(componentName, props={}) {
			this.$router.push({ name: componentName, props })
		},
        searchPokemon() {
            this.$router.push({ name: 'pokemon', params: { id: this.search }})
        }
	},
	computed: {
		...mapState(['user', 'loading']),
        computedPhotoURL() {
            return this.user.photoURL
        }
	},
};

</script>

<style>

.navbar-nav {
    width: 100%;
}

.container-fluid {
    font-family: 'Poppins';
}

.nav-item {
    cursor: pointer;
    font-family: 'Poppins';
    font-size: 1.5rem;
    font-weight: 600;
    align-items: center;
    display: flex;
}

.navbar-brand {
    cursor: pointer;
    color: white;
    font-size: 2.5rem !important; 
    font-weight: 600;
    font-family: 'Poppins';
    cursor: pointer;
}

.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
}

.dropdown {
    margin-left: auto;
    margin-right: 2rem;
}

.dropdown-menu {
    left: -50% !important;
}


.profile-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

@media screen and (max-width: 991px) {

    .search-bar {
        margin-left: 0;
    }   

    .dropdown {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 0;
        margin-right: auto;
        margin-top: 1rem;
    }   

    .dropdown-menu {
        left: 0 !important;
        position: absolute !important;
    }
}
</style>
