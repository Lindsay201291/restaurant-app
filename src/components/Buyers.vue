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
            return {      
                uid: null,
                buyers : {},
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
        methods: {
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
        },
    }
</script>