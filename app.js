new Vue({
  el: "#app",
  data: {
    startGameControl: false,
    showLogs: false,
    healthMe: 100,
    healthMonster: 100,
  },
  methods: {
    startGame: function () {
      this.startGameControl = true;
    },

    attack: function () {
      this.showLogs = true;
      var personPowerAttack = Math.floor(Math.random() * 17) + 8;
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
    },

    specialAttack: function () {
      this.showLogs = true;
      var personPowerAttack = Math.floor(Math.random() * 22) + 10;
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
    },

    firstAid: function () {
      var aid = Math.floor(Math.random() * 25) + 15;
      this.healthMe += aid;
      if (this.healtMe > 100) {
        this.healthMe = 100;
      }
    },

    giveUp: function () {
      var answ = confirm("Bitirmek İstiyor musun?");
      if (answ === true) {
        alert("KAYBETTİN");
        this.startGameControl = false;
        this.showLogs = false;
        this.healthMe = 100;
        this.healthMonster = 100;
      }
    },

    monsterAttack: function () {
      var monsterPowerAttack = Math.floor(Math.random() * 17) + 8;
      this.healthMe -= monsterPowerAttack;
    },
  },
  watch: {
    healthMe: function (value) {
      if (value <= 0) {
        this.healthMe = 0;
        var lose = confirm("Oyunu kaybettin!. Tekrar Denemek İster misin?");
        if ((lose = true)) {
          this.healthMe = 100;
          this.healthMonster = 100;
          this.showLogs=false;
        }
      } else if (value >= 100) {
        this.healthMe = 100;
      }
    },
    healthMonster: function (value) {
      if (value <= 0) {
        this.healthMonster = 0;
        var win = confirm("Kazandın!. Tekrar Denemek İster misin?");
        if ((win = true)) {
          this.healthMe = 100;
          this.healthMonster = 100;
          this.showLogs=false;
        }
      }
    },
  },
});
