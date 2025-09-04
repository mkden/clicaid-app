//initialize instance
var enjoyhint_instance = new EnjoyHint({

});
var enjoyhint_script_steps = [
    {
	 "next #vizov": 'С помощью этой кнопки Вы можете вызвать Экипаж охраны по ГЕО-локации или на сохраненный адрес в профилое.',
     shape : 'circle',
	 showSkip: false ,
	 arrowColor : '#000000'
    },
    {
        "next #aa": "Это &quot;Меню&quot; в нём присудствует Дополнительные функции такие как Вызов &quot;Адвоката&quot; или же<br/>Юридеческие услуги.<br/>Так же вызов &quot;службы спасения ЧС&quot;",
		  shape : 'circle',
		showSkip: false    
    },
      {
        "next #ab": "Дополнительная Информация и настройки",
		  shape : 'circle',
		showSkip: false    
    },
    {
        "next #ba": "Главная",
		  shape : 'circle',
		showSkip: false    
    },
     {
        "next #bb": "&quot;Сопровождение&quot; - здесь Вы сможете заказать услугу Сопровождение <br/>от пункта А до пункта Б с экипажем 1-им<br/> или несколько или &quot;Телохранителем&quot;<br/>Популярная услуга для<br/> сопровождения детей <br/>до школы или других учереждений",
		  shape : 'circle',
		showSkip: false    
    },
      {
        "next #bc": "Здесь Вы сможете пополнить свой баланс",
		  shape : 'circle',
		showSkip: false    
    },
	  {
        "next #bd": "Профиль. Здесь вы сможете настроить свой профиль, добавить Фотографию или добавить Адрес &quot;Дом&quot; &quot;Работа&quot; или &quot;Мама&quot;. Так сказать горячий адрес в случае если нужно вызвать на Ваш частый адрес группу Экипажа",
		  shape : 'circle',
		showSkip: false    
    },
    {
    "click #skip" : "Приложение работает <br/>пока только <br/>в городе Санкт-Петербург.<br/>Мы работаем над покрытием других городов России.<br/>Подробную информацию вы сможете узнать на нашем официальном сайте<br/>https://clicaid.ru/",
	onEnd: true,
	"skipButton" : {text: "Закрыть"}
	}

];
//set script config
enjoyhint_instance.set(enjoyhint_script_steps);