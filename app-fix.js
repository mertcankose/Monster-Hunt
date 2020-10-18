new Vue({
  el: "#app",
  data: {
    startGameControl: false,
    healthMe: 100,
    healthMonster: 100,
    attackMultiple: 10,
    specialAttackMultiple: 15,
    monsterAttackMultiple: 10,
    firstAidMultiple: 20,
    logText: {
      personAttack: "Player Attack!",
      personSpecialAttack: "Special Player Attack!",
      monsterAttack: "Monster Attack!",
      firstAid: "First Aid",
      giveUp: "The player gave up!"
    },
    logs: []
  },
  methods: {
    startGame: function () {
      this.startGameControl = true;
    },

    attack: function () {
      let personPowerAttack = Math.floor(Math.random() * this.attackMultiple);
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: this.logText.personAttack + "(" + personPowerAttack + ")"
      });
    },

    specialAttack: function () {
      let personPowerAttack = Math.floor(
        Math.random() * this.specialAttackMultiple
      );
      this.healthMonster -= personPowerAttack;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: this.logText.personSpecialAttack + "(" + personPowerAttack + ")"
      });
    },

    firstAid: function () {
      var aid = Math.floor(Math.random() * this.firstAidMultiple);
      this.healthMe += aid;
      this.monsterAttack();
      this.addToLog({
        turn: "Person",
        text: this.logText.firstAid + "(" + aid + ")"
      });
    },

    giveUp: function () {
      var answ = confirm("Do you want to finish?");
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
        text: this.logText.monsterAttack + "(" + monsterPowerAttack + ")"
      });
    },

    addToLog: function (log) {
      this.logs.push(log);
    }
  },
  watch: {
    healthMe: function (value) {
      if (value <= 0) {
        this.healthMe = 0;
        var lose = confirm(
          "You have lost the game!. Do you want to try again?"
        );
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
        var win = confirm("You won the game! Do you want to try again?");
        if ((win = true)) {
          this.healthMe = 100;
          this.healthMonster = 100;
          this.logs = [];
        }
      }
    }
  },
  computed: {
    playerProgress: function () {
      return {
        width: this.healthMe + "%"
      };
    },
    monsterProgress: function () {
      return {
        width: this.healthMonster + "%"
      };
    }
  }
});
