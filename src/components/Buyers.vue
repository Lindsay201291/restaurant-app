<template>
    <v-container>
    <v-row class="text-center">      
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          Buyers List
        </h2>       
      </v-col>        
    </v-row>
 
    <v-row class="text-center">
    <v-col cols="12">
        <v-simple-table fixed-header class="elevation-3">
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-center">ID</th>
            <th class="text-center">Name</th>
            <th class="text-center">Age</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="buyer in buyers" :key="buyer.id">
                <td>{{buyer.id}}</td>
                <td>{{buyer.name}}</td>
                <td>{{buyer.age}}</td>
                <td><v-btn :to="{name:'BuyerInformation'}" class="mx-2" fab dark color="indigo">
         <v-icon dark>mdi-eye</v-icon>
       </v-btn></td>
            </tr>
         </tbody>   
        </template>
        </v-simple-table>
    </v-col>
    </v-row>
    </v-container>
</template>

<script>
// import axios from 'axios';
export default {
    name:'Buyers',
    mounted(){
        this.getBuyers();
    },
    data(){
        return{            
            dialog:false,
            buyers:null,
            id:null
        }
    },
    methods:{
        getBuyers(){
            /* axios.get('https://kqxty15mpg.execute-api.us-east-1.amazonaws.com/buyers')
            .then(r => {
                this.buyers = r.data;
                console.log(this.buyers);
            })
            .catch(function(error){
                console.log(error);
            }) */
            this.buyers = [{"id":"2035320a","name":"Pliam","age":56},
            {"id":"2fbd258","name":"Boudreaux","age":62},
            {"id":"ce9e1bf3","name":"Janna","age":35},
            {"id":"f36ebe96","name":"Whale","age":24}]
        }
    }
}
</script>