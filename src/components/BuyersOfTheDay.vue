<template>
    <v-container>
        <v-row justify="center">
        <v-date-picker
            v-model="date"
            @click:date="getBuyersOfTheDay">
            </v-date-picker>
        </v-row>

        <v-row justify="center">
            <v-data-table v-if="buyers.length > 0"
                :headers="headers"
                :items="buyers"
                :items-per-page="5">
            </v-data-table>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'BuyersOfTheDay',
    data: () => ({
      timestamp: null,
      headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Age', value: 'age' },
        ],
      buyers: {},
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),

    methods: {
      getBuyersOfTheDay (date) {
        date = date +":21:56:46";
        console.log(`Selected date: ${date}`);
        this.timestamp = Date.parse(date)/1000;
        console.log("Timestamp "+this.timestamp);

        axios.get('http://localhost:3000/buyer/date?date='+this.timestamp)
                .then(r => {
                    this.buyers = r.data.q;
                })
                .catch(function(error){
                    console.log(error);
                })
      },
    },
  }
</script>