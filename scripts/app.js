var kujikun = document.getElementById('kujikun');

var inputNumber = document.getElementById('inputNumber');
var btSetNumber = document.getElementById('btSetNumber');
var btDrawNumber = document.getElementById('btDrawNumber');
var btReset = document.getElementById('btReset');

var number = 0;
var drawnArr = [];
var list = document.getElementById('list');
var selectedNumber = document.getElementById('selectedNumber');
var drawn = document.getElementById('drawn');

btSetNumber.addEventListener('click', function(ev) {
  ev.preventDefault();

  drawnArr = [];
  number = parseInt(inputNumber.value, 10);

  if ( number === 0 || number < 0 ) {
    return alert('0以外の正数で入力してください');
  }

  echoInputNumber(number);
  changeState(1);
}, false);

btDrawNumber.addEventListener('click', function(ev) {
  ev.preventDefault();

  let drawNumber = null;
  let i = 0;

  if ( number < 0 ) {
    return alert('正数を入力してください');
  } else if ( number === 0 ) {
    return alert('先に人数を決定してください');
  }

  if ( drawnArr.length === number) {
    return alert('これ以上引けません');
  }

  if ( !confirm('くじを引きますか？') ) {
    return;
  }

  for ( ; i < number * 1000; i++ ) {
    drawNumber = Math.floor(Math.random() * number) + 1;

    if ( drawnArr.includes(drawNumber) ) {
      continue;
    } else {
      break;
    }
  }

  changeState(2);
  drawnArr.push(drawNumber);
  echo(drawNumber);
}, false);

btReset.addEventListener('click', function(ev) {
  ev.preventDefault();

  resetNumber();
  changeState(0);
}, false);

function changeState(state) {
  kujikun.className = 'state-' + state;
}

function echoInputNumber(x) {
  selectedNumber.innerHTML = x;
}

function echo(x) {
  echoDrawnNumber(x);
  echoDrawnNumbers();
}

function echoDrawnNumber(x) {
  let _x = drawnArr.length === number ? x + '*' : x;
  drawn.innerHTML = '引いた数は <b>' + _x + '</b> です';
}

function echoDrawnNumbers() {
  let echo = '';

  // 昇順でソートしておく
  drawnArr.sort(function(a, b){
    if ( a < b ) {
      return -1;
    }
    if ( a > b ) {
      return 1;
    }
    return 0;
  });

  // 表示
  drawnArr.forEach(function(i) {
    echo = echo + '<li>' + i + '</li>' +'\n';
  });

  list.innerHTML = echo;
}

function resetNumber() {
  drawn.innerHTML = '';
  list.innerHTML = '';
}

if ( 'ontouchstart' in document.documentElement ) {
  this.$nextTick(() => {
    // iOSのhover2タップ問題を解消するためのハック
    document.addEventListener('touchstart', () => {
    })
  })
}