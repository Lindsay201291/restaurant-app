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
                <!-- <v-simple-table fixed-header class="elevation-3">
                    <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Age</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody v-if="displayedBuyers.length > 0">
                            <tr v-for="buyer in displayedBuyers" :key="buyer.uid">
                                <td>{{buyer.uid}}</td>
                                <td>{{buyer.name}}</td>
                                <td>{{buyer.age}}</td>
                                <td><v-btn v-if="buyer && buyer.uid" 
                                    :to="{name:'BuyerInformation', 
                                    params: {uid: buyer.uid}}" 
                                    class="mx-2" fab dark color="indigo">
                                    <v-icon dark>mdi-eye</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table> -->
                <!-- <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <div class="page-item">
                            <v-btn type="button" class="page-link" v-if="page != 1" 
                            @click="page--"> 
                                Previous 
                            </v-btn>
                        </div>
                        <div class="page-item">
                            <v-btn type="button" class="page-link" 
                            v-for="pageNumber in pages.slice(page-1, page+5)" 
                            :key="pageNumber.uid" 
                            @click="page = pageNumber"> {{pageNumber}}
                            </v-btn>
                        </div>
                            <div class="page-item">
                            <v-btn type="button" @click="page++" v-if="page < pages.length" 
                            class="page-link"> Next </v-btn>
                        </div>
                    </ul>
                </nav> -->
                <v-data-table v-if="buyers.length > 0"
                :headers="headers"
                :items="buyers"
                :items-per-page="5">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn @click="getInformation(item)" 
                    class="mx-2" fab dark color="indigo">
                        <v-icon dark>mdi-eye</v-icon>
                    </v-btn>
                </template>
                </v-data-table>
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
                // buyers:null,
                uid: null,
                buyers : {},
                /* page: 1,
                perPage: 9,
                pages: [], */
                headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'uid',
                },
                { text: 'Name', value: 'name' },
                { text: 'Age', value: 'age' },
                { text: '', value: 'actions', sortable: false }
                ],
            }
        },
        methods:{
            getBuyers(){
                axios.get('http://localhost:3000/buyers')
                .then(r => {
                    this.buyers = r.data.buyers;
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            getInformation(item){
                this.$router.push({
                    name: 'BuyerInformation',
                    params: {
                        uid: item.uid
                    }
                });
            },
            /* setPages() {
                let numberOfPages = Math.ceil(this.buyers.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate(buyers) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  buyers.slice(from, to);
            } */
        },
        /* computed: {
            displayedBuyers () {
            return this.paginate(this.buyers);
            }
        },
        watch: {
        buyers() {
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
        } */
    }
</script>