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
    <v-col cols="12" class="offset">
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
            <tr v-for="buyer in displayedBuyers" :key="buyer.id">
                <td>{{buyer.uid}}</td>
                <td>{{buyer.name}}</td>
                <td>{{buyer.age}}</td>
                <td><v-btn :to="{name:'BuyerInformation', params:{id:buyer.id}}" class="mx-2" fab dark color="indigo">
         <v-icon dark>mdi-eye</v-icon>
       </v-btn></td>
            </tr>
         </tbody>   
        </template>
        </v-simple-table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <div class="page-item">
                <v-btn type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </v-btn>
                </div>
                <div class="page-item">
                <v-btn type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber.id" @click="page = pageNumber"> {{pageNumber}} </v-btn>
                </div>
                <div class="page-item">
                <v-btn type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </v-btn>
                </div>
            </ul>
        </nav>
    </v-col>
    </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name:'Buyers',
    mounted(){
        this.getBuyers();
    },
    data(){
        return{            
            dialog:false,
            // buyers:null,
            id:null,
            buyers : [''],
            page: 1,
            perPage: 9,
            pages: [],  
        }
    },
    methods:{
        getBuyers(){
            axios.get('http://localhost:3000/buyers')
            .then(r => {
                this.buyers = r.data.buyers;
                console.log(this.buyers);
            })
            .catch(function(error){
                console.log(error);
            })
            /* this.buyers = [{"id":"2035320a","name":"Pliam","age":56},
            {"id":"2fbd258","name":"Boudreaux","age":62},
            {"id":"ce9e1bf3","name":"Janna","age":35},
            {"id":"f36ebe96","name":"Whale","age":24}] */
        },
        setPages () {
            let numberOfPages = Math.ceil(this.buyers.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (buyers) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  buyers.slice(from, to);
        }
    },
    computed: {
        displayedBuyers () {
        return this.paginate(this.buyers);
        }
    },
    watch: {
    buyers () {
        this.setPages();
        }
    },
    created(){
        this.getBuyers();
    },
    filters: {
        trimWords(value){
        return value.split(" ").splice(0,20).join(" ") + '...';
        }
    }
}
</script>