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
              :style="{height:'300px'}"
              v-if="!today"
              v-model="datePicker"
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
            v-model="select"
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
                v-model="amount"
                :error-messages="errors.collect('amount')"
                label="Počet litrov"
                data-vv-name="amount"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs2 offset-xs1>
              <v-checkbox v-model="full" label="Plná" type="checkbox" :color="primary"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-text-field
            :color="primary"
            v-validate="'required|decimal:2'"
            v-model="price"
            :error-messages="errors.collect('price')"
            label="Cena (EUR)"
            data-vv-name="price"
            required
          ></v-text-field>
          <v-text-field
            :color="primary"
            v-validate="'required|decimal:1'"
            v-model="km"
            :error-messages="errors.collect('km')"
            label="Najazdené kilometre"
            data-vv-name="km"
            required
          ></v-text-field>

          <v-btn :color="primary" :style="{color:'white'}" @click="submit">OK</v-btn>
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
import { mapActions } from "vuex";
import router from "./../router";

var todayDate = new Date().toISOString().substr(0, 10);

export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    primary: "indigo darken-4",
    today: true,
    hasError: false,
    datePicker: todayDate,
    datePickerMax: todayDate,
    amount: "",
    full: true,
    price: "",
    km: "",
    select: null,
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
    this.$validator.localize("en", this.dictionary);
  },
  computed: {
    date() {
      if (this.today) {
        return todayDate;
      }

      return this.datePicker;
    }
  },
  methods: {
    ...mapActions(["submitRefuel"]),
    submit() {
      this.$validator.validate().then(result => {
        if (!result) {
          this.hasError = true;
          return;
        }

        this.hasError = false;
        this.submitRefuel({
          date: this.date,
          amount: this.amount,
          full: this.full,
          price: this.price,
          km: this.km,
          station: this.select
        });

        router.push({ name: "overview" });
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
</style>

