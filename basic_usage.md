# Basic Usage

## Some examples
    <div id="test" class="loading bar">This is the #test inner HTML</div>
    <div id="test2">This should be removed</div>
    <ul class="bar">
        <li class="blah" id="id1"></li>
		<li class="blah" id="id2"></li>
		<li class="blah" id="id3"></li>
		<li class="blah" id="id4"></li>
		<li class="blah" id="id5"></li>
	</ul>
    <script type="module" defer>
	    'use strict';
	    import * as J from './J$/dist/root.js'
        // assign J to a const ... I am using $
	    const  $ = J.$
	
		console.log("Does the #test node exist?",$('#test').exists())
		console.log($('#test').html().get())
		console.log("Does #test have the class loading?",$('#test').hasClass("loading"))
		$('#test').addClass("foo")
		$('#test').removeClass("bar")
		$('#test').append(`<input type="text" name="test" />`)
		$('#test2').remove()

        // loops
		let i = 0
		$('.bar li').each(function($t){
            // unlike jQuery, for now it's required that $(this) is replaced with $t
		    $t.append(`<input type="number" name="test" value="${i++}" />`)
		    if(i>2)
			    $t.css("color","red")
		    else  $t.css("color","yellow")
		    console.log($t.attr("class").get())
		})

        // ajax to your local server
        const YOURBASEAJAXURI = '/App_Ajax/AjaxRoute';
        const YOURDATAMETHOD = 'GetData';
        const ajax = new Ajax.Base(YOURBASEAJAXURI)
        .get(YOURDATAMETHOD, {
            param???: ???,
            ...  
            // ideally this will use the correct data type on this end using 
        }, function (message) {
            // do whatever
        })

        // jsonp to call the open weather api
        const YOURWEATHERAPIKEY = ''
        const CITY = ''
        const COUNTRY = ''
        const jsonp = new Ajax.Base(
			`https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&APPID=${YOURWEATHERAPIKEY}&units=imperial"	
			,{
				dataType:"jsonp"
			}).get("",{},function(json){
                // the resulting JSON
				console.log(json)
			})
    </script>
