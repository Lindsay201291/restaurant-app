<template>
    <v-container>
        <v-row justify="center">
        <v-date-picker
            v-model="date"
            @click:date="getTransactionsOfTheDay">
            </v-date-picker>
        </v-row>

        <v-row justify="center">
            <v-data-table v-if="transactions.length > 0"
                :headers="headers"
                :items="transactions"
                :items-per-page="5">
                <template v-slot:[`item.productList`]="{ item }">
                    <ul v-for="product in item.includes" :key="product.uid">
                      <li>{{product.name}}</li>
                    </ul>
                </template>
            </v-data-table>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'TransactionsOfTheDay',
    data: () => ({
      timestamp: null,
      headers: [
          {
            text: 'Customer',
            align: 'start',
            sortable: false,
            value: 'customer.name',
          },
          { text: 'Ip', value: 'ip' },
          { text: 'Device', value: 'device' },
          { text: 'Products', value: 'includes.length' },
          { text: '', value: 'productList', sortable: false }
        ],
      transactions: {},
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),

    methods: {
      getTransactionsOfTheDay (date) {
        date = date +":21:56:46";
        console.log(`Selected date: ${date}`);
        this.timestamp = Date.parse(date)/1000;
        console.log("Timestamp "+this.timestamp);

        axios.get('http://localhost:3000/transaction/date?date='+this.timestamp)
                .then(r => {
                    this.transactions = r.data.transactions_of_the_day;
                })
                .catch(function(error){
                    console.log(error);
                })
      },
    },
  }
</script>