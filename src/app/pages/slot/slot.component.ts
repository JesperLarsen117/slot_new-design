import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  // symbols = 'wcossoottobdlodlppblolcdooodssoospp';
  symbols = 'ppppppppppppppppppppppppppppppppppp';
  row = [];
  rows = [
    ['w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w'],
    ['w', 'w', 'w', 'w']
  ];

  lines = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ], // 1st line
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ], // 2nd line
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
    ], // 3rd line
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
    ], // 4rd line
    [
      [0, 0],
      [1, 1],
      [2, 0],
      [3, 1],
      [4, 0],
    ], //  top zikzak
    [
      [0, 1],
      [1, 0],
      [2, 1],
      [3, 0],
      [4, 1],
    ], //  top zikzak
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [3, 2],
      [4, 1],
    ], //   top zikzak
    [
      [0, 2],
      [1, 1],
      [2, 2],
      [3, 1],
      [4, 2],
    ], //   top zikzak
    [
      [0, 2],
      [1, 3],
      [2, 2],
      [3, 3],
      [4, 2],
    ], // top zikzak
    [
      [0, 3],
      [1, 2],
      [2, 3],
      [3, 2],
      [4, 3],
    ], //   top zikzak
    [
      [0, 0],
      [1, 1],
      [2, 2],
      [1, 3],
      [0, 4],
    ], //   top zikzak
    [
      [3, 0],
      [2, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ], //   top zikzak
  ];
  isSpining = false;
  spinTime = 4000;
  savedSymbols = [];
  winnerSymbils = [];
  winAmount = [];
  spending = 1;
  money = 1000;
  countWin = 0;
  bigWin = false;
  constructor() {
  }

  ngOnInit(): void {
    this.savedSymbols = this._saveSymbols();

  }

  onSpin() {
    this.isSpining = true;
    this.savedSymbols = [];
    this.savedSymbols = this._saveSymbols();
    this.rows = [];
    // Clear rows.

    // Generate all symbols randomly.
    for (let rowsIdx = 0; rowsIdx < 5; rowsIdx++) {
      this.row = [];
      for (let symbolIdx = 0; symbolIdx < 40; symbolIdx++) {
        const r = Math.floor(Math.random() * 35);
        this.row.push(this._splitSymbols(this.symbols)[r]);

      }
      this.rows.push(this.row);
    }
    for (let i = 0; i < 5; i++) {
      this.rows[0].push(this.savedSymbols[0][i]);
      this.rows[1].push(this.savedSymbols[1][i]);
      this.rows[2].push(this.savedSymbols[2][i]);
      this.rows[3].push(this.savedSymbols[3][i]);
      this.rows[4].push(this.savedSymbols[4][i]);
    }
    this.winnerSymbils = this._saveSymbols();
    console.log(this.winnerSymbils);
    this.checkWin(this.lines, this.winnerSymbils);
    setTimeout(() => {
      this.isSpining = false;
    }, this.spinTime);
    const landAudio = document.getElementsByClassName('land') as any;
    setTimeout(() => {
      landAudio[0].play();
    }, 1700);
    setTimeout(() => {
      landAudio[1].play();
    }, 2100);
    setTimeout(() => {
      landAudio[2].play();
    }, 2300);
    setTimeout(() => {
      landAudio[3].play();
    }, 2500);
    setTimeout(() => {
      landAudio[4].play();
    }, 2700);
  }

  _splitSymbols(allSymbols) {
    return allSymbols.split('');
  }

  // calculate win.
  checkWin(lines, symbols) {
    this.money -= this.spending;
    let streak = 0;
    let currentKind = null;
    this.winAmount = [];
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      for (let coordIdx = 0; coordIdx < lines[lineIdx].length; coordIdx++) {
        const coords = lines[lineIdx][coordIdx];
        const symbolAtCords = symbols[coords[0]][coords[1]];

        if (coordIdx === 0) {
          currentKind = symbolAtCords;

          streak = 1;
        } else {

          if (symbolAtCords !== currentKind) {
            console.log('--------' + lineIdx + '-------');
            console.log('No win!');
            break;
          }
          streak += 1;
        }
      }
      if (streak >= 3) {
        console.log('--------' + lineIdx + '-------');

        console.log('YOU WIN!');
        this.winAmount.push({ symbol: currentKind, streak });
      }
      console.log(streak);

    }
    console.log('length' + this.win(this.winAmount).length);

    // Calculating win.
    let allWins = 0;

    setTimeout(() => {
      for (let i = 0; i < this.win(this.winAmount).length; i++) {
        let won = 0;
        const element = this.win(this.winAmount)[i];
        won = this.spending * element;
        allWins += this.spending * element;
        this.money += won;
        console.log('------------------');
        console.log('You won: ' + won + '$');
        console.log('------------------');
      }
      console.log('$: ' + this.money);
      let countTimer = 100;
      const animation = setInterval(() => {
        if (allWins >= 20) {

          if (this.countWin >= allWins) {
            this.countWin = allWins - 50;
            clearInterval(animation);
          } else {
            this.bigWin = true;
          }
          if (this.countWin >= 50 && this.countWin <= 99) {
            this.countWin += 10;
            countTimer = 20;
          } else if (this.countWin >= 100 && this.countWin <= 149) {
            countTimer = 10;
            this.countWin += 20;
          } else if (this.countWin >= 150) {
            countTimer = 1;
            this.countWin += 50;
          } else {
            this.countWin++;
          }
        } else {
          clearInterval(animation);
        }
        console.log(countTimer);


      }, countTimer);
      console.log('------------------');
      console.log('You won: ' + allWins + '$');
      console.log('------------------');
      this.countWin = 0;
    }, this.spinTime);
  }
  _countWin(winAmount) {

  }
  _chooseSymbol(key) {
    switch (key) {
      case 'w':
        return 'wild';
      case 's':
        return 'snake';
      case 'o':
        return 'boots';
      case 'b':
        return 'barrel';
      case 't':
        return 'trolley';
      case 'l':
        return 'lamp';
      case 'd':
        return 'dynamite';
      case 'p':
        return 'goldStack';
      case 'c':
        return 'goldCoins';

      default:
        break;
    }
  }
  _saveSymbols() {
    const savedSymbols = [
      [this.rows[0][0], this.rows[0][1], this.rows[0][2], this.rows[0][3]],
      [this.rows[1][0], this.rows[1][1], this.rows[1][2], this.rows[1][3]],
      [this.rows[2][0], this.rows[2][1], this.rows[2][2], this.rows[2][3]],
      [this.rows[3][0], this.rows[3][1], this.rows[3][2], this.rows[3][3]],
      [this.rows[4][0], this.rows[4][1], this.rows[4][2], this.rows[4][3]],
    ];
    return savedSymbols;
  }

  win(amount) {
    const wins = [];
    for (let i = 0; i < amount.length; i++) {
      switch (amount[i].symbol) {
        case 'w':
          if (amount[i].streak === 3) {
            wins.push(10);
          } else if (amount[i].streak === 4) {
            wins.push(20);
          } else if (amount[i].streak === 5) {
            wins.push(30);
          }
          break;
        case 's':
          if (amount[i].streak === 3) {
            wins.push(2);
          } else if (amount[i].streak === 4) {
            wins.push(4);
          } else if (amount[i].streak === 5) {
            wins.push(6);
          }
          break;
        case 'o':
          if (amount[i].streak === 3) {
            wins.push(1);
          } else if (amount[i].streak === 4) {
            wins.push(2);
          } else if (amount[i].streak === 5) {
            wins.push(3);
          }
          break;
        case 'b':
          if (amount[i].streak === 3) {
            wins.push(10);
          } else if (amount[i].streak === 4) {
            wins.push(20);
          } else if (amount[i].streak === 5) {
            wins.push(30);
          }
          break;
        case 't':
          if (amount[i].streak === 3) {
            wins.push(20);
          } else if (amount[i].streak === 4) {
            wins.push(30);
          } else if (amount[i].streak === 5) {
            wins.push(40);
          }
          break;
        case 'l':
          if (amount[i].streak === 3) {
            wins.push(5);
          } else if (amount[i].streak === 4) {
            wins.push(10);
          } else if (amount[i].streak === 5) {
            wins.push(15);
          }
          break;
        case 'd':
          if (amount[i].streak === 3) {
            wins.push(50);
          } else if (amount[i].streak === 4) {
            wins.push(100);
          } else if (amount[i].streak === 5) {
            wins.push(150);
          }
          break;
        case 'p':
          if (amount[i].streak === 3) {
            wins.push(100);
          } else if (amount[i].streak === 4) {
            wins.push(200);
          } else if (amount[i].streak === 5) {
            wins.push(300);
          }
          break;
        case 'c':
          if (amount[i].streak === 3) {
            wins.push(20);
          } else if (amount[i].streak === 4) {
            wins.push(40);
          } else if (amount[i].streak === 5) {
            wins.push(60);
          }
          break;
        default:
          break;
      }
    }
    return wins;
  }
  _clearBigWin() {
    this.bigWin = false;
  }
}
