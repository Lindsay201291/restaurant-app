<template>
      <v-app>
      <v-navigation-drawer :width="275"
       v-model="drawer"
        absolute
        temporary
        app clipped>
        <v-list>
          <v-list-item :to="{path: '/'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[0] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>                    
           <v-list-item :to="{path: '/buyers'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[1] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Buyers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{path: '/products-of-the-day'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[4] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Products of the Day</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{path: '/buyers-of-the-day'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[2] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Buyers of the Day</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{path: '/transactions-of-the-day'}">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[3] }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Transactions of the Day</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
       <v-system-bar color="deep-purple darken-3"></v-system-bar>      
      <v-app-bar class="deep-purple accent-4 white--text">
      <v-app-bar-nav-icon @click="drawer=true" class="white--text"></v-app-bar-nav-icon>
        <v-toolbar-title>                
        <!-- <v-list-item :to="{path: '/'}">                
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/rapp-logo.png"
          transition="scale-transition"
          width="45"
          height="45"       
          :to="{path: '/'}" 
        />
        </v-list-item> -->
        </v-toolbar-title>
      </v-app-bar>      
      <v-main>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>
      </v-main>  
      </v-card>    
    </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({    
    drawer: false,
    icons: ['home','account-group', 'account-search', 'cash-register', 'shopping-search'],
  }),
};
</script>