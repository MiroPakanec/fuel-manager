<template>
  <div :style="{backgroundColor:'white'}">
    <v-layout>
      <v-flex xs10 offset-xs1>
        <v-radio-group v-model="radios" :mandatory="false">
          <v-radio
            :style="{paddingLeft:'10px'}"
            :color="primary"
            label="Tankovanie (v litroch)"
            value="amount"
          ></v-radio>
          <v-radio :style="{paddingLeft:'10px'}" :color="primary" label="Cena (EUR)" value="price"></v-radio>
          <v-radio
            :style="{paddingLeft:'10px'}"
            :color="primary"
            label="Spotreba"
            value="consumption"
          ></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <transition name="slide-toggle">
      <v-layout v-if="showTimeSelection">
        <v-flex>
          <v-layout>
            <v-flex xs10 offset-xs1>
              <div :style="{float:'left'}">
                <v-btn large v-if="group === 'year'" round :color="primary" dark>Rok</v-btn>
                <v-btn large @click="group = 'year'" v-else round outline :color="primary" dark>Rok</v-btn>
              </div>
              <div>
                <v-btn large v-if="group === 'month'" round :color="primary" dark>Mesiac</v-btn>
                <v-btn
                  large
                  @click="group = 'month'"
                  v-else
                  round
                  outline
                  :color="primary"
                  dark
                >Mesiac</v-btn>
              </div>
            </v-flex>
          </v-layout>
          <v-layout v-if="group === 'year'">
            <v-flex xs10 offset-xs1>
              <v-btn small v-if="year === '2019'" round :color="secondary" dark>2019</v-btn>
              <v-btn small @click="year = '2019'" v-else round outline :color="secondary" dark>2019</v-btn>
              <v-btn small v-if="year === '2018'" round :color="secondary" dark>2018</v-btn>
              <v-btn small @click="year = '2018'" v-else round outline :color="secondary" dark>2018</v-btn>
              <v-btn small v-if="year === '2017'" round :color="secondary" dark>2017</v-btn>
              <v-btn small @click="year = '2017'" v-else round outline :color="secondary" dark>2017</v-btn>
            </v-flex>
          </v-layout>
          <v-layout v-if="group === 'month'">
            <v-flex xs10 offset-xs1>
              <v-btn small v-if="month === 'Všetky'" round :color="secondary" dark>Všetky</v-btn>
              <v-btn
                small
                @click="month = 'Všetky'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >Všetky</v-btn>
              <v-btn small v-if="month === 'Január'" round :color="secondary" dark>Január</v-btn>
              <v-btn
                small
                @click="month = 'Január'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >Január</v-btn>
              <v-btn small v-if="month === 'Február'" round :color="secondary" dark>Február</v-btn>
              <v-btn
                small
                @click="month = 'Február'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >Február</v-btn>
              <v-btn small v-if="month === 'Marec'" round :color="secondary" dark>Marec</v-btn>
              <v-btn
                small
                @click="month = 'Marec'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >Marec</v-btn>
              <v-btn small v-if="month === 'Apríl'" round :color="secondary" dark>Apríl</v-btn>
              <v-btn
                small
                @click="month = 'Apríl'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >Apríl</v-btn>
              <v-btn small v-if="month === 'Máj'" round :color="secondary" dark>Máj</v-btn>
              <v-btn small @click="month = 'Máj'" v-else round outline :color="secondary" dark>Máj</v-btn>
              <v-btn small v-if="month === 'Jún'" round :color="secondary" dark>Jún</v-btn>
              <v-btn small @click="month = 'Jún'" v-else round outline :color="secondary" dark>Jún</v-btn>
              <v-btn small v-if="month === 'Júl'" round :color="secondary" dark>Júl</v-btn>
              <v-btn small @click="month = 'Júl'" v-else round outline :color="secondary" dark>Júl</v-btn>
              <v-btn small v-if="month === 'August'" round :color="secondary" dark>August</v-btn>
              <v-btn
                small
                @click="month = 'August'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >August</v-btn>
              <v-btn small v-if="month === 'September'" round :color="secondary" dark>September</v-btn>
              <v-btn
                small
                @click="month = 'September'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >September</v-btn>
              <v-btn small v-if="month === 'Október'" round :color="secondary" dark>Október</v-btn>
              <v-btn
                small
                @click="month = 'Október'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >Október</v-btn>
              <v-btn small v-if="month === 'November'" round :color="secondary" dark>November</v-btn>
              <v-btn
                small
                @click="month = 'November'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >November</v-btn>
              <v-btn small v-if="month === 'December'" round :color="secondary" dark>December</v-btn>
              <v-btn
                small
                @click="month = 'December'"
                v-else
                round
                outline
                :color="secondary"
                dark
              >December</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </transition>
    <transition name="slide-toggle-slow">
      <v-layout row wrap v-if="showDateSelection">
        <v-flex offset-xs1 xs10 md5>
          <v-layout>
            <v-flex xs12>
              <v-switch :color="secondary" label="Iba plné takovania" v-model="dateSwtich"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <div style="float:left; height:50px;" v-if="dateFrom">
                <v-chip large :color="primary" text-color="white">{{dateFrom}}</v-chip>
                <v-btn
                  @click="dateFrom = undefined"
                  icon
                  dark
                  flat
                  outline
                  :color="primary"
                  text-color="white"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
              <div v-else style="height:50px;">
                <v-chip large outline :color="primary">
                  <span>
                    Zvolte si dátum
                    <b>od</b>
                  </span>
                </v-chip>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-date-picker
                id="datepicker-from"
                no-title
                :value="dateFrom"
                v-model="dateFrom"
                :allowed-dates="allowedFromDatesFunc"
                :color="primary"
                full-width
                :style="{border:'1px solid #1a237e !important'}"
                :max="maxFromDate"
              ></v-date-picker>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 hidden-md-and-up>
          <hr style="margin-top:50px" />
        </v-flex>
        <v-flex offset-xs1 offset-md0 xs10 md5>
          <v-layout>
            <v-flex xs12>
              <v-switch disabled :color="secondary" label="Iba plné takovania" value="0"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <div v-if="dateTo" style="float:left; height:50px;">
                <v-chip large :color="primary" text-color="white">{{dateTo}}</v-chip>
                <v-btn
                  @click="dateTo = undefined"
                  icon
                  dark
                  flat
                  outline
                  :color="primary"
                  text-color="white"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
              <div v-else style="height:50px;">
                <v-chip large outline :color="primary">
                  <span>
                    Zvolte si dátum
                    <b>do</b>
                  </span>
                </v-chip>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-date-picker
                id="datepicker-to"
                no-title
                style="border:1px solid #1a237e"
                v-model="dateTo"
                :allowed-dates="allowedToDatesFunc"
                :color="primary"
                full-width
                :max="maxToDate"
              ></v-date-picker>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </transition>
    <v-layout mt-5 mb-5 v-if="this.radios === 'consumption'" justify-center>
      <span v-if="consumtpion !== undefined" class="consumption-lbl">
        Spotreba:
        <b>{{consumtpion}}</b>
        <span style="font-size: 20px; margin-left: 10px;">L / 100 km</span>
      </span>
      <span v-else class="consumption-lbl">...</span>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12>
        <vue-plotly :data="lineGraphData" :layout="lineGraphLayout" :options="options" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import VuePlotly from "@statnett/vue-plotly";
import { mapGetters, mapActions } from "vuex";
import LineGraph from "./../analysis/lineGraph";
import ConsumptionController from "./../analysis/consumptionController";
import { version } from "moment";

export default {
  components: {
    VuePlotly
  },
  data: function() {
    return {
      primary: "indigo darken-4",
      secondary: "pink lighten-1",
      months: [
        "Január",
        "Február",
        "Marec",
        "Apríl",
        "Máj",
        "Jún",
        "Júl",
        "August",
        "September",
        "Október",
        "November",
        "December"
      ],
      group: "year",
      month: "Všetky",
      year: "2019",
      radios: "amount",
      options: {
        staticPlot: true
      },
      dateFrom: this.maxFromDate,
      dateFromChip: false,
      dateTo: this.maxToDate,
      dateSwtich: true
    };
  },
  computed: {
    ...mapGetters(["refuels", "fullRefuelDates", "nonFullRefuelDates"]),
    lineGraphController() {
      return new LineGraph(this.refuels);
    },
    lineGraphData() {
      return this.lineGraphController.get_graph_trace(
        this.intervalBottom,
        this.intervalTop,
        this.month === "Všetky",
        this.radios
      );
    },
    lineGraphLayout() {
      return {
        title: this.lineGraphTitle,
        showlegend: false
      };
    },
    lineGraphSubject() {
      if (this.radios === "price") return "Cena (EUR)";
      else if (this.radios === "amount") return "Tankovanie (v litroch)";
      else return "Najazdené kilometre";
    },
    lineGraphTitle() {
      if (this.month === "Všetky") {
        return `${this.lineGraphSubject} za rok ${this.year}`;
      }
      return `${this.lineGraphSubject} za ${this.month} ${this.year}`;
    },
    intervalBottom() {
      if (this.month === "Všetky") {
        return new Date(`01/01/${this.year}`);
      }
      return new Date(`${this.months.indexOf(this.month) + 1}/01/${this.year}`);
    },
    intervalTop() {
      if (this.month === "Všetky") {
        return new Date(`12/31/${this.year}`);
      }

      let date = new Date();
      date.setMonth(this.months.indexOf(this.month) + 1);
      date.setDate(0);
      date.setFullYear(this.year);
      return date;
    },
    showTimeSelection() {
      return this.radios == "price" || this.radios == "amount";
    },
    showDateSelection() {
      return this.radios == "consumption";
    },
    maxFromDate() {
      let date = "";

      this.allowedFromDates.forEach(element => {
        if (new Date(element) > new Date(date)) date = element;
      });

      return date == "" ? new Date().toISOString().substr(0, 10) : date;
    },
    maxToDate() {
      let date = "";

      this.allowedToDates.forEach(element => {
        if (new Date(element) > new Date(date)) date = element;
      });

      return date == "" ? new Date().toISOString().substr(0, 10) : date;
    },
    allowedFromDates() {
      let full = this.fullRefuelDates;
      let nonFull = this.dateSwtich ? [] : this.nonFullRefuelDates;
      let all = full.concat(nonFull);

      if (this.dateTo === undefined) {
        return all;
      }

      let verified = [];

      all.forEach(date => {
        let dateTo = new Date(this.dateTo);
        let dateFrom = new Date(date);

        if (dateFrom < dateTo) {
          verified.push(dateFrom.toISOString().substr(0, 10));
        }
      });

      return verified;
    },
    allowedFromDatesFunc() {
      return val => this.allowedFromDates.includes(val);
    },
    allowedToDates() {
      let full = this.fullRefuelDates;

      if (this.dateFrom === undefined) {
        return full;
      }

      let verified = [];

      full.forEach(date => {
        let dateFrom = new Date(this.dateFrom);
        let dateTo = new Date(date);

        if (dateTo > dateFrom) {
          verified.push(dateTo.toISOString().substr(0, 10));
        }
      });

      return verified;
    },
    allowedToDatesFunc() {
      return val => this.allowedToDates.includes(val);
    },
    consumtpion() {
      var controller = new ConsumptionController(this.refuels);
      return controller.get_consumption(
        new Date(this.dateFrom),
        new Date(this.dateTo)
      );
    }
  },
  methods: {
    ...mapActions(["fetchRefuels"]),
    setSelection(group, subgroup) {
      this.group = group;
      this.subgroup = subgroup;
    },
    removeFromDate() {
      this.dateFrom = undefined;
      this.dateFromChip = false;
    }
  },
  mounted: function() {
    this.fetchRefuels();
  }
};
</script>

<style>
.slide-toggle-enter-active,
.slide-toggle-leave-active {
  transition: max-height 0.8s;
  overflow: hidden;
}
.slide-toggle-enter-active {
  max-height: 100px;
}
.slide-toggle-enter,
.slide-toggle-leave-active {
  max-height: 0;
}
.slide-toggle-leave {
  max-height: 100px;
}

.slide-toggle-slow-enter-active,
.slide-toggle-slow-leave-active {
  transition: max-height 1.5s;
  overflow: hidden;
}
.slide-toggle-slow-enter-active {
  max-height: 450px;
}
.slide-toggle-slow-enter,
.slide-toggle-slow-leave-active {
  max-height: 0;
}
.slide-toggle-slow-leave {
  max-height: 450px;
}

.v-date-picker-header {
  border-bottom: 1px solid #1a237e;
}

#datepicker-to
  > div
  > div
  > div.v-date-picker-table.v-date-picker-table--date.theme--light
  > table
  > tbody
  > tr
  > td
  > button:enabled {
  border: 1px solid #1a237e !important;
  background-color: #1a22808a !important;
}

#datepicker-from
  > div
  > div
  > div.v-date-picker-table.v-date-picker-table--date.theme--light
  > table
  > tbody
  > tr
  > td
  > button:enabled {
  border: 1px solid #1a237e !important;
  background-color: #1a22808a !important;
}

.consumption-lbl {
  width: 80%;
  text-align: center;
  padding: 10px 20px;
  font-size: 50px;
  color: #ec407a;
}
</style>

