var matrizJogo = []

var mapaMinas = [] ; var mapaJogo = []
var totalBotoes
var minas
var colunas
var linhas

function criarJogo(){
  document.getElementById('criar-jogo').disabled = true ;
  linhas = document.getElementById('linhas').value
  colunas = document.getElementById('colunas').value
  minas = document.getElementById('minas').value

  var html = ''
  for (var l = 0; l < linhas ; l++) {
    html+= '<ul>'
    for (var c = 0; c < colunas ; c++){
      html+= '<li><button id="button-' + l + '-' + c + '" onclick="eventButton('+ l + ',' + c +')"></li>' //<button id="button-0-0" onclick="click(0,0)">
    }
    html+= '</ul>'
  }
  var element = document.getElementById('jogo')

  element.insertAdjacentHTML('beforeend',html)

  totalBotoes = linhas * colunas

  if(minas > totalBotoes){
    alert('Muitas minas');
    return 0;
  }
  addMinas(minas, mapaMinas , totalBotoes)
  mapaMinas.sort(compararNumeros)

  addMapaMinas(mapaMinas, matrizJogo)
  addNumeros(matrizJogo)
  //console.log(matrizJogo);
}

function addMinas(minas, mapaMinas , totalBotoes){
  let vetor = []
  let tmp
  let aleatorio
  for (var i = 0; i < totalBotoes; i++) {
    vetor.push(i)
  }
  let y = 0;
  for(var x = vetor.length; x > 0; x--){
    aleatorio = parseInt(Math.random()*x)
    tmp = vetor[y]
    vetor[y] = vetor[aleatorio]
    vetor[aleatorio] = tmp
    y++
  }
  for(var x = 0; x < minas; x++){
    mapaMinas[x] = vetor[x]
  }
}

function addMapaMinas(mapaMinas, matrizJogo){
  for( x = 0; x < linhas ; x++){
    matrizJogo[x] = []
    for( y = 0; y<colunas ; y++){
      matrizJogo[x][y] = 0 ;
    }
  }
  for (var i = 0; i < mapaMinas.length; i++) {
    matrizJogo[mapaMinas[i]%colunas][(mapaMinas[i]-mapaMinas[i]%linhas)/linhas] = 'x' //adiciona mina na matrizJogo
  }
}

function addNumeros(matrizJogo) {
  var tmpMatriz = []
  let tmpLinhas = linhas
  let tmpColunas = colunas


  for(var x = -2; x < tmpLinhas ; x++){
    tmpMatriz[x+2] = []
    for(var y = -2 ; y < tmpColunas ; y++){
      tmpMatriz[x+2][y+2] = 0 ;
    }
  }
  for( x = 0; x < linhas ; x++){
    for( y = 0; y < colunas ; y++){
      tmpMatriz[x+1][y+1] = matrizJogo[x][y] ;
    }
  }
  /*console.log(minas);
  console.log(mapaMinas.length);
  console.log(mapaMinas);
  console.log(matrizJogo);
  console.log(tmpMatriz);*/ //tudo certo até aqui
  //falta adicionar os números(de minas) na tmpMatriz para depois passar para a matrizJogo

  for (var l = 0; l < tmpMatriz.length; l++) {
    for (var c = 0; c < tmpMatriz[l].length; c++) {
      if (tmpMatriz[l][c] == 'x') {
        if (tmpMatriz[l-1][c-1] != 'x') tmpMatriz[l-1][c-1]++
        if (tmpMatriz[l-1][c] != 'x') tmpMatriz[l-1][c]++
        if (tmpMatriz[l-1][c+1] != 'x') tmpMatriz[l-1][c+1]++
        if (tmpMatriz[l][c-1] != 'x') tmpMatriz[l][c-1]++
        if (tmpMatriz[l][c+1] != 'x') tmpMatriz[l][c+1]++
        if (tmpMatriz[l+1][c-1] != 'x') tmpMatriz[l+1][c-1]++
        if (tmpMatriz[l+1][c] != 'x') tmpMatriz[l+1][c]++
        if (tmpMatriz[l+1][c+1] != 'x') tmpMatriz[l+1][c+1]++
      }
    }
  }
  for (var l = 0; l < matrizJogo.length; l++) {
    for (var c = 0; c < matrizJogo[l].length; c++) {
      matrizJogo[l][c] = tmpMatriz[l+1][c+1]
    }
  }
  //console.log(matrizJogo); //conferindo se matrizJogo recebeu a tmpMatriz corretamente
}

function eventButton(l,c){
  if ( l >= 0 && c >= 0 && l < linhas && c < colunas) {
    if (document.getElementById('button-' + l + '-' + c).disabled == false) {
      document.getElementById('button-' + l + '-' + c).disabled = true
      var element = document.getElementById('button-' + l + '-' + c)
      element.insertAdjacentHTML('beforeend',matrizJogo[l][c])
      if(matrizJogo[l][c] == 0){
        eventButton(l-1,c-1)
        eventButton(l-1,c)
        eventButton(l-1,c+1)
        eventButton(l,c-1)
        eventButton(l,c+1)
        eventButton(l+1,c-1)
        eventButton(l+1,c)
        eventButton(l+1,c+1)
      }
    }
  }
}

/*if (i < colunas) {
    console.log('Primeira Linha');
}else if (i >= totalBotoes - colunas) {
    console.log('Ultima linha');
}
if (i%linhas == 0) {
  console.log('canto esquerdo');
}else if (i%linhas == 1) {
  console.log('canto direito');
}*/

/*
for( x = 0; x < linhas ; x++){acesso a matriz
  for( y = 0; y<colunas ; y++){
    matrizJogo.linha[x].colunas[y]=0
  }
}
*/

function compararNumeros(a, b) {
  return a - b;
}
