<template>
  <v-app>  
    <v-tabs
      centered
      color="indigo darken-4"
      dark
      icons-and-text
    >
      <v-tabs-slider color="pink lighten-1"></v-tabs-slider>

      <v-tab to="/overview" class="btn-tab">
        Náhľad
        <v-icon>view_list</v-icon>
      </v-tab>

      <v-tab to="/new">
        Nové tankovanie
        <v-icon>add_circle_outline</v-icon>
      </v-tab>

      <v-tab to="/stats">
        Štatistika
        <v-icon>pie_chart</v-icon>
      </v-tab>
    </v-tabs>
    <router-view/>
  </v-app>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  methods:{
    ...mapGetters([
        'pas'
    ]),
    submit(enteredPas){     
      if(enteredPas !== this.pas()){
        this.alertCustomError()
      }
    },
    loginDialog(){
      this.$dialog.prompt({
            message: `Zadajte heslo`,
            canCancel:false, 
            inputAttrs: {
              maxlength: 20
            },
            onConfirm: (value) => this.submit(value)
      })
    },
    alertCustomError() {
        this.$dialog.alert({
          title: 'Chyba',
          message: 'Nesprávne heslo',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          onConfirm: () => this.loginDialog()
        })
    }
  },
  mounted: function(){
    this.loginDialog()
  }
}
</script>

<style>
  .v-tabs__item:hover{
    color: #EC407A
  }

  textarea:focus, input:focus, input[type]:focus, .uneditable-input:focus {   
    border-color: #1A237E !important;
    box-shadow: 0 1px 1px #fff inset, 0 0 3px #fff !important;
    outline: 0 none !important;
  }

  .is-primary{
    background-color: #1A237E !important
  }
</style>

