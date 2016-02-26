'use strict';
    var userInfo ={};
    userInfo.email = '';
    userInfo.password = '';
    userInfo.firstname = '';
    userInfo.lastname = '';
    userInfo.city = '';
    userInfo.cityId = '1';
    userInfo.payTo = '';

    var studios = {};
    var studio = {};
    var train = {};
    var classes = {};
    var schedule = [];
    var myClasses = {};
        myClasses.future = [];
        myClasses.past = [];
    var myFutureTrain = {}; //for fast conformity userId(id in user list) and classId

    var valTime = ['0:00', '23:00']; // remember no active yet filter
    var metroFilter = [];
    var typeFilter = [];

    var defaultFilter = {
        timeFrom: '0:00',
        timeTo: '23:00',
        metro: [],
        typeAct: []
    };
    var filter = {
        timeFrom: '0:00',
        timeTo: '23:00',
        metro: [],
        typeAct: []
    };//first filter
    var isClassesloaded = false;
    var isStudioloaded = false;
    var isClassesTypeloaded = false;
    var isTypeInfoLoaded = false;
    var isMetroInfoLoaded = false;
    var class_id = 0;
    var currentDate = new Date();
    var weekDays= [
        {
            sh:'Вс',
            lng:'Воскресенье'
        },
        {
            sh:'Пн',
            lng:'Понедельник'
        },
        {
            sh:'Вт',
            lng:'Вторник'
        },
        {
            sh:'Ср',
            lng:'Среда'
        },
        {
            sh:'Чт',
            lng:'Четверг'
        },
        {
            sh:'Пт',
            lng:'Пятница'
        },
        {
            sh:'Сб',
            lng:'Суббота'
        }
    ];
    var months= ('Января Февраля Марта Апреля Мая Июня Июля Августа Сентября Октября Ноября Декабря').split(' ');

    var pickerInline;
    var image_red = {
        url: 'img/geo_red_icon@2x.png',
        size: new google.maps.Size(38, 52),
        scaledSize: new google.maps.Size(19, 26),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 52)
    };
    var image_green = {
        url: 'img/geo_green_icon@2x.png',
        size: new google.maps.Size(38, 52),
        scaledSize: new google.maps.Size(19, 26),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 52)
    };

var myApp = new Framework7({
    template7Pages: true,
    init: false,
    swipeBackPage: false,
    // cacheIgnore: ["search.html"],
    preloadPreviousPage: true,
    animatePages: true,
});

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

myApp.onPageBeforeInit('index', function (page) {
    filter.timeTo = defaultFilter.timeTo;
    filter.timeFrom = defaultFilter.timeFrom;
    valTime[0] = filter.timeFrom;
    valTime[1] = filter.timeTo;
    filter.typeAct = [];
    for (var i = 0; i < defaultFilter.typeAct.length; i++) {
        filter.typeAct[i] = defaultFilter.typeAct[i];
    };
    filter.metro = [];
    for (var i = 0; i < defaultFilter.metro.length; i++) {
        filter.metro[i] = defaultFilter.metro[i];
    };
    // filter to default
    var valid = ($$('input')[0].validity.valid) && ($$('input')[1].validity.valid);
    // $$('input')[0].val='';
    console.log(valid);
    mainView.hideNavbar();
    $$('.status-overlay').css({display:'none'});
    $$('input').on('change', function(){
        if (!$$(this)[0].validity.valid) {
            myApp.alert('Ошибка в поле email', 'ClassBoom');
        }
        if ($$(this)[0].value=='') {
            myApp.alert('Заполните все поля для авторизации', 'ClassBoom');
        }
    });
    $$('.login-ok').on('click',function(){
        valid = ($$('input')[0].validity.valid) && ($$('input')[1].validity.valid);
        if (valid) {
            var form = myApp.formGetData('login');
            console.log(form);
            userInfo.email = form.login;
            userInfo.password = form.password;
            if (form.login==''|| form.password=='') {
                myApp.alert('Заполните все поля для авторизации', 'ClassBoom');
            } else        askingToken('http://classboom.ru/token',form.login,form.password, initializing); //grant_type
        }
        else    myApp.alert('Поле email содержит недопустимые значения', 'ClassBoom');
    });
});

myApp.init(); //important !

var initializing = function(data) {

}

// if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
//   document.addEventListener('deviceready', init, false);
// } else {
//   window.addEventListener('load', init, false);
// }
