    <div id="test" class="loading bar">This is the #test inner HTML</div>
    <div id="test2">This should be removed</div>
    <ul class="bar">
        <li  class="blah"></li>
        <li  class="blah"></li>
        <li  class="blah"></li>
        <li  class="blah"></li>
        <li  class="blah"></li>
	</ul>
    <script type="module" defer>
	    'use strict';
	    import  *  as  J  from  './J$/dist/root.js'
        // assign J to a const ... I am using $
	    const  $ = J.$
	
		console.log("Does the #test node exist?",$('#test').exists())
		console.log($('#test').html().get())
		console.log("Does #test have the class loading?",$('#test').hasClass("loading"))
		$('#test').addClass("foo")
		$('#test').removeClass("bar")
		$('#test').append(`<input type="text" name="test" />`)
		$('#test2').remove()
		let i = 0
		$('.bar li').each(function($t){
            // unlike jQuery, for now it's required that $(this) is replaced with $t
		    $t.append(`<input type="number" name="test" value="${i++}" />`)
		    if(i>2)
			    $t.css("color","red")
		    else  $t.css("color","yellow")
		    console.log($t.attr("class").get())
		})
    </script>
