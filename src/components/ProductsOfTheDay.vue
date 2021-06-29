<template>
    <v-container>
        <v-row justify="center">
        <v-date-picker
            v-model="date"
            @click:date="getProductsOfTheDay">
            </v-date-picker>
        </v-row>

        <v-row justify="center">
            <v-data-table v-if="products.length > 0"
                :headers="headers"
                :items="products"
                :items-per-page="5">
            </v-data-table>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'ProductsOfTheDay',
    data: () => ({
      timestamp: null,
      headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Price ($)', value: 'price' },
        ],
      products: {},
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),

    methods: {
      getProductsOfTheDay (date) {
        date = date +":00:00:00";
        console.log(`Selected date: ${date}`);
        this.timestamp = Date.parse(date)/1000;
        console.log("Timestamp "+this.timestamp);

        axios.get('http://localhost:3000/product/date?date='+this.timestamp)
                .then(r => {
                    this.products = r.data.q;
                })
                .catch(function(error){
                    console.log(error);
                })
      },
    },
  }
</script>