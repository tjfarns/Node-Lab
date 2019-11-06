var app = new Vue({
  el: '#app',
  data: {
    cities: [],
    prefix: '',
    wordtosearch: '',
    wordtype: '',
    wordexample: '',
    definition: '',
  },
  methods: {
    fetchREST() {
      this.prefix = this.prefix.charAt(0).toUpperCase() + this.prefix.slice(1);
      var url = "getcity?q=" + this.prefix;
      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          console.log(data);
          return (data.json());
        })
        .then((citylist) => {
          console.log(citylist);
          this.cities = [];
          for (let i = 0; i < citylist.length; i++) {
            console.log(citylist[i].city);
            this.cities.push({ name: citylist[i].city });
          };
          console.log("Got Citylist");
        });
    },
    fetchRESTOwlAPI() {
      var url = "definition?q=" + this.wordtosearch;
      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          console.log(data);
          return (data.json());
        })
        .then((def) => {
          console.log(def);
          this.wordexample = '';
          this.wordexample = def[0].example;
          this.wordtype = '';
          this.wordtype = def[0].type;
          this.definition = '';
          this.definition = def[0].defenition;
          console.log(this.wordexample);
          console.log(this.wordtype);
          console.log(this.definition);
        });
    },
    
  },
});
