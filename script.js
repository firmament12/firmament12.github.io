$(function(){
  
// スムーススクロール
  $('a[href^="#"]').not('.design>li>a').on('click',function() {
    var href= $(this).attr('href');
    var target = $(href);
    var position = target.offset().top;
    $('body,html').animate({scrollTop:position}, 300, 'swing');
    return false;
  });
  
// タブパネル
  var clickEventType = (( window.ontouchstart!==null ) ? 'click':'touchend');
  var $isScrolling = 0 ;
  var $timeoutId ;
  $(document).on( "scroll", function () {
      $isScrolling = 1 ;
      clearTimeout( $timeoutId );
    $timeoutId = setTimeout( function () {
      $isScrolling = 0 ;
    }, 200 );
  });
  $('#tab1>li>a').on(clickEventType,function(){
    if ($isScrolling === 0) {
      $('*').removeClass('active2');
      $(this).parent('li').addClass('active1').siblings('li').removeClass('active1');
      $('#tab2>li>a').css('border-right','1px solid #ccc');
      var target = $(this).attr('href');
      $(target).addClass('active1').siblings('.panel').removeClass('active1');
      return false;
    }
  });
  $('#tab2>li>a').on(clickEventType,function(){
    if ($isScrolling === 0) {
      $('*').removeClass('active1');
      $(this).parent('li').addClass('active2').siblings('li').removeClass('active2');
      $('#tab2>li>a').css('border-right','1px solid #fff');
      var target = $(this).attr('href');
      $(target).addClass('active2').siblings('.panel').removeClass('active2');
      return false;
    }
  });
  $('.other>a,.basic>a').on(clickEventType,function(){
    if ($isScrolling === 0) {
      $('#tab2').css('justify-content','space-between');
      return false;
    }
  });
  $('.design>li>a').not('.other>a,.basic>a').on(clickEventType,function(){
    if ($isScrolling === 0) {
      $('#tab2').css('justify-content','center');
      return false;
    }
  });
  
// サイコロ
  document.getElementById('sai').insertAdjacentHTML('afterbegin',
   '<img src="img/dice/dice1.png" alt="dice1"><img src="img/dice/dice2.png" alt="dice2"><img src="img/dice/dice3.png" alt="dice3"><img src="img/dice/dice4.png" alt="dice4"><img src="img/dice/dice5.png" alt="dice5"><img src="img/dice/dice6.png" alt="dice6">');
  var dice =
   ['<img src="img/dice/dice1.png" alt="dice1">',
    '<img src="img/dice/dice2.png" alt="dice2">',
    '<img src="img/dice/dice3.png" alt="dice3">',
    '<img src="img/dice/dice4.png" alt="dice4">',
    '<img src="img/dice/dice5.png" alt="dice5">',
    '<img src="img/dice/dice6.png" alt="dice6">'];
  $('#dice').on(clickEventType,function(event){
    event.preventDefault();
    if ($isScrolling === 0) {
      var rnd = Math.floor(Math.random()*dice.length);
      var shuffle = dice[rnd];
      if (dice.length === 6) {
        switch (rnd) {
            case 0:
              rnd++;
              shuffle = dice[rnd];
              $('#dice').html(shuffle);
            break;
            default:
              $('#dice').html(shuffle);
            break;
        }
            dice.splice(rnd,1);
            localStorage['add'] = shuffle;
      } else {
            $('#dice').html(shuffle);
            dice.splice(rnd,1);
            dice.splice(4,0,localStorage['add']);
            localStorage['add'] = shuffle;
        }
    }
  });
  
// コードを表示
  $('#list').load('list.txt');
  
// アニメ
//  $(window).scrollTop(0);
//    $(".mainSite").css("display", "none");
//    $(".mainSite").css({opacity:'0'});
//    setTimeout(function(){
//      $(".mainSite").css("display", "block");
//      $(".mainSite").stop().animate({opacity:'1'},400);
//    },3000);
//    setTimeout(function(){
//      $(".anime").slideUp(1000);
//    },2000);
  
});
