/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "resetForm": () => (/* binding */ resetForm),
/* harmony export */   "updateForm": () => (/* binding */ updateForm)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



const urlNotes = 'http://localhost:3000/notes';
const message = {
    loading: 'icons/spinner.svg',
    success: 'Note has been added',
    successEdit: 'Note has been edited',
    failure: 'Oops, something went wrong...'
};

const dateReg = /(0?[1-9]|[12][0-9]|3[01])[\/\/.](0?[1-9]|1[012])[\/\/.]\d{4}/g,
    dividerSlash = '/', // Note: if changing dividers -> change the regular expression
    dividerDot = '.';

let formSelector;

/**
 * Fill data from Form with needed data.
 * @returns Object of Note, that shoul be saved.
 */
function fillData(data, isEditMode) {
    let dataObj = Object.fromEntries(data);

    if (!isEditMode)
        dataObj.created = Date.parse(new Date());

    dataObj.dates = parseDatesFromContent(dataObj.content);

    return dataObj;
}

/**
 * Found and parse dates with format like '02.09.2022' or '02/09/2022'
 * @param {String} content
 * @returns array of milliseconds founded dates
 */
function parseDatesFromContent(content) {
    const dateStrings = content.match(dateReg);

    if (!dateStrings)
        return [];

    let datesArray = dateStrings.map((str) => {
        const [day, month, year] = str.indexOf(dividerSlash) > 0
            ? str.split(dividerSlash)
            : str.split(dividerDot);

        return new Date(+year, +month - 1, +day).getTime();
    });

    return datesArray;
}

function updateForm(data) {

    const { name, category, content, id } = data;

    const form = document.querySelector(formSelector),
        titleElement = form.querySelector('.modal__title'),
        noteNameElement = form.querySelector('input[name="name"]'),
        typesElement = form.querySelector('#noteTypes'),
        contentElement = form.querySelector('input[name="content"]'),
        btnSubmit = form.querySelector('.btn');

    noteNameElement.value = name;
    typesElement.value = category;
    contentElement.value = content;

    titleElement.textContent = "Edit your note";
    btnSubmit.textContent = 'Save';
    form.setAttribute('data-id', id);
}

function resetForm() {
    console.warn('form.reset');
    const form = document.querySelector(formSelector);
    form.reset();
    form.setAttribute('data-noteId', -1);

    const titleElement = form.querySelector('.modal__title'),
        btnSubmit = form.querySelector('.btn');

    titleElement.textContent = "Fill the fields";
    btnSubmit.textContent = "Create";
}

function form(selector) {
    formSelector = selector;

    const form = document.querySelector(formSelector);

    bindPostData(form);

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            sendDataToServer(form, statusMessage);
        });
    }

    function sendDataToServer(form, statusMessage) {

        const formData = new FormData(form);
        const noteId = form.getAttribute('data-id'),
            isEditMode = noteId > -1;

        const data = fillData(formData.entries(), isEditMode);
        const json = JSON.stringify(data);
        let url = urlNotes;

        if (isEditMode)
            url += `/${noteId}`;

        const promise = isEditMode ? _services_services__WEBPACK_IMPORTED_MODULE_1__.editData : _services_services__WEBPACK_IMPORTED_MODULE_1__.postData;

        promise(url, json)
            .then(data => {
                console.log(data);
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(isEditMode ? message.successEdit : message.success);
                statusMessage.remove();
            })
            .catch(() => {
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(message.failure);
            });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModalForNote": () => (/* binding */ openModalForNote),
/* harmony export */   "showThanksModal": () => (/* binding */ showThanksModal)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./js/modules/form.js");


let modalSelector;

function openModal() {

    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
}

function openModalForNote(note) {

    openModal();
    (0,_form__WEBPACK_IMPORTED_MODULE_0__.updateForm)(note);
}

function closeModal() {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = '';
}

function showThanksModal(message) {
    const previousModalDialog = document.querySelector('.modal__dialog');

    previousModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>            
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    console.log('start timer');

    setTimeout(() => {
        thanksModal.remove();
        previousModalDialog.classList.add('show');
        previousModalDialog.classList.remove('hide');
        closeModal('.modal');

        (0,_form__WEBPACK_IMPORTED_MODULE_0__.resetForm)();
    }, 4000);
}

function modal(triggerSelector, selector) {
    modalSelector = selector;

    const modal = document.querySelector(modalSelector);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {
            console.log('modal close event handler')
            closeModal();
        }
    });

    document.querySelectorAll(triggerSelector)
        .forEach((btn) => btn.addEventListener('click', () => openModal()));

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/notes.js":
/*!*****************************!*\
  !*** ./js/modules/notes.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");



const urlNotes = 'http://localhost:3000/notes',
    message = {
        successArchive: 'Note has been archived',
        successDelete: 'Note has been deleted',
        failure: 'Oops, something went wrong...'
    };

function notes() {

    const maxLength = 30,
        categoryTitleByValue = {
            task: 'Task',
            random: 'Random Thought',
            idea: 'Idea'
        }

    let noteById = [],
        notesByCategory = {};

    class NoteItem {
        constructor(id, name, created, category, content, dates, parentSelector) {
            this.id = id;
            this.name = name;
            this.created = created;
            this.category = category;
            this.content = content;
            this.dates = dates;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('tr');
            element.classList.add('note__item');

            const nameFormatted = formatString(this.name),
                createdAsString = parseDate(this.created),
                categoryName = getCategoryName(this.category),
                contentFormatted = formatString(this.content),
                datesAsString = parseDates(this.dates);

            element.innerHTML = `               
                <td>${nameFormatted}</td>
                <td>${createdAsString}</td>
                <td>${categoryName}</td>
                <td>${contentFormatted}</td>
                <td>${datesAsString}</td>
                <td>
                    <img id="edit" data-noteId="${this.id}" data-modal class="btn_icon" src="icons/edit.svg" alt="edit">
                    <img id="archive" data-noteId="${this.id}" class="btn_icon" src="icons/archive_dark.svg" alt="archive">
                    <img id="delete" data-noteId="${this.id}" class="btn_icon" src="icons/delete_dark.svg" alt="delete">
                </td>            
                `;
            subscribeElement(element);
            this.parent.append(element);
        }
    }

    class CategoryItem {
        constructor(value, active, archived, parentSelector) {
            this.value = value;
            this.active = active;
            this.archived = archived;
            this.parent = document.querySelector(parentSelector);
        }
        render() {
            const element = document.createElement('tr');
            element.classList.add('note__item');

            const categoryName = getCategoryName(this.value);

            element.innerHTML = `               
                <td>${categoryName}</td>
                <td>${this.active}</td>
                <td>${this.archived}</td>         
                `;
            this.parent.append(element);
        }
        updateWithNote(note) {
            if (note.isArchived)
                this.archived++;
            else
                this.active++;
        }
    }
    function getNoteIdFromElement(element) {
        return Number(element.getAttribute('data-noteId'));
    }

    function subscribeElement(element) {
        const btnEdit = element.querySelector("#edit"),
            btnArchive = element.querySelector("#archive"),
            btnDelete = element.querySelector("#delete");

        btnEdit.addEventListener('click', (e) => {
            e.preventDefault();
            const noteId = getNoteIdFromElement(e.target);
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModalForNote)(noteById[noteId]);
        });
        btnArchive.addEventListener('click', (e) => {
            e.preventDefault();
            const noteId = getNoteIdFromElement(e.target);
            markNoteAsArchived(noteById[noteId]);
        })
        btnDelete.addEventListener('click', (e) => {
            e.preventDefault();
            const noteId = getNoteIdFromElement(e.target);
            deleteNoteFromServer(noteId);
        })
    }

    function markNoteAsArchived(note) {
        console.log('archive')
        note.isArchived = true;
        const json = JSON.stringify(note);
        console.log(json);

        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.editData)(urlNotes + `/${note.id}`, json)
            .then(data => {
                console.log(data);
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showThanksModal)(message.successArchive);
            })
            .catch(() => {
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showThanksModal)(message.failure);
            });
    }

    function deleteNoteFromServer(noteId) {
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.deleteData)(urlNotes + `/${noteId}`)
            .then(data => {
                console.log(data);
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showThanksModal)(message.successDelete);
            })
            .catch(() => {
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showThanksModal)(message.failure);
            });
    }

    function formatString(string) {
        if (string.length < maxLength)
            return string;

        string = string.substring(0, maxLength);
        string += '...';
        return string;
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function parseDate(ms) {
        const date = new Date(ms);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${getZero(day)}.${getZero(month)}.${getZero(year)}`;
    }

    function parseDates(datesArray) {
        if (!datesArray || datesArray.length == 0)
            return [];

        if (datesArray.length == 1)
            return parseDate(datesArray[0]);

        return datesArray.reduce((result, current) =>
            `${typeof (result) === 'number' ? parseDate(result) : result}, ${parseDate(current)}`);
    }

    function getCategoryName(categoryType) {
        if (!categoryTitleByValue[categoryType])
            return "Not recognized";

        return categoryTitleByValue[categoryType];
    }

    function updateSummary() {
        noteById.forEach((item) => {
            const categoryItem = notesByCategory[item.category];
            if (categoryItem)
                categoryItem.updateWithNote(item);
            else
                notesByCategory[item.category] = new CategoryItem(item.category, 0, 0, "#table_summary");
        });

        for (const [key, value] of Object.entries(notesByCategory)) {
            value.render();
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/notes')
        .then(data => {
            data.forEach((item) => {
                noteById[item.id] = item;

                if (!item.isArchived)
                    new NoteItem(item.id, item.name, item.created, item.category, item.content, item.dates, "#table_notes").render();
            })

        })
        .then(updateSummary);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notes);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteData": () => (/* binding */ deleteData),
/* harmony export */   "editData": () => (/* binding */ editData),
/* harmony export */   "getData": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const editData = async(url, data) => {
    
    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

const deleteData = async(url) => {
    
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    });

    return await res.json();
}



/***/ }),

/***/ "./node_modules/es6-promise-polyfill/promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise-polyfill/promise.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function(global){

//
// Check for native Promise and it has correct interface
//

var NativePromise = global['Promise'];
var nativePromiseSupported =
  NativePromise &&
  // Some of these methods are missing from
  // Firefox/Chrome experimental implementations
  'resolve' in NativePromise &&
  'reject' in NativePromise &&
  'all' in NativePromise &&
  'race' in NativePromise &&
  // Older version of the spec had a resolver object
  // as the arg rather than a function
  (function(){
    var resolve;
    new NativePromise(function(r){ resolve = r; });
    return typeof resolve === 'function';
  })();


//
// export if necessary
//

if ( true && exports)
{
  // node.js
  exports.Promise = nativePromiseSupported ? NativePromise : Promise;
  exports.Polyfill = Promise;
}
else
{
  // AMD
  if (true)
  {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){
      return nativePromiseSupported ? NativePromise : Promise;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else
  {}
}


//
// Polyfill
//

var PENDING = 'pending';
var SEALED = 'sealed';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var NOOP = function(){};

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// async calls
var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
var asyncQueue = [];
var asyncTimer;

function asyncFlush(){
  // run promise callbacks
  for (var i = 0; i < asyncQueue.length; i++)
    asyncQueue[i][0](asyncQueue[i][1]);

  // reset async asyncQueue
  asyncQueue = [];
  asyncTimer = false;
}

function asyncCall(callback, arg){
  asyncQueue.push([callback, arg]);

  if (!asyncTimer)
  {
    asyncTimer = true;
    asyncSetTimer(asyncFlush, 0);
  }
}


function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value);
  }

  function rejectPromise(reason) {
    reject(promise, reason);
  }

  try {
    resolver(resolvePromise, rejectPromise);
  } catch(e) {
    rejectPromise(e);
  }
}

function invokeCallback(subscriber){
  var owner = subscriber.owner;
  var settled = owner.state_;
  var value = owner.data_;  
  var callback = subscriber[settled];
  var promise = subscriber.then;

  if (typeof callback === 'function')
  {
    settled = FULFILLED;
    try {
      value = callback(value);
    } catch(e) {
      reject(promise, e);
    }
  }

  if (!handleThenable(promise, value))
  {
    if (settled === FULFILLED)
      resolve(promise, value);

    if (settled === REJECTED)
      reject(promise, value);
  }
}

function handleThenable(promise, value) {
  var resolved;

  try {
    if (promise === value)
      throw new TypeError('A promises callback cannot return that same promise.');

    if (value && (typeof value === 'function' || typeof value === 'object'))
    {
      var then = value.then;  // then should be retrived only once

      if (typeof then === 'function')
      {
        then.call(value, function(val){
          if (!resolved)
          {
            resolved = true;

            if (value !== val)
              resolve(promise, val);
            else
              fulfill(promise, val);
          }
        }, function(reason){
          if (!resolved)
          {
            resolved = true;

            reject(promise, reason);
          }
        });

        return true;
      }
    }
  } catch (e) {
    if (!resolved)
      reject(promise, e);

    return true;
  }

  return false;
}

function resolve(promise, value){
  if (promise === value || !handleThenable(promise, value))
    fulfill(promise, value);
}

function fulfill(promise, value){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = value;

    asyncCall(publishFulfillment, promise);
  }
}

function reject(promise, reason){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = reason;

    asyncCall(publishRejection, promise);
  }
}

function publish(promise) {
  var callbacks = promise.then_;
  promise.then_ = undefined;

  for (var i = 0; i < callbacks.length; i++) {
    invokeCallback(callbacks[i]);
  }
}

function publishFulfillment(promise){
  promise.state_ = FULFILLED;
  publish(promise);
}

function publishRejection(promise){
  promise.state_ = REJECTED;
  publish(promise);
}

/**
* @class
*/
function Promise(resolver){
  if (typeof resolver !== 'function')
    throw new TypeError('Promise constructor takes a function argument');

  if (this instanceof Promise === false)
    throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

  this.then_ = [];

  invokeResolver(resolver, this);
}

Promise.prototype = {
  constructor: Promise,

  state_: PENDING,
  then_: null,
  data_: undefined,

  then: function(onFulfillment, onRejection){
    var subscriber = {
      owner: this,
      then: new this.constructor(NOOP),
      fulfilled: onFulfillment,
      rejected: onRejection
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED)
    {
      // already resolved, call callback async
      asyncCall(invokeCallback, subscriber);
    }
    else
    {
      // subscribe
      this.then_.push(subscriber);
    }

    return subscriber.then;
  },

  'catch': function(onRejection) {
    return this.then(null, onRejection);
  }
};

Promise.all = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.all().');

  return new Class(function(resolve, reject){
    var results = [];
    var remaining = 0;

    function resolver(index){
      remaining++;
      return function(value){
        results[index] = value;
        if (!--remaining)
          resolve(results);
      };
    }

    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolver(i), reject);
      else
        results[i] = promise;
    }

    if (!remaining)
      resolve(results);
  });
};

Promise.race = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.race().');

  return new Class(function(resolve, reject) {
    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolve, reject);
      else
        resolve(promise);
    }
  });
};

Promise.resolve = function(value){
  var Class = this;

  if (value && typeof value === 'object' && value.constructor === Class)
    return value;

  return new Class(function(resolve){
    resolve(value);
  });
};

Promise.reject = function(reason){
  var Class = this;

  return new Class(function(resolve, reject){
    reject(reason);
  });
};

})(typeof window != 'undefined' ? window : typeof __webpack_require__.g != 'undefined' ? __webpack_require__.g : typeof self != 'undefined' ? self : this);


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (() => {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_notes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/notes */ "./js/modules/notes.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
var Promise = (__webpack_require__(/*! es6-promise-polyfill */ "./node_modules/es6-promise-polyfill/promise.js").Promise);






window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal');
    (0,_modules_notes__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map