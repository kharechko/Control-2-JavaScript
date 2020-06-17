const colors = ['mediumaquamarine', 'seagreen', 'lightgreen', 'green', 'dodgerblue', 'royalblue','purple', 'rebeccapurple', 'rgb(20, 20, 82)', 'rgb(51, 0, 26)', '#ffff66', 'rgb(255, 204, 102)', 'rgb(255, 153, 51)', 'rgb(230, 115, 0)', 'rgb(204, 82, 0)', 'rgb(179, 71, 0)', '#f2f2f2', 'rgb(217, 217, 217)', 'rgb(153, 153, 153)', 'rgb(89, 89, 89)', 'black']
let getSel = n => document.querySelector(n);
let create = n => document.createElement(n);
let colors_block = getSel('.colors-block');
let showInvBd = function(n) {
    n.addClass('is-invalid')
}

$(document).ready(function() {
 let colContainer = getSel('.colContainer');
   colContainer.classList.add('colBox');
  let createColorBox = n => {
    for(let name of colors) {
        let box = create('div');
        box.classList.add('color-box')
        box.style.backgroundColor = name;
        n.appendChild(box);
        }
  return  n;
     }
createColorBox(colors_block);

$('.colors-block div').click(function() {
   $('.container').css('background', $(this).css('background-color'))
})

$('.file-btn').change(function(file){
  let  input = file.target;
  let reader = new FileReader();
  reader.onload = function(){
    let dataURL = reader.result;
    getSel('.container').style.backgroundImage = `url(${dataURL})`;
  }
  reader.readAsDataURL(input.files[0]);
})

createColorBox(colContainer);
const images = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg','images/5.jpg', 'images/6.jpg', 'images/7.jpg', 'images/8.jpg', 'images/9.jpg']
for(let i = 0; i < 9; i++) {
   let box = create('div');
   box.classList.add('img-box');
   box.style.backgroundImage = 'url(' + images[i] + ')';
   $('.images-block').append(box)
}

$('.images-block div').click(function() {
  $('.container').css('background', $(this).css('background'))
})

function createTbl() {
let tbl_box = create('div');
let table = create('table');
let tbody = create('tbody');
for (let i = 0; i < $('.count-tr').val(); i++) {
 tr = document.createElement('tr')
   for(let i = 0; i < $('.count-td').val(); i++) {
    td = create('td');
    td.innerText = 'TD';
    td.style = `width:${$('.td-width').val()}px; height:${$('.td-height').val()}px; border: ${$('.td-border').val()}px ${$('.style-sel').val()} ${$('.color-sel').val()}`;
    tr.appendChild(td)
  }
 tbody.appendChild(tr)
}
 table.appendChild(tbody)
  tbl_box.appendChild(table)
  getSel('#textarea').value += tbl_box.innerHTML
}

function createOlList() {
 let lst_box = create('div');
 let ol = create('ol');
 ol.style.display = 'block'
 ol.type = $('.ol-select').val()
   for(let i = 1; i <= $('.count_ol').val(); i++) {
    let li = create('li');
    li.innerText = `item ${i}`;
    li.classList.add('lst')
    ol.appendChild(li);
   }
 lst_box.appendChild(ol)
 getSel('#textarea').value += lst_box.innerHTML
}

function createUlList() {
  let lst_box = create('div');
  let ul = create('ul');
  ul.style.display = 'inline-block'
  ul.style.listStyleType = $('.ul-select').val();
  for(let i = 1; i <= $('.count_ul').val(); i++) {
   let li = create('li');
   li.classList.add('lst')
   li.innerText = `item ${i}`;
   ul.appendChild(li);
  }
 lst_box.appendChild(ul)
 getSel('#textarea').value += lst_box.innerHTML
}

$('.colContainer div').click(function() {
  $('.container').css('color', $(this).css('background-color'))
})

$('.showCreate').click(function() {
  $('.style-section').removeClass('dFlex').addClass('none'), $('.container').addClass('none');
  $('.create-section').removeClass('none').addClass('dFlex'), $('#textarea').removeClass('none')
})

  $('.showStyle').click(function() {
  $('.style-section').removeClass('none').addClass('dFlex'), $('.container').removeClass('none'), $('.container').html($('#textarea').val());
  $('.create-section').removeClass('dFlex').addClass('none'), $('#textarea').addClass('none')
})
const regPassword = /^admin$/;

$('.sign_btn').click(function(e) {
 let log = $('.login-input');
 let pass = $('.pass-input');
    $('.loginForm input').each(function(n) {
    if($(this).val() == 0) $('.val-message').text('Value is empty'), showInvBd($(this));
    else if (regPassword.test($(this).val()))  $(this).removeClass('is-invalid');
    else $('.val-message').text('check your email or password'), showInvBd($(this))
  })
 if(regPassword.test(log.val()) && regPassword.test(pass.val())) {
    $('.val-message').text('');
    $('.loginForm input').val('')
    $("#signModal").modal('hide')
   }
 })
const regTbl = /^\d+$/;

$('.createBtn').click(function() {
  let  values = [];
  $('#formT input').each(function() {
    values.push($(this).val());
    if(!regTbl.test($(this).val())) showInvBd($(this)),  $('.invalid-txt').removeClass('none')
    else $(this).removeClass('is-invalid')
  })  
  if($('.color-sel').val() == null) showInvBd($('.color-sel')), $('.invalid-txt').removeClass('none')
  else $('.color-sel').removeClass('is-invalid');
  if($('.style-sel').val() == null) showInvBd($('.style-sel')),  $('.invalid-txt').removeClass('none')
  else $('.style-sel').removeClass('is-invalid')
  if(values.every(n => regTbl.test(n)) && $('.color-sel').val() !== null && $('.style-sel').val() !== null) {
    createTbl() , 
    $('.tbl-rst').trigger('click')
    $("#modalTbl").modal('hide')
    }
  })

$('.tbl-rst').click(function() {
  $('#formT option').prop('selected', function(){return this.defaultSelected})
  $('#formT').trigger('reset');
  $('.invalid-txt').addClass('none')
  $('#formT input, #formT select').removeClass('is-invalid')
})

$('.olBtn').click(function() {
  if(!regTbl.test($('.count_ol').val())) showInvBd($('.count_ol'));
  else $('.count_ol').removeClass('is-invalid')
  if($('.ol-select').val() == '') showInvBd($('.ol-select'))
  else  $('.ol-select').removeClass('is-invalid')
  if(!regTbl.test($('.count_ol').val()) || $('.ol-select').val() == '') $('.inv_txt').removeClass('none')
  if(regTbl.test($('.count_ol').val()) && $('.ol-select').val() != '') {
    createOlList(),
    $('.reset-ol').trigger('click');
    $("#olModal").modal('hide'); 
   }
})

$('.reset-ol').click(function() {
  $('.formOl').trigger('reset');
  $('.formOl input, .formOl select').removeClass('is-invalid');
  $('.inv_txt').addClass('none')
})  

$('.ulBtn').click(function() {
  if(!regTbl.test($('.count_ul').val())) showInvBd($('.count_ul'));
  else $('.count_ul').removeClass('is-invalid')
  if($('.ul-select').val() == '') showInvBd($('.ul-select'))
  else  $('.ul-select').removeClass('is-invalid')
  if(!regTbl.test($('.count_ul').val()) || $('.ul-select').val() == '') $('.inv-text').removeClass('none')
  if(regTbl.test($('.count_ul').val()) && $('.ul-select').val() != '') {
    createUlList(), 
    $('.reset-ul').trigger('click');
    $("#ulModal").modal('hide');  
   }
 })

$('.reset-ul').click(function() {
  $('.formUl').trigger('reset');
  $('.formUl input, .formUl select').removeClass('is-invalid');
  $('.inv-text').addClass('none')
})

$('.decoration-section button').click(function() {
  let arr =  $(this).attr('class').split(' ');
  $('.container').toggleClass(`${arr[0]}` )
})

$('.align-section button').click(function() {
 let arr = $(this).attr('class').split(' ')
 $('.container').css('text-align', `${arr[0]}`)
})

  let lst_fnt_size = document.querySelectorAll('.lst_fnt_size');
lst_fnt_size.forEach(function(li) {
 li.style.height = `calc(${this.innerText} + 15px)`;
 li.style.fontSize = li.innerText;
 li.onclick = function(){getSel('.container').style.fontSize = this.innerText}
})

let lst_fnt_family = document.querySelectorAll('.lst_fnt_family');
  lst_fnt_family.forEach(function(li) {
  li.style.fontFamily = li.innerText;
  li.style.height = '30px';
  li.onclick = function() {
  getSel('.container').style.fontFamily = this.innerText
   }
  })
})

   