<template>
  <v-container fluid :style="{padding:0, backgroundColor:'white'}">
    <v-layout>
      <v-flex mt-5 xs10 offset-xs1>
        <section>
          <b-table
            :data="isEmpty ? [] : refuels"
            :bordered="true"
            :striped="true"
            :narrowed="false"
            :hoverable="false"
            :loading="false"
            :focusable="false"
            :mobile-cards="true"
          >
            <template slot-scope="props">
              <b-table-column field="date" label="Dátum" centered sortable>
                <span
                  class="tag is-success"
                  :style="{backgroundColor:'#1A237E'}"
                >{{ formatDate(new Date(props.row.date)) }}</span>
              </b-table-column>

              <b-table-column
                centered
                field="station"
                label="Čerpacia stanica"
              >{{ props.row.station }}</b-table-column>

              <b-table-column centered field="amount" label="Množstvo">{{ props.row.amount }} L</b-table-column>

              <b-table-column centered field="full" label="Nádrž">
                <span
                  v-if="props.row.full"
                  class="tag is-success"
                  :style="{backgroundColor:'#1A237E'}"
                >plná</span>
              </b-table-column>

              <b-table-column centered field="price" label="Cena">{{ props.row.price }} €</b-table-column>

              <b-table-column centered field="km" label="Najazdené">{{ props.row.km }} km</b-table-column>

              <b-table-column centered field label="Zmazať">
                <v-btn @click="remove(props.row.id)" flat class="btn-remove">
                  <v-icon :color="primary">delete</v-icon>
                </v-btn>
              </b-table-column>
            </template>

            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>
                    <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                  </p>
                  <p>Žiadne dáta na zobrazenie...</p>
                </div>
              </section>
            </template>
          </b-table>
        </section>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

var moment = require("moment");

export default {
  data() {
    return {
      primary: "indigo darken-4",
      isEmpty: false
    };
  },
  computed: {
    ...mapGetters(["refuels"]),
    monthNames() {
      return [
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
      ];
    }
  },
  methods: {
    ...mapActions(["fetchRefuels", "removeRefuel"]),
    remove(id) {
      this.removeRefuel(id);
      this.fetchRefuels();
    },
    formatDate(date) {
      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();
      return `${day} ${this.monthNames[monthIndex]} ${year}`;
    }
  },
  mounted: function() {
    this.fetchRefuels();
  }
};
</script>

<style>
.btn-remove {
  width: 100% !important;
}
</style>
