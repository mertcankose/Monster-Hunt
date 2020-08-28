new Vue({
  el: "#app",
  data: {
    startGameControl: false,
    healthMe: 100,
    healthMonster: 100,
    attackMultiple: 10,
    specialAttackMultiple: 20,
    monsterAttackMultiple: 15,
    firstAidMultiple: 20,
    logText: {
      personAttack: "Oyuncu Atağı!",
      personSpecialAttack: "Özel Oyuncu Atağı",
      monsterAttack: "Monster Atağı!",
      firstAid: "İlk YARDIM",
      giveUp: "Oyuncu Pes Etti!",
    },
    logs: [],
  },
  methods: {
    startGame: function () {
      this.startGameControl = true;
    },

    attack: function () {
      var personPowerAttack = Math.floor(Math.random() * this.attackMultiple);
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: this.logText.personAttack + "(" + personPowerAttack + ")",
      });
    },

    specialAttack: function () {
      var personPowerAttack =
        Math.floor(Math.random() * this.specialAttackMultiple) + 10;
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: this.logText.personSpecialAttack + "(" + personPowerAttack + ")",
      });
    },

    firstAid: function () {
      var aid = Math.floor(Math.random() * this.firstAidMultiple);
      this.healthMe += aid;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: this.logText.firstAid + "(" + aid + ")",
      });
    },

    giveUp: function () {
      var answ = confirm("Bitirmek İstiyor musun?");
      if (answ === true) {
        this.startGameControl = false;
        this.healthMe = 0;
      }
      this.addToLog({ turn: "Person", text: this.logText.giveUp });
    },

    monsterAttack: function () {
      var monsterPowerAttack = Math.floor(
        Math.random() * this.monsterAttackMultiple
      );
      this.healthMe -= monsterPowerAttack;
      this.addToLog({
        turn: "Monster",
        text: this.logText.monsterAttack + "(" + monsterPowerAttack + ")",
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
  computed: {
    playerProgress: function () {
      return {
        width: this.healthMe + "%",
      };
    },
    monsterProgress: function () {
      return {
        width: this.healthMonster + "%",
      };
    },
  },
});
