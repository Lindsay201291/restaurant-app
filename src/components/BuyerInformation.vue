<template>
    <v-container>
        <v-row class="text-center">      
        <v-col class="mb-4">
            <h2 class="display-2 font-weight-bold mb-3">
            Buyer Information
            </h2>       
        </v-col>        
        </v-row>

        <v-row class="text-center">
            <v-col cols="12" class="offset">
                <v-select
                v-model="select"
                :hint="`${select.state}, ${select.abbr}`"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="Select"
                persistent-hint
                return-object
                single-line
                @input="getSelectedOption"
                ></v-select>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-data-table v-if="purchaseHistory.length > 0"
                :headers="headersForPH"
                :items="purchaseHistory"
                :items-per-page="5">
                <template v-slot:[`item.purchaseList`]="{ item }">
                    <ul v-for="purchase in item.purchases" :key="purchase.ip">
                        <li>Date: {{formatDate(purchase.date*1000)}}</li>
                        <li>IP: {{purchase.ip}}</li>
                        <p>Products:</p>
                        <ul v-for="product in purchase.includes" :key="product.price">
                              <li>{{product.name}} ${{product.price}}</li>
                        </ul>
                    </ul>
                </template>
            </v-data-table>
        </v-row>

        <v-row justify="center">
            <v-data-table v-if="buyersWithTheSameIp.length > 0"
                :headers="headersForIP"
                :items="buyersWithTheSameIp"
                :items-per-page="5">
                <!-- <template v-slot:[`item.ipList`]="{ item }">
                    <ul v-for="i in item.c" :key="i.ip">
                        <li>{{i.ip}}</li>
                    </ul>
                </template> -->
            </v-data-table>
        </v-row>

        <v-row justify="center">
            <v-data-table v-if="productRecomendations.length > 0"
                :headers="headersForPR"
                :items="productRecomendations"
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
    name: 'BuyerInformation',
    mounted(){
      this.id = this.$route.params.uid;
      this.getPurchaseHistory();
      /* console.log(this.$route);
      console.log(this.id); */
    },
    data(){
      return {
        id: null,
        select: { state: 'Purchase History', abbr: 'PH' },
        items: [
          { state: 'Purchase history', abbr: 'PH' },
          { state: 'Other buyers using the same IP', abbr: 'IP' },
          { state: 'Product recommendations', abbr: 'PR' },
        ],
        purchaseHistory: {},
        buyersWithTheSameIp: {},
        productRecomendations: {},
        headersForPH: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Age', value: 'age' },
          { text: 'Purchases', value: 'purchases.length' },
          { text: '', value: 'purchaseList', sortable: false }
        ],
        headersForIP: [
          {
            text: 'Buyer',
            align: 'start',
            sortable: false,
            value: 'customer.name',
          },
          // { text: 'IP', value: 'ipList', sortable: false }
          { text: 'IP', value: 'customer.c[0].ip', sortable: false }
        ],
        headersForPR: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'customer.name',
          },
          { text: 'Products', value: 'productList', sortable: false }
        ],
      }
    },
    methods:{
      getSelectedOption(){
          this.purchaseHistory = {};
          this.buyersWithTheSameIp = {};
          this.productRecomendations = {};

          if (this.select.abbr == 'PH') {
              this.getPurchaseHistory();
          } else if (this.select.abbr == 'IP') {
              this.getBuyersWithTheSameIp();
          } else if (this.select.abbr == 'PR') {
              this.getProductRecomendations();
          }
          // console.log(this.select.abbr);
      },
        getPurchaseHistory() {
            axios.get('http://localhost:3000/buyer/'+this.id+'/purchase-history')
            .then(r => {
                this.purchaseHistory = r.data.purchase_history;
            })
            .catch(function(error){
                console.log(error);
            });
        },
        getBuyersWithTheSameIp() {
            axios.get('http://localhost:3000/buyer/'+this.id+'/same-ip')
            .then(r => {
                this.buyersWithTheSameIp = r.data.q;
            })
            .catch(function(error){
                console.log(error);
            });
        },
        getProductRecomendations() {
            axios.get('http://localhost:3000/buyer/'+this.id+'/product-recomendations')
            .then(r => {
                this.productRecomendations = r.data.q;
            })
            .catch(function(error){
                console.log(error);
            });
        },
        formatDate(timestamp) {
            var date = new Date(timestamp);
            var dateAsStr = date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear();
          return dateAsStr;
        }
    }
}
</script>