new Vue({
  el: "#app",
  data: {
    startGameControl: false,
    healthMe: 100,
    healthMonster: 100,
    logs: [],
  },
  methods: {
    startGame: function () {
      this.startGameControl = true;
    },

    attack: function () {
      var personPowerAttack = Math.floor(Math.random() * 17) + 8;
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: "Oyuncu Atağı! (" + personPowerAttack + ")",
      });
    },

    specialAttack: function () {
      var personPowerAttack = Math.floor(Math.random() * 22) + 10;
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: "Özel Oyuncu Atağı! (" + personPowerAttack + ")",
      });
    },

    firstAid: function () {
      var aid = Math.floor(Math.random() * 25) + 15;
      this.healthMe += aid;
      this.monsterAttack();
      this.addToLog({ turn: "Person", text: "İlk Yardım! (" + aid + ")" });
    },

    giveUp: function () {
      var answ = confirm("Bitirmek İstiyor musun?");
      if (answ === true) {
        this.startGameControl = false;
        this.healthMe = 0;
      }
      this.addToLog({ turn: "Person", text: "Oyuncu Pes Etti!" });
    },

    monsterAttack: function () {
      var monsterPowerAttack = Math.floor(Math.random() * 17) + 8;
      this.healthMe -= monsterPowerAttack;
      this.addToLog({
        turn: "Monster",
        text: "Canavar Atağı! (" + monsterPowerAttack + ")",
      });
    },

    addToLog: function (log) {
      this.logs.push(log);
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
          this.logs = [];
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
          this.logs = [];
        }
      }
    },
  },
});
