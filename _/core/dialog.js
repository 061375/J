/** 
* @title Dialog
* @about wrapper to use the new HTML dialog tab
* @author Jeremy Heminger <jeremy.heminger@aquamor.com>, <contact@jeremyheminger.com>
* @date June 19, 2023
* @last_update September 6, 2023
* 
* 
* 
* @version 2.0.0.0
* */
export default {}
export class Dialog
{
	static bgcolor()  { return "#000000bd" }
	
	static dialogid(hash = false) { 
		let id = "aq_dialog_"
		return (hash ? "#" + id : id) 
	}
	
	///

	/** 
	 * only allows on dialog on the screen
	 * */
	static Reset()
	{
		if(typeof document.getElementById(Dialog.dialogid())?.innerHTML !== 'undefined')
			document.getElementById(Dialog.dialogid()).remove()
	}
	static Close(callback)
	{
		const d = document.getElementById(Dialog.dialogid())
		d.close()
		if(typeof callback === 'function')
			callback()
	}
	static isOpen()
	{
		return (document.getElementById(Dialog.dialogid())?.open ? true : false)
	}
	static DefaultCSS()
	{
		return `
		${Dialog.dialogid(true)} .loading_fader {
			width: 100%;
		    height: 100%;
		    position: absolute;
		    background: #000000a8;
		    left: 0;
		    top: 0;
		    z-index: 9998;
		}
		${Dialog.dialogid(true)} .loading_message {
			color: #fff;
			clear: both;
		}
		${Dialog.dialogid(true)} .loading_dialog {
		    position: absolute;
		    left: 0px;
		    top: 0px;
		    z-index: 9999;
		    margin: 25% 0;
		    display: flex;
		}
		${Dialog.dialogid(true)} .loading_dialog .dcontainer {
		    background: #191f26;
		    border-radius: 30px;
		    padding: 20px 16px 15px 16px;
		    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.42);
		}
		${Dialog.dialogid(true)} .loading_dialog img {
		    width: 100%;
		}
		dialog::backdrop { background: ${Dialog.bgcolor()};}
		`
	}
	static Preloader(m = '') {
		return `
		<div class="loading_fader hidden dialog"></div>
		<div class="loading_dialog hidden flex dialog">
            <div class="c1"></div>
            <div class="c5">
                <div class="dcontainer">
                    <div class="flex">
                    	<div class="c2">
                    		<img src="/Assets/images/loading_water2.gif" style="margin-top: 15%">
                    	</div>
                        <div class="c1"></div>
                        <div class="c6">
                        	<img src="/Assets/images/aq-logo-white.png" style="margin-top: 15%">
                        </div>
                    </div>
                    <p class="loading_message">
						${m}
                    </p>
                </div>
            </div>
            <div class="c1"></div>
        </div>`
	}
	/** 
	 * a simple replacement for the default browser alert
	 * @params {string} txt 
	 * @params {object} p { 
	 * 		title: replaces the default "Alert!" title
	 * 		callback: 				a callback function that runs as soon as the dialog is created
	 * 		callback_params: 		parameters to pass to the callback
	 * 		callback_ok: 			callback to run on click OK
	 * 		callback_ok_params: 	callback parameters
	 * 		style:  				CSS
	 * }
	 * @returns {void}
	 * */
	static Alert(txt, p = {})
	{
		Dialog.Reset()
		if(p?.title === undefined) p.title = "Alert!"
		const 	t = document.createElement("dialog")
				t.setAttribute("id",Dialog.dialogid())
				t.innerHTML = Dialog.Preloader() + `
						<div>
							<label for="alert">
								<h4><strong>${p?.title}</strong></h4>
								<!--input type="text" disabled value="${txt}"-->
								${txt}
							</label>
						</div>					
						<div>
							<button class="ok">Ok</button>
						</div>
					<style>
	                   ${Dialog.DefaultCSS()}
	                   ${p?.style}
					</style>
				`;
			document.body.appendChild(t)
		let d = document.getElementById(Dialog.dialogid())

		if(typeof p?.callback === 'function')
			p.callback(p?.callback_params)
		document.getElementById(Dialog.dialogid()).getElementsByClassName("ok")[0].addEventListener("click",(e) => {
			e.preventDefault()
			if(typeof p?.callback_ok === 'function')
				p.callback_ok(p?.callback_ok_params)
			d.close()
		})
		d.showModal()
	}
	/** 
	 * a simple replacement for the default browser confirm
	 * @params {string} txt 
	 * @params {object} p { 
	 * 		callback: 				a callback function that runs as soon as the dialog is created
	 * 		callback_params: 		parameters to pass to the callback
	 * 		callback_ok: 			callback to run on click OK
	 * 		callback_ok_params: 	callback parameters
	 * 		style:  				CSS
	 * }
	 * @returns {void}
	 * */
	static Confirm(txt, p = {})
	{
		Dialog.Reset()
		const 	t = document.createElement("dialog")
				t.setAttribute("id",Dialog.dialogid())
				t.innerHTML = Dialog.Preloader() + `
						<div>
							<label for="confirm">
								<h4><strong>${txt}</strong></h4>
							</label>
						</div>					
						<div class="flex">
							<button class="ok c2">Ok</button>
							<div class="c1"></div>
							<button class="cancel c2">Cancel</button>
						</div>
					<style>
	                   ${Dialog.DefaultCSS()}
	                   ${p?.style}
					</style>
				`;
			document.body.appendChild(t)
		
		let d = document.getElementById(Dialog.dialogid())

		if(typeof p?.callback === 'function')
			p.callback(p?.callback_params)
		document.getElementById(Dialog.dialogid()).getElementsByClassName("ok")[0].addEventListener("click",(e) => {
			e.preventDefault();
			if(typeof p?.callback_ok === 'function')
				p.callback_ok(p?.callback_ok_params)
			d.close()
		})
		document.getElementById(Dialog.dialogid()).getElementsByClassName("cancel")[0].addEventListener("click",(e) => {
			e.preventDefault()
			d.close()
		})
		d.showModal()
	}
	/** 
	 * a simple replacement for the default browser prompt
	 * @params {string} txt 
	 * @params {object} p { 
	 * 		callback: 				a callback function that runs as soon as the dialog is created
	 * 		callback_params: 		parameters to pass to the callback
	 * 		callback_ok: 			callback to run on click OK
	 * 		callback_ok_params: 	callback parameters
	 * 		type: 					the HTML input type
	 * 		attr: 					object attributes for the input {key: value}
	 * 		style:  				CSS
	 * }
	 * @returns {void}
	 * */
	static Prompt(txt, p = {})
	{
		if(p?.type === undefined) 
			p.type = "text"
		let s_types = ["text","number","color","date","email","password","range","tel"]
		if(s_types.indexOf(p.type) == -1)
		{
			let er = "There was an error creating the prompt dialog.\nOnly these input types are currently supported: " + s_types
			console.log(er)
			alert(er)
			return
		}
		let attr = ""
		if(p?.attr !== undefined)
		{
			for (var prop in p.attr) {
			    if (Object.prototype.hasOwnProperty.call(p.attr, prop)) {
			        attr += prop + '="' + p.attr[prop] + '" '
			    }
			}
		}
		Dialog.Reset()
		const   t = document.createElement("dialog")
				t.setAttribute("id",Dialog.dialogid())
				t.innerHTML = Dialog.Preloader() + `
					<div>
						<label for="prompt">
							<h4><strong>${txt}</strong></h4>
							<input type="${p.type}" ${attr} id="_aq_prompt_result" autocomplete="off">
						</label>
					</div>					
					<div class="flex">
						<button class="ok c2">Ok</button>
						<div class="c1"></div>
						<button class="cancel c2">Cancel</button>
					</div>
					<style>
						#_aq_prompt_result {
							width:100%;
						}
	                   ${Dialog.DefaultCSS()}
	                   ${p?.style}
					</style>
				`;
			document.body.appendChild(t)
		let d = document.getElementById(Dialog.dialogid())

		if(typeof p?.callback === 'function')
			p.callback(p?.callback_params)
		document.getElementById(Dialog.dialogid()).getElementsByClassName("ok")[0].addEventListener("click",(e) => {
			e.preventDefault();
			if(typeof p?.callback_ok === 'function')
				p.callback_ok(
					document.getElementById("_aq_prompt_result").value,
					p?.callback_ok_params)
			d.close()
		})
		document.getElementById(Dialog.dialogid()).getElementsByClassName("cancel")[0].addEventListener("click",(e) => {
			e.preventDefault()
			d.close()
		})
		d.showModal()
	}
	/** 
	 * Pop-up dialog container
	 * @params {string} title 
	 * @params {string} form
	 * @params {object} p { 
	 * 		callback: 				a callback function that runs as soon as the dialog is created
	 * 		callback_params: 		parameters to pass to the callback
	 * 		style:  				CSS
	 * }
	 * @returns {void}
	 * */
	static Container(title, form, p = {})
	{
		Dialog.Reset()
		const 	t = document.createElement("dialog")
				t.setAttribute("id",Dialog.dialogid())
				t.innerHTML = Dialog.Preloader() + `
						<div class="flex header">
							<div class="c5 title">${title}</div>
							<div class="c1"></div>
							<div class="c1">
								<i class="close fas fa-window-close fltright"></i>
							</div>
						</div>					
						<div class="form">
							${form}
						</div>
					<style>
	                   ${Dialog.DefaultCSS()}
	                   ${p?.style}
					</style>
				`;
			document.body.appendChild(t)
		let d = document.getElementById(Dialog.dialogid())

		if(typeof p?.callback === 'function')
			p.callback(p?.callback_params)
		document.getElementById(Dialog.dialogid()).getElementsByClassName("close")[0].addEventListener("click",(e) => {
			e.preventDefault()
			d.close()
		})
		d.showModal()
	}
	/** 
	 * Pop-up dialog container using HTML template tag
	 * @params {string} title 
	 * @params {string} template_id $target ID of an HTML <template>
	 * @params {object} p { 
	 * 		callback: 				a callback function that runs as soon as the dialog is created
	 * 		callback_params: 		parameters to pass to the callback
	 * 		style: 					CSS 
	 * }
	 * @returns {void}
	 * */
	static TContainer(title, template_id, p = {})
	{
		Dialog.Reset()
		const 	t = document.createElement("dialog")
				t.setAttribute("id",Dialog.dialogid())
				t.innerHTML = Dialog.Preloader() + `
						<div class="flex header">
							<div class="c5 title">${title}</div>
							<div class="c1"></div>
							<div class="c1">
								<i class="close fas fa-window-close fltright"></i>
							</div>
						</div>					
						<div class="form"></div>
						<style>
							${Dialog.DefaultCSS()}
							${p?.style}
						</style>
				`;
		document.body.appendChild(t)
		let tmp = document.getElementById(template_id)
		let clone
		if(p?.previous !== undefined && p?.previous != null)
		{
			clone = p.previous
		}else{
        	clone = tmp.content.cloneNode(true)
			
		}
		let d = document.getElementById(Dialog.dialogid())
		d.getElementsByClassName("form")[0].appendChild(clone)
		if(typeof p?.callback === 'function')
			p.callback(p?.callback_params)
		document.getElementById(Dialog.dialogid()).getElementsByClassName("close")[0].addEventListener("click",(e) => {
			e.preventDefault()
			d.close()
		})
		d.showModal()
	}
	/** 
	 * Pop-up dialog container whose data comes from an AJAX call
	 * @params {string} aq ( the main Aquamor class ) 
	 * @params {string} method
	 * @params {string} url
	 * @params {object} p { 
	 * 		callback: 				a callback function that runs as soon as the dialog is created
	 * 		callback_params: 		parameters to pass to the callback
	 * }
	 * @returns {void}
	 * */
	static AjaxContainer(aq, method, url, p = {})
	{
		let params = (p?.params === undefined ? {} : p?.params)
		let title = (p?.title === undefined ? "" : p?.title)
		Dialog.Reset()
		//Preloaders.UpdateMessage("Please Wait...",null,"show")
		aq.get(method, params , function (response) {  
		    //Preloaders.UpdateMessage("",null,"hide")
		    const 	t = document.createElement("dialog")
					t.setAttribute("id",Dialog.dialogid())
					t.innerHTML = Dialog.Preloader() + `
							<div class="flex header">
								<div class="c5 title">${title}</div>
								<div class="c1"></div>
								<div class="c1">
									<i class="close fas fa-window-close fltright"></i>
								</div>
							</div>					
							<div class="form">
								${response}
							</div>
						<style>
		                   ${Dialog.DefaultCSS()}
		                   ${p?.style}
						</style>
					`;
				document.body.appendChild(t)
			let d = document.getElementById(Dialog.dialogid())
			document.getElementById(Dialog.dialogid()).getElementsByClassName("close")[0].addEventListener("click",(e) => {
				e.preventDefault()
				d.close()
			})
			d.showModal()
		},p?.datatype, p?.contentType, url)
	}
	/**
	 * 
	 * @param {*} m 
	 */
	static Loading(m)
	{
		Dialog.Container("",Dialog.Preloader(m),{
			style:`
				${this.dialogid} .header {
					display: none;
				}	
			`
		})
	}
}