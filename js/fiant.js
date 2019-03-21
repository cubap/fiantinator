import {
	Deer
} from "./deer.js"

import {
	ConvertRegnal
} from "./regnal-conversion.js"

const SCREEN = {}
SCREEN.annotations = {}
SCREEN.targets = {}
SCREEN.promises = []
SCREEN.suppress = ["__rerum"]
const URLS = {}
URLS.BASE_ID = "http://devstore.rerum.io/v1"
URLS.CREATE = "http://tinydev.rerum.io/app/create"
URLS.UPDATE = "http://tinydev.rerum.io/app/update"
URLS.QUERY = "http://tinydev.rerum.io/app/query"
URLS.SINCE = URLS.BASE_ID + "/since"
const KEYS = "at-type"
const SOURCE = "oa-source"
const MOTIVATION = "oa-motivation"
const COLLECTIONPAGE = "Fiantinator"
// ?collection=http://devstore.rerum.io/v1/id/5c59b2c1e4b0aa073f23ac5e
function loadCollection() {
	let params = (new URL(document.location)).searchParams
	let collectionId = params.get("collection") || COLLECTIONPAGE
	try{
		collection.innerText = collectionId
	} catch(err) {
		return false
	}
	collection.setAttribute("data-id", collectionId)
	ux.innerText = ""
	let queryObj = {
		body: {
			targetCollection: collectionId
		}
	}
	fetch(URLS.QUERY, {
		method: "POST",
		mode: "cors",
		body: JSON.stringify(queryObj)
	}).then(response => response.json())
	.then(function (pointers) {
		let list = []
		pointers.map(tc => list.push(fetch(tc.target).then(response=>response.json())))
		return Promise.all(list)
	})
	.then(function (list) {
		let listObj = {
			name: collectionId,
			itemListElement: list
		}
		try {
			listObj["@type"] = list[0]["@type"] || list[0].type || "ItemList"
		} catch (err) {}
		renderList(listObj)
	})
}

Array.from(document.getElementsByTagName("deer-view"))
.concat(Array.from(document.getElementsByClassName("deer-view"))).forEach(elem=>{
	elem.addEventListener('filed-annotation', function (event) {
	if (event.target_object === elem.getAttribute("data-id")) {
		renderObject(undefined,elem)
	}
	})
})

async function render(obj = {},elem=ux) {
	let wait = await aggregateAnnotations(obj)
	let type = Array.isArray(obj["@type"]) ? obj["@type"][0] : obj["@type"] // TODO: subroutine to detect
	switch (type) {
		case "sc:Canvas":
			SCREEN.canvas = obj
			canvasView.setAttribute("data-id", obj["@id"])
			elem.setAttribute("data-id", obj["@id"])
			renderCanvasImage(SCREEN.canvas)
			break
		case "sc:Manifest":
			SCREEN.manifest = obj
			manifestNav.setAttribute("data-id", obj["@id"])
			renderManifest(SCREEN.manifest)
			let presi = (obj["@context"] && obj["@context"].indexOf("/3/context.json") > -1) ? 3 : 2
			SCREEN.canvas = (presi === 3) ?
				fromIdInArray(SCREEN.manifest.start.id, SCREEN.manifest.items) || SCREEN.manifest.items[0] :
				fromIdInArray(SCREEN.manifest.startCanvas, SCREEN.manifest.sequences[0].canvases) || SCREEN.manifest.sequences[0].canvases[0]
				elem.setAttribute("data-id", SCREEN.canvas["@id"] || SCREEN.canvas.id || "")
			let canvasList = (presi === 3) ? SCREEN.manifest.items : SCREEN.manifest.sequences[0].canvases
			SCREEN.promises.push(canvasList)
			aggregateAnnotations()
			canvasList.map(item => {
				let id = item["@id"]
				try {
					if (!localStorage.getItem(id)) {
						localStorage.setItem(id, JSON.stringify(item))
					}
					let stored = JSON.parse(localStorage.getItem(id))
					if (!(stored.items || stored.images)) {
						throw "Please expand this item"
					}
				} catch (err) {
					fetch(id).then(response => response.json()).catch(error => showMessage(error))
						.then(obj => localStorage.setItem(obj["@id"], JSON.stringify(obj)))
				}
			})
			localStorage.setItem(obj["@id"], JSON.stringify(obj))
			renderCanvasImage(SCREEN.canvas)
			break;
		case "ItemList":
			renderList(obj)
	}
}

function renderList(list) {
	function setIcon(item) {
		let type = item["@type"] || item.type
		let icon = () => {
			if (type) {
				if (/(list|collection)/gi.test(type)) return "list"
				if (/(person|user)/gi.test(type)) return "user"
				if (/(organization)/gi.test(type)) return "sitemap"
				if (/(application|software)/gi.test(type)) return "laptop-code"
			}
			return "angle-right"
		}
		return `<i class="fas fa-${icon()}"></i>`
	}
	if(list.itemListElement.length===0){
		list.itemListElement = ["Empty List"]
	}
	collection.innerHTML = `<h2>${list.name||list.label||"List"}</h2>
		<ul style="list-style: outside none; padding:0;">
			${list.itemListElement.reduce((a,b)=>a+=`<li>
			<a href="#${b.id||b["@id"]}">${setIcon(b)} ${b.name || b.label || b["@type"] || b }</a>
			</li>
			`,``)}
			</ul>`
	let update = (function () {
		try {
			if (list.__rerum.history.next.length > 0) {
				let id = list["@id"].split("/").pop()
				fetch(URLS.SINCE + "/" + id).then(response => response.json())
					.then(arr => {
						arr.sort((a, b) => a.__rerum.createdAt - b.__rerum.createdAt)
						let buttons = document.createElement("span")
						buttons.innerHTML = arr.reduce((a, b) => a += `<button onclick="document.location.href='?collection=${b['@id']}'">
							Load updated list @${b['@id'].split("/").pop()}
						</button>`, ``)
						collection.append(buttons)
					})
			}
		} catch (err) {
			// silent fail
		}
	})()
}

/**
 * Observer callback for rendering newly loaded objects. Checks the
 * mutationsList for "deep-object" attribute changes.
 * @param {Array} mutationsList of MutationRecord objects
 */
async function newObjectRender(mutationsList) {
	for (var mutation of mutationsList) {
		if (mutation.attributeName === "data-id") {
			let id = mutation.target.getAttribute("data-id")
			if (id === "null") return
			let obj = {}
			try {
				obj = JSON.parse(localStorage.getItem(id))
			} catch (err) {}
			if (!obj || !(obj.items || obj.images || obj.sequences)) {
				obj = await fetch(id).then(response => response.json()).catch(error => showMessage(error))
				if (obj) {
					localStorage.setItem(obj["@id"] || obj.id, JSON.stringify(obj))
				} else {
					return false
				}
			}
			renderObject(obj, ux)
		}
	}
}

function fromIdInArray(id, array) {
	let item
	for (let i of array) {
		if (i["@id"] === id || i.id === id) {
			return i
		}
	}
	return null
}

/**
 * Execute query for any annotations in RERUM which target the
 * id passed in. Promise resolves to an array of annotations.
 * @param {String} id URI for the targeted entity
 */
async function findByTargetId(id, noFetch) {
	let obj = {
		target: id
	}
	if (!noFetch) {
		return await fetch(URLS.QUERY, {
				method: "POST",
				body: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(response => response.json())
			.then(matches => matches.map(fileAnnotation))
	}
	return SCREEN.targets[target]
}

async function aggregateAnnotations(obj = {}) {
	// otherContent, annotations, queried (all commenting or describing)
	if (obj.otherContent) {
		SCREEN.promises = obj.otherContent.concat(SCREEN.promises)
	}
	if (obj.annotations) {
		SCREEN.promises = obj.annotations.concat(SCREEN.promises)
	}
	let id = obj["@id"] || obj.id
	if (id) {
		SCREEN.promises = SCREEN.promises.concat(findByTargetId(id).catch(err => []))
	}
	if (SCREEN.promises.length === 0) return true
	let entry = SCREEN.promises.shift()
	switch (typeof entry) {
		case "string":
			let resource = fetch(entry).then(response => response.json())
			SCREEN.promises.push(resource)
			break
		case "object":
			if (Array.isArray(entry)) {
				if (entry.length > 0) {
					SCREEN.promises = SCREEN.promises.concat(entry)
				}
				return aggregateAnnotations()
			} else {
				if (typeof entry.then === "function") {
					let result = await entry
					SCREEN.promises.unshift(result)
					return aggregateAnnotations(result)
				}
				switch (entry["@type"] || entry.type) {
					case "sc:Manifest":
					case "Manifest":
					case "sc:Canvas":
					case "Canvas":
						return aggregateAnnotations(entry)
					case "sc:AnnotationList":
					case "AnnotationList":
						if (entry.resources) {
							SCREEN.promises = entry.resources.concat(SCREEN.promises)
						} else {
							SCREEN.promises.push(fetch((entry["@id"])).then(response => response.json()).catch(err => {}))
						}
						return aggregateAnnotations()
					case "AnnotationPage":
						if (entry.items) {
							SCREEN.promises = entry.items.concat(SCREEN.promises)
						} else {
							SCREEN.promises.push(fetch((entry.id)).then(response => response.json()).catch(err => {}))
						}
						return aggregateAnnotations()
					case "Annotation":
					case "oa:Annotation":
						// Annotation found!
						fileAnnotation(entry)
						return aggregateAnnotations()
					default: // just discard and move on
						return aggregateAnnotations()
				}
			}
	}
}

function fileAnnotation(annotation) {
	let motivation = annotation.motivation || annotation["oa:Motivation"]
	let category
	if (motivation.indexOf("describing") > -1) {
		category = "description"
	} else if (motivation.indexOf("commenting") > -1) {
		category = "commentary"
	} else if (motivation.indexOf("classifying") > -1) {
		category = "classification"
	} else if (motivation.indexOf("linking") > -1) {
		category = "links"
	} else if (motivation.indexOf("tagging") > -1) {
		category = "tags"
	} else if (motivation.indexOf("transcribing") > -1) {
		category = "transcription"
	} else {
		category = undefined
		// I don't know what this is; let's move on.
		return false
	}
	let id = annotation.id || annotation["@id"]
	let target = annotation.on || annotation.target
	try {
		new URL(target)
		let index = target.indexOf("#")
		if (index > -1) {
			target = target.substring(0, index)
		}
	} catch (err) {
		// not a URL-style id, move on
	}
	localStorage.setItem(id, JSON.stringify(annotation))
	SCREEN.annotations[id] = annotation
	if (SCREEN.targets[target] && SCREEN.targets[target][category]) {
		if (SCREEN.targets[target][category].indexOf(id) === -1) {
			SCREEN.targets[target][category].push(id)
		} else {
			// It is already there, calm down.
		}
	} else {
		let toAssign = {}
		toAssign[category] = [id]
		SCREEN.targets[target] = toAssign
	}
	let announcement = new CustomEvent("filed-annotation", {
		target_object: target,
		category: category,
		anno_id: id
	})
	document.dispatchEvent(announcement)
	return annotation
}

async function renderObject(object,within) {
	if (!within) return false
	if (!object || (typeof object === "object")) {
		object = await fetch(within.getAttribute("data-id")).then(response => response.json())
	}
	let tmplData = `<h2>${object.name || object.label || "[ unlabeled ]"}</h2>
	<a href="entry.html#${object["@id"]}">Edit</a>`
	let presi = (object["@context"] && object["@context"].indexOf("/3/context.json") > -1) ? 3 : 2
	tmplData += object.metadata ? `<dl>${object.metadata.reduce(function(a,b){
			let value = getValue(b)
			if(value.trim().length>0) {
				a+=`<dt>${b.label}</dt><dd>${value}</dd>`
			} 
			return a
		},`
	`)}</dl>`: ``

	let wait = await aggregateAnnotations(object)

	for (let key in SCREEN.targets[within.getAttribute("data-id")]) {
		// categories expected: description, commentary, classification, links, tags, transcription
		let list = `<dl class="meta-${key}">`
		object = expand(object, SCREEN.targets[within.getAttribute("data-id")][key])
		// for (let id of SCREEN.targets[within.getAttribute("data-id")][key]) {
		// 	let annotations = SCREEN.annotations[id].body
		// 	if(!annotations) {continue}
		// 	if(!Array.isArray(annotations)) { annotations = [annotations] }
		// 	for(let i in annotations) {
		// 		for(let k in annotations[i]) {
		// 			let label = annotations[i][k].label || annotations[i][k].type || annotations[i][k]['@type'] || annotations[i][k].name || annotations[i][k].title || k
		// 			let value = getValue(annotations[i][k])
		// 			if(value.trim().length>0) {
		// 				list += `<dt>${label}</dt><dd>${value}</dd>`
		// 			}
		// 		}
		// 	}
		// }
		for (let key in object) {
			if(SCREEN.suppress.indexOf(key)>-1) {continue}
			let label = object[key].label || object[key].name || object[key].title|| object[key].type || object[key]['@type']  || key
			let value = getValue(object[key])
			try {
				if ((value.image || value.trim()).length > 0) {
					list += (label === "depiction") ? `<img title="${label}" src="${value.image || value}" deer-source="${object[key].source}">` : `<dt deer-source="${object[key].source}">${label}</dt><dd>${value.image || value}</dd>`
				}
			} catch (err) {
				// Some object maybe or untrimmable somesuch
				// is it object/array?
				if(Array.isArray(value)){
					value.forEach(val,index=>{
						let name = val.label || val.name || val.title || val.type || val['@type'] || label+index
						list+= (val["@id"]) ? `<dd><a href="#${val["@id"]}">${name}</a></dd>` : `<dd>${name}</dd>`
					})
				}
			}
		}
		tmplData += (list.includes("<dd>")) ? `<h3>${key}</h3>
			${list}</dl>` : ``
	}
	tmplData += buildTranscription(object)
	let fields = CONFIG.fields
	// tmplData += descriptionFormTemplate(fields)
	within.innerHTML = tmplData
	// within.getElementsByTagName("form")[0].onsubmit = saveAnnotations
	// dirtyWatch(within.querySelectorAll("input, textarea"))
}

function buildTranscription(object) {
	let tmplData = `<label>transcription</label>`
	let presi = (object["@context"] && object["@context"].indexOf("/3/context.json") > -1) ? 3 : 2
	let id = object.id || object["@id"]
	if (!SCREEN.targets[id]) {
		return ``
	}
	let text = ``
	if (!SCREEN.targets[id].transcription) return ``
	for (let aid of SCREEN.targets[id].transcription) {
		let annotation = SCREEN.annotations[aid].resource
		let value = getValue(annotation, ["chars", "cnt:chars"])
		if (value.trim().length > 0) {
			text += `${value}\n`
		}
	}
	if (text.length > 1) {
		return `${tmplData} <pre>${text}</pre>`
	} else {
		return ``
	}
}

function renderCanvasImage(canvas) {
	canvasView.classList.add("blur")
	let elemWidth = canvasView.offsetWidth
	let elemHeight = elemWidth * (canvas.height / canvas.width)
	let tmpl = ``
	let presi = (canvas["@context"] && canvas["@context"].indexOf("/3/context.json") > -1) ? 3 : 2
	try {
		switch (presi) {
			case 3:
				tmpl = `<img src="${canvas.items[0].items[0].id}" alt="canvas image" >`
				break
			default:
				tmpl = `<img src="${canvas.images[0].resource["@id"]}" alt="canvas image" >`
		}
	} catch (err) {
		tmpl = `<img src="" alt="no image detected" width="${elemWidth}" height="${elemHeight}">`
	}
	let image = new Image()
	image.onload = image.onerror = () => {
		canvasView.classList.remove("blur")
		canvasView.innerHTML = tmpl
	}
	image.src = (presi === 2) ? canvas.images[0].resource["@id"] : canvas.items[0].items[0].id
}

function changeObject(changeEvent, newId = window.location.hash.substr(1)) {
	ux.setAttribute("data-id", newId)
}

function renderManifest(manifest = {}) {
	let tmpl
	let presi = (manifest["@context"] && manifest["@context"].indexOf("/3/context.json") > -1) ? 3 : 2
	try {
		switch (presi) {
			case 3:
				tmpl = manifest.items.reduce((a, b) => a += `<a at-id="${b.id}" class="button">${b.label}</a>`, ``)
				break
			default:
				tmpl = manifest.sequences[0].canvases.reduce((a, b) => a += `<a at-id="${b["@id"]}" class="button">${b.label}</a>`, ``)
		}
		tmpl = `<a target="_blank" href="http://universalviewer.io/uv.html?manifest=${manifest["@id"]}" class="button">View in UV</a><a  at-id="${manifest["@id"]}" class="button">IIIF Manifest</a> ${tmpl}`
	} catch (err) {
		tmpl = `No pages here`
	}
	manifestNav.setAttribute("src", manifest["@id"] || manifest.id)
	manifestNav.innerHTML = tmpl
	document.querySelectorAll("#manifestNav a").forEach(elem => elem.onclick = (() => changeObject(null, elem.getAttribute("at-id"))))
}


function saveAnnotations(event) {
	event.preventDefault()
	let dirtyFields = []
	for (let elem of event.target.querySelectorAll("textarea, input")) {
		if (elem.$isDirty) {
			dirtyFields.push(elem)
		}
	}

	for (let elem of dirtyFields) {
		const annoKey = elem.getAttribute(KEYS)
		let source = elem.getAttribute(SOURCE)
		let motivation = elem.getAttribute(MOTIVATION)
		if (source === "undefined") {
			source = false
		}
		let options = {
			url: source ? URLS.UPDATE : URLS.CREATE,
			method: source ? "PUT" : "POST",
			body: {
				"@context": "http://www.w3.org/ns/anno.jsonld",
				"@type": "Annotation",
				"motivation": motivation,
				"target": objectDescription.getAttribute("data-id"),
				"body": {}
			}
		}
		options.body.body[annoKey] = {
			value: elem.value,
			evidence: canvasView.getAttribute("data-id")
		}
		if (source) {
			options.body["@id"] = source
		}
		fetch(options.url, {
				method: options.method,
				headers: {
					"Content-Type": "application/json; charset=utf-8"
				},
				body: JSON.stringify(options.body)
			}).catch(error => console.error('Error:', error))
			.then(response => response.json())
			.then(function (newState) {
				localStorage.setItem(newState["@id"], JSON.stringify(newState.new_obj_state))
				let obj = {}
				let id = objectDescription.getAttribute("data-id")
				try {
					obj = JSON.parse(localStorage.getItem(id))
				} catch (err) {}
				if (!obj || !(obj.items || obj.images || obj.sequences)) {
					fetch(id).then(response => response.json()).catch(error => showMessage(error))
						.then(obj => {
							localStorage.setItem(obj["@id"] || obj.id, JSON.stringify(obj))
							renderObject(obj,objectDescription)
						})
				} else {
					renderObject(obj,objectDescription)
				}
			})
	}
}

function expand(obj, annos) {
	annos = annos.map(a => SCREEN.annotations[a] || fetch(a).then(response => response.json()))
	for (let i = 0; i < annos.length; i++) {
		let body = annos[i].body
		if (!body) continue
		if (!Array.isArray(body)) {
			body = [body]
		}
		Leaf: for (let j = 0; j < body.length; j++) {
			if (body[j].evidence) {
				// let evId = (typeof body[j].evidence === "object") ? body[j].evidence["@id"] : body[j].evidence
				// obj.evidence = await get(evId)
			} else {
				let val = body[j]
				let k = Object.keys(val)[0]
				if (!val.source) {
					let aVal = val[k].value || val[k]
					val[k] = {
						value: aVal,
						source: annos[i]["@id"]
					}
				}
				if (obj[k] !== undefined && annos[i].__rerum && annos[i].__rerum.history.next.length) {
					// this is not the most recent available
					// TODO: maybe check generator, etc.
					continue Leaf
				} else {
					obj = Object.assign(obj, val)
				}
			}
		}
	}
	return obj
}

function dirtyWatch(elements) {
	for (let el of elements) {
		el.onchange = event => {
			event.target.$isDirty = true
			event.stopPropagation()
		}
		el.addEventListener('input', el.onchange)
	}
}

function descriptionFormTemplate(fields) {
	return `<form>
		${fields.reduce((a,b)=>a+=formField(b),``)}
		<input type="submit" value="save">
		</form>`
}

function formField(field, noLabel) {
	let tmpl = noLabel ? `` : `<label>${field.label}</label>`
	if (!field.options) {
		field.options = {}
	}
	if (field.options.type && field.options.type.indexOf("array_") === 0) {
		let itemField = Object.assign({}, field, {
			options: {
				type: field.options.type.substring(6)
			}
		})
		tmpl += `<div class="form-group">
					${formField(itemField, true)}
					`
		if (field.options.helptext) {
			tmpl += `<small>${field.options.helptext}</small>
						<button role="button" type="button" onclick="alert('Sure, we will add that.')">&plus;</button>`
		}
		tmpl += `</div>`
	} else {
		switch (field.options.type) {
			// memo, text, number, email, url, tel, range, date, month, week, time, datetime, color
			case "memo":
				tmpl += `<textarea at-type="${field.type}"${field.options.required ? ` required="true"` : ``}>${field.default_value}</textarea>`
				break
			case "number":
			case "email":
			case "url":
			case "tel":
			case "range":
			case "date":
			case "month":
			case "week":
			case "time":
			case "datetime":
			case "color":
				tmpl += `<input type="${field.options.type}" ${MOTIVATION}="${field.motivation}" ${KEYS}="${field.type}"${field.options.required ? ` required="true"` : null} value="${field.default_value}">`
				break
			default:
				tmpl += `<input type="text" ${MOTIVATION}="${field.motivation}" ${KEYS}="${field.type}"${field.options.required ? ` required="true"` : ``} value="${field.default_value}">`
		}
		if (field.options.helptext) {
			tmpl += `<small>${field.options.helptext}</small>`
		}
	}
	return tmpl
}

function showMessage(message, clear) {
	let msg = document.createElement('p')
	msg.innerHTML = `${message}`
	if (clear) {
		messages.innerHTML = ''
	}
	messages.appendChild(msg)
}

function getValue(property, alsoPeek = [], asType) {
	// TODO: There must be a best way to do this...
	let prop;
	if (Array.isArray(property)) {
		prop = property.map(getValue)
	}
	if (typeof property === "object") {
		// TODO: JSON-LD insists on "@value", but this is simplified in a lot
		// of contexts. Reading that is ideal in the future.
		if (!Array.isArray(alsoPeek)) {
			alsoPeek = [alsoPeek]
		}
		alsoPeek = alsoPeek.concat(["@value", "value", "$value", "val"])
		for (let k of alsoPeek) {
			if (property.hasOwnProperty(k)) {
				prop = property[k]
				break
			} else {
				prop = property
			}
		}
	} else {
		prop = property
	}
	// JSON-LD says no nested arrays, but we know people.
	if (Array.isArray(prop)) {
		prop = prop.map(getValue)
	}
	try {
		switch (asType.toUpperCase()) {
			case "STRING":
				prop = prop.toString();
				break
			case "NUMBER":
				prop = parseFloat(prop);
				break
			case "INTEGER":
				prop = parseInt(prop);
				break
			case "BOOLEAN":
				prop = !Boolean(["false", "no", "0", "", "undefined", "null"].indexOf(String(prop).toLowerCase().trim()));
				break
			default:
		}
	} catch (err) {
		if (asType) {
			throw new Error("asType: '" + asType + "' is not possible.\n" + err.message)
		} else {
			// no casting requested
		}
	} finally {
		return (prop.length === 1) ? prop[0] : prop
	}
}
const newObjectLoader = new MutationObserver(newObjectRender)
Array.from(document.getElementsByTagName("deer-view"))
.concat(Array.from(document.getElementsByClassName("deer-view"))).forEach(elem=>{
	newObjectLoader.observe(elem, {
		attributes: true
	})
})
window.onload = loadCollection
window.onhashchange = changeObject

var fiant = {
	nextIndex: 0
}
window.fillForm = fillForm
window.fillDublin = fillDublin
window.createRecord = createRecord
window.createPerson = createPerson
async function fillForm(isUrl, nextIndex = fiant.nextIndex) {
	let feed = isUrl ? form_item_url.value : form_item.value
	const DEER = new Deer(feed)
	if (feed.length > 0) {
		let items = !isUrl ?
			feed.items :
			await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feed)).then(response => response.json()).then(js => js.items).catch(() => console.log("No feed fetched at: " + feed))
		// for now, loop later 
		fiant.count = items.length
		fiant.nextIndex = nextIndex
		fiant.feed = feed
		let item = items[fiant.nextIndex]
		form_url.value = item.link
		form_name.value = item.title
		form_depiction.value = item.enclosure.link
		if (item.enclosure.type === "application/pdf") {
			form_file.value = item.enclosure.link.replace(/fullsize/, "original").replace(/jpg(?!.*jpg)/, "pdf")
		}
		form_description.value = item.content
		let event = new Event("input")
		form_description.dispatchEvent(event)
	}
}

function fillDublin() {
	let content = `${form_description.value.replace(/\\r\\n/g,"<p>").replace(/\\n/g,"").replace(/\\/g,"")}`
	let contentDiv = document.createElement("div")
	contentDiv.innerHTML = content
	let elementset = contentDiv.getElementsByClassName("element")
	for (let el of elementset) {
		let dcterm = "form_dc" + el.getElementsByTagName("h3")[0].textContent.toLowerCase()
		let values = el.getElementsByClassName("element-text")[0].innerHTML
		if (window[dcterm]) {
			window[dcterm].value = values
		} else {
			console.log(el.getElementsByTagName("h3")[0].textContent + " is not recorded.")
		}
	}
}

function createRecord(event) {
	event.preventDefault()
	let evidence = "the Fiant book"
	let record = {
		"@context": ["https://schema.org", "http://purl.org/dc/terms/"],
		targetCollection: COLLECTIONPAGE,
		"dc:identifier": form_dcidentifier.value,
		name: form_dcidentifier.value,
		fianttype: form_fianttype.value,
		datestring_day: form_datestring_day.value,
		datestring_month: form_datestring_month.value,
		datestring_year: form_datestring_year.value,
		"dc:date": form_dcdate.value,
		"dc:description": form_description.value,
		agent: form_agent.value,
		"dc:source": form_dcsource.value,
		people: Array.from(document.getElementsByTagName("folk")).map(p => ({
			"@id": p.getAttribute("data-id"),
			"@type": "Person",
			"name": p.innerHTML
		}))
	}
	const DEER = new Deer()
	DEER.create(record, "testMachine", evidence).then(function (newObj) {
		alert(newObj["@id"])
	})
}

function convertDate() {
	let gregDate = ConvertRegnal(form_datestring_day.value,form_datestring_month.value,form_datestring_year.value)
	form_dcdate.value = gregDate
}

let addPersonButton = document.createElement("span")
addPersonButton.innerHTML = `
<button onclick="return false;" id="addPersonBtn">
	<i class="fas fa-user-plus"></i>
	Another Person
</button>
`
addPersonButton.onclick = showAddPerson
try {
	namedfolks.before(addPersonButton)
	form_datestring_day.oninput = form_datestring_month.oninput = form_datestring_year.oninput = convertDate
} catch (err) {}

function showAddPerson(event) {
	event.preventDefault()
	newPerson.style.display = "block"
	event.target.style.display = "none"
	createfiant.classList.add("no-pointers")
}

let closePersonFormBtn = document.createElement("span")
closePersonFormBtn.innerHTML = `
<button onclick="return false;" id="closePersonBtn" class="pull-right">
	<i class="fas fa-window-close"></i>
</button>
`
closePersonFormBtn.onclick = closeAddPerson
try {
	newPerson.children[0].before(closePersonFormBtn)
} catch (err) {}

function closeAddPerson(event) {
	event.preventDefault()
	newPerson.reset()
	newPerson.style.display = "none"
	addPersonBtn.style.display = "block"
	createfiant.classList.remove("no-pointers")
}

function createPerson(event) {
	event.preventDefault()
	let evidence = "the Fiant book"
	let person = {
		"@type": "Person"
	}
	for (let prop of event.target.querySelectorAll("[data-key]")) {
		person[prop.getAttribute("data-key")] = prop.value
	}
	const DEER = new Deer()
	DEER.create(person, "testMachine", evidence).then(function (p) {
		let newFolk = document.createElement("folk")
		newFolk.innerHTML = p.name
		newFolk.classList.add("tag")
		newFolk.setAttribute("data-id", p["@id"])
		namedfolks.append(newFolk)
		closeAddPerson(event)
	})
}



// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', function () {
// 		navigator.serviceWorker.register('/js/worker.js').then(function (registration) {
// 			// Registration was successful
// 			console.log('ServiceWorker registration successful with scope: ', registration.scope);
// 		}, function (err) {
// 			// registration failed :(
// 			console.log('ServiceWorker registration failed: ', err);
// 		});
// 	});
// }