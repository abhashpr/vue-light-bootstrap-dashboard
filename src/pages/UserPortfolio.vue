<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12 col-md-12">
          <div>
            <b-tabs content-class="mt-3">
              <b-tab title="Trades(1)" active>
                <card class="strpied-tabled-with-hover" 
                      body-classes="table-full-width table-responsive">
                  <l-table class="table-hover table-md"
                      :columns="columns"
                      :data="portfolio_data"
                      :highlight="col"
                      style="padding: 0">
                  </l-table>
                  <button type="button" 
                          class="btn btn-danger" 
                          style="margin: 15px 0 0 16px;"
                          @click="SyncPortfolioValue()">
                    <i class="fa fa-refresh" style="margin: 0 10px 0 5px;"></i>Update Now
                  </button>
                  <!-- <span style="margin: 10px 0 0 30px; font-weight: 600;">{{ portfolio_value }}</span> -->
                </card>
              </b-tab>
              <b-tab title="Orders (0)"><p>I'm the second tab</p></b-tab>
              <b-tab title="Positions (1)"><p>I'm a disabled tab!</p></b-tab>
              <b-tab title="Exposure (2)"><p>I'm a disabled tab!</p></b-tab>
              <b-tab title="Activity (362)"><p>I'm a disabled tab!</p></b-tab>
              <b-tab title="News"><p>I'm a disabled tab!</p></b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- <BarChart></BarChart> -->
        <div class="col-md-5">
          <card>
            <template slot="header">
              <h3 class="title" style="margin-left: 15px;">Tasks</h3>
              <p class="category" style="margin-left: 15px;">Backend development</p>
            </template>
            <l-table :data="tableData.data"
                     :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card>

        </div>
        <div class="col-md-7">
          <chart-card
              :chart-data="barChart.data"
              :chart-options="barChart.options"
              :chart-responsive-options="barChart.responsiveOptions"
              chart-type="Bar">
              <template slot="header">
                <h4 class="card-title">2014 Sales</h4>
                <p class="card-category">All products including Taxes</p>
              </template>
              <template slot="footer">
                <div class="legend">
                  <i class="fa fa-circle text-info"></i> Tesla Model S
                  <i class="fa fa-circle text-danger"></i> BMW 5 Series
                </div>
                <hr>
                <div class="stats">
                  <i class="fa fa-check"></i> Data information certified
                </div>
              </template>
          </chart-card>
        </div>


      </div>
      
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Table on Plain Background</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table2.columns"
                       :data="table2.data">
              </l-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  // import BarChart from 'src/components/Graphs/BarChart.vue'
  import axios from 'axios'

  import { ref } from 'vue'

  const portfolio_value = ref(0);
  const portfolio_data = ref();
  const syncBackend = ref(false);
  const col = ref('PROFIT');
  const url = "http://localhost:5050/api"
  
  const barChart = ref({
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: 
                    [
                        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
                    ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        })
  
  const tableData = ref({
          data: [
            {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
            {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
            {
              title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              checked: true
            },
            {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
            // {title: 'Read "Following makes Medium better"', checked: false},
            // {title: 'Unfollow 5 enemies from twitter', checked: false}
          ]
        })
  const SyncPortfolioValue = () => {
    console.log("clicked !")
    // syncBackend = !syncBackend
    // while (syncBackend) {
      axios.post(url + '/portfolio').then(response => {
        portfolio_value.value = response.data.value
        portfolio_data.value = [{
          type: 2,
          ticket: 'Normal',
          market: 'INR 36,73800',
          units: '206',
          sl: 'Oud-Turnhout',
          tp: 'T/P',
          ts: 'T/S',
          price: 209.34,
          current: 0,
          profit: portfolio_value.value,
          profit_percentage: ''
        }]
      })
    // }
  }
  
  const columns = ['TYPE', 'TICKET', 'MARKET', 'UNITS', 'SL', 'TP', 'TS', 'PRICE', 'CURRENT', 'PROFIT', 'PROFIT_PERCENTAGE']
  portfolio_data.value = [{
    type: 2,
    ticket: 'Normal',
    market: 'INR 36,73800',
    units: '206',
    sl: 'Oud-Turnhout',
    tp: 'T/P',
    ts: 'T/S',
    price: 209.34,
    current: 0,
    profit: portfolio_value.value,
    profit_percentage: ''
  }]

  const table2 = ref({
          columns: ['ID', 'NAME', 'SALARY', 'COUNTRY', 'CITY'],
          data: [{
                    id: 1,
                    name: 'Dakota Rice',
                    salary: '$36.738',
                    country: 'Niger',
                    city: 'Oud-Turnhout'
                  },
                  {
                    id: 2,
                    name: 'Minerva Hooper',
                    salary: '$23,789',
                    country: 'Curaçao',
                    city: 'Sinaai-Waas'
                  },
                  {
                    id: 3,
                    name: 'Sage Rodriguez',
                    salary: '$56,142',
                    country: 'Netherlands',
                    city: 'Baileux'
                  },
                  {
                    id: 4,
                    name: 'Philip Chaney',
                    salary: '$38,735',
                    country: 'Korea, South',
                    city: 'Overland Park'
                  },
                  {
                    id: 5,
                    name: 'Doris Greene',
                    salary: '$63,542',
                    country: 'Malawi',
                    city: 'Feldkirchen in Kärnten'
                  }]
  })
</script>
<style>
.nav-item a {
  color: #000;
  font-weight: 500;
}
</style>
