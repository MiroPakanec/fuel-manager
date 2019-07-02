<template>
  <v-container>
    <v-layout>
      <v-flex xs-12>
        <form>
          <v-checkbox
            v-model="today"
            label="Dnes"
            type="checkbox"
            :color="primary"
            slot="activator"
          ></v-checkbox>
          <transition name="slide-toggle">
            <v-date-picker
              class="edit_picker"
              :style="{height:'300px'}"
              v-if="!today"
              v-model="datePicker_view"
              :color="primary"
              full-width
              :max="datePickerMax"
              landscape
            ></v-date-picker>
          </transition>
          <v-select
            v-validate="'required'"
            :items="stations"
            :color="primary"
            v-model="station_view"
            :error-messages="errors.collect('select')"
            label="Čerpacia stanica"
            data-vv-name="select"
            required
          ></v-select>
          <v-layout>
            <v-flex xs9>
              <v-text-field
                :color="primary"
                v-validate="'required|decimal:2'"
                v-model="amount_view"
                :error-messages="errors.collect('amount')"
                label="Počet litrov"
                data-vv-name="amount"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-checkbox v-model="full_view" label="Plná" type="checkbox" :color="primary"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-text-field
            :color="primary"
            v-validate="'required|decimal:2'"
            v-model="price_view"
            :error-messages="errors.collect('price')"
            label="Cena (EUR)"
            data-vv-name="price"
            required
          ></v-text-field>
          <v-text-field
            :color="primary"
            v-validate="'required|decimal:1'"
            v-model="km_view"
            :error-messages="errors.collect('km')"
            label="Najazdené kilometre"
            data-vv-name="km"
            required
          ></v-text-field>

          <v-btn :color="primary" :style="{color:'white'}" @click="submit">Update</v-btn>
          <v-btn @click="clear">Zrušiť</v-btn>

          <v-alert
            :value="true"
            color="error"
            icon="warning"
            outline
            v-if="hasError"
          >Nepomýlil si sa nahodou???</v-alert>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "./../router";

//var recordDate = new Date(record.date).toISOString().substr(0, 10);
var todayDate = new Date().toISOString().substr(0, 10);

export default {
  $_veeValidate: {
    validator: "new"
  },
  props: ["id"],
  data: () => ({
    primary: "indigo darken-4",
    today: false,
    hasError: false,
    datePicker: null,
    datePickerMax: todayDate,
    station: null,
    amount: null,
    full: null,
    price: null,
    km: null,
    stations: ["Slovnaft", "Shell", "OMV", "SSP CNG", "Iná"],
    dictionary: {
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
        },
        amount: {
          required: () => "Počet litrov musí byť zadaný",
          decimal:
            "Počet litrov musí obsahovať iba čísla s maximálne dvomi desatinnými miestami"
        },
        price: {
          required: () => "Cena musí byť zadaná",
          decimal:
            "Cena musí obsahovať iba čísla s maximálne dvomi desatinnými miestami"
        },
        price: {
          required: () => "Najazdené kilometre musia byť zadané",
          decimal:
            "Najazdené kilometre musia obsahovať iba čísla s maximálne jedným desatinným miestom"
        },
        select: {
          required: "Vyberte si čerpaciu stanicu"
        }
      }
    }
  }),

  mounted() {
    if (this.$props.id === undefined) {
      this.$router.push("overview");
    }

    this.$validator.localize("en", this.dictionary);
  },
  computed: {
    ...mapGetters(["refuels"]),
    date() {
      if (this.today) {
        return todayDate;
      }

      return this.datePicker;
    },
    record() {
      return this.refuels.find(refuel => refuel.id === this.$props.id);
    },
    station_view: {
      get() {
        return this.station === null ? this.record.station : this.station;
      },
      set(val) {
        this.station = val;
      }
    },
    datePicker_view: {
      get() {
        let date = new Date(this.record.date).toISOString().substr(0, 10);
        return this.datePicker === null ? date : this.datePicker;
      },
      set(val) {
        this.datePicker = val;
      }
    },
    amount_view: {
      get() {
        return this.amount === null ? this.record.amount : this.amount;
      },
      set(val) {
        this.amount = val;
      }
    },
    price_view: {
      get() {
        return this.price === null ? this.record.price : this.price;
      },
      set(val) {
        this.price = val;
      }
    },
    full_view: {
      get() {
        return this.full === null ? this.record.full : this.full;
      },
      set(val) {
        this.full = val;
      }
    },
    km_view: {
      get() {
        return this.km === null ? this.record.km : this.km;
      },
      set(val) {
        this.km = val;
      }
    }
  },
  methods: {
    ...mapActions(["updateRefuel", "fetchRefuels"]),
    submit() {
      this.$validator.validate().then(result => {
        if (!result) {
          this.hasError = true;
          return;
        }

        this.hasError = false;

        this.updateRefuel({
          id: this.$props.id,
          date: this.datePicker_view,
          amount: this.amount_view,
          full: this.full_view,
          price: this.price_view,
          km: this.km_view,
          station: this.station_view
        });

        this.fetchRefuels();
        this.$router.push({ name: "overview" });
      });
    },
    clear() {
      this.amount = "";
      this.price = "";
      this.select = null;
      this.km = "";
      this.today = true;
      this.$validator.reset();
      (this.hasError = false), (this.full = true);
    }
  },
  watch: {
    today: function(val) {
      this.datePicker = todayDate;
    }
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
  max-height: 300px;
}
.slide-toggle-enter,
.slide-toggle-leave-active {
  max-height: 0;
}
.slide-toggle-leave {
  max-height: 300px;
}

.edit_picker > td > button {
  border: 1px solid #1a237e !important;
  background-color: #1a22808a !important;
}
</style>

