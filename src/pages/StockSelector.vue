<template>
    <div class="content">
        <div class="container-fluid">

            <card id="s-selector" style="padding: 20px; border-radius: 5px">
                <template slot="header">
                    <h4 class="card-title">Stock Screener</h4>
                    <p class="card-category">Select stock filteration criteria</p>
                    <br>
                </template>
                <div class="row">
                    <div class="col-md-4" v-for="(item, index) in options">
                        <label for="" v-if="item.type === 'select'">{{ item.name }}</label>
                        <b-form-select v-if="item.type === 'select'">
                            <b-form-select-option v-for="(opt, idx) in item.values" value="null">{{ opt }}</b-form-select-option>
                        </b-form-select>
                        
                        <div class="row" v-else-if="item.type === 'range'">
                            <div class="col-md-9" style="margin-top: 2vw">
                                <label for="range-2">Example range with step value</label>
                                <b-form-input id="range-2" 
                                              v-model="item.position" 
                                              type="range" 
                                              :min="item.low"
                                              :max="item.high"
                                              step="0.2"></b-form-input>
                            </div>
                            <div class="col-md-3">
                                <b-badge variant="info"
                                    style="
                                            margin-left: 1.5vw; 
                                            margin-top: 3.5vw; 
                                            padding: 7px;
                                            font-size: 15px;"
                                    class="align-self-end">
                                    {{ item.position }}
                            </b-badge>
                            </div>
                        </div>
                    </div>
                </div>
            </card>
            <!-- <card id="s-selector" style="padding: 20px; border-radius: 5px">
                <template slot="header">
                    <h4 class="card-title">Stock Screener</h4>
                    <p class="card-category">Select stock filteration criteria</p>
                    <br>
                </template>
                <div class="row">
                    <div class="col-md-4" v-for="(x, key) in options" style="margin-bottom: 15px">
                        <label for="">{{ key }}</label>
                        <b-form-select v-model="selected" class="mb-3">
                            <b-form-select-option v-for="opt in x" value="null">{{ opt }}</b-form-select-option>
                        </b-form-select>
                        <div class="row">
                            <div class="col-md-9">
                                <label for="range-2">Example range with step value</label>
                                <b-form-input id="range-2" v-model="value" type="range" min="0" max="5" step="0.2"></b-form-input>
                            </div>
                            <div class="col-md-3">
                                <div style="margin-left: 3vw;" class="align-self-end">{{ value }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>    
                <button type="button" 
                          class="btn btn-primary" 
                          style="margin: 15px 0 0 16px;"
                          @click="PostFormData()">
                          <i class="fa fa-usb" aria-hidden="true" style="margin: 0 10px 0 5px;"></i>
                          Post Data
                </button>
                
            </card> -->
            <card id="table-section" class="strpied-tabled-with-hover"
                    body-classes="table-full-width table-responsive"
                    style="padding: 20px; border-radius: 5px"
            >
                <template slot="header">
                    <h4 class="card-title">Top stocks</h4>
                    <p class="card-category">Stocks selected based on the criteria provided</p>
                    <br>
                    <br>
                </template>
                <l-table class="table-hover table-striped table-md"
                        :columns="table1.columns"
                        :data="table1.data"
                        :tableControls="true">
                </l-table>
            </card>
        </div>
    </div>
</template>
  
<script setup>
import axios from 'axios'
import Card from 'src/components/Cards/Card.vue'
import LTable from 'src/components/Table.vue'

import { ref, onMounted } from 'vue';

const url = "http://localhost:5050/api"
const data = {
                'roe': null,
                'sma': null,
                'avg_ret': null,
                'type': null
             }

const value = ref(0)
const selected = ref()

const tableColumns = ['Id', 'Symbol', 'Market Cap', 'P/E', 'P/B']
const tableData = [
                    {
                        id: 1,
                        symbol: 'AAPL',
                        'market cap': '3,600 Cr',
                        'p/e': 53.5,
                        'p/b': 'Oud-Turnhout'
                    },
                    {
                        id: 2,
                        symbol: 'GOOG',
                        'market cap': '23,789 Cr',
                        'p/e': 21.5,
                        'p/b': 'Sinaai-Waas'
                    },
                    {
                        id: 3,
                        symbol: 'TCS',
                        'market cap': '56,142 Cr',
                        'p/e': 12.4,
                        'p/b': 'Baileux'
                    },
                    {
                        id: 4,
                        symbol: 'RGL',
                        'market cap': '38,735 Cr',
                        'p/e': 10.5,
                        'p/b': 'Overland Park'
                    },
                    {
                        id: 5,
                        symbol: 'AAB',
                        'market cap': '63,542 Cr',
                        'p/e': 11.3,
                        'p/b': 'Feldkirchen in Kärnten'
}]

const options = ref()

onMounted(() =>{
    axios.post(url + '/fetch_form_options').then(response => {
        console.log(response)
        options.value = response.data
    })
})

const return_options = (screener) => {
        return options.screener
}
const table1 = 
                {
                    columns: [...tableColumns],
                    data: [...tableData]
                }
const table2 = 
                {
                    columns: [...tableColumns],
                    data: [...tableData]
                }

const captureInput = (k, v) => {
    data[k] = v
    console.log(data)
}

const PostFormData = () => {
                        console.log("I am inside PostFormData", data)
                        axios.post(url + '/fetch_selected_stocks', {'criteria': data}).then(response => {
                        console.log('bhej diya')
                        })
                    }

</script>
<style>
    #s-selector label {
        color: #000;
        font-weight: 500;
    }

    #s-selector .card-title {
        color: #0e6dfb
    }
 
    #s-selector .card-category {
        color: #9A9A9A
    } 
</style>