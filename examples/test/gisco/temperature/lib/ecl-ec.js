/* @ecl/preset-ec - 3.7.1 Built on 2023-02-23T14:13:07.710Z */
var ECL = (function (e, moment) {
    'use strict'
    function B(e) {
        return e && 'object' == typeof e && 'default' in e ? e : { default: e }
    }
    var P = B(moment)
    function n(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var i = 0, s = new Array(t); i < t; i++) s[i] = e[i]
        return s
    }
    function R(e, t) {
        var i,
            s = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator']
        if (s) return (s = s.call(e)).next.bind(s)
        if (
            Array.isArray(e) ||
            (s = (function (e, t) {
                if (e) {
                    if ('string' == typeof e) return n(e, t)
                    var i = Object.prototype.toString.call(e).slice(8, -1)
                    return 'Map' === (i = 'Object' === i && e.constructor ? e.constructor.name : i) ||
                        'Set' === i
                        ? Array.from(e)
                        : 'Arguments' === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                        ? n(e, t)
                        : void 0
                }
            })(e)) ||
            (t && e && 'number' == typeof e.length)
        )
            return (
                s && (e = s),
                (i = 0),
                function () {
                    return i >= e.length ? { done: !0 } : { done: !1, value: e[i++] }
                }
            )
        throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
    }
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector),
        Element.prototype.closest ||
            (Element.prototype.closest = function (e) {
                for (var t = this; t; ) {
                    if (t.matches(e)) return t
                    t = t.parentElement
                }
                return null
            })
    function r(e, t) {
        return void 0 === t && (t = document), [].slice.call(t.querySelectorAll(e))
    }
    function h(e, t) {
        return (t = void 0 === t ? document : t).querySelector(e)
    }
    var F = ['root']
    var z =
        'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
            ? self
            : {}
    function t(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports
    }
    var H = t(function (e, t) {
        var moment
        try {
            moment = P.default
        } catch (e) {}
        e.exports = (function (moment) {
            var o = typeof moment === 'function',
                l = !!window.addEventListener,
                g = window.document,
                c = window.setTimeout,
                a = function e(t, i, s, n) {
                    if (l) t.addEventListener(i, s, !!n)
                    else t.attachEvent('on' + i, s)
                },
                i = function e(t, i, s, n) {
                    if (l) t.removeEventListener(i, s, !!n)
                    else t.detachEvent('on' + i, s)
                },
                s = function e(t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
                },
                r = function e(t, i) {
                    return (' ' + t.className + ' ').indexOf(' ' + i + ' ') !== -1
                },
                p = function e(t, i) {
                    if (!r(t, i)) t.className = t.className === '' ? i : t.className + ' ' + i
                },
                v = function e(t, i) {
                    t.className = s((' ' + t.className + ' ').replace(' ' + i + ' ', ' '))
                },
                f = function e(t) {
                    return /Array/.test(Object.prototype.toString.call(t))
                },
                M = function e(t) {
                    return /Date/.test(Object.prototype.toString.call(t)) && !isNaN(t.getTime())
                },
                N = function e(t) {
                    var i = t.getDay()
                    return i === 0 || i === 6
                },
                n = function e(t) {
                    return (t % 4 === 0 && t % 100 !== 0) || t % 400 === 0
                },
                B = function e(t, i) {
                    return [31, n(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i]
                },
                P = function e(t) {
                    if (M(t)) t.setHours(0, 0, 0, 0)
                },
                R = function e(t, i) {
                    return t.getTime() === i.getTime()
                },
                h = function e(t, i, s) {
                    var n, l
                    for (n in i) {
                        l = t[n] !== undefined
                        if (l && typeof i[n] === 'object' && i[n] !== null && i[n].nodeName === undefined)
                            if (M(i[n])) {
                                if (s) t[n] = new Date(i[n].getTime())
                            } else if (f(i[n])) {
                                if (s) t[n] = i[n].slice(0)
                            } else t[n] = e({}, i[n], s)
                        else if (s || !l) t[n] = i[n]
                    }
                    return t
                },
                d = function e(t, i, s) {
                    var n
                    if (g.createEvent) {
                        n = g.createEvent('HTMLEvents')
                        n.initEvent(i, true, false)
                        n = h(n, s)
                        t.dispatchEvent(n)
                    } else if (g.createEventObject) {
                        n = g.createEventObject()
                        n = h(n, s)
                        t.fireEvent('on' + i, n)
                    }
                },
                u = function e(t) {
                    if (t.month < 0) {
                        t.year -= Math.ceil(Math.abs(t.month) / 12)
                        t.month += 12
                    }
                    if (t.month > 11) {
                        t.year += Math.floor(Math.abs(t.month) / 12)
                        t.month -= 12
                    }
                    return t
                },
                m = {
                    field: null,
                    bound: undefined,
                    ariaLabel: 'Use the arrow keys to pick a date',
                    position: 'bottom left',
                    reposition: true,
                    format: 'YYYY-MM-DD',
                    toString: null,
                    parse: null,
                    defaultDate: null,
                    setDefaultDate: false,
                    firstDay: 0,
                    firstWeekOfYearMinDays: 4,
                    formatStrict: false,
                    minDate: null,
                    maxDate: null,
                    yearRange: 10,
                    showWeekNumber: false,
                    pickWholeWeek: false,
                    minYear: 0,
                    maxYear: 9999,
                    minMonth: undefined,
                    maxMonth: undefined,
                    startRange: null,
                    endRange: null,
                    isRTL: false,
                    yearSuffix: '',
                    showMonthAfterYear: false,
                    showDaysInNextAndPreviousMonths: false,
                    enableSelectionDaysInNextAndPreviousMonths: false,
                    numberOfMonths: 1,
                    mainCalendar: 'left',
                    container: undefined,
                    blurFieldOnSelect: true,
                    i18n: {
                        previousMonth: 'Previous Month',
                        nextMonth: 'Next Month',
                        months: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                        weekdays: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    },
                    theme: null,
                    events: [],
                    onSelect: null,
                    onOpen: null,
                    onClose: null,
                    onDraw: null,
                    keyboardInput: true,
                },
                b = function e(t, i, s) {
                    i += t.firstDay
                    while (i >= 7) i -= 7
                    return s ? t.i18n.weekdaysShort[i] : t.i18n.weekdays[i]
                },
                F = function e(t) {
                    var i = []
                    var s = 'false'
                    if (t.isEmpty)
                        if (t.showDaysInNextAndPreviousMonths) {
                            i.push('is-outside-current-month')
                            if (!t.enableSelectionDaysInNextAndPreviousMonths) i.push('is-selection-disabled')
                        } else return '<td class="is-empty"></td>'
                    if (t.isDisabled) i.push('is-disabled')
                    if (t.isToday) i.push('is-today')
                    if (t.isSelected) {
                        i.push('is-selected')
                        s = 'true'
                    }
                    if (t.hasEvent) i.push('has-event')
                    if (t.isInRange) i.push('is-inrange')
                    if (t.isStartRange) i.push('is-startrange')
                    if (t.isEndRange) i.push('is-endrange')
                    return (
                        '<td data-day="' +
                        t.day +
                        '" class="' +
                        i.join(' ') +
                        '" aria-selected="' +
                        s +
                        '">' +
                        '<button class="pika-button pika-day" type="button" ' +
                        'data-pika-year="' +
                        t.year +
                        '" data-pika-month="' +
                        t.month +
                        '" data-pika-day="' +
                        t.day +
                        '">' +
                        t.day +
                        '</button>' +
                        '</td>'
                    )
                },
                y = function e(t, i) {
                    t.setHours(0, 0, 0, 0)
                    var s = t.getDate(),
                        n = t.getDay(),
                        l = i,
                        a = l - 1,
                        o = 7,
                        r = function e(t) {
                            return (t + o - 1) % o
                        }
                    t.setDate(s + a - r(n))
                    var h = new Date(t.getFullYear(), 0, l),
                        c = 24 * 60 * 60 * 1e3,
                        d = (t.getTime() - h.getTime()) / c,
                        u = 1 + Math.round((d - a + r(h.getDay())) / o)
                    return u
                },
                z = function e(t, i, s, n) {
                    var l = new Date(s, i, t),
                        a = o ? moment(l).isoWeek() : y(l, n)
                    return '<td class="pika-week">' + a + '</td>'
                },
                H = function e(t, i, s, n) {
                    return (
                        '<tr class="pika-row' +
                        (s ? ' pick-whole-week' : '') +
                        (n ? ' is-selected' : '') +
                        '">' +
                        (i ? t.reverse() : t).join('') +
                        '</tr>'
                    )
                },
                E = function e(t) {
                    return '<tbody>' + t.join('') + '</tbody>'
                },
                L = function e(t) {
                    var i,
                        s = []
                    if (t.showWeekNumber) s.push('<th></th>')
                    for (i = 0; i < 7; i++)
                        s.push(
                            '<th scope="col"><abbr title="' + b(t, i) + '">' + b(t, i, true) + '</abbr></th>'
                        )
                    return '<thead><tr>' + (t.isRTL ? s.reverse() : s).join('') + '</tr></thead>'
                },
                w = function e(t, i, s, n, l, a) {
                    var o,
                        r,
                        h,
                        c = t._o,
                        d = s === c.minYear,
                        u = s === c.maxYear,
                        g = '<div id="' + a + '" class="pika-title" role="heading" aria-live="assertive">',
                        p,
                        v,
                        m = true,
                        b = true
                    for (h = [], o = 0; o < 12; o++)
                        h.push(
                            '<option value="' +
                                (s === l ? o - i : 12 + o - i) +
                                '"' +
                                (o === n ? ' selected="selected"' : '') +
                                ((d && o < c.minMonth) || (u && o > c.maxMonth)
                                    ? ' disabled="disabled"'
                                    : '') +
                                '>' +
                                c.i18n.months[o] +
                                '</option>'
                        )
                    p =
                        '<div class="pika-label">' +
                        c.i18n.months[n] +
                        '<select class="pika-select pika-select-month" tabindex="-1">' +
                        h.join('') +
                        '</select></div>'
                    if (f(c.yearRange)) {
                        o = c.yearRange[0]
                        r = c.yearRange[1] + 1
                    } else {
                        o = s - c.yearRange
                        r = 1 + s + c.yearRange
                    }
                    for (h = []; o < r && o <= c.maxYear; o++)
                        if (o >= c.minYear)
                            h.push(
                                '<option value="' +
                                    o +
                                    '"' +
                                    (o === s ? ' selected="selected"' : '') +
                                    '>' +
                                    o +
                                    '</option>'
                            )
                    v =
                        '<div class="pika-label">' +
                        s +
                        c.yearSuffix +
                        '<select class="pika-select pika-select-year" tabindex="-1">' +
                        h.join('') +
                        '</select></div>'
                    if (c.showMonthAfterYear) g += v + p
                    else g += p + v
                    if (d && (n === 0 || c.minMonth >= n)) m = false
                    if (u && (n === 11 || c.maxMonth <= n)) b = false
                    if (i === 0)
                        g +=
                            '<button class="pika-prev' +
                            (m ? '' : ' is-disabled') +
                            '" type="button">' +
                            c.i18n.previousMonth +
                            '</button>'
                    if (i === t._o.numberOfMonths - 1)
                        g +=
                            '<button class="pika-next' +
                            (b ? '' : ' is-disabled') +
                            '" type="button">' +
                            c.i18n.nextMonth +
                            '</button>'
                    return (g += '</div>')
                },
                K = function e(t, i, s) {
                    return (
                        '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' +
                        s +
                        '">' +
                        L(t) +
                        E(i) +
                        '</table>'
                    )
                },
                e = function e(t) {
                    var s = this,
                        n = s.config(t)
                    s._onMouseDown = function (e) {
                        if (!s._v) return
                        e = e || window.event
                        var t = e.target || e.srcElement
                        if (!t) return
                        if (!r(t, 'is-disabled'))
                            if (r(t, 'pika-button') && !r(t, 'is-empty') && !r(t.parentNode, 'is-disabled')) {
                                s.setDate(
                                    new Date(
                                        t.getAttribute('data-pika-year'),
                                        t.getAttribute('data-pika-month'),
                                        t.getAttribute('data-pika-day')
                                    )
                                )
                                if (n.bound)
                                    c(function () {
                                        s.hide()
                                        if (n.blurFieldOnSelect && n.field) n.field.blur()
                                    }, 100)
                            } else if (r(t, 'pika-prev')) s.prevMonth()
                            else if (r(t, 'pika-next')) s.nextMonth()
                        if (!r(t, 'pika-select'))
                            if (e.preventDefault) e.preventDefault()
                            else {
                                e.returnValue = false
                                return false
                            }
                        else s._c = true
                    }
                    s._onChange = function (e) {
                        e = e || window.event
                        var t = e.target || e.srcElement
                        if (!t) return
                        if (r(t, 'pika-select-month')) s.gotoMonth(t.value)
                        else if (r(t, 'pika-select-year')) s.gotoYear(t.value)
                    }
                    s._onKeyChange = function (e) {
                        e = e || window.event
                        if (s.isVisible())
                            switch (e.keyCode) {
                                case 13:
                                case 27:
                                    if (n.field) n.field.blur()
                                    break
                                case 37:
                                    s.adjustDate('subtract', 1)
                                    break
                                case 38:
                                    s.adjustDate('subtract', 7)
                                    break
                                case 39:
                                    s.adjustDate('add', 1)
                                    break
                                case 40:
                                    s.adjustDate('add', 7)
                                    break
                                case 8:
                                case 46:
                                    s.setDate(null)
                                    break
                            }
                    }
                    s._parseFieldValue = function () {
                        if (n.parse) return n.parse(n.field.value, n.format)
                        else if (o) {
                            var e = moment(n.field.value, n.format, n.formatStrict)
                            return e && e.isValid() ? e.toDate() : null
                        } else return new Date(Date.parse(n.field.value))
                    }
                    s._onInputChange = function (e) {
                        var t
                        if (e.firedBy === s) return
                        t = s._parseFieldValue()
                        if (M(t)) s.setDate(t)
                        if (!s._v) s.show()
                    }
                    s._onInputFocus = function () {
                        s.show()
                    }
                    s._onInputClick = function () {
                        s.show()
                    }
                    s._onInputBlur = function () {
                        var e = g.activeElement
                        do {
                            if (r(e, 'pika-single')) return
                        } while ((e = e.parentNode))
                        if (!s._c)
                            s._b = c(function () {
                                s.hide()
                            }, 50)
                        s._c = false
                    }
                    s._onClick = function (e) {
                        e = e || window.event
                        var t = e.target || e.srcElement,
                            i = t
                        if (!t) return
                        if (!l && r(t, 'pika-select'))
                            if (!t.onchange) {
                                t.setAttribute('onchange', 'return;')
                                a(t, 'change', s._onChange)
                            }
                        do {
                            if (r(i, 'pika-single') || i === n.trigger) return
                        } while ((i = i.parentNode))
                        if (s._v && t !== n.trigger && i !== n.trigger) s.hide()
                    }
                    s.el = g.createElement('div')
                    s.el.className =
                        'pika-single' + (n.isRTL ? ' is-rtl' : '') + (n.theme ? ' ' + n.theme : '')
                    a(s.el, 'mousedown', s._onMouseDown, true)
                    a(s.el, 'touchend', s._onMouseDown, true)
                    a(s.el, 'change', s._onChange)
                    if (n.keyboardInput) a(g, 'keydown', s._onKeyChange)
                    if (n.field) {
                        if (n.container) n.container.appendChild(s.el)
                        else if (n.bound) g.body.appendChild(s.el)
                        else n.field.parentNode.insertBefore(s.el, n.field.nextSibling)
                        a(n.field, 'change', s._onInputChange)
                        if (!n.defaultDate) {
                            n.defaultDate = s._parseFieldValue()
                            n.setDefaultDate = true
                        }
                    }
                    var i = n.defaultDate
                    if (M(i))
                        if (n.setDefaultDate) s.setDate(i, true)
                        else s.gotoDate(i)
                    else s.gotoDate(new Date())
                    if (n.bound) {
                        this.hide()
                        s.el.className += ' is-bound'
                        a(n.trigger, 'click', s._onInputClick)
                        a(n.trigger, 'focus', s._onInputFocus)
                        a(n.trigger, 'blur', s._onInputBlur)
                    } else this.show()
                }
            return (
                (e.prototype = {
                    config: function e(t) {
                        if (!this._o) this._o = h({}, m, true)
                        var i = h(this._o, t, true)
                        i.isRTL = !!i.isRTL
                        i.field = i.field && i.field.nodeName ? i.field : null
                        i.theme = typeof i.theme === 'string' && i.theme ? i.theme : null
                        i.bound = !!(i.bound !== undefined ? i.field && i.bound : i.field)
                        i.trigger = i.trigger && i.trigger.nodeName ? i.trigger : i.field
                        i.disableWeekends = !!i.disableWeekends
                        i.disableDayFn = typeof i.disableDayFn === 'function' ? i.disableDayFn : null
                        var s = parseInt(i.numberOfMonths, 10) || 1
                        i.numberOfMonths = s > 4 ? 4 : s
                        if (!M(i.minDate)) i.minDate = false
                        if (!M(i.maxDate)) i.maxDate = false
                        if (i.minDate && i.maxDate && i.maxDate < i.minDate) i.maxDate = i.minDate = false
                        if (i.minDate) this.setMinDate(i.minDate)
                        if (i.maxDate) this.setMaxDate(i.maxDate)
                        if (f(i.yearRange)) {
                            var n = new Date().getFullYear() - 10
                            i.yearRange[0] = parseInt(i.yearRange[0], 10) || n
                            i.yearRange[1] = parseInt(i.yearRange[1], 10) || n
                        } else {
                            i.yearRange = Math.abs(parseInt(i.yearRange, 10)) || m.yearRange
                            if (i.yearRange > 100) i.yearRange = 100
                        }
                        return i
                    },
                    toString: function e(t) {
                        t = t || this._o.format
                        if (!M(this._d)) return ''
                        if (this._o.toString) return this._o.toString(this._d, t)
                        if (o) return moment(this._d).format(t)
                        return this._d.toDateString()
                    },
                    getMoment: function e() {
                        return o ? moment(this._d) : null
                    },
                    setMoment: function e(t, i) {
                        if (o && moment.isMoment(t)) this.setDate(t.toDate(), i)
                    },
                    getDate: function e() {
                        return M(this._d) ? new Date(this._d.getTime()) : null
                    },
                    setDate: function e(t, i) {
                        if (!t) {
                            this._d = null
                            if (this._o.field) {
                                this._o.field.value = ''
                                d(this._o.field, 'change', { firedBy: this })
                            }
                            return this.draw()
                        }
                        if (typeof t === 'string') t = new Date(Date.parse(t))
                        if (!M(t)) return
                        var s = this._o.minDate,
                            n = this._o.maxDate
                        if (M(s) && t < s) t = s
                        else if (M(n) && t > n) t = n
                        this._d = new Date(t.getTime())
                        P(this._d)
                        this.gotoDate(this._d)
                        if (this._o.field) {
                            this._o.field.value = this.toString()
                            d(this._o.field, 'change', { firedBy: this })
                        }
                        if (!i && typeof this._o.onSelect === 'function')
                            this._o.onSelect.call(this, this.getDate())
                    },
                    clear: function e() {
                        this.setDate(null)
                    },
                    gotoDate: function e(t) {
                        var i = true
                        if (!M(t)) return
                        if (this.calendars) {
                            var s = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                                n = new Date(
                                    this.calendars[this.calendars.length - 1].year,
                                    this.calendars[this.calendars.length - 1].month,
                                    1
                                ),
                                l = t.getTime()
                            n.setMonth(n.getMonth() + 1)
                            n.setDate(n.getDate() - 1)
                            i = l < s.getTime() || n.getTime() < l
                        }
                        if (i) {
                            this.calendars = [{ month: t.getMonth(), year: t.getFullYear() }]
                            if (this._o.mainCalendar === 'right')
                                this.calendars[0].month += 1 - this._o.numberOfMonths
                        }
                        this.adjustCalendars()
                    },
                    adjustDate: function e(t, i) {
                        var s = this.getDate() || new Date()
                        var n = parseInt(i) * 24 * 60 * 60 * 1e3
                        var l
                        if (t === 'add') l = new Date(s.valueOf() + n)
                        else if (t === 'subtract') l = new Date(s.valueOf() - n)
                        this.setDate(l)
                    },
                    adjustCalendars: function e() {
                        this.calendars[0] = u(this.calendars[0])
                        for (var t = 1; t < this._o.numberOfMonths; t++)
                            this.calendars[t] = u({
                                month: this.calendars[0].month + t,
                                year: this.calendars[0].year,
                            })
                        this.draw()
                    },
                    gotoToday: function e() {
                        this.gotoDate(new Date())
                    },
                    gotoMonth: function e(t) {
                        if (!isNaN(t)) {
                            this.calendars[0].month = parseInt(t, 10)
                            this.adjustCalendars()
                        }
                    },
                    nextMonth: function e() {
                        this.calendars[0].month++
                        this.adjustCalendars()
                    },
                    prevMonth: function e() {
                        this.calendars[0].month--
                        this.adjustCalendars()
                    },
                    gotoYear: function e(t) {
                        if (!isNaN(t)) {
                            this.calendars[0].year = parseInt(t, 10)
                            this.adjustCalendars()
                        }
                    },
                    setMinDate: function e(t) {
                        if (t instanceof Date) {
                            P(t)
                            this._o.minDate = t
                            this._o.minYear = t.getFullYear()
                            this._o.minMonth = t.getMonth()
                        } else {
                            this._o.minDate = m.minDate
                            this._o.minYear = m.minYear
                            this._o.minMonth = m.minMonth
                            this._o.startRange = m.startRange
                        }
                        this.draw()
                    },
                    setMaxDate: function e(t) {
                        if (t instanceof Date) {
                            P(t)
                            this._o.maxDate = t
                            this._o.maxYear = t.getFullYear()
                            this._o.maxMonth = t.getMonth()
                        } else {
                            this._o.maxDate = m.maxDate
                            this._o.maxYear = m.maxYear
                            this._o.maxMonth = m.maxMonth
                            this._o.endRange = m.endRange
                        }
                        this.draw()
                    },
                    setStartRange: function e(t) {
                        this._o.startRange = t
                    },
                    setEndRange: function e(t) {
                        this._o.endRange = t
                    },
                    draw: function e(t) {
                        if (!this._v && !t) return
                        var i = this._o,
                            s = i.minYear,
                            n = i.maxYear,
                            l = i.minMonth,
                            a = i.maxMonth,
                            o = '',
                            r
                        if (this._y <= s) {
                            this._y = s
                            if (!isNaN(l) && this._m < l) this._m = l
                        }
                        if (this._y >= n) {
                            this._y = n
                            if (!isNaN(a) && this._m > a) this._m = a
                        }
                        for (var h = 0; h < i.numberOfMonths; h++) {
                            r =
                                'pika-title-' +
                                Math.random()
                                    .toString(36)
                                    .replace(/[^a-z]+/g, '')
                                    .substr(0, 2)
                            o +=
                                '<div class="pika-lendar">' +
                                w(
                                    this,
                                    h,
                                    this.calendars[h].year,
                                    this.calendars[h].month,
                                    this.calendars[0].year,
                                    r
                                ) +
                                this.render(this.calendars[h].year, this.calendars[h].month, r) +
                                '</div>'
                        }
                        this.el.innerHTML = o
                        if (i.bound)
                            if (i.field.type !== 'hidden')
                                c(function () {
                                    i.trigger.focus()
                                }, 1)
                        if (typeof this._o.onDraw === 'function') this._o.onDraw(this)
                        if (i.bound) i.field.setAttribute('aria-label', i.ariaLabel)
                    },
                    adjustPosition: function e() {
                        var t, i, s, n, l, a, o, r, h, c, d, u
                        if (this._o.container) return
                        this.el.style.position = 'absolute'
                        t = this._o.trigger
                        i = t
                        s = this.el.offsetWidth
                        n = this.el.offsetHeight
                        l = window.innerWidth || g.documentElement.clientWidth
                        a = window.innerHeight || g.documentElement.clientHeight
                        o = window.pageYOffset || g.body.scrollTop || g.documentElement.scrollTop
                        d = true
                        u = true
                        if (typeof t.getBoundingClientRect === 'function') {
                            c = t.getBoundingClientRect()
                            r = c.left + window.pageXOffset
                            h = c.bottom + window.pageYOffset
                        } else {
                            r = i.offsetLeft
                            h = i.offsetTop + i.offsetHeight
                            while ((i = i.offsetParent)) {
                                r += i.offsetLeft
                                h += i.offsetTop
                            }
                        }
                        if (
                            (this._o.reposition && r + s > l) ||
                            (this._o.position.indexOf('right') > -1 && r - s + t.offsetWidth > 0)
                        ) {
                            r = r - s + t.offsetWidth
                            d = false
                        }
                        if (
                            (this._o.reposition && h + n > a + o) ||
                            (this._o.position.indexOf('top') > -1 && h - n - t.offsetHeight > 0)
                        ) {
                            h = h - n - t.offsetHeight
                            u = false
                        }
                        this.el.style.left = r + 'px'
                        this.el.style.top = h + 'px'
                        p(this.el, d ? 'left-aligned' : 'right-aligned')
                        p(this.el, u ? 'bottom-aligned' : 'top-aligned')
                        v(this.el, !d ? 'left-aligned' : 'right-aligned')
                        v(this.el, !u ? 'bottom-aligned' : 'top-aligned')
                    },
                    render: function e(t, i, s) {
                        var n = this._o,
                            l = new Date(),
                            a = B(t, i),
                            o = new Date(t, i, 1).getDay(),
                            r = [],
                            h = []
                        P(l)
                        if (n.firstDay > 0) {
                            o -= n.firstDay
                            if (o < 0) o += 7
                        }
                        var c = i === 0 ? 11 : i - 1,
                            d = i === 11 ? 0 : i + 1,
                            u = i === 0 ? t - 1 : t,
                            g = i === 11 ? t + 1 : t,
                            p = B(u, c)
                        var v = a + o,
                            m = v
                        while (m > 7) m -= 7
                        v += 7 - m
                        var b = false
                        for (var f = 0, y = 0; f < v; f++) {
                            var E = new Date(t, i, 1 + (f - o)),
                                L = M(this._d) ? R(E, this._d) : false,
                                w = R(E, l),
                                S = n.events.indexOf(E.toDateString()) !== -1 ? true : false,
                                k = f < o || f >= a + o,
                                C = 1 + (f - o),
                                x = i,
                                O = t,
                                A = n.startRange && R(n.startRange, E),
                                T = n.endRange && R(n.endRange, E),
                                _ = n.startRange && n.endRange && n.startRange < E && E < n.endRange,
                                I =
                                    (n.minDate && E < n.minDate) ||
                                    (n.maxDate && E > n.maxDate) ||
                                    (n.disableWeekends && N(E)) ||
                                    (n.disableDayFn && n.disableDayFn(E))
                            if (k)
                                if (f < o) {
                                    C = p + C
                                    x = c
                                    O = u
                                } else {
                                    C = C - a
                                    x = d
                                    O = g
                                }
                            var D = {
                                day: C,
                                month: x,
                                year: O,
                                hasEvent: S,
                                isSelected: L,
                                isToday: w,
                                isDisabled: I,
                                isEmpty: k,
                                isStartRange: A,
                                isEndRange: T,
                                isInRange: _,
                                showDaysInNextAndPreviousMonths: n.showDaysInNextAndPreviousMonths,
                                enableSelectionDaysInNextAndPreviousMonths:
                                    n.enableSelectionDaysInNextAndPreviousMonths,
                            }
                            if (n.pickWholeWeek && L) b = true
                            h.push(F(D))
                            if (++y === 7) {
                                if (n.showWeekNumber) h.unshift(z(f - o, i, t, n.firstWeekOfYearMinDays))
                                r.push(H(h, n.isRTL, n.pickWholeWeek, b))
                                h = []
                                y = 0
                                b = false
                            }
                        }
                        return K(n, r, s)
                    },
                    isVisible: function e() {
                        return this._v
                    },
                    show: function e() {
                        if (!this.isVisible()) {
                            this._v = true
                            this.draw()
                            v(this.el, 'is-hidden')
                            if (this._o.bound) {
                                a(g, 'click', this._onClick)
                                this.adjustPosition()
                            }
                            if (typeof this._o.onOpen === 'function') this._o.onOpen.call(this)
                        }
                    },
                    hide: function e() {
                        var t = this._v
                        if (t !== false) {
                            if (this._o.bound) i(g, 'click', this._onClick)
                            if (!this._o.container) {
                                this.el.style.position = 'static'
                                this.el.style.left = 'auto'
                                this.el.style.top = 'auto'
                            }
                            p(this.el, 'is-hidden')
                            this._v = false
                            if (t !== undefined && typeof this._o.onClose === 'function')
                                this._o.onClose.call(this)
                        }
                    },
                    destroy: function e() {
                        var t = this._o
                        this.hide()
                        i(this.el, 'mousedown', this._onMouseDown, true)
                        i(this.el, 'touchend', this._onMouseDown, true)
                        i(this.el, 'change', this._onChange)
                        if (t.keyboardInput) i(g, 'keydown', this._onKeyChange)
                        if (t.field) {
                            i(t.field, 'change', this._onInputChange)
                            if (t.bound) {
                                i(t.trigger, 'click', this._onInputClick)
                                i(t.trigger, 'focus', this._onInputFocus)
                                i(t.trigger, 'blur', this._onInputBlur)
                            }
                        }
                        if (this.el.parentNode) this.el.parentNode.removeChild(this.el)
                    },
                }),
                e
            )
        })(moment)
    })
    function c(e, t) {
        return e.tabIndex < 0 &&
            (t || /^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || e.isContentEditable) &&
            isNaN(parseInt(e.getAttribute('tabindex'), 10))
            ? 0
            : e.tabIndex
    }
    function K(e, t) {
        return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex
    }
    function s(e) {
        return 'INPUT' === e.tagName
    }
    function V(e) {
        if (!e.name) return 1
        function t(e) {
            return i.querySelectorAll('input[type="radio"][name="' + e + '"]')
        }
        var i = e.form || o(e)
        if ('undefined' != typeof window && void 0 !== window.CSS && 'function' == typeof window.CSS.escape)
            s = t(window.CSS.escape(e.name))
        else
            try {
                s = t(e.name)
            } catch (e) {
                return (
                    console.error(
                        'Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s',
                        e.message
                    ),
                    0
                )
            }
        var s = (function (e, t) {
            for (var i = 0; i < e.length; i++) if (e[i].checked && e[i].form === t) return e[i]
        })(s, e.form)
        return !s || s === e
    }
    function W(e) {
        return s((t = e)) && 'radio' === t.type && !V(e)
        var t
    }
    function a(e) {
        var t = (e = e.getBoundingClientRect()).width,
            e = e.height
        return 0 === t && 0 === e
    }
    function G(e, t) {
        var i = t.displayCheck,
            s = t.getShadowRoot
        if ('hidden' === getComputedStyle(e).visibility) return 1
        if (
            ((t = u.call(e, 'details>summary:first-of-type') ? e.parentElement : e),
            u.call(t, 'details:not([open]) *'))
        )
            return 1
        if (i && 'full' !== i && 'legacy-full' !== i) {
            if ('non-zero-area' === i) return a(e)
        } else {
            if ('function' == typeof s) {
                for (t = e; e; ) {
                    var n = e.parentElement,
                        l = o(e)
                    if (n && !n.shadowRoot && !0 === s(n)) return a(e)
                    e = e.assignedSlot || (n || l === e.ownerDocument ? n : l.host)
                }
                e = t
            }
            if (
                (function (e) {
                    for (
                        var t,
                            i = o(e).host,
                            s = !!(
                                (null != (t = i) && t.ownerDocument.contains(i)) ||
                                e.ownerDocument.contains(e)
                            );
                        !s && i;

                    )
                        var n, s = !(null == (n = i = o(i).host) || !n.ownerDocument.contains(i))
                    return s
                })(e)
            )
                return !e.getClientRects().length
            if ('legacy-full' !== i) return 1
        }
    }
    function L(e, t) {
        if (((t = t || {}), e)) return !1 !== u.call(e, d) && x(t, e)
        throw new Error('No node provided')
    }
    function w(e, t) {
        if (((t = t || {}), e)) return !1 !== u.call(e, Y) && C(t, e)
        throw new Error('No node provided')
    }
    var moment = [
            'input',
            'select',
            'textarea',
            'a[href]',
            'button',
            '[tabindex]:not(slot)',
            'audio[controls]',
            'video[controls]',
            '[contenteditable]:not([contenteditable="false"])',
            'details>summary:first-of-type',
            'details',
        ],
        d = moment.join(','),
        i = 'undefined' == typeof Element,
        u = i
            ? function () {}
            : Element.prototype.matches ||
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector,
        o =
            !i && Element.prototype.getRootNode
                ? function (e) {
                      return e.getRootNode()
                  }
                : function (e) {
                      return e.ownerDocument
                  },
        S = function (e, t, i) {
            var s = Array.prototype.slice.apply(e.querySelectorAll(d))
            return t && u.call(e, d) && s.unshift(e), (s = s.filter(i))
        },
        k = function e(t, i, s) {
            for (var n = [], l = Array.from(t); l.length; ) {
                var a,
                    o,
                    r = l.shift()
                'SLOT' === r.tagName
                    ? ((a = e((a = r.assignedElements()).length ? a : r.children, !0, s)),
                      s.flatten ? n.push.apply(n, a) : n.push({ scopeParent: r, candidates: a }))
                    : (u.call(r, d) && s.filter(r) && (i || !t.includes(r)) && n.push(r),
                      (a = r.shadowRoot || ('function' == typeof s.getShadowRoot && s.getShadowRoot(r))),
                      (o = !s.shadowRootFilter || s.shadowRootFilter(r)),
                      a && o
                          ? ((o = e((!0 === a ? r : a).children, !0, s)),
                            s.flatten ? n.push.apply(n, o) : n.push({ scopeParent: r, candidates: o }))
                          : l.unshift.apply(l, r.children))
            }
            return n
        },
        C = function (e, t) {
            return !(
                t.disabled ||
                (s((i = t)) && 'hidden' === i.type) ||
                G(t, e) ||
                ('DETAILS' === (i = t).tagName &&
                    Array.prototype.slice.apply(i.children).some(function (e) {
                        return 'SUMMARY' === e.tagName
                    })) ||
                (function (e) {
                    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
                        for (var t = e.parentElement; t; ) {
                            if ('FIELDSET' === t.tagName && t.disabled) {
                                for (var i = 0; i < t.children.length; i++) {
                                    var s = t.children.item(i)
                                    if ('LEGEND' === s.tagName)
                                        return !!u.call(t, 'fieldset[disabled] *') || !s.contains(e)
                                }
                                return !0
                            }
                            t = t.parentElement
                        }
                    return !1
                })(t)
            )
            var i
        },
        x = function (e, t) {
            return !(W(t) || c(t) < 0 || !C(e, t))
        },
        j = function (e) {
            e = parseInt(e.getAttribute('tabindex'), 10)
            return !!(isNaN(e) || 0 <= e)
        },
        U = function a(e) {
            var o = [],
                r = []
            return (
                e.forEach(function (e, t) {
                    var i = !!e.scopeParent,
                        s = i ? e.scopeParent : e,
                        n = c(s, i),
                        l = i ? a(e.candidates) : s
                    0 === n
                        ? i
                            ? o.push.apply(o, l)
                            : o.push(s)
                        : r.push({ documentOrder: t, tabIndex: n, item: e, isScope: i, content: l })
                }),
                r
                    .sort(K)
                    .reduce(function (e, t) {
                        return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e
                    }, [])
                    .concat(o)
            )
        },
        Y = moment.concat('iframe').join(',')
    function l(t, e) {
        var i,
            s = Object.keys(t)
        return (
            Object.getOwnPropertySymbols &&
                ((i = Object.getOwnPropertySymbols(t)),
                e &&
                    (i = i.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    })),
                s.push.apply(s, i)),
            s
        )
    }
    function O(s) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {}
            e % 2
                ? l(Object(n), !0).forEach(function (e) {
                      var t, i
                      ;(t = s),
                          (i = n[(e = e)]),
                          (e = (function (e) {
                              e = (function (e, t) {
                                  if ('object' != typeof e || null === e) return e
                                  var i = e[Symbol.toPrimitive]
                                  if (void 0 === i) return ('string' === t ? String : Number)(e)
                                  i = i.call(e, t || 'default')
                                  if ('object' != typeof i) return i
                                  throw new TypeError('@@toPrimitive must return a primitive value.')
                              })(e, 'string')
                              return 'symbol' == typeof e ? e : String(e)
                          })(e)) in t
                              ? Object.defineProperty(t, e, {
                                    value: i,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                })
                              : (t[e] = i)
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(n))
                : l(Object(n)).forEach(function (e) {
                      Object.defineProperty(s, e, Object.getOwnPropertyDescriptor(n, e))
                  })
        }
        return s
    }
    function q(e) {
        return D(e) && !e.shiftKey
    }
    function X(e) {
        return D(e) && e.shiftKey
    }
    function A(e) {
        return setTimeout(e, 0)
    }
    function T(e, i) {
        var s = -1
        return (
            e.every(function (e, t) {
                return !i(e) || ((s = t), !1)
            }),
            s
        )
    }
    function _(e) {
        for (var t = arguments.length, i = new Array(1 < t ? t - 1 : 0), s = 1; s < t; s++)
            i[s - 1] = arguments[s]
        return 'function' == typeof e ? e.apply(void 0, i) : e
    }
    function I(e) {
        return e.target.shadowRoot && 'function' == typeof e.composedPath ? e.composedPath()[0] : e.target
    }
    function g(e, t) {
        function l(e, t, i) {
            return e && void 0 !== e[t] ? e[t] : u[i || t]
        }
        function a(e) {
            var t = u[e]
            if ('function' == typeof t) {
                for (var i = arguments.length, s = new Array(1 < i ? i - 1 : 0), n = 1; n < i; n++)
                    s[n - 1] = arguments[n]
                t = t.apply(void 0, s)
            }
            if (!(t = !0 === t ? void 0 : t)) {
                if (void 0 === t || !1 === t) return t
                throw new Error('`'.concat(e, '` was specified but was not a node, or did not return a node'))
            }
            var l = t
            if ('string' != typeof t || (l = c.querySelector(t))) return l
            throw new Error('`'.concat(e, '` as selector refers to no known node'))
        }
        function o() {
            if (
                ((g.containerGroups = g.containers.map(function (e) {
                    var t,
                        i,
                        s = (function (e, t) {
                            e = (t = t || {}).getShadowRoot
                                ? k([e], t.includeContainer, {
                                      filter: x.bind(null, t),
                                      flatten: !1,
                                      getShadowRoot: t.getShadowRoot,
                                      shadowRootFilter: j,
                                  })
                                : S(e, t.includeContainer, x.bind(null, t))
                            return U(e)
                        })(e, u.tabbableOptions),
                        n =
                            ((t = e),
                            (i = (i = u.tabbableOptions) || {}).getShadowRoot
                                ? k([t], i.includeContainer, {
                                      filter: C.bind(null, i),
                                      flatten: !0,
                                      getShadowRoot: i.getShadowRoot,
                                  })
                                : S(t, i.includeContainer, C.bind(null, i)))
                    return {
                        container: e,
                        tabbableNodes: s,
                        focusableNodes: n,
                        firstTabbableNode: 0 < s.length ? s[0] : null,
                        lastTabbableNode: 0 < s.length ? s[s.length - 1] : null,
                        nextTabbableNode: function (t) {
                            var e = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
                                i = n.findIndex(function (e) {
                                    return e === t
                                })
                            if (!(i < 0))
                                return e
                                    ? n.slice(i + 1).find(function (e) {
                                          return L(e, u.tabbableOptions)
                                      })
                                    : n
                                          .slice(0, i)
                                          .reverse()
                                          .find(function (e) {
                                              return L(e, u.tabbableOptions)
                                          })
                        },
                    }
                })),
                (g.tabbableGroups = g.containerGroups.filter(function (e) {
                    return 0 < e.tabbableNodes.length
                })),
                g.tabbableGroups.length <= 0 && !a('fallbackFocus'))
            )
                throw new Error(
                    'Your focus-trap must have at least one container with at least one tabbable node in it at all times'
                )
        }
        function r(e) {
            var t = a('setReturnFocus', e)
            return t || (!1 !== t && e)
        }
        function n() {
            if (g.active)
                $(d, E),
                    (g.delayInitialFocusTimer = u.delayInitialFocus
                        ? A(function () {
                              v(s())
                          })
                        : v(s())),
                    c.addEventListener('focusin', m, !0),
                    c.addEventListener('mousedown', i, { capture: !0, passive: !1 }),
                    c.addEventListener('touchstart', i, { capture: !0, passive: !1 }),
                    c.addEventListener('click', y, { capture: !0, passive: !1 }),
                    c.addEventListener('keydown', f, { capture: !0, passive: !1 })
        }
        function h() {
            if (g.active)
                c.removeEventListener('focusin', m, !0),
                    c.removeEventListener('mousedown', i, !0),
                    c.removeEventListener('touchstart', i, !0),
                    c.removeEventListener('click', y, !0),
                    c.removeEventListener('keydown', f, !0)
        }
        var c = (null == t ? void 0 : t.document) || document,
            d = (null == t ? void 0 : t.trapStack) || J,
            u = O(
                {
                    returnFocusOnDeactivate: !0,
                    escapeDeactivates: !0,
                    delayInitialFocus: !0,
                    isKeyForward: q,
                    isKeyBackward: X,
                },
                t
            ),
            g = {
                containers: [],
                containerGroups: [],
                tabbableGroups: [],
                nodeFocusedBeforeActivation: null,
                mostRecentlyFocusedNode: null,
                active: !1,
                paused: !1,
                delayInitialFocusTimer: void 0,
            },
            p = function (i) {
                return g.containerGroups.findIndex(function (e) {
                    var t = e.container,
                        e = e.tabbableNodes
                    return (
                        t.contains(i) ||
                        e.find(function (e) {
                            return e === i
                        })
                    )
                })
            },
            s = function () {
                var e,
                    t = a('initialFocus')
                if (!1 === t) return !1
                if (
                    (t =
                        void 0 === t
                            ? 0 <= p(c.activeElement)
                                ? c.activeElement
                                : ((e = g.tabbableGroups[0]) && e.firstTabbableNode) || a('fallbackFocus')
                            : t)
                )
                    return t
                throw new Error('Your focus-trap needs to have at least one focusable element')
            },
            v = function e(t) {
                var i
                !1 !== t &&
                    t !== c.activeElement &&
                    (t && t.focus
                        ? (t.focus({ preventScroll: !!u.preventScroll }),
                          (g.mostRecentlyFocusedNode = t),
                          (i = t).tagName &&
                              'input' === i.tagName.toLowerCase() &&
                              'function' == typeof i.select &&
                              t.select())
                        : e(s()))
            },
            i = function (e) {
                var t = I(e)
                0 <= p(t) ||
                    (_(u.clickOutsideDeactivates, e)
                        ? E.deactivate({ returnFocus: u.returnFocusOnDeactivate && !w(t, u.tabbableOptions) })
                        : _(u.allowOutsideClick, e) || e.preventDefault())
            },
            m = function (e) {
                var t = I(e),
                    i = 0 <= p(t)
                i || t instanceof Document
                    ? i && (g.mostRecentlyFocusedNode = t)
                    : (e.stopImmediatePropagation(), v(g.mostRecentlyFocusedNode || s()))
            },
            b = function (e) {
                var t,
                    i,
                    s = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                    n = I(e),
                    l = (o(), null)
                0 < g.tabbableGroups.length
                    ? ((t = 0 <= (i = p(n)) ? g.containerGroups[i] : void 0),
                      i < 0
                          ? (l = s
                                ? g.tabbableGroups[g.tabbableGroups.length - 1].lastTabbableNode
                                : g.tabbableGroups[0].firstTabbableNode)
                          : s
                          ? 0 <=
                            (s =
                                (s = T(g.tabbableGroups, function (e) {
                                    e = e.firstTabbableNode
                                    return n === e
                                })) < 0 &&
                                (t.container === n ||
                                    (w(n, u.tabbableOptions) &&
                                        !L(n, u.tabbableOptions) &&
                                        !t.nextTabbableNode(n, !1)))
                                    ? i
                                    : s)
                              ? ((s = 0 === s ? g.tabbableGroups.length - 1 : s - 1),
                                (l = g.tabbableGroups[s].lastTabbableNode))
                              : D(e) || (l = t.nextTabbableNode(n, !1))
                          : 0 <=
                            (s =
                                (s = T(g.tabbableGroups, function (e) {
                                    e = e.lastTabbableNode
                                    return n === e
                                })) < 0 &&
                                (t.container === n ||
                                    (w(n, u.tabbableOptions) &&
                                        !L(n, u.tabbableOptions) &&
                                        !t.nextTabbableNode(n)))
                                    ? i
                                    : s)
                          ? ((i = s === g.tabbableGroups.length - 1 ? 0 : s + 1),
                            (l = g.tabbableGroups[i].firstTabbableNode))
                          : D(e) || (l = t.nextTabbableNode(n)))
                    : (l = a('fallbackFocus')),
                    l && (D(e) && e.preventDefault(), v(l))
            },
            f = function (e) {
                var t
                ;('Escape' !== (t = e).key && 'Esc' !== t.key && 27 !== t.keyCode) ||
                !1 === _(u.escapeDeactivates, e)
                    ? (u.isKeyForward(e) || u.isKeyBackward(e)) && b(e, u.isKeyBackward(e))
                    : (e.preventDefault(), E.deactivate())
            },
            y = function (e) {
                var t = I(e)
                0 <= p(t) ||
                    _(u.clickOutsideDeactivates, e) ||
                    _(u.allowOutsideClick, e) ||
                    (e.preventDefault(), e.stopImmediatePropagation())
            },
            E = {
                get active() {
                    return g.active
                },
                get paused() {
                    return g.paused
                },
                activate: function (e) {
                    var t, i, s
                    return (
                        g.active ||
                            ((t = l(e, 'onActivate')),
                            (i = l(e, 'onPostActivate')),
                            (s = l(e, 'checkCanFocusTrap')) || o(),
                            (g.active = !0),
                            (g.paused = !1),
                            (g.nodeFocusedBeforeActivation = c.activeElement),
                            t && t(),
                            (e = function () {
                                s && o(), n(), i && i()
                            }),
                            s ? s(g.containers.concat()).then(e, e) : e()),
                        this
                    )
                },
                deactivate: function (e) {
                    var t, i, s, n
                    return (
                        g.active &&
                            ((e = O(
                                {
                                    onDeactivate: u.onDeactivate,
                                    onPostDeactivate: u.onPostDeactivate,
                                    checkCanReturnFocus: u.checkCanReturnFocus,
                                },
                                e
                            )),
                            clearTimeout(g.delayInitialFocusTimer),
                            (g.delayInitialFocusTimer = void 0),
                            h(),
                            (g.active = !1),
                            (g.paused = !1),
                            Z(d, E),
                            (t = l(e, 'onDeactivate')),
                            (i = l(e, 'onPostDeactivate')),
                            (s = l(e, 'checkCanReturnFocus')),
                            (n = l(e, 'returnFocus', 'returnFocusOnDeactivate')),
                            t && t(),
                            (e = function () {
                                A(function () {
                                    n && v(r(g.nodeFocusedBeforeActivation)), i && i()
                                })
                            }),
                            n && s ? s(r(g.nodeFocusedBeforeActivation)).then(e, e) : e()),
                        this
                    )
                },
                pause: function () {
                    return !g.paused && g.active && ((g.paused = !0), h()), this
                },
                unpause: function () {
                    return g.paused && g.active && ((g.paused = !1), o(), n()), this
                },
                updateContainerElements: function (e) {
                    e = [].concat(e).filter(Boolean)
                    return (
                        (g.containers = e.map(function (e) {
                            return 'string' == typeof e ? c.querySelector(e) : e
                        })),
                        g.active && o(),
                        this
                    )
                },
            }
        return E.updateContainerElements(e), E
    }
    var $ = function (e, t) {
            0 < e.length && (i = e[e.length - 1]) !== t && i.pause()
            var i = e.indexOf(t)
            ;-1 !== i && e.splice(i, 1), e.push(t)
        },
        Z = function (e, t) {
            t = e.indexOf(t)
            ;-1 !== t && e.splice(t, 1), 0 < e.length && e[e.length - 1].unpause()
        },
        D = function (e) {
            return 'Tab' === e.key || 9 === e.keyCode
        },
        J = []
    var p = t(function (e) {
            function s(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var s = t[i]
                    ;(s.enumerable = s.enumerable || !1),
                        (s.configurable = !0),
                        'value' in s && (s.writable = !0),
                        Object.defineProperty(e, s.key, s)
                }
            }
            function r(e, t) {
                for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
            }
            function h(e) {
                return parseFloat(e) || 0
            }
            function c(e) {
                for (var t = 0; e; ) (t += e.offsetTop), (e = e.offsetParent)
                return t
            }
            function i(t) {
                if (!(this instanceof i)) throw new TypeError('Cannot call a class as a function')
                if (!(t instanceof HTMLElement)) throw new Error('First argument must be HTMLElement')
                if (
                    m.some(function (e) {
                        return e._node === t
                    })
                )
                    throw new Error('Stickyfill is already applied to this node')
                ;(this._node = t),
                    (this._stickyMode = null),
                    (this._active = !1),
                    m.push(this),
                    this.refresh()
            }
            function t() {
                var e, t, i
                function s() {
                    d.pageXOffset != v.left
                        ? ((v.top = d.pageYOffset), (v.left = d.pageXOffset), f.refreshAll())
                        : d.pageYOffset != v.top &&
                          ((v.top = d.pageYOffset),
                          (v.left = d.pageXOffset),
                          m.forEach(function (e) {
                              return e._recalcPosition()
                          }))
                }
                function n() {
                    e = setInterval(function () {
                        m.forEach(function (e) {
                            return e._fastCheck()
                        })
                    }, 500)
                }
                o ||
                    ((o = !0),
                    s(),
                    d.addEventListener('scroll', s),
                    d.addEventListener('resize', f.refreshAll),
                    d.addEventListener('orientationchange', f.refreshAll),
                    (i = t = e = void 0),
                    'hidden' in u
                        ? ((t = 'hidden'), (i = 'visibilitychange'))
                        : 'webkitHidden' in u && ((t = 'webkitHidden'), (i = 'webkitvisibilitychange')),
                    i
                        ? (u[t] || n(),
                          u.addEventListener(i, function () {
                              u[t] ? clearInterval(e) : n()
                          }))
                        : n())
            }
            var d, u, n, l, g, a, o, p, v, m, b, f
            ;(d = window),
                (u = document),
                (g = !(n = function (e, t, i) {
                    return t && s(e.prototype, t), i && s(e, i), e
                })),
                (a = void 0 !== d) && d.getComputedStyle
                    ? ((l = u.createElement('div')),
                      ['', '-webkit-', '-moz-', '-ms-'].some(function (e) {
                          try {
                              l.style.position = e + 'sticky'
                          } catch (e) {}
                          return '' != l.style.position
                      }) && (g = !0))
                    : (g = !0),
                (o = !1),
                (p = 'undefined' != typeof ShadowRoot),
                (v = { top: null, left: null }),
                (m = []),
                n(i, [
                    {
                        key: 'refresh',
                        value: function () {
                            var e, t, i, s, n, l, a, o
                            g ||
                                this._removed ||
                                (this._active && this._deactivate(),
                                (e = this._node),
                                (t = {
                                    position: (i = getComputedStyle(e)).position,
                                    top: i.top,
                                    display: i.display,
                                    marginTop: i.marginTop,
                                    marginBottom: i.marginBottom,
                                    marginLeft: i.marginLeft,
                                    marginRight: i.marginRight,
                                    cssFloat: i.cssFloat,
                                }),
                                isNaN(parseFloat(t.top)) ||
                                    'table-cell' == t.display ||
                                    'none' == t.display ||
                                    ((this._active = !0),
                                    (o = e.style.position),
                                    ('sticky' != i.position && '-webkit-sticky' != i.position) ||
                                        (e.style.position = 'static'),
                                    (i = e.parentNode),
                                    (s = p && i instanceof ShadowRoot ? i.host : i),
                                    (n = e.getBoundingClientRect()),
                                    (a = s.getBoundingClientRect()),
                                    (l = getComputedStyle(s)),
                                    (this._parent = {
                                        node: s,
                                        styles: { position: s.style.position },
                                        offsetHeight: s.offsetHeight,
                                    }),
                                    (this._offsetToWindow = {
                                        left: n.left,
                                        right: u.documentElement.clientWidth - n.right,
                                    }),
                                    (this._offsetToParent = {
                                        top: n.top - a.top - h(l.borderTopWidth),
                                        left: n.left - a.left - h(l.borderLeftWidth),
                                        right: -n.right + a.right - h(l.borderRightWidth),
                                    }),
                                    (this._styles = {
                                        position: o,
                                        top: e.style.top,
                                        bottom: e.style.bottom,
                                        left: e.style.left,
                                        right: e.style.right,
                                        width: e.style.width,
                                        marginTop: e.style.marginTop,
                                        marginLeft: e.style.marginLeft,
                                        marginRight: e.style.marginRight,
                                    }),
                                    (o = h(t.top)),
                                    (this._limits = {
                                        start: n.top + d.pageYOffset - o,
                                        end:
                                            a.top +
                                            d.pageYOffset +
                                            s.offsetHeight -
                                            h(l.borderBottomWidth) -
                                            e.offsetHeight -
                                            o -
                                            h(t.marginBottom),
                                    }),
                                    'absolute' != (a = l.position) &&
                                        'relative' != a &&
                                        (s.style.position = 'relative'),
                                    this._recalcPosition(),
                                    ((o = this._clone = {}).node = u.createElement('div')),
                                    r(o.node.style, {
                                        width: n.right - n.left + 'px',
                                        height: n.bottom - n.top + 'px',
                                        marginTop: t.marginTop,
                                        marginBottom: t.marginBottom,
                                        marginLeft: t.marginLeft,
                                        marginRight: t.marginRight,
                                        cssFloat: t.cssFloat,
                                        padding: 0,
                                        border: 0,
                                        borderSpacing: 0,
                                        fontSize: '1em',
                                        position: 'static',
                                    }),
                                    i.insertBefore(o.node, e),
                                    (o.docOffsetTop = c(o.node))))
                        },
                    },
                    {
                        key: '_recalcPosition',
                        value: function () {
                            if (this._active && !this._removed) {
                                var e =
                                    v.top <= this._limits.start
                                        ? 'start'
                                        : v.top >= this._limits.end
                                        ? 'end'
                                        : 'middle'
                                if (this._stickyMode != e) {
                                    switch (e) {
                                        case 'start':
                                            r(this._node.style, {
                                                position: 'absolute',
                                                left: this._offsetToParent.left + 'px',
                                                right: this._offsetToParent.right + 'px',
                                                top: this._offsetToParent.top + 'px',
                                                bottom: 'auto',
                                                width: 'auto',
                                                marginLeft: 0,
                                                marginRight: 0,
                                                marginTop: 0,
                                            })
                                            break
                                        case 'middle':
                                            r(this._node.style, {
                                                position: 'fixed',
                                                left: this._offsetToWindow.left + 'px',
                                                right: this._offsetToWindow.right + 'px',
                                                top: this._styles.top,
                                                bottom: 'auto',
                                                width: 'auto',
                                                marginLeft: 0,
                                                marginRight: 0,
                                                marginTop: 0,
                                            })
                                            break
                                        case 'end':
                                            r(this._node.style, {
                                                position: 'absolute',
                                                left: this._offsetToParent.left + 'px',
                                                right: this._offsetToParent.right + 'px',
                                                top: 'auto',
                                                bottom: 0,
                                                width: 'auto',
                                                marginLeft: 0,
                                                marginRight: 0,
                                            })
                                    }
                                    this._stickyMode = e
                                }
                            }
                        },
                    },
                    {
                        key: '_fastCheck',
                        value: function () {
                            this._active &&
                                !this._removed &&
                                (1 < Math.abs(c(this._clone.node) - this._clone.docOffsetTop) ||
                                    1 <
                                        Math.abs(
                                            this._parent.node.offsetHeight - this._parent.offsetHeight
                                        )) &&
                                this.refresh()
                        },
                    },
                    {
                        key: '_deactivate',
                        value: function () {
                            var t = this
                            this._active &&
                                !this._removed &&
                                (this._clone.node.parentNode.removeChild(this._clone.node),
                                delete this._clone,
                                r(this._node.style, this._styles),
                                delete this._styles,
                                m.some(function (e) {
                                    return e !== t && e._parent && e._parent.node === t._parent.node
                                }) || r(this._parent.node.style, this._parent.styles),
                                delete this._parent,
                                (this._stickyMode = null),
                                (this._active = !1),
                                delete this._offsetToWindow,
                                delete this._offsetToParent,
                                delete this._limits)
                        },
                    },
                    {
                        key: 'remove',
                        value: function () {
                            var i = this
                            this._deactivate(),
                                m.some(function (e, t) {
                                    if (e._node === i._node) return m.splice(t, 1), !0
                                }),
                                (this._removed = !0)
                        },
                    },
                ]),
                (f = {
                    stickies: m,
                    Sticky: (b = i),
                    forceSticky: function () {
                        ;(g = !1), t(), this.refreshAll()
                    },
                    addOne: function (e) {
                        if (!(e instanceof HTMLElement)) {
                            if (!e.length || !e[0]) return
                            e = e[0]
                        }
                        for (var t = 0; t < m.length; t++) if (m[t]._node === e) return m[t]
                        return new b(e)
                    },
                    add: function (i) {
                        if ((i = i instanceof HTMLElement ? [i] : i).length) {
                            for (var s = [], e = 0; e < i.length; e++)
                                (function (e) {
                                    var t = i[e]
                                    t instanceof HTMLElement
                                        ? m.some(function (e) {
                                              if (e._node === t) return s.push(e), !0
                                          }) || s.push(new b(t))
                                        : s.push(void 0)
                                })(e)
                            return s
                        }
                    },
                    refreshAll: function () {
                        m.forEach(function (e) {
                            return e.refresh()
                        })
                    },
                    removeOne: function (t) {
                        if (!(t instanceof HTMLElement)) {
                            if (!t.length || !t[0]) return
                            t = t[0]
                        }
                        m.some(function (e) {
                            if (e._node === t) return e.remove(), !0
                        })
                    },
                    remove: function (i) {
                        if ((i = i instanceof HTMLElement ? [i] : i).length)
                            for (var e = 0; e < i.length; e++)
                                !(function (e) {
                                    var t = i[e]
                                    m.some(function (e) {
                                        if (e._node === t) return e.remove(), !0
                                    })
                                })(e)
                    },
                    removeAll: function () {
                        for (; m.length; ) m[0].remove()
                    },
                }),
                g || t(),
                e.exports ? (e.exports = f) : a && (d.Stickyfill = f)
        }),
        Q = t(function (e, t) {
            function i(e, t) {
                t = t || { bubbles: !1, cancelable: !1, detail: void 0 }
                var i = document.createEvent('CustomEvent')
                return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
            }
            var s, c, d, u, n, g, p, l, v, a, m, b
            Element.prototype.closest ||
                (Element.prototype.matches ||
                    (Element.prototype.matches =
                        Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
                (Element.prototype.closest = function (e) {
                    var t = this
                    if (document.documentElement.contains(this))
                        do {
                            if (t.matches(e)) return t
                        } while (null !== (t = t.parentElement))
                    return null
                })),
                'function' != typeof window.CustomEvent &&
                    ((i.prototype = window.Event.prototype), (window.CustomEvent = i)),
                (s = 0 ? window : z),
                (e.exports =
                    ((c = s),
                    (d = {
                        navClass: 'active',
                        contentClass: 'active',
                        nested: !1,
                        nestedClass: 'active',
                        offset: 0,
                        reflow: !1,
                        events: !0,
                    }),
                    (u = function (e, t, i) {
                        i.settings.events &&
                            ((e = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: i })),
                            t.dispatchEvent(e))
                    }),
                    (n = function (e) {
                        var t = 0
                        if (e.offsetParent) for (; e; ) (t += e.offsetTop), (e = e.offsetParent)
                        return 0 <= t ? t : 0
                    }),
                    (g = function (e) {
                        e &&
                            e.sort(function (e, t) {
                                return n(e.content) < n(t.content) ? -1 : 1
                            })
                    }),
                    (p = function (e, t, i) {
                        ;(e = e.getBoundingClientRect()),
                            (t =
                                'function' == typeof (t = t).offset
                                    ? parseFloat(t.offset())
                                    : parseFloat(t.offset))
                        return i
                            ? parseInt(e.bottom, 10) <
                                  (c.innerHeight || document.documentElement.clientHeight)
                            : parseInt(e.top, 10) <= t
                    }),
                    (l = function () {
                        return (
                            c.innerHeight + c.pageYOffset >=
                            Math.max(
                                document.body.scrollHeight,
                                document.documentElement.scrollHeight,
                                document.body.offsetHeight,
                                document.documentElement.offsetHeight,
                                document.body.clientHeight,
                                document.documentElement.clientHeight
                            )
                        )
                    }),
                    (v = function (e, t) {
                        return !(!l() || !p(e.content, t, !0))
                    }),
                    (a = function e(t, i) {
                        i.nested &&
                            t.parentNode &&
                            (t = t.parentNode.closest('li')) &&
                            (t.classList.remove(i.nestedClass), e(t, i))
                    }),
                    (m = function (e, t) {
                        var i
                        !e ||
                            ((i = e.nav.closest('li')) &&
                                (i.classList.remove(t.navClass),
                                e.content.classList.remove(t.contentClass),
                                a(i, t),
                                u('gumshoeDeactivate', i, { link: e.nav, content: e.content, settings: t })))
                    }),
                    (b = function e(t, i) {
                        !i.nested ||
                            ((t = t.parentNode.closest('li')) && (t.classList.add(i.nestedClass), e(t, i)))
                    }),
                    function (e, t) {
                        function i(e) {
                            o && c.cancelAnimationFrame(o), (o = c.requestAnimationFrame(h.detect))
                        }
                        function s(e) {
                            o && c.cancelAnimationFrame(o),
                                (o = c.requestAnimationFrame(function () {
                                    g(l), h.detect()
                                }))
                        }
                        var n,
                            l,
                            a,
                            o,
                            r,
                            h = {
                                setup: function () {
                                    ;(n = document.querySelectorAll(e)),
                                        (l = []),
                                        Array.prototype.forEach.call(n, function (e) {
                                            var t = document.getElementById(
                                                decodeURIComponent(e.hash.substr(1))
                                            )
                                            t && l.push({ nav: e, content: t })
                                        }),
                                        g(l)
                                },
                            }
                        ;(h.detect = function () {
                            var e,
                                t,
                                i,
                                s = (function (e, t) {
                                    var i = e[e.length - 1]
                                    if (v(i, t)) return i
                                    for (var s = e.length - 1; 0 <= s; s--)
                                        if (p(e[s].content, t)) return e[s]
                                })(l, r)
                            s
                                ? (a && s.content === a.content) ||
                                  (m(a, r),
                                  (t = r),
                                  (e = s) &&
                                      (i = e.nav.closest('li')) &&
                                      (i.classList.add(t.navClass),
                                      e.content.classList.add(t.contentClass),
                                      b(i, t),
                                      u('gumshoeActivate', i, {
                                          link: e.nav,
                                          content: e.content,
                                          settings: t,
                                      })),
                                  (a = s))
                                : a && (m(a, r), (a = null))
                        }),
                            (h.destroy = function () {
                                a && m(a, r),
                                    c.removeEventListener('scroll', i, !1),
                                    r.reflow && c.removeEventListener('resize', s, !1),
                                    (r = o = a = n = l = null)
                            })
                        return (
                            (r = (function () {
                                var i = {}
                                return (
                                    Array.prototype.forEach.call(arguments, function (e) {
                                        for (var t in e) {
                                            if (!e.hasOwnProperty(t)) return
                                            i[t] = e[t]
                                        }
                                    }),
                                    i
                                )
                            })(d, t || {})),
                            h.setup(),
                            h.detect(),
                            c.addEventListener('scroll', i, !1),
                            r.reflow && c.addEventListener('resize', s, !1),
                            h
                        )
                    }))
        })
    var i = t(function (e) {
            function s(e) {
                if (n[e]) return n[e].exports
                var t = (n[e] = { i: e, l: !1, exports: {} })
                return i[e].call(t.exports, t, t.exports, s), (t.l = !0), t.exports
            }
            var i, n
            e.exports =
                ((i = [
                    function (e, t, i) {
                        e.exports = {
                            BROWSER_TYPES: {
                                CHROME: 'Chrome',
                                FIREFOX: 'Firefox',
                                OPERA: 'Opera',
                                YANDEX: 'Yandex',
                                SAFARI: 'Safari',
                                INTERNET_EXPLORER: 'Internet Explorer',
                                EDGE: 'Edge',
                                CHROMIUM: 'Chromium',
                                IE: 'IE',
                                MOBILE_SAFARI: 'Mobile Safari',
                                EDGE_CHROMIUM: 'Edge Chromium',
                            },
                            DEVICE_TYPES: {
                                MOBILE: 'mobile',
                                TABLET: 'tablet',
                                SMART_TV: 'smarttv',
                                CONSOLE: 'console',
                                WEARABLE: 'wearable',
                                BROWSER: void 0,
                            },
                            OS_TYPES: {
                                IOS: 'iOS',
                                ANDROID: 'Android',
                                WINDOWS_PHONE: 'Windows Phone',
                                WINDOWS: 'Windows',
                                MAC_OS: 'Mac OS',
                            },
                            defaultData: {
                                isMobile: !1,
                                isTablet: !1,
                                isBrowser: !1,
                                isSmartTV: !1,
                                isConsole: !1,
                                isWearable: !1,
                            },
                        }
                    },
                    function (e, P, t) {
                        function i() {
                            return (
                                m.name === r.WINDOWS &&
                                '10' === m.version &&
                                'string' == typeof b &&
                                -1 !== b.indexOf('Edg/')
                            )
                        }
                        function s() {
                            return g.name === K
                        }
                        function n() {
                            return u('iPad')
                        }
                        var l = t(2),
                            a = t(0),
                            o = a.BROWSER_TYPES,
                            r = a.OS_TYPES,
                            a = a.DEVICE_TYPES,
                            t = t(4),
                            h = t.checkType,
                            c = t.broPayload,
                            R = t.mobilePayload,
                            F = t.wearPayload,
                            z = t.consolePayload,
                            H = t.stvPayload,
                            d = t.getNavigatorInstance,
                            u = t.isIOS13Check,
                            t = new l(),
                            g = t.getBrowser(),
                            p = t.getDevice(),
                            v = t.getEngine(),
                            m = t.getOS(),
                            b = t.getUA(),
                            l = o.CHROME,
                            t = o.CHROMIUM,
                            f = o.IE,
                            y = o.INTERNET_EXPLORER,
                            E = o.OPERA,
                            L = o.FIREFOX,
                            w = o.SAFARI,
                            K = o.EDGE,
                            S = o.YANDEX,
                            o = o.MOBILE_SAFARI,
                            k = a.MOBILE,
                            C = a.TABLET,
                            x = a.SMART_TV,
                            O = a.BROWSER,
                            A = a.WEARABLE,
                            a = a.CONSOLE,
                            T = r.ANDROID,
                            _ = r.WINDOWS_PHONE,
                            I = r.IOS,
                            D = r.WINDOWS,
                            M = r.MAC_OS,
                            x = p.type === x,
                            a = p.type === a,
                            A = p.type === A,
                            V = g.name === o || n(),
                            t = g.name === t,
                            W =
                                (function () {
                                    switch (p.type) {
                                        case k:
                                        case C:
                                            return !0
                                        default:
                                            return !1
                                    }
                                })() || n(),
                            G = p.type === k,
                            j = p.type === C || n(),
                            O = p.type === O,
                            T = m.name === T,
                            _ = m.name === _,
                            I = m.name === I || n(),
                            l = g.name === l,
                            L = g.name === L,
                            w = g.name === w || g.name === o,
                            o = g.name === E,
                            E = g.name === y || g.name === f,
                            y = m.version || 'none',
                            f = m.name || 'none',
                            U = g.major,
                            Y = g.version,
                            q = g.name,
                            X = p.vendor || 'none',
                            $ = p.model || 'none',
                            Z = v.name,
                            J = v.version,
                            Q = b,
                            ee = s() || i(),
                            S = g.name === S,
                            te = p.type,
                            N =
                                (N = d()) &&
                                (/iPad|iPhone|iPod/.test(N.platform) ||
                                    ('MacIntel' === N.platform && 1 < N.maxTouchPoints)) &&
                                !window.MSStream,
                            ie = n(),
                            se = u('iPhone'),
                            ne = u('iPod'),
                            d =
                                'string' == typeof (d = (d = d()) && d.userAgent.toLowerCase()) &&
                                /electron/.test(d),
                            le = i(),
                            ae = s(),
                            D = m.name === D,
                            M = m.name === M,
                            B = h(p.type)
                        e.exports = {
                            deviceDetect: function () {
                                var e = B.isBrowser,
                                    t = B.isMobile,
                                    i = B.isTablet,
                                    s = B.isSmartTV,
                                    n = B.isConsole,
                                    l = B.isWearable
                                return e
                                    ? c(e, g, v, m, b)
                                    : s
                                    ? H(s, v, m, b)
                                    : n
                                    ? z(n, v, m, b)
                                    : t || i
                                    ? R(B, p, m, b)
                                    : l
                                    ? F(l, v, m, b)
                                    : void 0
                            },
                            isSmartTV: x,
                            isConsole: a,
                            isWearable: A,
                            isMobileSafari: V,
                            isChromium: t,
                            isMobile: W,
                            isMobileOnly: G,
                            isTablet: j,
                            isBrowser: O,
                            isAndroid: T,
                            isWinPhone: _,
                            isIOS: I,
                            isChrome: l,
                            isFirefox: L,
                            isSafari: w,
                            isOpera: o,
                            isIE: E,
                            osVersion: y,
                            osName: f,
                            fullBrowserVersion: U,
                            browserVersion: Y,
                            browserName: q,
                            mobileVendor: X,
                            mobileModel: $,
                            engineName: Z,
                            engineVersion: J,
                            getUA: Q,
                            isEdge: ee,
                            isYandex: S,
                            deviceType: te,
                            isIOS13: N,
                            isIPad13: ie,
                            isIPhone13: se,
                            isIPod13: ne,
                            isElectron: d,
                            isEdgeChromium: le,
                            isLegacyEdge: ae,
                            isWindows: D,
                            isMacOs: M,
                        }
                    },
                    function (e, t, i) {
                        var n, d, s, u, l, a, o, r, h, c, g, p, v, m, b, f, y, E, L, w, S
                        function k(e, t) {
                            if (('object' == typeof e && ((t = e), (e = d)), !(this instanceof k)))
                                return new k(e, t).getResult()
                            var i =
                                    e ||
                                    (n && n.navigator && n.navigator.userAgent ? n.navigator.userAgent : ''),
                                s = t ? y.extend(w, t) : w
                            return (
                                (this.getBrowser = function () {
                                    var e = { name: d, version: d }
                                    return E.rgx.call(e, i, s.browser), (e.major = y.major(e.version)), e
                                }),
                                (this.getCPU = function () {
                                    var e = { architecture: d }
                                    return E.rgx.call(e, i, s.cpu), e
                                }),
                                (this.getDevice = function () {
                                    var e = { vendor: d, model: d, type: d }
                                    return E.rgx.call(e, i, s.device), e
                                }),
                                (this.getEngine = function () {
                                    var e = { name: d, version: d }
                                    return E.rgx.call(e, i, s.engine), e
                                }),
                                (this.getOS = function () {
                                    var e = { name: d, version: d }
                                    return E.rgx.call(e, i, s.os), e
                                }),
                                (this.getResult = function () {
                                    return {
                                        ua: this.getUA(),
                                        browser: this.getBrowser(),
                                        engine: this.getEngine(),
                                        os: this.getOS(),
                                        device: this.getDevice(),
                                        cpu: this.getCPU(),
                                    }
                                }),
                                (this.getUA = function () {
                                    return i
                                }),
                                (this.setUA = function (e) {
                                    return (i = e), this
                                }),
                                this
                            )
                        }
                        ;(n = 'object' == typeof window ? window : this),
                            (u = 'function'),
                            (l = 'undefined'),
                            (a = 'model'),
                            (r = 'type'),
                            (h = 'vendor'),
                            (g = 'architecture'),
                            (p = 'console'),
                            (v = 'mobile'),
                            (m = 'tablet'),
                            (b = 'smarttv'),
                            (f = 'wearable'),
                            (y = {
                                extend: function (e, t) {
                                    var i,
                                        s = {}
                                    for (i in e)
                                        t[i] && t[i].length % 2 == 0
                                            ? (s[i] = t[i].concat(e[i]))
                                            : (s[i] = e[i])
                                    return s
                                },
                                has: function (e, t) {
                                    return (
                                        'string' == typeof e &&
                                        -1 !== t.toLowerCase().indexOf(e.toLowerCase())
                                    )
                                },
                                lowerize: function (e) {
                                    return e.toLowerCase()
                                },
                                major: function (e) {
                                    return 'string' == typeof e ? e.replace(/[^\d\.]/g, '').split('.')[0] : d
                                },
                                trim: function (e) {
                                    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
                                },
                            }),
                            (w = {
                                browser: [
                                    [
                                        /(opera\smini)\/([\w\.-]+)/i,
                                        /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
                                        /(opera).+version\/([\w\.]+)/i,
                                        /(opera)[\/\s]+([\w\.]+)/i,
                                    ],
                                    [(o = 'name'), (c = 'version')],
                                    [/(opios)[\/\s]+([\w\.]+)/i],
                                    [[o, 'Opera Mini'], c],
                                    [/\s(opr)\/([\w\.]+)/i],
                                    [[o, 'Opera'], c],
                                    [
                                        /(kindle)\/([\w\.]+)/i,
                                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                        /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
                                        /(?:ms|\()(ie)\s([\w\.]+)/i,
                                        /(rekonq)\/([\w\.]*)/i,
                                        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i,
                                    ],
                                    [o, c],
                                    [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                                    [[o, 'IE'], c],
                                    [/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i],
                                    [[o, 'Edge'], c],
                                    [/(yabrowser)\/([\w\.]+)/i],
                                    [[o, 'Yandex'], c],
                                    [/(puffin)\/([\w\.]+)/i],
                                    [[o, 'Puffin'], c],
                                    [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                                    [[o, 'UCBrowser'], c],
                                    [/(comodo_dragon)\/([\w\.]+)/i],
                                    [[o, /_/g, ' '], c],
                                    [/(micromessenger)\/([\w\.]+)/i],
                                    [[o, 'WeChat'], c],
                                    [/(qqbrowserlite)\/([\w\.]+)/i],
                                    [o, c],
                                    [/(QQ)\/([\d\.]+)/i],
                                    [o, c],
                                    [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
                                    [o, c],
                                    [/(BIDUBrowser)[\/\s]?([\w\.]+)/i],
                                    [o, c],
                                    [/(2345Explorer)[\/\s]?([\w\.]+)/i],
                                    [o, c],
                                    [/(MetaSr)[\/\s]?([\w\.]+)/i],
                                    [o],
                                    [/(LBBROWSER)/i],
                                    [o],
                                    [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                                    [c, [o, 'MIUI Browser']],
                                    [/;fbav\/([\w\.]+);/i],
                                    [c, [o, 'Facebook']],
                                    [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                                    [c, [o, 'Chrome Headless']],
                                    [/\swv\).+(chrome)\/([\w\.]+)/i],
                                    [[o, /(.+)/, '$1 WebView'], c],
                                    [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
                                    [[o, /(.+(?:g|us))(.+)/, '$1 $2'], c],
                                    [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                                    [c, [o, 'Android Browser']],
                                    [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                                    [o, c],
                                    [/(dolfin)\/([\w\.]+)/i],
                                    [[o, 'Dolphin'], c],
                                    [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                                    [[o, 'Chrome'], c],
                                    [/(coast)\/([\w\.]+)/i],
                                    [[o, 'Opera Coast'], c],
                                    [/fxios\/([\w\.-]+)/i],
                                    [c, [o, 'Firefox']],
                                    [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                                    [c, [o, 'Mobile Safari']],
                                    [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                                    [c, o],
                                    [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                                    [[o, 'GSA'], c],
                                    [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                                    [
                                        o,
                                        [
                                            c,
                                            (E = {
                                                rgx: function (e, t) {
                                                    for (var i, s, n, l, a, o = 0; o < t.length && !l; ) {
                                                        for (
                                                            var r = t[o], h = t[o + 1], c = (i = 0);
                                                            c < r.length && !l;

                                                        )
                                                            if ((l = r[c++].exec(e)))
                                                                for (s = 0; s < h.length; s++)
                                                                    (a = l[++i]),
                                                                        'object' == typeof (n = h[s]) &&
                                                                        0 < n.length
                                                                            ? 2 == n.length
                                                                                ? typeof n[1] == u
                                                                                    ? (this[n[0]] = n[1].call(
                                                                                          this,
                                                                                          a
                                                                                      ))
                                                                                    : (this[n[0]] = n[1])
                                                                                : 3 == n.length
                                                                                ? typeof n[1] != u ||
                                                                                  (n[1].exec && n[1].test)
                                                                                    ? (this[n[0]] = a
                                                                                          ? a.replace(
                                                                                                n[1],
                                                                                                n[2]
                                                                                            )
                                                                                          : d)
                                                                                    : (this[n[0]] = a
                                                                                          ? n[1].call(
                                                                                                this,
                                                                                                a,
                                                                                                n[2]
                                                                                            )
                                                                                          : d)
                                                                                : 4 == n.length &&
                                                                                  (this[n[0]] = a
                                                                                      ? n[3].call(
                                                                                            this,
                                                                                            a.replace(
                                                                                                n[1],
                                                                                                n[2]
                                                                                            )
                                                                                        )
                                                                                      : d)
                                                                            : (this[n] = a || d)
                                                        o += 2
                                                    }
                                                },
                                                str: function (e, t) {
                                                    for (var i in t)
                                                        if ('object' == typeof t[i] && 0 < t[i].length) {
                                                            for (var s = 0; s < t[i].length; s++)
                                                                if (y.has(t[i][s], e))
                                                                    return '?' === i ? d : i
                                                        } else if (y.has(t[i], e)) return '?' === i ? d : i
                                                    return e
                                                },
                                            }).str,
                                            (L = {
                                                browser: {
                                                    oldsafari: {
                                                        version: {
                                                            '1.0': '/8',
                                                            1.2: '/1',
                                                            1.3: '/3',
                                                            '2.0': '/412',
                                                            '2.0.2': '/416',
                                                            '2.0.3': '/417',
                                                            '2.0.4': '/419',
                                                            '?': '/',
                                                        },
                                                    },
                                                },
                                                device: {
                                                    amazon: { model: { 'Fire Phone': ['SD', 'KF'] } },
                                                    sprint: {
                                                        model: { 'Evo Shift 4G': '7373KT' },
                                                        vendor: { HTC: 'APA', Sprint: 'Sprint' },
                                                    },
                                                },
                                                os: {
                                                    windows: {
                                                        version: {
                                                            ME: '4.90',
                                                            'NT 3.11': 'NT3.51',
                                                            'NT 4.0': 'NT4.0',
                                                            2e3: 'NT 5.0',
                                                            XP: ['NT 5.1', 'NT 5.2'],
                                                            Vista: 'NT 6.0',
                                                            7: 'NT 6.1',
                                                            8: 'NT 6.2',
                                                            8.1: 'NT 6.3',
                                                            10: ['NT 6.4', 'NT 10.0'],
                                                            RT: 'ARM',
                                                        },
                                                    },
                                                },
                                            }).browser.oldsafari.version,
                                        ],
                                    ],
                                    [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                                    [o, c],
                                    [/(navigator|netscape)\/([\w\.-]+)/i],
                                    [[o, 'Netscape'], c],
                                    [
                                        /(swiftfox)/i,
                                        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                                        /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
                                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                        /(links)\s\(([\w\.]+)/i,
                                        /(gobrowser)\/?([\w\.]*)/i,
                                        /(ice\s?browser)\/v?([\w\._]+)/i,
                                        /(mosaic)[\/\s]([\w\.]+)/i,
                                    ],
                                    [o, c],
                                ],
                                cpu: [
                                    [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                                    [[g, 'amd64']],
                                    [/(ia32(?=;))/i],
                                    [[g, y.lowerize]],
                                    [/((?:i[346]|x)86)[;\)]/i],
                                    [[g, 'ia32']],
                                    [/windows\s(ce|mobile);\sppc;/i],
                                    [[g, 'arm']],
                                    [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                                    [[g, /ower/, '', y.lowerize]],
                                    [/(sun4\w)[;\)]/i],
                                    [[g, 'sparc']],
                                    [
                                        /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i,
                                    ],
                                    [[g, y.lowerize]],
                                ],
                                device: [
                                    [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                                    [a, h, [r, m]],
                                    [/applecoremedia\/[\w\.]+ \((ipad)/],
                                    [a, [h, 'Apple'], [r, m]],
                                    [/(apple\s{0,1}tv)/i],
                                    [
                                        [a, 'Apple TV'],
                                        [h, 'Apple'],
                                    ],
                                    [
                                        /(archos)\s(gamepad2?)/i,
                                        /(hp).+(touchpad)/i,
                                        /(hp).+(tablet)/i,
                                        /(kindle)\/([\w\.]+)/i,
                                        /\s(nook)[\w\s]+build\/(\w+)/i,
                                        /(dell)\s(strea[kpr\s\d]*[\dko])/i,
                                    ],
                                    [h, a, [r, m]],
                                    [/(kf[A-z]+)\sbuild\/.+silk\//i],
                                    [a, [h, 'Amazon'], [r, m]],
                                    [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
                                    [
                                        [a, E.str, L.device.amazon.model],
                                        [h, 'Amazon'],
                                        [r, v],
                                    ],
                                    [/\((ip[honed|\s\w*]+);.+(apple)/i],
                                    [a, h, [r, v]],
                                    [/\((ip[honed|\s\w*]+);/i],
                                    [a, [h, 'Apple'], [r, v]],
                                    [
                                        /(blackberry)[\s-]?(\w+)/i,
                                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                        /(hp)\s([\w\s]+\w)/i,
                                        /(asus)-?(\w+)/i,
                                    ],
                                    [h, a, [r, v]],
                                    [/\(bb10;\s(\w+)/i],
                                    [a, [h, 'BlackBerry'], [r, v]],
                                    [
                                        /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i,
                                    ],
                                    [a, [h, 'Asus'], [r, m]],
                                    [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                                    [
                                        [h, 'Sony'],
                                        [a, 'Xperia Tablet'],
                                        [r, m],
                                    ],
                                    [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],
                                    [a, [h, 'Sony'], [r, v]],
                                    [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                                    [h, a, [r, p]],
                                    [/android.+;\s(shield)\sbuild/i],
                                    [a, [h, 'Nvidia'], [r, p]],
                                    [/(playstation\s[34portablevi]+)/i],
                                    [a, [h, 'Sony'], [r, p]],
                                    [/(sprint\s(\w+))/i],
                                    [
                                        [h, E.str, L.device.sprint.vendor],
                                        [a, E.str, L.device.sprint.model],
                                        [r, v],
                                    ],
                                    [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                                    [h, a, [r, m]],
                                    [
                                        /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,
                                        /(zte)-(\w*)/i,
                                        /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i,
                                    ],
                                    [h, [a, /_/g, ' '], [r, v]],
                                    [/(nexus\s9)/i],
                                    [a, [h, 'HTC'], [r, m]],
                                    [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
                                    [a, [h, 'Huawei'], [r, v]],
                                    [/(microsoft);\s(lumia[\s\w]+)/i],
                                    [h, a, [r, v]],
                                    [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                                    [a, [h, 'Microsoft'], [r, p]],
                                    [/(kin\.[onetw]{3})/i],
                                    [
                                        [a, /\./g, ' '],
                                        [h, 'Microsoft'],
                                        [r, v],
                                    ],
                                    [
                                        /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
                                        /mot[\s-]?(\w*)/i,
                                        /(XT\d{3,4}) build\//i,
                                        /(nexus\s6)/i,
                                    ],
                                    [a, [h, 'Motorola'], [r, v]],
                                    [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                                    [a, [h, 'Motorola'], [r, m]],
                                    [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                                    [
                                        [h, y.trim],
                                        [a, y.trim],
                                        [r, b],
                                    ],
                                    [/hbbtv.+maple;(\d+)/i],
                                    [
                                        [a, /^/, 'SmartTV'],
                                        [h, 'Samsung'],
                                        [r, b],
                                    ],
                                    [/\(dtv[\);].+(aquos)/i],
                                    [a, [h, 'Sharp'], [r, b]],
                                    [
                                        /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
                                        /((SM-T\w+))/i,
                                    ],
                                    [[h, 'Samsung'], a, [r, m]],
                                    [/smart-tv.+(samsung)/i],
                                    [h, [r, b], a],
                                    [
                                        /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
                                        /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
                                        /sec-((sgh\w+))/i,
                                    ],
                                    [[h, 'Samsung'], a, [r, v]],
                                    [/sie-(\w*)/i],
                                    [a, [h, 'Siemens'], [r, v]],
                                    [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
                                    [[h, 'Nokia'], a, [r, v]],
                                    [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                                    [a, [h, 'Acer'], [r, m]],
                                    [/android.+([vl]k\-?\d{3})\s+build/i],
                                    [a, [h, 'LG'], [r, m]],
                                    [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                                    [[h, 'LG'], a, [r, m]],
                                    [/(lg) netcast\.tv/i],
                                    [h, a, [r, b]],
                                    [
                                        /(nexus\s[45])/i,
                                        /lg[e;\s\/-]+(\w*)/i,
                                        /android.+lg(\-?[\d\w]+)\s+build/i,
                                    ],
                                    [a, [h, 'LG'], [r, v]],
                                    [/android.+(ideatab[a-z0-9\-\s]+)/i],
                                    [a, [h, 'Lenovo'], [r, m]],
                                    [/linux;.+((jolla));/i],
                                    [h, a, [r, v]],
                                    [/((pebble))app\/[\d\.]+\s/i],
                                    [h, a, [r, f]],
                                    [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                                    [h, a, [r, v]],
                                    [/crkey/i],
                                    [
                                        [a, 'Chromecast'],
                                        [h, 'Google'],
                                    ],
                                    [/android.+;\s(glass)\s\d/i],
                                    [a, [h, 'Google'], [r, f]],
                                    [/android.+;\s(pixel c)\s/i],
                                    [a, [h, 'Google'], [r, m]],
                                    [/android.+;\s(pixel xl|pixel)\s/i],
                                    [a, [h, 'Google'], [r, v]],
                                    [
                                        /android.+;\s(\w+)\s+build\/hm\1/i,
                                        /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
                                        /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
                                        /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i,
                                    ],
                                    [
                                        [a, /_/g, ' '],
                                        [h, 'Xiaomi'],
                                        [r, v],
                                    ],
                                    [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
                                    [
                                        [a, /_/g, ' '],
                                        [h, 'Xiaomi'],
                                        [r, m],
                                    ],
                                    [/android.+;\s(m[1-5]\snote)\sbuild/i],
                                    [a, [h, 'Meizu'], [r, m]],
                                    [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
                                    [a, [h, 'OnePlus'], [r, v]],
                                    [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
                                    [a, [h, 'RCA'], [r, m]],
                                    [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
                                    [a, [h, 'Dell'], [r, m]],
                                    [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
                                    [a, [h, 'Verizon'], [r, m]],
                                    [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
                                    [[h, 'Barnes & Noble'], a, [r, m]],
                                    [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
                                    [a, [h, 'NuVision'], [r, m]],
                                    [/android.+;\s(k88)\sbuild/i],
                                    [a, [h, 'ZTE'], [r, m]],
                                    [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
                                    [a, [h, 'Swiss'], [r, v]],
                                    [/android.+[;\/]\s*(zur\d{3})\s+build/i],
                                    [a, [h, 'Swiss'], [r, m]],
                                    [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
                                    [a, [h, 'Zeki'], [r, m]],
                                    [
                                        /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
                                        /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i,
                                    ],
                                    [[h, 'Dragon Touch'], a, [r, m]],
                                    [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
                                    [a, [h, 'Insignia'], [r, m]],
                                    [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
                                    [a, [h, 'NextBook'], [r, m]],
                                    [
                                        /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i,
                                    ],
                                    [[h, 'Voice'], a, [r, v]],
                                    [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
                                    [[h, 'LvTel'], a, [r, v]],
                                    [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
                                    [a, [h, 'Envizen'], [r, m]],
                                    [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
                                    [h, a, [r, m]],
                                    [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
                                    [a, [h, 'MachSpeed'], [r, m]],
                                    [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
                                    [h, a, [r, m]],
                                    [/android.+[;\/]\s*TU_(1491)\s+build/i],
                                    [a, [h, 'Rotor'], [r, m]],
                                    [/android.+(KS(.+))\s+build/i],
                                    [a, [h, 'Amazon'], [r, m]],
                                    [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
                                    [h, a, [r, m]],
                                    [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                                    [[r, y.lowerize], h, a],
                                    [/(android[\w\.\s\-]{0,9});.+build/i],
                                    [a, [h, 'Generic']],
                                ],
                                engine: [
                                    [/windows.+\sedge\/([\w\.]+)/i],
                                    [c, [o, 'EdgeHTML']],
                                    [
                                        /(presto)\/([\w\.]+)/i,
                                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,
                                        /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
                                        /(icab)[\/\s]([23]\.[\d\.]+)/i,
                                    ],
                                    [o, c],
                                    [/rv\:([\w\.]{1,9}).+(gecko)/i],
                                    [c, o],
                                ],
                                os: [
                                    [/microsoft\s(windows)\s(vista|xp)/i],
                                    [o, c],
                                    [
                                        /(windows)\snt\s6\.2;\s(arm)/i,
                                        /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
                                        /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
                                    ],
                                    [o, [c, E.str, L.os.windows.version]],
                                    [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                                    [
                                        [o, 'Windows'],
                                        [c, E.str, L.os.windows.version],
                                    ],
                                    [/\((bb)(10);/i],
                                    [[o, 'BlackBerry'], c],
                                    [
                                        /(blackberry)\w*\/?([\w\.]*)/i,
                                        /(tizen)[\/\s]([\w\.]+)/i,
                                        /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,
                                        /linux;.+(sailfish);/i,
                                    ],
                                    [o, c],
                                    [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
                                    [[o, 'Symbian'], c],
                                    [/\((series40);/i],
                                    [o],
                                    [/mozilla.+\(mobile;.+gecko.+firefox/i],
                                    [[o, 'Firefox OS'], c],
                                    [
                                        /(nintendo|playstation)\s([wids34portablevu]+)/i,
                                        /(mint)[\/\s\(]?(\w*)/i,
                                        /(mageia|vectorlinux)[;\s]/i,
                                        /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                        /(hurd|linux)\s?([\w\.]*)/i,
                                        /(gnu)\s?([\w\.]*)/i,
                                    ],
                                    [o, c],
                                    [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                                    [[o, 'Chromium OS'], c],
                                    [/(sunos)\s?([\w\.\d]*)/i],
                                    [[o, 'Solaris'], c],
                                    [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
                                    [o, c],
                                    [/(haiku)\s(\w+)/i],
                                    [o, c],
                                    [
                                        /cfnetwork\/.+darwin/i,
                                        /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
                                    ],
                                    [
                                        [c, /_/g, '.'],
                                        [o, 'iOS'],
                                    ],
                                    [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
                                    [
                                        [o, 'Mac OS'],
                                        [c, /_/g, '.'],
                                    ],
                                    [
                                        /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
                                        /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
                                        /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
                                        /(unix)\s?([\w\.]*)/i,
                                    ],
                                    [o, c],
                                ],
                            }),
                            (k.VERSION = '0.7.18'),
                            (k.BROWSER = { NAME: o, MAJOR: 'major', VERSION: c }),
                            (k.CPU = { ARCHITECTURE: g }),
                            (k.DEVICE = {
                                MODEL: a,
                                VENDOR: h,
                                TYPE: r,
                                CONSOLE: p,
                                MOBILE: v,
                                SMARTTV: b,
                                TABLET: m,
                                WEARABLE: f,
                                EMBEDDED: 'embedded',
                            }),
                            (k.ENGINE = { NAME: o, VERSION: c }),
                            (k.OS = { NAME: o, VERSION: c }),
                            typeof t != l
                                ? ((t = typeof e != l && e.exports ? (e.exports = k) : t).UAParser = k)
                                : i(3)
                                ? (L = function () {
                                      return k
                                  }.call(t, i, t, e)) !== d && (e.exports = L)
                                : n && (n.UAParser = k),
                            typeof (S = n && (n.jQuery || n.Zepto)) != l &&
                                ((s = new k()),
                                (S.ua = s.getResult()),
                                (S.ua.get = function () {
                                    return s.getUA()
                                }),
                                (S.ua.set = function (e) {
                                    s.setUA(e)
                                    var t,
                                        i = s.getResult()
                                    for (t in i) S.ua[t] = i[t]
                                }))
                    },
                    function (t, e) {
                        !function (e) {
                            t.exports = e
                        }.call(e, {})
                    },
                    function (e, t, i) {
                        Object.defineProperty(t, '__esModule', { value: !0 })
                        var n =
                                Object.assign ||
                                function (e) {
                                    for (var t = 1; t < arguments.length; t++) {
                                        var i,
                                            s = arguments[t]
                                        for (i in s)
                                            Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                                    }
                                    return e
                                },
                            i = i(0),
                            s = i.DEVICE_TYPES,
                            l = i.defaultData,
                            a = (t.getNavigatorInstance = function () {
                                return (
                                    !('undefined' == typeof window || (!window.navigator && !navigator)) &&
                                    (window.navigator || navigator)
                                )
                            }),
                            i = (t.isIOS13Check = function (e) {
                                var t = a()
                                return (
                                    t &&
                                    t.platform &&
                                    (-1 !== t.platform.indexOf(e) ||
                                        ('MacIntel' === t.platform &&
                                            1 < t.maxTouchPoints &&
                                            !window.MSStream))
                                )
                            })
                        e.exports = {
                            checkType: function (e) {
                                switch (e) {
                                    case s.MOBILE:
                                        return { isMobile: !0 }
                                    case s.TABLET:
                                        return { isTablet: !0 }
                                    case s.SMART_TV:
                                        return { isSmartTV: !0 }
                                    case s.CONSOLE:
                                        return { isConsole: !0 }
                                    case s.WEARABLE:
                                        return { isWearable: !0 }
                                    case s.BROWSER:
                                        return { isBrowser: !0 }
                                    default:
                                        return l
                                }
                            },
                            broPayload: function (e, t, i, s, n) {
                                return {
                                    isBrowser: e,
                                    browserMajorVersion: t.major,
                                    browserFullVersion: t.version,
                                    browserName: t.name,
                                    engineName: i.name || !1,
                                    engineVersion: i.version,
                                    osName: s.name,
                                    osVersion: s.version,
                                    userAgent: n,
                                }
                            },
                            mobilePayload: function (e, t, i, s) {
                                return n({}, e, {
                                    vendor: t.vendor,
                                    model: t.model,
                                    os: i.name,
                                    osVersion: i.version,
                                    ua: s,
                                })
                            },
                            stvPayload: function (e, t, i, s) {
                                return {
                                    isSmartTV: e,
                                    engineName: t.name,
                                    engineVersion: t.version,
                                    osName: i.name,
                                    osVersion: i.version,
                                    userAgent: s,
                                }
                            },
                            consolePayload: function (e, t, i, s) {
                                return {
                                    isConsole: e,
                                    engineName: t.name,
                                    engineVersion: t.version,
                                    osName: i.name,
                                    osVersion: i.version,
                                    userAgent: s,
                                }
                            },
                            wearPayload: function (e, t, i, s) {
                                return {
                                    isWearable: e,
                                    engineName: t.name,
                                    engineVersion: t.version,
                                    osName: i.name,
                                    osVersion: i.version,
                                    userAgent: s,
                                }
                            },
                            getNavigatorInstance: a,
                            isIOS13Check: i,
                        }
                    },
                ]),
                (n = {}),
                (s.m = i),
                (s.c = n),
                (s.d = function (e, t, i) {
                    s.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: i })
                }),
                (s.n = function (e) {
                    var t =
                        e && e.__esModule
                            ? function () {
                                  return e.default
                              }
                            : function () {
                                  return e
                              }
                    return s.d(t, 'a', t), t
                }),
                (s.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }),
                (s.p = ''),
                s((s.s = 1)))
        }),
        v =
            (moment = i) && moment.__esModule && Object.prototype.hasOwnProperty.call(moment, 'default')
                ? moment.default
                : moment
    class m {
        static autoInit(e, t) {
            void 0 === t && (t = {})
            t = new m(e, t)
            return t.init(), (e.ECLSelect = t)
        }
        constructor(e, t) {
            var t = void 0 === t ? {} : t,
                i = t.defaultText,
                i = void 0 === i ? '' : i,
                s = t.searchText,
                s = void 0 === s ? '' : s,
                n = t.selectAllText,
                n = void 0 === n ? '' : n,
                l = t.noResultsText,
                l = void 0 === l ? '' : l,
                a = t.selectMultipleId,
                a = void 0 === a ? 'select-multiple' : a,
                o = t.selectMultipleSelector,
                o = void 0 === o ? '[data-ecl-select-multiple]' : o,
                r = t.defaultTextAttribute,
                r = void 0 === r ? 'data-ecl-select-default' : r,
                h = t.searchTextAttribute,
                h = void 0 === h ? 'data-ecl-select-search' : h,
                c = t.selectAllTextAttribute,
                c = void 0 === c ? 'data-ecl-select-all' : c,
                d = t.noResultsTextAttribute,
                d = void 0 === d ? 'data-ecl-select-no-results' : d,
                u = t.closeLabelAttribute,
                u = void 0 === u ? 'data-ecl-select-close' : u,
                g = t.clearAllLabelAttribute,
                g = void 0 === g ? 'data-ecl-select-clear-all' : g,
                p = t.selectMultiplesSelectionCountSelector,
                p = void 0 === p ? 'ecl-select-multiple-selections-counter' : p,
                v = t.closeButtonLabel,
                v = void 0 === v ? '' : v,
                t = t.clearAllButtonLabel,
                t = void 0 === t ? '' : t
            if (!e || e.nodeType !== Node.ELEMENT_NODE)
                throw new TypeError('DOM element should be given to initialize this widget.')
            ;(this.element = e),
                (this.selectMultipleId = a),
                (this.selectMultipleSelector = o),
                (this.selectMultiplesSelectionCountSelector = p),
                (this.defaultTextAttribute = r),
                (this.searchTextAttribute = h),
                (this.selectAllTextAttribute = c),
                (this.noResultsTextAttribute = d),
                (this.defaultText = i),
                (this.searchText = s),
                (this.selectAllText = n),
                (this.noResultsText = l),
                (this.clearAllButtonLabel = t),
                (this.closeButtonLabel = v),
                (this.closeLabelAttribute = u),
                (this.clearAllLabelAttribute = g),
                (this.input = null),
                (this.search = null),
                (this.checkboxes = null),
                (this.select = null),
                (this.selectAll = null),
                (this.selectIcon = null),
                (this.textDefault = null),
                (this.textSearch = null),
                (this.textSelectAll = null),
                (this.textNoResults = null),
                (this.selectMultiple = null),
                (this.inputContainer = null),
                (this.optionsContainer = null),
                (this.searchContainer = null),
                (this.countSelections = null),
                (this.form = null),
                (this.updateCurrentValue = this.updateCurrentValue.bind(this)),
                (this.handleToggle = this.handleToggle.bind(this)),
                (this.handleClickOption = this.handleClickOption.bind(this)),
                (this.handleClickSelectAll = this.handleClickSelectAll.bind(this)),
                (this.handleEsc = this.handleEsc.bind(this)),
                (this.handleFocusout = this.handleFocusout.bind(this)),
                (this.handleSearch = this.handleSearch.bind(this)),
                (this.handleClickOutside = this.handleClickOutside.bind(this)),
                (this.moveFocus = this.moveFocus.bind(this)),
                (this.resetForm = this.resetForm.bind(this)),
                (this.handleClickOnClearAll = this.handleClickOnClearAll.bind(this)),
                (this.handleKeyboardOnSelect = this.handleKeyboardOnSelect.bind(this)),
                (this.handleKeyboardOnSelectAll = this.handleKeyboardOnSelectAll.bind(this)),
                (this.handleKeyboardOnSearch = this.handleKeyboardOnSearch.bind(this)),
                (this.handleKeyboardOnOptions = this.handleKeyboardOnOptions.bind(this)),
                (this.handleKeyboardOnOption = this.handleKeyboardOnOption.bind(this)),
                (this.handleKeyboardOnClearAll = this.handleKeyboardOnClearAll.bind(this)),
                (this.handleKeyboardOnClose = this.handleKeyboardOnClose.bind(this)),
                (this.updateSelectionsCount = this.updateSelectionsCount.bind(this))
        }
        static createSvgIcon(e, t) {
            var i = document.createElement('div'),
                e = ((i.innerHTML = e), i.children[0])
            return (
                e.removeAttribute('height'),
                e.removeAttribute('width'),
                e.setAttribute('focusable', !1),
                e.setAttribute('aria-hidden', !0),
                e.setAttribute('class', t),
                e
            )
        }
        static createCheckbox(e, t) {
            if (!e || !t) return ''
            var i = e.id,
                s = e.text,
                n = e.disabled,
                l = e.selected,
                e = e.extraClass
            if (!i || !s) return ''
            var a = document.createElement('div'),
                o = document.createElement('input'),
                r = document.createElement('label'),
                h = document.createElement('span'),
                c = document.createElement('span')
            return (
                e && a.classList.add(e),
                l && o.setAttribute('checked', !0),
                n && (a.classList.add('ecl-checkbox--disabled'), o.setAttribute('disabled', n)),
                a.classList.add('ecl-checkbox'),
                a.setAttribute('data-select-multiple-value', s),
                o.classList.add('ecl-checkbox__input'),
                o.setAttribute('type', 'checkbox'),
                o.setAttribute('id', t + '-' + i),
                a.appendChild(o),
                r.classList.add('ecl-checkbox__label'),
                r.setAttribute('for', t + '-' + i),
                h.classList.add('ecl-checkbox__box'),
                h.appendChild(
                    m.createSvgIcon(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.cls-1{fill:none}</style></defs><path id="Layer_1" d="m20 28 16-16 4 4-20 20L8 24l4-4 8 8Z" style="fill-rule:evenodd"/></svg>',
                        'ecl-icon ecl-icon--s ecl-checkbox__icon'
                    )
                ),
                r.appendChild(h),
                c.classList.add('ecl-checkbox__label-text'),
                (c.innerHTML = s),
                r.appendChild(c),
                a.appendChild(r),
                a
            )
        }
        static createSelectIcon() {
            var e = document.createElement('div'),
                t =
                    (e.classList.add('ecl-select__icon'),
                    m.createSvgIcon(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" style="fill:none"/><path d="M40 39 24 21 8 39l-6-6L24 9l22 24-6 6Z" style="fill-rule:evenodd"/></svg>',
                        'ecl-icon ecl-icon--s ecl-select__icon-shape ecl-icon--rotate-180'
                    ))
            return e.appendChild(t), e
        }
        static checkCheckbox(e) {
            e = e.target.closest('.ecl-checkbox').querySelector('input')
            return (e.checked = !e.checked), e.checked
        }
        init() {
            this.select = this.element
            var e = Array.from(this.select.parentElement.classList)
            ;(this.textDefault = this.defaultText || this.element.getAttribute(this.defaultTextAttribute)),
                (this.textSearch = this.searchText || this.element.getAttribute(this.searchTextAttribute)),
                (this.textSelectAll =
                    this.selectAllText || this.element.getAttribute(this.selectAllTextAttribute)),
                (this.textNoResults =
                    this.noResultsText || this.element.getAttribute(this.noResultsTextAttribute)),
                (this.closeButtonLabel =
                    this.closeButtonLabel || this.element.getAttribute(this.closeLabelAttribute)),
                (this.clearAllButtonLabel =
                    this.clearAllButtonLabel || this.element.getAttribute(this.clearAllLabelAttribute)),
                (this.selectMultiple = document.createElement('div')),
                this.selectMultiple.classList.add('ecl-select__multiple'),
                this.selectMultiple.addEventListener('focusout', this.handleFocusout),
                (this.inputContainer = document.createElement('div')),
                this.inputContainer.classList.add(...e),
                this.selectMultiple.appendChild(this.inputContainer),
                (this.input = document.createElement('input')),
                this.input.classList.add('ecl-select', 'ecl-select__multiple-toggle'),
                this.input.setAttribute('type', 'text'),
                this.input.setAttribute('placeholder', this.textDefault || ''),
                this.input.setAttribute('readonly', !0),
                e.find((e) => e.includes('disabled')) && this.input.setAttribute('disabled', !0),
                this.input.addEventListener('keydown', this.handleKeyboardOnSelect),
                this.input.addEventListener('click', this.handleToggle),
                (this.selectionCount = document.createElement('div')),
                this.selectionCount.classList.add(this.selectMultiplesSelectionCountSelector),
                (this.selectionCountText = document.createElement('span')),
                this.selectionCount.appendChild(this.selectionCountText),
                this.inputContainer.appendChild(this.selectionCount),
                this.inputContainer.appendChild(this.input),
                this.inputContainer.appendChild(m.createSelectIcon()),
                (this.searchContainer = document.createElement('div')),
                (this.searchContainer.style.display = 'none'),
                this.searchContainer.classList.add('ecl-select__multiple-dropdown', ...e),
                this.selectMultiple.appendChild(this.searchContainer),
                (this.search = document.createElement('input')),
                this.search.classList.add('ecl-text-input'),
                this.search.setAttribute('type', 'search'),
                this.search.setAttribute('placeholder', this.textSearch || ''),
                this.search.addEventListener('keyup', this.handleSearch),
                this.search.addEventListener('search', this.handleSearch),
                this.searchContainer.appendChild(this.search),
                this.textSelectAll &&
                    ((e = Array.from(this.select.options).filter((e) => !e.disabled).length),
                    (this.selectAll = m.createCheckbox(
                        {
                            id: 'all',
                            text: this.textSelectAll + ' (' + e + ')',
                            extraClass: 'ecl-select__multiple-all',
                        },
                        this.selectMultipleId
                    )),
                    this.selectAll.addEventListener('click', this.handleClickSelectAll),
                    this.selectAll.addEventListener('keypress', this.handleClickSelectAll),
                    this.selectAll.addEventListener('change', this.handleClickSelectAll),
                    this.searchContainer.appendChild(this.selectAll)),
                this.search.addEventListener('keydown', this.handleKeyboardOnSearch),
                (this.optionsContainer = document.createElement('div')),
                this.optionsContainer.classList.add('ecl-select__multiple-options'),
                this.searchContainer.appendChild(this.optionsContainer),
                (this.clearAllButtonLabel || this.closeButtonLabel) &&
                    ((this.dropDownToolbar = document.createElement('div')),
                    this.dropDownToolbar.classList.add('ecl-select-multiple-toolbar'),
                    this.clearAllButtonLabel &&
                        ((this.clearAllButton = document.createElement('button')),
                        (this.clearAllButton.textContent = this.clearAllButtonLabel),
                        this.clearAllButton.classList.add('ecl-button', 'ecl-button--ghost'),
                        this.clearAllButton.addEventListener('click', this.handleClickOnClearAll),
                        this.clearAllButton.addEventListener('keydown', this.handleKeyboardOnClearAll),
                        this.dropDownToolbar.appendChild(this.clearAllButton)),
                    this.closeButtonLabel &&
                        ((this.closeButton = document.createElement('button')),
                        (this.closeButton.textContent = this.closeButtonLabel),
                        this.closeButton.classList.add('ecl-button', 'ecl-button--primary'),
                        this.closeButton.addEventListener('click', this.handleEsc),
                        this.closeButton.addEventListener('keydown', this.handleKeyboardOnClose),
                        this.dropDownToolbar &&
                            (this.dropDownToolbar.appendChild(this.closeButton),
                            this.searchContainer.appendChild(this.dropDownToolbar),
                            (this.dropDownToolbar.style.display = 'none')))),
                this.selectAll.addEventListener('keydown', this.handleKeyboardOnSelectAll),
                this.optionsContainer.addEventListener('keydown', this.handleKeyboardOnOptions),
                this.select.options &&
                    0 < this.select.options.length &&
                    (this.checkboxes = Array.from(this.select.options).map((e) => {
                        var t,
                            i = '',
                            s = ''
                        return (
                            'OPTGROUP' === e.parentNode.tagName &&
                                (this.optionsContainer.querySelector(
                                    'div[data-ecl-multiple-group="' +
                                        e.parentNode.getAttribute('label') +
                                        '"]'
                                )
                                    ? (i = this.optionsContainer.querySelector(
                                          'div[data-ecl-multiple-group="' +
                                              e.parentNode.getAttribute('label') +
                                              '"]'
                                      ))
                                    : ((i = document.createElement('div')),
                                      (t = document.createElement('h5')).classList.add(
                                          'ecl-select__multiple-group__title'
                                      ),
                                      (t.innerHTML = e.parentNode.getAttribute('label')),
                                      i.appendChild(t),
                                      i.setAttribute(
                                          'data-ecl-multiple-group',
                                          e.parentNode.getAttribute('label')
                                      ),
                                      i.classList.add('ecl-select__multiple-group'),
                                      this.optionsContainer.appendChild(i))),
                            e.selected &&
                                (this.updateSelectionsCount(1),
                                this.dropDownToolbar && (this.dropDownToolbar.style.display = 'flex')),
                            (s = m.createCheckbox(
                                { id: e.value, text: e.text, disabled: e.disabled, selected: e.selected },
                                this.selectMultipleId
                            )).setAttribute('data-visible', !0),
                            s.classList.contains('ecl-checkbox--disabled') ||
                                (s.addEventListener('click', this.handleClickOption),
                                s.addEventListener('keydown', this.handleKeyboardOnOption)),
                            (i || this.optionsContainer).appendChild(s),
                            s
                        )
                    })),
                this.select.parentNode.parentNode.insertBefore(
                    this.selectMultiple,
                    this.select.parentNode.nextSibling
                ),
                document.addEventListener('click', this.handleClickOutside),
                this.select.parentNode.classList.add('ecl-select__container--hidden'),
                this.updateCurrentValue(),
                (this.form = this.element.closest('form')),
                this.form && this.form.addEventListener('reset', this.resetForm),
                this.element.setAttribute('data-ecl-auto-initialized', 'true')
        }
        destroy() {
            this.selectMultiple.removeEventListener('focusout', this.handleFocusout),
                this.input.removeEventListener('keydown', this.handleKeyboardOnSelect),
                this.input.removeEventListener('click', this.handleToggle),
                this.search.removeEventListener('keyup', this.handleSearch),
                this.search.removeEventListener('keydown', this.handleKeyboardOnSearch),
                this.selectAll.removeEventListener('click', this.handleClickSelectAll),
                this.selectAll.removeEventListener('keypress', this.handleClickSelectAll),
                this.selectAll.removeEventListener('keydown', this.handleKeyboardOnSelectAll),
                this.optionsContainer.removeEventListener('keydown', this.handleKeyboardOnOptions),
                this.checkboxes.forEach((e) => {
                    e.removeEventListener('click', this.handleClickSelectAll),
                        e.removeEventListener('click', this.handleClickOption),
                        e.removeEventListener('keydown', this.handleKeyboardOnOption)
                }),
                document.removeEventListener('click', this.handleClickOutside),
                this.closeButton &&
                    (this.closeButton.removeEventListener('click', this.handleEsc),
                    this.closeButton.removeEventListener('keydown', this.handleKeyboardOnClose)),
                this.clearAllButton &&
                    (this.clearAllButton.removeEventListener('click', this.handleClickOnClearAll),
                    this.clearAllButton.removeEventListener('keydown', this.handleKeyboardOnClearAll)),
                this.selectMultiple && this.selectMultiple.remove(),
                this.select.parentNode.classList.remove('ecl-select__container--hidden'),
                this.element && this.element.removeAttribute('data-ecl-auto-initialized')
        }
        updateSelectionsCount(e) {
            var t = 0
            0 < e
                ? (this.selectionCount.querySelector('span').innerHTML += e)
                : (t = Array.from(this.select.options).filter((e) => e.selected).length),
                0 < t
                    ? ((this.selectionCount.querySelector('span').innerHTML = t),
                      this.selectionCount.classList.add('ecl-select-multiple-selections-counter--visible'),
                      this.dropDownToolbar && (this.dropDownToolbar.style.display = 'flex'))
                    : (this.selectionCount.classList.remove(
                          'ecl-select-multiple-selections-counter--visible'
                      ),
                      this.dropDownToolbar && (this.dropDownToolbar.style.display = 'none')),
                100 <= t && this.selectionCount.classList.add('ecl-select-multiple-selections-counter--xxl')
        }
        updateCurrentValue() {
            ;(this.input.value = Array.from(this.select.options)
                .filter((e) => e.selected)
                .map((e) => e.text)
                .join(', ')),
                this.select.dispatchEvent(new window.Event('change', { bubbles: !0 }))
        }
        handleToggle(e) {
            e.preventDefault(),
                'none' === this.searchContainer.style.display
                    ? (this.searchContainer.style.display = 'block')
                    : (this.searchContainer.style.display = 'none')
        }
        handleClickOption(e) {
            e.preventDefault(), m.checkCheckbox(e)
            var t = e.target.closest('.ecl-checkbox')
            Array.from(this.select.options).forEach((e) => {
                e.text === t.getAttribute('data-select-multiple-value') &&
                    (e.getAttribute('selected') || e.selected
                        ? (e.removeAttribute('selected'),
                          (e.selected = !1),
                          (this.selectAll.querySelector('input').checked = !1))
                        : (e.setAttribute('selected', 'selected'), (e.selected = !0)))
            }),
                this.updateCurrentValue(),
                this.updateSelectionsCount()
        }
        handleClickSelectAll(e) {
            var i, s
            e.preventDefault(),
                this.selectAll.querySelector('input').disabled ||
                    ((i = m.checkCheckbox(e)),
                    (s = Array.from(this.select.options).filter((e) => !e.disabled)),
                    Array.from(this.searchContainer.querySelectorAll('[data-visible="true"]'))
                        .filter((e) => !e.querySelector('input').disabled)
                        .forEach((t) => {
                            t.querySelector('input').checked = i
                            var e = s.find((e) => e.text === t.getAttribute('data-select-multiple-value'))
                            e &&
                                (i
                                    ? (e.setAttribute('selected', 'selected'), (e.selected = !0))
                                    : (e.removeAttribute('selected', 'selected'), (e.selected = !1)))
                        }),
                    this.updateCurrentValue(),
                    this.updateSelectionsCount())
        }
        handleFocusout(e) {
            e.relatedTarget &&
                this.selectMultiple &&
                !this.selectMultiple.contains(e.relatedTarget) &&
                'block' === this.searchContainer.style.display &&
                (this.searchContainer.style.display = 'none')
        }
        handleSearch(e) {
            for (
                var t = this.optionsContainer.offsetHeight,
                    i = [],
                    s = e.target.value.toLowerCase(),
                    e =
                        (0 < t && (this.optionsContainer.style.height = t + 'px'),
                        this.checkboxes.forEach((e) => {
                            var t
                            e.getAttribute('data-select-multiple-value').toLocaleLowerCase().includes(s)
                                ? (e.setAttribute('data-visible', !0),
                                  (e.style.display = 'flex'),
                                  ((t = e.querySelector('.ecl-checkbox__label-text')).textContent =
                                      t.textContent.replace('.cls-1{fill:none}', '')),
                                  s &&
                                      (t.innerHTML = t.textContent.replace(
                                          new RegExp(s + '(?!([^<]+)?<)', 'gi'),
                                          '<b>$&</b>'
                                      )),
                                  i.push(e))
                                : (e.removeAttribute('data-visible'), (e.style.display = 'none'))
                        }),
                        i.filter((e) => e.querySelector('input').checked)),
                    t =
                        (0 === i.length || i.length !== e.length
                            ? (this.selectAll.querySelector('input').checked = !1)
                            : (this.selectAll.querySelector('input').checked = !0),
                        this.searchContainer.querySelector('.ecl-select__multiple-no-results')),
                    n = R(this.optionsContainer.getElementsByClassName('ecl-select__multiple-group'));
                !(l = n()).done;

            ) {
                var l = l.value
                ;(l.style.display = 'none'),
                    [...l.children]
                        .filter((e) => e.classList.contains('ecl-checkbox'))
                        .forEach((e) => {
                            e.hasAttribute('data-visible') &&
                                (e.closest('.ecl-select__multiple-group').style.display = 'block')
                        })
            }
            0 !== i.length || t
                ? 0 < i.length && null !== t && t.parentNode.removeChild(t)
                : ((e = document.createElement('div')),
                  (t = document.createElement('span')),
                  e.classList.add('ecl-select__multiple-no-results'),
                  (t.innerHTML = this.textNoResults),
                  e.appendChild(t),
                  this.optionsContainer.appendChild(e)),
                0 === s.length
                    ? (this.checkboxes.forEach((e) => {
                          e.setAttribute('data-visible', !0), (e.style.display = 'flex')
                      }),
                      this.selectAll.classList.remove('ecl-checkbox--disabled'),
                      (this.selectAll.querySelector('input').disabled = !1))
                    : (this.selectAll.classList.add('ecl-checkbox--disabled'),
                      (this.selectAll.querySelector('input').disabled = !0))
        }
        handleClickOutside(e) {
            e.target &&
                this.selectMultiple &&
                !this.selectMultiple.contains(e.target) &&
                'block' === this.searchContainer.style.display &&
                (this.searchContainer.style.display = 'none')
        }
        handleKeyboardOnSelect(e) {
            switch (e.key) {
                case 'Escape':
                    this.handleEsc()
                    break
                case ' ':
                case 'ArrowDown':
                    this.handleToggle(e), this.search.focus()
            }
        }
        handleKeyboardOnSelectAll(e) {
            switch (e.key) {
                case 'Escape':
                    this.handleEsc()
                    break
                case 'ArrowDown':
                    this.optionsContainer.querySelectorAll('input')[0].focus(), e.preventDefault()
                    break
                case 'ArrowUp':
                    this.search.focus()
            }
        }
        handleKeyboardOnOptions(e) {
            switch (e.key) {
                case 'Escape':
                    this.handleEsc()
                    break
                case 'ArrowDown':
                    this.moveFocus('down')
                    break
                case 'ArrowUp':
                    this.moveFocus('up')
                    break
                case 'Tab':
                    e.preventDefault(), this.moveFocus('down')
            }
        }
        handleKeyboardOnSearch(e) {
            switch (e.key) {
                case 'Escape':
                    this.handleEsc()
                    break
                case 'ArrowDown':
                    var t
                    this.selectAll.querySelector('input').disabled
                        ? (t = Array.from(this.optionsContainer.querySelectorAll('.ecl-checkbox')).filter(
                              (e) => 'none' !== e.style.display
                          ))[0] && t[0].querySelector('input').focus()
                        : this.selectAll.querySelector('input').focus()
                    break
                case 'ArrowUp':
                    this.input.focus(), this.handleToggle(e)
            }
        }
        handleKeyboardOnOption(e) {
            ;('Enter' !== e.key && ' ' !== e.key) || this.handleClickOption(e)
        }
        handleKeyboardOnClearAll(e) {
            switch (e.key) {
                case 'Enter':
                case ' ':
                    this.handleClickOnClearAll(), this.input.focus()
                    break
                case 'ArrowRight':
                    this.clearAllButton.nextSibling.focus()
                    break
                case 'ArrowUp':
                    this.optionsContainer.lastChild.querySelector('input').focus()
            }
        }
        handleKeyboardOnClose(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    this.closeButton.previousSibling.focus()
                    break
                case 'ArrowUp':
                    this.optionsContainer.lastChild.querySelector('input').focus()
                    break
                case 'Tab':
                    e.preventDefault(), this.input.focus()
            }
        }
        handleEsc() {
            'block' === this.searchContainer.style.display && (this.searchContainer.style.display = 'none')
        }
        moveFocus(e) {
            var t = document.activeElement,
                i = t.parentElement.parentElement.classList.contains('ecl-select__multiple-group')
                    ? Array.from(
                          t.parentElement.parentElement.parentElement.querySelectorAll('.ecl-checkbox__input')
                      )
                    : Array.from(t.parentElement.parentElement.querySelectorAll('.ecl-checkbox__input')),
                t = i.indexOf(t)
            'down' === e
                ? (0 <
                  (e = i
                      .splice(t + 1, i.length)
                      .filter((e) => !e.disabled && 'none' !== e.parentElement.style.display)).length
                      ? e[0]
                      : this.dropDownToolbar && 'flex' === this.dropDownToolbar.style.display
                      ? this.dropDownToolbar.firstChild
                      : this.input
                  ).focus()
                : 0 <
                  (e = i.splice(0, t).filter((e) => !e.disabled && 'none' !== e.parentElement.style.display))
                      .length
                ? e.pop().focus()
                : ((this.optionsContainer.scrollTop = 0),
                  (this.selectAll.querySelector('input').disabled
                      ? this.search
                      : this.selectAll.querySelector('input')
                  ).focus())
        }
        handleClickOnClearAll() {
            Array.from(this.select.options).forEach((e) => {
                ;(this.selectMultiple
                    .querySelector('[data-select-multiple-value="' + e.text + '"]')
                    .querySelector('.ecl-checkbox__input').checked = !1),
                    e.removeAttribute('selected', 'selected'),
                    (e.selected = !1)
            }),
                (this.selectAll.querySelector('.ecl-checkbox__input').checked = !1),
                this.updateCurrentValue(),
                this.updateSelectionsCount(0)
        }
        resetForm() {
            setTimeout(() => {
                Array.from(this.select.options).forEach((e) => {
                    this.selectMultiple
                        .querySelector('[data-select-multiple-value="' + e.text + '"]')
                        .querySelector('.ecl-checkbox__input').checked
                        ? (e.setAttribute('selected', 'selected'), (e.selected = !0))
                        : (e.removeAttribute('selected', 'selected'), (e.selected = !1))
                }),
                    this.updateCurrentValue(),
                    this.updateSelectionsCount(0)
            }, 10)
        }
    }
    class b {
        static autoInit(e, t) {
            ;(t = (void 0 === t ? {} : t).TABLE), (t = void 0 === t ? {} : t), (t = new b(e, t))
            return t.init(), (e.ECLTable = t)
        }
        constructor(e, t) {
            ;(t = (void 0 === t ? {} : t).sortSelector),
                (t = void 0 === t ? '[data-ecl-table-sort-toggle]' : t)
            if (!e || e.nodeType !== Node.ELEMENT_NODE)
                throw new TypeError('DOM element should be given to initialize this widget.')
            ;(this.element = e),
                (this.sortSelector = t),
                (this.sortHeadings = null),
                (this.handleClickOnSort = this.handleClickOnSort.bind(this))
        }
        static createSortIcon(e) {
            var t = document.createElement('span'),
                t =
                    ((t.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m32 30.5-8-13-8 13h16Z" style="fill-rule:evenodd"/></svg>'),
                    t.children[0])
            return (
                t.removeAttribute('height'),
                t.removeAttribute('width'),
                t.setAttribute('focusable', !1),
                t.setAttribute('aria-hidden', !0),
                t.setAttribute('class', 'ecl-table__icon ecl-icon ecl-icon--l ' + e),
                t
            )
        }
        init() {
            ;(this.sortHeadings = r(this.sortSelector, this.element)),
                this.sortHeadings &&
                    this.sortHeadings.forEach((e) => {
                        var t = document.createElement('button')
                        t.classList.add('ecl-table__arrow'),
                            t.appendChild(b.createSortIcon('ecl-table__icon-up')),
                            t.appendChild(b.createSortIcon('ecl-table__icon-down')),
                            e.appendChild(t),
                            e.addEventListener('click', this.handleClickOnSort.bind(this, e))
                    })
            var e = h('tbody', this.element)
            ;[...r('tr', e)].forEach((e, t) => {
                e.setAttribute('data-ecl-table-order', t)
            }),
                this.element.setAttribute('data-ecl-auto-initialized', 'true')
        }
        destroy() {
            this.sortHeadings &&
                this.sortHeadings.forEach((e) => {
                    e.removeEventListener('click', this.handleClickOnSort)
                }),
                this.element && this.element.removeAttribute('data-ecl-auto-initialized')
        }
        handleClickOnSort(t) {
            for (
                var e = t.closest('table'),
                    i = h('tbody', e),
                    s = t.getAttribute('aria-sort'),
                    n = 0,
                    l = t.previousElementSibling;
                l;

            )
                (n += l.getAttribute('colspan') ? Number(l.getAttribute('colspan')) : 1),
                    (l = l.previousElementSibling)
            var a,
                o,
                s =
                    'descending' === s
                        ? ([...r('tr', i)].forEach((e, t) => {
                              t = h("[data-ecl-table-order='" + t + "']")
                              i.appendChild(t)
                          }),
                          null)
                        : ([...r('tr', i)]
                              .sort(
                                  ((a = n),
                                  (o = 'ascending' !== s),
                                  (e, t) =>
                                      ((e, t) =>
                                          '' === e || '' === t || Number.isNaN(+e) || Number.isNaN(+t)
                                              ? e.toString().localeCompare(t)
                                              : e - t)(
                                          (o ? e : t).children[a].textContent,
                                          (o ? t : e).children[a].textContent
                                      ))
                              )
                              .forEach((e) => i.appendChild(e)),
                          'ascending' === s ? 'descending' : 'ascending')
            this.sortHeadings.forEach((e) => {
                s && e === t ? e.setAttribute('aria-sort', s) : e.removeAttribute('aria-sort')
            })
        }
    }
    return (
        (e.Accordion = class f {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).ACCORDION) ? {} : t),
                    (t = new f(e, t)).init(),
                    (e.ECLAccordion = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).toggleSelector)
                            ? '[data-ecl-accordion-toggle]'
                            : i,
                    s = void 0 === (s = t.iconSelector) ? '[data-ecl-accordion-icon]' : s,
                    n = void 0 === (n = t.labelExpanded) ? 'data-ecl-label-expanded' : n,
                    l = void 0 === (l = t.labelCollapsed) ? 'data-ecl-label-collapsed' : l,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.toggleSelector = i),
                    (this.iconSelector = s),
                    (this.attachClickListener = t),
                    (this.labelExpanded = n),
                    (this.labelCollapsed = l),
                    (this.toggles = null),
                    (this.forceClose = !1),
                    (this.target = null),
                    (this.label = null),
                    (this.handleClickOnToggle = this.handleClickOnToggle.bind(this))
            }
            init() {
                ;(this.toggles = r(this.toggleSelector, this.element)),
                    (this.label = h(this.labelSelector, this.element)),
                    this.attachClickListener &&
                        this.toggles &&
                        this.toggles.forEach((e) => {
                            e.addEventListener('click', this.handleClickOnToggle.bind(this, e))
                        }),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.toggles &&
                    this.toggles.forEach((e) => {
                        e.replaceWith(e.cloneNode(!0))
                    }),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnToggle(e) {
                var t = h('#' + e.getAttribute('aria-controls'), this.element)
                if (!t) throw new TypeError('Target has to be provided for accordion (aria-controls)')
                var i,
                    s = !0 === this.forceClose || 'true' === e.getAttribute('aria-expanded')
                e.setAttribute('aria-expanded', s ? 'false' : 'true'), (t.hidden = s)
                ;(t = h(this.iconSelector, e)) &&
                    (t = h('use', t)) &&
                    ((n = t.getAttribute('xlink:href')),
                    (i = ''),
                    (i = s ? n.replace('minus', 'plus') : n.replace('plus', 'minus')),
                    t.setAttribute('xlink:href', i))
                var n = h('.ecl-accordion__toggle-label', e)
                return (
                    n &&
                        (n.textContent = s
                            ? e.getAttribute(this.labelCollapsed)
                            : e.getAttribute(this.labelExpanded)),
                    this
                )
            }
        }),
        (e.Breadcrumb = class y {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).BREADCRUMB) ? {} : t),
                    (t = new y(e, t)).init(),
                    (e.ECLBreadcrumb = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).ellipsisButtonSelector)
                            ? '[data-ecl-breadcrumb-ellipsis-button]'
                            : i,
                    s = void 0 === (s = t.ellipsisSelector) ? '[data-ecl-breadcrumb-ellipsis]' : s,
                    n = void 0 === (n = t.segmentSelector) ? '[data-ecl-breadcrumb-item]' : n,
                    l =
                        void 0 === (l = t.expandableItemsSelector)
                            ? '[data-ecl-breadcrumb-item="expandable"]'
                            : l,
                    a = void 0 === (a = t.staticItemsSelector) ? '[data-ecl-breadcrumb-item="static"]' : a,
                    o = void 0 === (o = t.onPartialExpand) ? null : o,
                    r = void 0 === (r = t.onFullExpand) ? null : r,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.ellipsisButtonSelector = i),
                    (this.ellipsisSelector = s),
                    (this.segmentSelector = n),
                    (this.expandableItemsSelector = l),
                    (this.staticItemsSelector = a),
                    (this.onPartialExpand = o),
                    (this.onFullExpand = r),
                    (this.attachClickListener = t),
                    (this.ellipsisButton = null),
                    (this.itemsElements = null),
                    (this.staticElements = null),
                    (this.expandableElements = null),
                    (this.handleClickOnEllipsis = this.handleClickOnEllipsis.bind(this))
            }
            init() {
                ;(this.ellipsisButton = h(this.ellipsisButtonSelector, this.element)),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.addEventListener('click', this.handleClickOnEllipsis),
                    (this.itemsElements = r(this.segmentSelector, this.element)),
                    (this.staticElements = r(this.staticItemsSelector, this.element)),
                    (this.expandableElements = r(this.expandableItemsSelector, this.element)),
                    this.check()
            }
            destroy() {
                this.attachClickListener &&
                    this.ellipsisButton &&
                    this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis)
            }
            handleClickOnEllipsis() {
                return this.handleFullExpand()
            }
            check() {
                var e = this.computeVisibilityMap()
                e && (!0 === e.expanded ? this.handleFullExpand() : this.handlePartialExpand(e))
            }
            hideEllipsis() {
                var e = h(this.ellipsisSelector, this.element)
                e && e.setAttribute('aria-hidden', 'true'),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis)
            }
            showAllItems() {
                this.expandableElements.forEach((e) => e.setAttribute('aria-hidden', 'false'))
            }
            handlePartialExpand(e) {
                var i
                e &&
                    (i = e.isItemVisible) &&
                    Array.isArray(i) &&
                    (this.onPartialExpand
                        ? this.onPartialExpand(i)
                        : this.expandableElements.forEach((e, t) => {
                              e.setAttribute('aria-hidden', i[t] ? 'false' : 'true')
                          }))
            }
            handleFullExpand() {
                this.onFullExpand ? this.onFullExpand() : (this.hideEllipsis(), this.showAllItems())
            }
            computeVisibilityMap() {
                if (!this.expandableElements || 0 === this.expandableElements.length) return { expanded: !0 }
                var t = Math.floor(this.element.getBoundingClientRect().width)
                if (
                    this.itemsElements.map((e) => e.getBoundingClientRect().width).reduce((e, t) => e + t) <=
                    t
                )
                    return { expanded: !0 }
                var i =
                    h(this.ellipsisSelector, this.element).getBoundingClientRect().width +
                    this.staticElements.reduce((e, t) => e + t.getBoundingClientRect().width, 0)
                if (t <= i) return { expanded: !1, isItemVisible: [...this.expandableElements.map(() => !1)] }
                var s = 0,
                    n = !0
                return {
                    expanded: !1,
                    isItemVisible: [...this.expandableElements]
                        .reverse()
                        .map(
                            (e) =>
                                !!n && ((e = (s += e.getBoundingClientRect().width) + i <= t) || (n = !1), e)
                        )
                        .reverse(),
                }
            }
        }),
        (e.BreadcrumbCore = class E {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).BREADCRUMB_CORE) ? {} : t),
                    (t = new E(e, t)).init(),
                    (e.ECLBreadcrumbCore = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).ellipsisButtonSelector)
                            ? '[data-ecl-breadcrumb-core-ellipsis-button]'
                            : i,
                    s = void 0 === (s = t.ellipsisSelector) ? '[data-ecl-breadcrumb-core-ellipsis]' : s,
                    n = void 0 === (n = t.segmentSelector) ? '[data-ecl-breadcrumb-core-item]' : n,
                    l =
                        void 0 === (l = t.expandableItemsSelector)
                            ? '[data-ecl-breadcrumb-core-item="expandable"]'
                            : l,
                    a =
                        void 0 === (a = t.staticItemsSelector)
                            ? '[data-ecl-breadcrumb-core-item="static"]'
                            : a,
                    o = void 0 === (o = t.onPartialExpand) ? null : o,
                    r = void 0 === (r = t.onFullExpand) ? null : r,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.ellipsisButtonSelector = i),
                    (this.ellipsisSelector = s),
                    (this.segmentSelector = n),
                    (this.expandableItemsSelector = l),
                    (this.staticItemsSelector = a),
                    (this.onPartialExpand = o),
                    (this.onFullExpand = r),
                    (this.attachClickListener = t),
                    (this.ellipsisButton = null),
                    (this.itemsElements = null),
                    (this.staticElements = null),
                    (this.expandableElements = null),
                    (this.handleClickOnEllipsis = this.handleClickOnEllipsis.bind(this))
            }
            init() {
                ;(this.ellipsisButton = h(this.ellipsisButtonSelector, this.element)),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.addEventListener('click', this.handleClickOnEllipsis),
                    (this.itemsElements = r(this.segmentSelector, this.element)),
                    (this.staticElements = r(this.staticItemsSelector, this.element)),
                    (this.expandableElements = r(this.expandableItemsSelector, this.element)),
                    this.check(),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.ellipsisButton &&
                    this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnEllipsis() {
                return this.handleFullExpand()
            }
            check() {
                var e = this.computeVisibilityMap()
                e && (!0 === e.expanded ? this.handleFullExpand() : this.handlePartialExpand(e))
            }
            hideEllipsis() {
                var e = h(this.ellipsisSelector, this.element)
                e && e.setAttribute('aria-hidden', 'true'),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis)
            }
            showAllItems() {
                this.expandableElements.forEach((e) => e.setAttribute('aria-hidden', 'false'))
            }
            handlePartialExpand(e) {
                var i
                e &&
                    (i = e.isItemVisible) &&
                    Array.isArray(i) &&
                    (this.onPartialExpand
                        ? this.onPartialExpand(i)
                        : this.expandableElements.forEach((e, t) => {
                              e.setAttribute('aria-hidden', i[t] ? 'false' : 'true')
                          }))
            }
            handleFullExpand() {
                this.onFullExpand ? this.onFullExpand() : (this.hideEllipsis(), this.showAllItems())
            }
            computeVisibilityMap() {
                if (!this.expandableElements || 0 === this.expandableElements.length) return { expanded: !0 }
                var t = Math.floor(this.element.getBoundingClientRect().width)
                if (
                    this.itemsElements.map((e) => e.getBoundingClientRect().width).reduce((e, t) => e + t) <=
                    t
                )
                    return { expanded: !0 }
                var i =
                    h(this.ellipsisSelector, this.element).getBoundingClientRect().width +
                    this.staticElements.reduce((e, t) => e + t.getBoundingClientRect().width, 0)
                if (t <= i) return { expanded: !1, isItemVisible: [...this.expandableElements.map(() => !1)] }
                var s = 0,
                    n = !0
                return {
                    expanded: !1,
                    isItemVisible: [...this.expandableElements]
                        .reverse()
                        .map(
                            (e) =>
                                !!n && ((e = (s += e.getBoundingClientRect().width) + i <= t) || (n = !1), e)
                        )
                        .reverse(),
                }
            }
        }),
        (e.BreadcrumbHarmonised = class M {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).BREADCRUMB_HARMONISED) ? {} : t),
                    (t = new M(e, t)).init(),
                    (e.ECLBreadcrumbHarmonised = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).ellipsisButtonSelector)
                            ? '[data-ecl-breadcrumb-harmonised-ellipsis-button]'
                            : i,
                    s = void 0 === (s = t.ellipsisSelector) ? '[data-ecl-breadcrumb-harmonised-ellipsis]' : s,
                    n = void 0 === (n = t.segmentSelector) ? '[data-ecl-breadcrumb-harmonised-item]' : n,
                    l =
                        void 0 === (l = t.expandableItemsSelector)
                            ? '[data-ecl-breadcrumb-harmonised-item="expandable"]'
                            : l,
                    a =
                        void 0 === (a = t.staticItemsSelector)
                            ? '[data-ecl-breadcrumb-harmonised-item="static"]'
                            : a,
                    o = void 0 === (o = t.onPartialExpand) ? null : o,
                    r = void 0 === (r = t.onFullExpand) ? null : r,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.ellipsisButtonSelector = i),
                    (this.ellipsisSelector = s),
                    (this.segmentSelector = n),
                    (this.expandableItemsSelector = l),
                    (this.staticItemsSelector = a),
                    (this.onPartialExpand = o),
                    (this.onFullExpand = r),
                    (this.attachClickListener = t),
                    (this.ellipsisButton = null),
                    (this.itemsElements = null),
                    (this.staticElements = null),
                    (this.expandableElements = null),
                    (this.handleClickOnEllipsis = this.handleClickOnEllipsis.bind(this))
            }
            init() {
                ;(this.ellipsisButton = h(this.ellipsisButtonSelector, this.element)),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.addEventListener('click', this.handleClickOnEllipsis),
                    (this.itemsElements = r(this.segmentSelector, this.element)),
                    (this.staticElements = r(this.staticItemsSelector, this.element)),
                    (this.expandableElements = r(this.expandableItemsSelector, this.element)),
                    this.check(),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.ellipsisButton &&
                    this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnEllipsis() {
                return this.handleFullExpand()
            }
            check() {
                var e = this.computeVisibilityMap()
                e && (!0 === e.expanded ? this.handleFullExpand() : this.handlePartialExpand(e))
            }
            hideEllipsis() {
                var e = h(this.ellipsisSelector, this.element)
                e && e.setAttribute('aria-hidden', 'true'),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis)
            }
            showAllItems() {
                this.expandableElements.forEach((e) => e.setAttribute('aria-hidden', 'false'))
            }
            handlePartialExpand(e) {
                var i
                e &&
                    (i = e.isItemVisible) &&
                    Array.isArray(i) &&
                    (this.onPartialExpand
                        ? this.onPartialExpand(i)
                        : this.expandableElements.forEach((e, t) => {
                              e.setAttribute('aria-hidden', i[t] ? 'false' : 'true')
                          }))
            }
            handleFullExpand() {
                this.onFullExpand ? this.onFullExpand() : (this.hideEllipsis(), this.showAllItems())
            }
            computeVisibilityMap() {
                if (!this.expandableElements || 0 === this.expandableElements.length) return { expanded: !0 }
                var t = Math.floor(this.element.getBoundingClientRect().width)
                if (
                    this.itemsElements.map((e) => e.getBoundingClientRect().width).reduce((e, t) => e + t) <=
                    t
                )
                    return { expanded: !0 }
                var i =
                    h(this.ellipsisSelector, this.element).getBoundingClientRect().width +
                    this.staticElements.reduce((e, t) => e + t.getBoundingClientRect().width, 0)
                if (t <= i) return { expanded: !1, isItemVisible: [...this.expandableElements.map(() => !1)] }
                var s = 0,
                    n = !0
                return {
                    expanded: !1,
                    isItemVisible: [...this.expandableElements]
                        .reverse()
                        .map(
                            (e) =>
                                !!n && ((e = (s += e.getBoundingClientRect().width) + i <= t) || (n = !1), e)
                        )
                        .reverse(),
                }
            }
        }),
        (e.BreadcrumbStandardised = class N {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).BREADCRUMB_STANDARDISED) ? {} : t),
                    (t = new N(e, t)).init(),
                    (e.ECLBreadcrumbStandardised = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).ellipsisButtonSelector)
                            ? '[data-ecl-breadcrumb-standardised-ellipsis-button]'
                            : i,
                    s =
                        void 0 === (s = t.ellipsisSelector)
                            ? '[data-ecl-breadcrumb-standardised-ellipsis]'
                            : s,
                    n = void 0 === (n = t.segmentSelector) ? '[data-ecl-breadcrumb-standardised-item]' : n,
                    l =
                        void 0 === (l = t.expandableItemsSelector)
                            ? '[data-ecl-breadcrumb-standardised-item="expandable"]'
                            : l,
                    a =
                        void 0 === (a = t.staticItemsSelector)
                            ? '[data-ecl-breadcrumb-standardised-item="static"]'
                            : a,
                    o = void 0 === (o = t.onPartialExpand) ? null : o,
                    r = void 0 === (r = t.onFullExpand) ? null : r,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.ellipsisButtonSelector = i),
                    (this.ellipsisSelector = s),
                    (this.segmentSelector = n),
                    (this.expandableItemsSelector = l),
                    (this.staticItemsSelector = a),
                    (this.onPartialExpand = o),
                    (this.onFullExpand = r),
                    (this.attachClickListener = t),
                    (this.ellipsisButton = null),
                    (this.itemsElements = null),
                    (this.staticElements = null),
                    (this.expandableElements = null),
                    (this.handleClickOnEllipsis = this.handleClickOnEllipsis.bind(this))
            }
            init() {
                ;(this.ellipsisButton = h(this.ellipsisButtonSelector, this.element)),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.addEventListener('click', this.handleClickOnEllipsis),
                    (this.itemsElements = r(this.segmentSelector, this.element)),
                    (this.staticElements = r(this.staticItemsSelector, this.element)),
                    (this.expandableElements = r(this.expandableItemsSelector, this.element)),
                    this.check(),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.ellipsisButton &&
                    this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnEllipsis() {
                return this.handleFullExpand()
            }
            check() {
                var e = this.computeVisibilityMap()
                e && (!0 === e.expanded ? this.handleFullExpand() : this.handlePartialExpand(e))
            }
            hideEllipsis() {
                var e = h(this.ellipsisSelector, this.element)
                e && e.setAttribute('aria-hidden', 'true'),
                    this.attachClickListener &&
                        this.ellipsisButton &&
                        this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis)
            }
            showAllItems() {
                this.expandableElements.forEach((e) => e.setAttribute('aria-hidden', 'false'))
            }
            handlePartialExpand(e) {
                var i
                e &&
                    (i = e.isItemVisible) &&
                    Array.isArray(i) &&
                    (this.onPartialExpand
                        ? this.onPartialExpand(i)
                        : this.expandableElements.forEach((e, t) => {
                              e.setAttribute('aria-hidden', i[t] ? 'false' : 'true')
                          }))
            }
            handleFullExpand() {
                this.onFullExpand ? this.onFullExpand() : (this.hideEllipsis(), this.showAllItems())
            }
            computeVisibilityMap() {
                if (!this.expandableElements || 0 === this.expandableElements.length) return { expanded: !0 }
                var t = Math.floor(this.element.getBoundingClientRect().width)
                if (
                    this.itemsElements.map((e) => e.getBoundingClientRect().width).reduce((e, t) => e + t) <=
                    t
                )
                    return { expanded: !0 }
                var i =
                    h(this.ellipsisSelector, this.element).getBoundingClientRect().width +
                    this.staticElements.reduce((e, t) => e + t.getBoundingClientRect().width, 0)
                if (t <= i) return { expanded: !1, isItemVisible: [...this.expandableElements.map(() => !1)] }
                var s = 0,
                    n = !0
                return {
                    expanded: !1,
                    isItemVisible: [...this.expandableElements]
                        .reverse()
                        .map(
                            (e) =>
                                !!n && ((e = (s += e.getBoundingClientRect().width) + i <= t) || (n = !1), e)
                        )
                        .reverse(),
                }
            }
        }),
        (e.Carousel = class ee {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).CAROUSEL) ? {} : t),
                    (t = new ee(e, t)).init(),
                    (e.ECLCarousel = t)
                )
            }
            constructor(e, t) {
                var i = void 0 === (i = (t = void 0 === t ? {} : t).playSelector) ? '.ecl-carousel__play' : i,
                    s = void 0 === (s = t.pauseSelector) ? '.ecl-carousel__pause' : s,
                    n = void 0 === (n = t.prevSelector) ? '.ecl-carousel__prev' : n,
                    l = void 0 === (l = t.nextSelector) ? '.ecl-carousel__next' : l,
                    a = void 0 === (a = t.containerClass) ? '.ecl-carousel__container' : a,
                    o = void 0 === (o = t.slidesClass) ? '.ecl-carousel__slides' : o,
                    r = void 0 === (r = t.slideClass) ? '.ecl-carousel__slide' : r,
                    h = void 0 === (h = t.currentSlideClass) ? '.ecl-carousel__current' : h,
                    c = void 0 === (c = t.navigationItemsClass) ? '.ecl-carousel__navigation-item' : c,
                    d = void 0 === (d = t.controlsClass) ? '.ecl-carousel__controls' : d,
                    u = void 0 === (u = t.paginationClass) ? '.ecl-carousel__pagination' : u,
                    g = void 0 === (g = t.attachClickListener) || g,
                    t = void 0 === (t = t.attachResizeListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.playSelector = i),
                    (this.pauseSelector = s),
                    (this.prevSelector = n),
                    (this.nextSelector = l),
                    (this.containerClass = a),
                    (this.slidesClass = o),
                    (this.slideClass = r),
                    (this.currentSlideClass = h),
                    (this.navigationItemsClass = c),
                    (this.controlsClass = d),
                    (this.paginationClass = u),
                    (this.attachClickListener = g),
                    (this.attachResizeListener = t),
                    (this.container = null),
                    (this.slides = null),
                    (this.btnPlay = null),
                    (this.btnPause = null),
                    (this.btnPrev = null),
                    (this.btnNext = null),
                    (this.index = 1),
                    (this.total = 0),
                    (this.allowShift = !0),
                    (this.autoPlay = null),
                    (this.autoPlayInterval = null),
                    (this.hoverAutoPlay = null),
                    (this.resizeTimer = null),
                    (this.posX1 = 0),
                    (this.posX2 = 0),
                    (this.posInitial = 0),
                    (this.posFinal = 0),
                    (this.threshold = 80),
                    (this.navigationItems = null),
                    (this.controls = null),
                    (this.direction = 'ltr'),
                    (this.cloneFirstSLide = null),
                    (this.cloneLastSLide = null),
                    (this.handleAutoPlay = this.handleAutoPlay.bind(this)),
                    (this.handleMouseOver = this.handleMouseOver.bind(this)),
                    (this.handleMouseOut = this.handleMouseOut.bind(this)),
                    (this.shiftSlide = this.shiftSlide.bind(this)),
                    (this.checkIndex = this.checkIndex.bind(this)),
                    (this.moveSlides = this.moveSlides.bind(this)),
                    (this.handleResize = this.handleResize.bind(this)),
                    (this.dragStart = this.dragStart.bind(this)),
                    (this.dragEnd = this.dragEnd.bind(this)),
                    (this.dragAction = this.dragAction.bind(this)),
                    (this.handleFocus = this.handleFocus.bind(this))
            }
            init() {
                if (
                    ((this.btnPlay = h(this.playSelector, this.element)),
                    (this.btnPause = h(this.pauseSelector, this.element)),
                    (this.btnPrev = h(this.prevSelector, this.element)),
                    (this.btnNext = h(this.nextSelector, this.element)),
                    (this.slidesContainer = h(this.slidesClass, this.element)),
                    (this.container = h(this.containerClass, this.element)),
                    (this.navigationItems = r(this.navigationItemsClass, this.element)),
                    (this.pagination = h(this.paginationClass, this.element)),
                    (this.controls = h(this.controlsClass, this.element)),
                    (this.currentSlide = h(this.currentSlideClass, this.element)),
                    (this.direction = getComputedStyle(this.element).direction),
                    (this.slides = r(this.slideClass, this.element)),
                    (this.total = this.slides.length),
                    this.total <= 1)
                )
                    return (
                        this.btnNext && (this.btnNext.style.display = 'none'),
                        this.btnPrev && (this.btnPrev.style.display = 'none'),
                        this.controls && (this.controls.style.display = 'none'),
                        this.slidesContainer && (this.slidesContainer.style.display = 'block'),
                        !1
                    )
                var e = this.slides[0],
                    t = this.slides[this.slides.length - 1]
                return (
                    (this.cloneFirstSLide = e.cloneNode(!0)),
                    (this.cloneLastSLide = t.cloneNode(!0)),
                    this.slidesContainer.appendChild(this.cloneFirstSLide),
                    this.slidesContainer.insertBefore(this.cloneLastSLide, e),
                    (this.slides = r(this.slideClass, this.element)),
                    this.slides.forEach((e) => {
                        e.style.width = 100 / this.slides.length + '%'
                    }),
                    this.handleResize(),
                    this.checkIndex(),
                    this.navigationItems &&
                        this.navigationItems.forEach((e, t) => {
                            e.addEventListener('click', this.shiftSlide.bind(this, t + 1, !0))
                        }),
                    this.attachClickListener &&
                        this.btnPlay &&
                        this.btnPause &&
                        (this.btnPlay.addEventListener('click', this.handleAutoPlay),
                        this.btnPause.addEventListener('click', this.handleAutoPlay)),
                    this.attachClickListener &&
                        this.btnNext &&
                        this.btnNext.addEventListener('click', this.shiftSlide.bind(this, 'next', !0)),
                    this.attachClickListener &&
                        this.btnPrev &&
                        this.btnPrev.addEventListener('click', this.shiftSlide.bind(this, 'prev', !0)),
                    this.slidesContainer &&
                        (this.slidesContainer.addEventListener('mouseover', this.handleMouseOver),
                        this.slidesContainer.addEventListener('mouseout', this.handleMouseOut),
                        this.slidesContainer.addEventListener('touchstart', this.dragStart),
                        this.slidesContainer.addEventListener('touchend', this.dragEnd),
                        this.slidesContainer.addEventListener('touchmove', this.dragAction),
                        this.slidesContainer.addEventListener('transitionend', this.checkIndex)),
                    this.container && this.container.addEventListener('focus', this.handleFocus, !0),
                    this.attachResizeListener && window.addEventListener('resize', this.handleResize),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true'),
                    this
                )
            }
            destroy() {
                this.cloneFirstSLide &&
                    this.cloneLastSLide &&
                    (this.cloneFirstSLide.remove(), this.cloneLastSLide.remove()),
                    this.btnPlay && this.btnPlay.replaceWith(this.btnPlay.cloneNode(!0)),
                    this.btnPause && this.btnPause.replaceWith(this.btnPause.cloneNode(!0)),
                    this.btnNext && this.btnNext.replaceWith(this.btnNext.cloneNode(!0)),
                    this.btnPrev && this.btnPrev.replaceWith(this.btnPrev.cloneNode(!0)),
                    this.slidesContainer &&
                        (this.slidesContainer.removeEventListener('mouseover', this.handleMouseOver),
                        this.slidesContainer.removeEventListener('mouseout', this.handleMouseOut),
                        this.slidesContainer.removeEventListener('touchstart', this.dragStart),
                        this.slidesContainer.removeEventListener('touchend', this.dragEnd),
                        this.slidesContainer.removeEventListener('touchmove', this.dragAction),
                        this.slidesContainer.removeEventListener('transitionend', this.checkIndex)),
                    this.container && this.container.removeEventListener('focus', this.handleFocus, !0),
                    this.navigationItems &&
                        this.navigationItems.forEach((e) => {
                            e.replaceWith(e.cloneNode(!0))
                        }),
                    this.attachResizeListener && window.removeEventListener('resize', this.handleResize),
                    this.autoPlayInterval && (clearInterval(this.autoPlayInterval), (this.autoPlay = null)),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            dragStart(e) {
                ;(e = e || window.event),
                    (this.posInitial = this.slidesContainer.offsetLeft),
                    'touchstart' === e.type && (this.posX1 = e.touches[0].clientX)
            }
            dragAction(e) {
                'touchmove' === (e = e || window.event).type &&
                    (e.preventDefault(),
                    (this.posX2 = this.posX1 - e.touches[0].clientX),
                    (this.posX1 = e.touches[0].clientX)),
                    (this.slidesContainer.style.left = this.slidesContainer.offsetLeft - this.posX2 + 'px')
            }
            dragEnd() {
                ;(this.posFinal = this.slidesContainer.offsetLeft),
                    this.posFinal - this.posInitial < -this.threshold
                        ? this.shiftSlide('next', !0)
                        : this.posFinal - this.posInitial > this.threshold
                        ? this.shiftSlide('prev', !0)
                        : (this.slidesContainer.style.left = this.posInitial + 'px')
            }
            shiftSlide(e, t) {
                this.allowShift &&
                    ((this.index = 'number' == typeof e ? e : 'next' === e ? this.index + 1 : this.index - 1),
                    this.moveSlides(!0)),
                    t && this.autoPlay && this.handleAutoPlay(),
                    (this.allowShift = !1)
            }
            moveSlides(e) {
                var t = this.container.offsetWidth * this.index
                ;(this.slidesContainer.style.transitionDuration = e ? '0.4s' : '0s'),
                    'rtl' === this.direction
                        ? (this.slidesContainer.style.right = '-' + t + 'px')
                        : (this.slidesContainer.style.left = '-' + t + 'px')
            }
            checkIndex() {
                0 === this.index && (this.index = this.total),
                    this.index === this.total + 1 && (this.index = 1),
                    this.moveSlides(!1),
                    this.currentSlide && (this.currentSlide.textContent = this.index),
                    this.slides &&
                        this.slides.forEach((e, t) => {
                            var i = h('.ecl-link--cta', e)
                            this.index === t
                                ? (e.removeAttribute('inert', 'true'), i && i.removeAttribute('tabindex', -1))
                                : (e.setAttribute('inert', 'true'), i && i.setAttribute('tabindex', -1))
                        }),
                    this.navigationItems &&
                        this.navigationItems.forEach((e, t) => {
                            this.index === t + 1
                                ? e.setAttribute('aria-current', 'true')
                                : e.removeAttribute('aria-current', 'true')
                        }),
                    (this.allowShift = !0)
            }
            handleAutoPlay() {
                var e
                this.autoPlay
                    ? (clearInterval(this.autoPlayInterval),
                      (this.autoPlay = !1),
                      (e = document.activeElement === this.btnPause),
                      (this.btnPlay.style.display = 'flex'),
                      (this.btnPause.style.display = 'none'),
                      e && this.btnPlay.focus())
                    : ((this.autoPlayInterval = setInterval(() => {
                          this.shiftSlide('next')
                      }, 5e3)),
                      (this.autoPlay = !0),
                      (e = document.activeElement === this.btnPlay),
                      (this.btnPlay.style.display = 'none'),
                      (this.btnPause.style.display = 'flex'),
                      e && this.btnPause.focus())
            }
            handleMouseOver() {
                return (this.hoverAutoPlay = this.autoPlay), this.hoverAutoPlay && this.handleAutoPlay(), this
            }
            handleMouseOut() {
                return this.hoverAutoPlay && this.handleAutoPlay(), this
            }
            handleResize() {
                var e = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
                    t = this.container.offsetWidth
                ;(this.slidesContainer.style.width = t * this.slides.length + 'px'),
                    this.moveSlides(!1),
                    1140 <= e && e <= 1260
                        ? this.container.classList.add('ecl-carousel-container--padded')
                        : this.container.classList.remove('ecl-carousel-container--padded'),
                    e < 1140
                        ? (this.pagination.parentNode.insertBefore(this.btnPrev, this.pagination),
                          this.pagination.parentNode.insertBefore(this.btnNext, this.pagination.nextSibling))
                        : (this.container.insertBefore(this.btnPrev, this.slidesContainer.nextSibling),
                          this.container.insertBefore(this.btnNext, this.btnPrev.nextSibling)),
                    ((e <= 768 && this.autoPlay) || (768 < e && null === this.autoPlay)) &&
                        this.handleAutoPlay()
            }
            handleFocus(e) {
                return (
                    (e = e.target) &&
                        e.contains(document.activeElement) &&
                        this.autoPlay &&
                        this.handleAutoPlay(),
                    this
                )
            }
        }),
        (e.CategoryFilter = class te {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).CATEGORY_FILTER) ? {} : t),
                    (t = new te(e, t)).init(),
                    (e.ECLCategoryFilter = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).itemSelector)
                            ? '.ecl-category-filter__item--has-children'
                            : i,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.itemSelector = i),
                    (this.attachClickListener = t),
                    (this.items = null),
                    (this.handleClickExpand = this.handleClickExpand.bind(this))
            }
            init() {
                ;(this.items = r(this.itemSelector, this.element)),
                    this.attachClickListener &&
                        this.items &&
                        this.items.forEach((e) => e.addEventListener('click', this.handleClickExpand)),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.items &&
                    this.items.forEach((e) => {
                        e.removeEventListener('click', this.handleClickExpand, !1)
                    }),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickExpand(e) {
                e.preventDefault()
                var t = e.target.closest('.ecl-category-filter__item')
                t.classList.contains('ecl-category-filter__item--level-1') &&
                (this.items.forEach((e) => {
                    e !== t && e.parentElement.setAttribute('aria-expanded', 'false')
                }),
                'true' === t.parentElement.getAttribute('aria-expanded'))
                    ? (t.parentElement.setAttribute('aria-expanded', 'false'),
                      t.classList.remove('ecl-category-filter__item--current'))
                    : (this.items.forEach((e) => {
                          e === t
                              ? e.classList.add('ecl-category-filter__item--current')
                              : e.classList.remove('ecl-category-filter__item--current')
                      }),
                      (e = t.parentElement.getAttribute('aria-expanded')),
                      t.parentElement.setAttribute('aria-expanded', 'false' === e ? 'true' : 'false'))
            }
        }),
        (e.Datepicker = class ie {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).DATEPICKER) ? {} : t),
                    (t = new ie(e, t)).init(),
                    (e.ECLDatepicker = t)
                )
            }
            constructor(e, t) {
                var i = void 0 === (i = (t = void 0 === t ? {} : t).format) ? 'DD-MM-YYYY' : i,
                    s = void 0 === (s = t.theme) ? 'ecl-datepicker-theme' : s,
                    n = void 0 === (n = t.yearRange) ? 40 : n,
                    l = void 0 !== (l = t.reposition) && l,
                    a =
                        void 0 === (a = t.i18n)
                            ? {
                                  previousMonth: 'Previous Month',
                                  nextMonth: 'Next Month',
                                  months: [
                                      'January',
                                      'February',
                                      'March',
                                      'April',
                                      'May',
                                      'June',
                                      'July',
                                      'August',
                                      'September',
                                      'October',
                                      'November',
                                      'December',
                                  ],
                                  weekdays: [
                                      'Sunday',
                                      'Monday',
                                      'Tuesday',
                                      'Wednesday',
                                      'Thursday',
                                      'Friday',
                                      'Saturday',
                                  ],
                                  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                              }
                            : a,
                    o = void 0 === (o = t.showDaysInNextAndPreviousMonths) || o,
                    t = void 0 === (t = t.enableSelectionDaysInNextAndPreviousMonths) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.picker = null),
                    (this.format = i),
                    (this.theme = s),
                    (this.yearRange = n),
                    (this.i18n = a),
                    (this.showDaysInNextAndPreviousMonths = o),
                    (this.enableSelectionDaysInNextAndPreviousMonths = t),
                    (this.reposition = l),
                    (this.direction = 'ltr')
            }
            init() {
                return (
                    (this.direction = getComputedStyle(this.element).direction),
                    (this.picker = new H({
                        field: this.element,
                        format: this.format,
                        yearRange: this.yearRange,
                        firstDay: 1,
                        i18n: this.i18n,
                        theme: this.theme,
                        reposition: this.reposition,
                        isRTL: 'rtl' === this.direction,
                        position: 'rtl' === this.direction ? 'bottom right' : 'bottom left',
                        showDaysInNextAndPreviousMonths: this.showDaysInNextAndPreviousMonths,
                        enableSelectionDaysInNextAndPreviousMonths:
                            this.enableSelectionDaysInNextAndPreviousMonths,
                        onOpen() {
                            this.direction = getComputedStyle(this.el).direction
                            var e = Math.max(
                                    document.documentElement.clientWidth || 0,
                                    window.innerWidth || 0
                                ),
                                t = this.el.getBoundingClientRect(),
                                t = 'rtl' === this.direction ? e - t.right : t.left
                            e < 768 &&
                                ((this.el.style.width = 'auto'),
                                (this.el.style.left = t + 'px'),
                                (this.el.style.right = t + 'px'))
                        },
                    })),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true'),
                    this.picker
                )
            }
            destroy() {
                this.picker && (this.picker.destroy(), (this.picker = null)),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
        }),
        (e.Expandable = class se {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).EXPANDABLE) ? {} : t),
                    (t = new se(e, t)).init(),
                    (e.ECLExpandable = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).toggleSelector)
                            ? '[data-ecl-expandable-toggle]'
                            : i,
                    s = void 0 === (s = t.labelSelector) ? '[data-ecl-label]' : s,
                    n = void 0 === (n = t.labelExpanded) ? 'data-ecl-label-expanded' : n,
                    l = void 0 === (l = t.labelCollapsed) ? 'data-ecl-label-collapsed' : l,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.toggleSelector = i),
                    (this.labelSelector = s),
                    (this.labelExpanded = n),
                    (this.labelCollapsed = l),
                    (this.attachClickListener = t),
                    (this.toggle = null),
                    (this.forceClose = !1),
                    (this.target = null),
                    (this.label = null),
                    (this.handleClickOnToggle = this.handleClickOnToggle.bind(this))
            }
            init() {
                if (
                    ((this.toggle = h(this.toggleSelector, this.element)),
                    (this.target = document.querySelector('#' + this.toggle.getAttribute('aria-controls'))),
                    (this.label = h(this.labelSelector, this.element)),
                    !this.target)
                )
                    throw new TypeError('Target has to be provided for expandable (aria-controls)')
                this.attachClickListener &&
                    this.toggle &&
                    this.toggle.addEventListener('click', this.handleClickOnToggle),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.toggle &&
                    this.toggle.removeEventListener('click', this.handleClickOnToggle),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnToggle() {
                var e = !0 === this.forceClose || 'true' === this.toggle.getAttribute('aria-expanded')
                return (
                    this.toggle.setAttribute('aria-expanded', e ? 'false' : 'true'),
                    (this.target.hidden = e),
                    this.label && !e && this.toggle.hasAttribute(this.labelExpanded)
                        ? (this.label.innerHTML = this.toggle.getAttribute(this.labelExpanded))
                        : this.label &&
                          e &&
                          this.toggle.hasAttribute(this.labelCollapsed) &&
                          (this.label.innerHTML = this.toggle.getAttribute(this.labelCollapsed)),
                    this
                )
            }
        }),
        (e.FileDownload = class ne {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).FILE_DOWNLOAD) ? {} : t),
                    (t = new ne(e, t)).init(),
                    (e.ECLFileDownload = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).translationToggleSelector)
                            ? '[data-ecl-file-translation-toggle]'
                            : i,
                    s =
                        void 0 === (s = t.translationContainerSelector)
                            ? '[data-ecl-file-translation-container]'
                            : s,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.translationToggleSelector = i),
                    (this.translationContainerSelector = s),
                    (this.attachClickListener = t),
                    (this.translationToggle = null),
                    (this.translationContainer = null),
                    (this.handleClickOnToggle = this.handleClickOnToggle.bind(this))
            }
            init() {
                ;(this.translationToggle = h(this.translationToggleSelector, this.element)),
                    (this.translationContainer = h(this.translationContainerSelector, this.element)),
                    this.attachClickListener &&
                        this.translationToggle &&
                        this.translationToggle.addEventListener('click', this.handleClickOnToggle),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.translationToggle &&
                    this.translationToggle.removeEventListener('click', this.handleClickOnToggle),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnToggle(e) {
                return (
                    e.preventDefault(),
                    'true' === this.translationContainer.getAttribute('aria-expanded')
                        ? this.translationContainer.setAttribute('aria-expanded', 'false')
                        : this.translationContainer.setAttribute('aria-expanded', 'true'),
                    this
                )
            }
        }),
        (e.FileUpload = class le {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).FILE_UPLOAD) ? {} : t),
                    (t = new le(e, t)).init(),
                    (e.ECLFileUpload = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).groupSelector)
                            ? '[data-ecl-file-upload-group]'
                            : i,
                    s = void 0 === (s = t.buttonSelector) ? '[data-ecl-file-upload-button]' : s,
                    n = void 0 === (n = t.listSelector) ? '[data-ecl-file-upload-list]' : n,
                    l = void 0 === (l = t.labelChoose) ? 'data-ecl-file-upload-label-choose' : l,
                    a = void 0 === (a = t.labelReplace) ? 'data-ecl-file-upload-label-replace' : a,
                    t = void 0 === (t = t.attachChangeListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.groupSelector = i),
                    (this.buttonSelector = s),
                    (this.listSelector = n),
                    (this.labelChoose = l),
                    (this.labelReplace = a),
                    (this.attachChangeListener = t),
                    (this.fileUploadGroup = null),
                    (this.fileUploadInput = null),
                    (this.fileUploadButton = null),
                    (this.fileUploadList = null),
                    (this.handleChange = this.handleChange.bind(this))
            }
            init() {
                ;(this.fileUploadGroup = this.element.closest(this.groupSelector)),
                    (this.fileUploadInput = this.element),
                    (this.fileUploadButton = h(this.buttonSelector, this.fileUploadGroup)),
                    (this.fileUploadList = h(this.listSelector, this.fileUploadGroup)),
                    this.attachChangeListener &&
                        this.fileUploadInput &&
                        this.fileUploadInput.addEventListener('change', this.handleChange),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachChangeListener &&
                    this.fileUploadInput &&
                    this.fileUploadInput.removeEventListener('change', this.handleChange),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleChange(e) {
                var s
                'files' in e.target
                    ? ((s = ''),
                      Array.prototype.forEach.call(e.target.files, (e) => {
                          var t = (function (e, t) {
                                  if (0 === e) return '0 Bytes'
                                  var t = (t = void 0 === t ? 2 : t) < 0 ? 0 : t,
                                      i = Math.floor(Math.log(e) / Math.log(1024))
                                  return (
                                      parseFloat((e / Math.pow(1024, i)).toFixed(t)) +
                                      ' ' +
                                      ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
                                  )
                              })(e.size, 1),
                              i = e.name.split('.').pop()
                          s +=
                              '<li class="ecl-file-upload__item">\n      <span class="ecl-file-upload__item-name">' +
                              e.name +
                              '</span>\n      <span class="ecl-file-upload__item-meta">(' +
                              t +
                              ' - ' +
                              i +
                              ')</span>\n      </li>'
                      }),
                      (this.fileUploadList.innerHTML = s),
                      this.fileUploadButton.hasAttribute(this.labelReplace) &&
                          (this.fileUploadButton.innerHTML = this.fileUploadButton.getAttribute(
                              this.labelReplace
                          )))
                    : this.fileUploadButton.hasAttribute(this.labelChoose) &&
                      (this.fileUploadButton.innerHTML = this.fileUploadButton.getAttribute(this.labelChoose))
            }
        }),
        (e.Gallery = class ae {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).GALLERY) ? {} : t),
                    (t = new ae(e, t)).init(),
                    (e.ECLGallery = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).galleryItemSelector)
                            ? '[data-ecl-gallery-item]'
                            : i,
                    s = void 0 === (s = t.descriptionSelector) ? '[data-ecl-gallery-description]' : s,
                    n = void 0 === (n = t.metaSelector) ? '[data-ecl-gallery-meta]' : n,
                    l = void 0 === (l = t.closeButtonSelector) ? '[data-ecl-gallery-close]' : l,
                    a = void 0 === (a = t.viewAllSelector) ? '[data-ecl-gallery-all]' : a,
                    o = void 0 === (o = t.countSelector) ? '[data-ecl-gallery-count]' : o,
                    r = void 0 === (r = t.overlaySelector) ? '[data-ecl-gallery-overlay]' : r,
                    h = void 0 === (h = t.overlayHeaderSelector) ? '[data-ecl-gallery-overlay-header]' : h,
                    c = void 0 === (c = t.overlayFooterSelector) ? '[data-ecl-gallery-overlay-footer]' : c,
                    d = void 0 === (d = t.overlayMediaSelector) ? '[data-ecl-gallery-overlay-media]' : d,
                    u =
                        void 0 === (u = t.overlayCounterCurrentSelector)
                            ? '[data-ecl-gallery-overlay-counter-current]'
                            : u,
                    g =
                        void 0 === (g = t.overlayCounterMaxSelector)
                            ? '[data-ecl-gallery-overlay-counter-max]'
                            : g,
                    p =
                        void 0 === (p = t.overlayDownloadSelector)
                            ? '[data-ecl-gallery-overlay-download]'
                            : p,
                    v = void 0 === (v = t.overlayShareSelector) ? '[data-ecl-gallery-overlay-share]' : v,
                    m =
                        void 0 === (m = t.overlayDescriptionSelector)
                            ? '[data-ecl-gallery-overlay-description]'
                            : m,
                    b = void 0 === (b = t.overlayMetaSelector) ? '[data-ecl-gallery-overlay-meta]' : b,
                    f =
                        void 0 === (f = t.overlayPreviousSelector)
                            ? '[data-ecl-gallery-overlay-previous]'
                            : f,
                    y = void 0 === (y = t.overlayNextSelector) ? '[data-ecl-gallery-overlay-next]' : y,
                    E = void 0 === (E = t.attachClickListener) || E,
                    L = void 0 === (L = t.attachKeyListener) || L,
                    t = void 0 === (t = t.attachResizeListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.galleryItemSelector = i),
                    (this.descriptionSelector = s),
                    (this.metaSelector = n),
                    (this.closeButtonSelector = l),
                    (this.viewAllSelector = a),
                    (this.countSelector = o),
                    (this.overlaySelector = r),
                    (this.overlayHeaderSelector = h),
                    (this.overlayFooterSelector = c),
                    (this.overlayMediaSelector = d),
                    (this.overlayCounterCurrentSelector = u),
                    (this.overlayCounterMaxSelector = g),
                    (this.overlayDownloadSelector = p),
                    (this.overlayShareSelector = v),
                    (this.overlayDescriptionSelector = m),
                    (this.overlayMetaSelector = b),
                    (this.overlayPreviousSelector = f),
                    (this.overlayNextSelector = y),
                    (this.attachClickListener = E),
                    (this.attachKeyListener = L),
                    (this.attachResizeListener = t),
                    (this.galleryItems = null),
                    (this.meta = null),
                    (this.closeButton = null),
                    (this.viewAll = null),
                    (this.count = null),
                    (this.overlay = null),
                    (this.overlayHeader = null),
                    (this.overlayFooter = null),
                    (this.overlayMedia = null),
                    (this.overlayCounterCurrent = null),
                    (this.overlayCounterMax = null),
                    (this.overlayDownload = null),
                    (this.overlayShare = null),
                    (this.overlayDescription = null),
                    (this.overlayMeta = null),
                    (this.overlayPrevious = null),
                    (this.overlayNext = null),
                    (this.selectedItem = null),
                    (this.focusTrap = null),
                    (this.isDesktop = !1),
                    (this.resizeTimer = null),
                    (this.breakpointMd = 768),
                    (this.imageHeight = 185),
                    (this.handleClickOnCloseButton = this.handleClickOnCloseButton.bind(this)),
                    (this.handleClickOnViewAll = this.handleClickOnViewAll.bind(this)),
                    (this.handleClickOnItem = this.handleClickOnItem.bind(this)),
                    (this.handleKeyPressOnItem = this.handleKeyPressOnItem.bind(this)),
                    (this.handleClickOnPreviousButton = this.handleClickOnPreviousButton.bind(this)),
                    (this.handleClickOnNextButton = this.handleClickOnNextButton.bind(this)),
                    (this.handleKeyboard = this.handleKeyboard.bind(this)),
                    (this.handleResize = this.handleResize.bind(this))
            }
            init() {
                ;(this.galleryItems = r(this.galleryItemSelector, this.element)),
                    (this.closeButton = h(this.closeButtonSelector, this.element)),
                    (this.viewAll = h(this.viewAllSelector, this.element)),
                    (this.count = h(this.countSelector, this.element)),
                    (this.overlay = h(this.overlaySelector, this.element)),
                    (this.overlayHeader = h(this.overlayHeaderSelector, this.overlay)),
                    (this.overlayFooter = h(this.overlayFooterSelector, this.overlay)),
                    (this.overlayMedia = h(this.overlayMediaSelector, this.overlay)),
                    (this.overlayCounterCurrent = h(this.overlayCounterCurrentSelector, this.overlay)),
                    (this.overlayCounterMax = h(this.overlayCounterMaxSelector, this.overlay)),
                    (this.overlayDownload = h(this.overlayDownloadSelector, this.overlay)),
                    (this.overlayShare = h(this.overlayShareSelector, this.overlay)),
                    (this.overlayDescription = h(this.overlayDescriptionSelector, this.overlay)),
                    (this.overlayMeta = h(this.overlayMetaSelector, this.overlay)),
                    (this.overlayPrevious = h(this.overlayPreviousSelector, this.overlay)),
                    (this.overlayNext = h(this.overlayNextSelector, this.overlay)),
                    (this.focusTrap = g(this.overlay, {
                        escapeDeactivates: !1,
                        returnFocusOnDeactivate: !1,
                    })),
                    (this.isDialogSupported = !0),
                    window.HTMLDialogElement || (this.isDialogSupported = !1),
                    this.attachClickListener &&
                        this.closeButton &&
                        this.closeButton.addEventListener('click', this.handleClickOnCloseButton),
                    this.attachClickListener &&
                        this.viewAll &&
                        this.viewAll.addEventListener('click', this.handleClickOnViewAll),
                    this.attachClickListener &&
                        this.galleryItems &&
                        this.galleryItems.forEach((e) => {
                            this.attachClickListener && e.addEventListener('click', this.handleClickOnItem),
                                this.attachKeyListener &&
                                    e.addEventListener('keyup', this.handleKeyPressOnItem)
                        }),
                    this.attachClickListener &&
                        this.overlayPrevious &&
                        this.overlayPrevious.addEventListener('click', this.handleClickOnPreviousButton),
                    this.attachClickListener &&
                        this.overlayNext &&
                        this.overlayNext.addEventListener('click', this.handleClickOnNextButton),
                    !this.isDialogSupported &&
                        this.attachKeyListener &&
                        this.overlay &&
                        this.overlay.addEventListener('keyup', this.handleKeyboard),
                    this.isDialogSupported &&
                        this.overlay &&
                        this.overlay.addEventListener('close', this.handleClickOnCloseButton),
                    this.attachResizeListener && window.addEventListener('resize', this.handleResize),
                    this.checkScreen(),
                    this.hideItems(),
                    this.galleryItems.forEach((e, t) => {
                        e.setAttribute('data-ecl-gallery-item-id', t)
                    }),
                    this.count && (this.count.innerHTML = this.galleryItems.length),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.closeButton &&
                    this.closeButton.removeEventListener('click', this.handleClickOnCloseButton),
                    this.attachClickListener &&
                        this.viewAll &&
                        this.viewAll.removeEventListener('click', this.handleClickOnViewAll),
                    this.attachClickListener &&
                        this.galleryItems &&
                        this.galleryItems.forEach((e) => {
                            e.removeEventListener('click', this.handleClickOnItem)
                        }),
                    this.attachClickListener &&
                        this.overlayPrevious &&
                        this.overlayPrevious.removeEventListener('click', this.handleClickOnPreviousButton),
                    this.attachClickListener &&
                        this.overlayNext &&
                        this.overlayNext.removeEventListener('click', this.handleClickOnNextButton),
                    !this.isDialogSupported &&
                        this.attachKeyListener &&
                        this.overlay &&
                        this.overlay.removeEventListener('keyup', this.handleKeyboard),
                    this.isDialogSupported &&
                        this.overlay &&
                        this.overlay.removeEventListener('close', this.handleClickOnCloseButton),
                    this.attachResizeListener && window.removeEventListener('resize', this.handleResize),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            checkScreen() {
                window.innerWidth > this.breakpointMd ? (this.isDesktop = !0) : (this.isDesktop = !1)
            }
            hideItems() {
                var i, s
                this.viewAll &&
                    (this.isDesktop
                        ? ((i = this.element.getBoundingClientRect().top),
                          (s = []),
                          this.galleryItems.forEach((e, t) => {
                              e.parentNode.classList.remove('ecl-gallery__item--hidden'),
                                  e.getBoundingClientRect().top - i > 2 * this.imageHeight && (s = [...s, t])
                          }),
                          s.forEach((e) => {
                              this.galleryItems[e].parentNode.classList.add('ecl-gallery__item--hidden')
                          }))
                        : this.galleryItems.forEach((e, t) => {
                              2 < t
                                  ? e.parentNode.classList.add('ecl-gallery__item--hidden')
                                  : e.parentNode.classList.remove('ecl-gallery__item--hidden')
                          }))
            }
            handleResize() {
                clearTimeout(this.resizeTimer),
                    (this.resizeTimer = setTimeout(() => {
                        this.checkScreen(), this.hideItems()
                    }, 200))
            }
            updateOverlay(e) {
                var t = (this.selectedItem = e).getAttribute('data-ecl-gallery-item-embed-src'),
                    i = h('video', e),
                    s = null
                null != t
                    ? ((s = document.createElement('div')).classList.add('ecl-gallery__slider-embed'),
                      (n = document.createElement('iframe')).setAttribute('src', t),
                      n.setAttribute('frameBorder', '0'),
                      this.overlayMedia &&
                          (s.appendChild(n),
                          (this.overlayMedia.innerHTML = ''),
                          this.overlayMedia.appendChild(s)))
                    : null != i
                    ? ((s = document.createElement('video')).setAttribute('poster', i.poster),
                      s.setAttribute('controls', 'controls'),
                      s.classList.add('ecl-gallery__slider-video'),
                      this.overlayMedia &&
                          ((this.overlayMedia.innerHTML = ''), this.overlayMedia.appendChild(s)),
                      r('source', i).forEach((e) => {
                          var t = document.createElement('source')
                          t.setAttribute('src', e.getAttribute('src')),
                              t.setAttribute('type', e.getAttribute('type')),
                              s.appendChild(t)
                      }),
                      r('track', i).forEach((e) => {
                          var t = document.createElement('track')
                          t.setAttribute('src', e.getAttribute('src')),
                              t.setAttribute('kind', e.getAttribute('kind')),
                              t.setAttribute('srclang', e.getAttribute('srcLang')),
                              t.setAttribute('label', e.getAttribute('label')),
                              s.appendChild(t)
                      }),
                      s.load())
                    : ((n = h('img', e)),
                      (s = document.createElement('img')).setAttribute('src', n.getAttribute('src')),
                      s.setAttribute('alt', n.getAttribute('alt')),
                      s.classList.add('ecl-gallery__slider-image'),
                      this.overlayMedia &&
                          ((this.overlayMedia.innerHTML = ''), this.overlayMedia.appendChild(s))),
                    (this.overlayCounterCurrent.innerHTML = +e.getAttribute('data-ecl-gallery-item-id') + 1),
                    (this.overlayCounterMax.innerHTML = this.galleryItems.length)
                null != (i = this.selectedItem.getAttribute('data-ecl-gallery-item-share'))
                    ? ((this.overlayShare.href = i), (this.overlayShare.hidden = !1))
                    : (this.overlayShare.hidden = !0),
                    null != t
                        ? (this.overlayDownload.hidden = !0)
                        : ((this.overlayDownload.href = this.selectedItem.href),
                          (this.overlayDownload.hidden = !1))
                var n = h(this.metaSelector, e),
                    i = ((this.overlayMeta.innerHTML = n.innerHTML), h(this.descriptionSelector, e)),
                    t =
                        ((this.overlayDescription.innerHTML = i.innerHTML),
                        this.overlay.clientHeight -
                            this.overlayHeader.clientHeight -
                            this.overlayFooter.clientHeight)
                this.overlayMedia && Object.assign(s.style, { maxHeight: t + 'px' })
            }
            handleKeyboard(e) {
                ;('Escape' !== e.key && 'Esc' !== e.key) || this.handleClickOnCloseButton()
            }
            handleClickOnCloseButton() {
                this.isDialogSupported ? this.overlay.close() : this.overlay.removeAttribute('open')
                var e = h('iframe', this.overlayMedia)
                e && e.remove(),
                    (e = h('video', this.overlayMedia)) && e.pause(),
                    this.focusTrap.deactivate(),
                    this.selectedItem.focus(),
                    document.body.classList.remove('ecl-u-disablescroll')
            }
            handleKeyPressOnItem(e) {
                32 === e.keyCode && this.handleClickOnItem(e)
            }
            handleClickOnViewAll(e) {
                e.preventDefault(),
                    document.body.classList.add('ecl-u-disablescroll'),
                    this.isDialogSupported ? this.overlay.showModal() : this.overlay.setAttribute('open', ''),
                    this.updateOverlay(this.galleryItems[0]),
                    this.focusTrap.activate()
            }
            handleClickOnItem(e) {
                e.preventDefault(),
                    document.body.classList.add('ecl-u-disablescroll'),
                    this.isDialogSupported ? this.overlay.showModal() : this.overlay.setAttribute('open', ''),
                    this.updateOverlay(e.currentTarget),
                    this.focusTrap.activate()
            }
            handleClickOnPreviousButton() {
                var e = +this.selectedItem.getAttribute('data-ecl-gallery-item-id') - 1,
                    t = (e < 0 && (e = this.galleryItems.length - 1), h('video', this.selectedItem))
                return (
                    t && t.pause(),
                    this.updateOverlay(this.galleryItems[e]),
                    (this.selectedItem = this.galleryItems[e]),
                    this
                )
            }
            handleClickOnNextButton() {
                var e = +this.selectedItem.getAttribute('data-ecl-gallery-item-id') + 1,
                    t = (e >= this.galleryItems.length && (e = 0), h('video', this.selectedItem))
                return (
                    t && t.pause(),
                    this.updateOverlay(this.galleryItems[e]),
                    (this.selectedItem = this.galleryItems[e]),
                    this
                )
            }
        }),
        (e.InpageNavigation = class oe {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).INPAGE_NAVIGATION) ? {} : t),
                    (t = new oe(e, t)).init(),
                    (e.ECLInpageNavigation = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).stickySelector)
                            ? '[data-ecl-inpage-navigation]'
                            : i,
                    s = void 0 === (s = t.containerSelector) ? '[data-ecl-inpage-navigation-container]' : s,
                    n = void 0 === (n = t.inPageList) ? '[data-ecl-inpage-navigation-list]' : n,
                    l = void 0 === (l = t.spySelector) ? '[data-ecl-inpage-navigation-link]' : l,
                    a = void 0 === (a = t.toggleSelector) ? '[data-ecl-inpage-navigation-trigger]' : a,
                    o = void 0 === (o = t.linksSelector) ? '[data-ecl-inpage-navigation-link]' : o,
                    r = void 0 === (r = t.spyActiveContainer) ? 'ecl-inpage-navigation--visible' : r,
                    h = void 0 === (h = t.spyOffset) ? 20 : h,
                    c = void 0 === (c = t.spyClass) ? 'ecl-inpage-navigation__item--active' : c,
                    d = void 0 === (d = t.spyTrigger) ? '[data-ecl-inpage-navigation-trigger-current]' : d,
                    u = void 0 === (u = t.attachClickListener) || u,
                    t = void 0 === (t = t.contentClass) ? 'ecl-inpage-navigation__heading--active' : t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.attachClickListener = u),
                    (this.stickySelector = i),
                    (this.containerSelector = s),
                    (this.toggleSelector = a),
                    (this.linksSelector = o),
                    (this.inPageList = n),
                    (this.spyActiveContainer = r),
                    (this.spySelector = l),
                    (this.spyOffset = h),
                    (this.spyClass = c),
                    (this.spyTrigger = d),
                    (this.contentClass = t),
                    (this.gumshoe = null),
                    (this.observer = null),
                    (this.stickyObserver = null),
                    (this.handleClickOnToggler = this.handleClickOnToggler.bind(this)),
                    (this.handleClickOnLink = this.handleClickOnLink.bind(this)),
                    (this.initScrollSpy = this.initScrollSpy.bind(this)),
                    (this.initObserver = this.initObserver.bind(this)),
                    (this.activateScrollSpy = this.activateScrollSpy.bind(this)),
                    (this.deactivateScrollSpy = this.deactivateScrollSpy.bind(this)),
                    (this.destroySticky = this.destroySticky.bind(this)),
                    (this.destroyScrollSpy = this.destroyScrollSpy.bind(this)),
                    (this.destroyObserver = this.destroyObserver.bind(this))
            }
            initSticky() {
                this.stickyInstance = new p.Sticky(this.element)
            }
            destroySticky() {
                this.stickyInstance && this.stickyInstance.remove()
            }
            initScrollSpy() {
                var e, s, n, l
                ;(this.gumshoe = new Q(this.spySelector, {
                    navClass: this.spyClass,
                    contentClass: this.contentClass,
                    offset: this.spyOffset,
                    reflow: !0,
                })),
                    document.addEventListener('gumshoeActivate', this.activateScrollSpy, !1),
                    document.addEventListener('gumshoeDeactivate', this.deactivateScrollSpy, !1),
                    'IntersectionObserver' in window &&
                        (e = h(this.containerSelector)) &&
                        ((n = s = 0),
                        (l = !1),
                        (this.stickyObserver = new IntersectionObserver(
                            (e) => {
                                var t, i
                                e &&
                                    e[0] &&
                                    ((t = (e = e[0]).boundingClientRect.y),
                                    (i = e.intersectionRatio),
                                    (e = e.isIntersecting),
                                    l
                                        ? t < s
                                            ? (n < i && e) ||
                                              this.element.classList.remove(this.spyActiveContainer)
                                            : s < t &&
                                              e &&
                                              n < i &&
                                              this.element.classList.add(this.spyActiveContainer)
                                        : (l = !0),
                                    (s = t),
                                    (n = i))
                            },
                            { root: null }
                        )),
                        this.stickyObserver.observe(e))
            }
            activateScrollSpy(e) {
                var t = h(this.spyTrigger)
                this.element.classList.add(this.spyActiveContainer),
                    (t.textContent = e.detail.content.textContent)
            }
            deactivateScrollSpy() {
                var e = h(this.spyTrigger)
                this.element.classList.remove(this.spyActiveContainer), (e.innerHTML = '')
            }
            destroyScrollSpy() {
                this.stickyObserver && this.stickyObserver.disconnect(),
                    document.removeEventListener('gumshoeActivate', this.activateScrollSpy, !1),
                    document.removeEventListener('gumshoeDeactivate', this.deactivateScrollSpy, !1),
                    this.gumshoe.destroy()
            }
            initObserver() {
                var t
                'MutationObserver' in window &&
                    (((t = this).observer = new MutationObserver((e) => {
                        var s = h('.ecl-col-l-9'),
                            n = h('[data-ecl-inpage-navigation-list]')
                        e.forEach((e) => {
                            e &&
                                e.target &&
                                e.target.classList &&
                                !e.target.classList.contains('ecl-inpage-navigation__trigger-current') &&
                                (0 < e.addedNodes.length &&
                                    [].slice.call(e.addedNodes).forEach((t) => {
                                        var e, i
                                        'H2' === t.tagName &&
                                            t.id &&
                                            ((e = r('h2[id]', s).findIndex((e) => e.id === t.id)),
                                            ((i = n.childNodes[e - 1].cloneNode(
                                                !0
                                            )).childNodes[0].textContent = t.textContent),
                                            (i.childNodes[0].href = '#' + t.id),
                                            n.childNodes[e - 1].after(i))
                                    }),
                                0 < e.removedNodes.length &&
                                    [].slice.call(e.removedNodes).forEach((t) => {
                                        'H2' === t.tagName &&
                                            t.id &&
                                            n.childNodes.forEach((e) => {
                                                ;-1 !== e.childNodes[0].href.indexOf(t.id) && e.remove()
                                            })
                                    }),
                                t.update())
                        })
                    })),
                    this.observer.observe(document, { subtree: !0, childList: !0 }))
            }
            destroyObserver() {
                this.observer && this.observer.disconnect()
            }
            init() {
                var e = h(this.toggleSelector, this.element),
                    t = r(this.linksSelector, this.element)
                this.initSticky(this.element),
                    this.initScrollSpy(),
                    this.initObserver(),
                    this.attachClickListener && e && e.addEventListener('click', this.handleClickOnToggler),
                    this.attachClickListener &&
                        t &&
                        (t.forEach((e) => e.addEventListener('click', this.handleClickOnLink)),
                        e.addEventListener('click', this.handleClickOnToggler)),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            update() {
                this.gumshoe.setup()
            }
            handleClickOnToggler(e) {
                var t = h(this.inPageList, this.element),
                    i = h(this.toggleSelector, this.element),
                    e = (e.preventDefault(), 'true' === i.getAttribute('aria-expanded'))
                i.setAttribute('aria-expanded', e ? 'false' : 'true'),
                    e
                        ? t.classList.remove('ecl-inpage-navigation__list--visible')
                        : t.classList.add('ecl-inpage-navigation__list--visible')
            }
            handleClickOnLink() {
                var e = h(this.inPageList, this.element),
                    t = h(this.toggleSelector, this.element)
                e.classList.remove('ecl-inpage-navigation__list--visible'),
                    t.setAttribute('aria-expanded', 'false')
            }
            destroy() {
                this.attachClickListener &&
                    this.toggleElement &&
                    this.toggleElement.removeEventListener('click', this.handleClickOnToggler),
                    this.attachClickListener &&
                        this.navLinks &&
                        this.navLinks.forEach((e) => e.removeEventListener('click', this.handleClickOnLink)),
                    this.destroyScrollSpy(),
                    this.destroySticky(),
                    this.destroyObserver(),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
        }),
        (e.MediaContainer = class re {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).MEDIA_CONTAINER) ? {} : t),
                    (t = new re(e, t)).init(),
                    (e.ECLMediaContainer = t)
                )
            }
            constructor(e, t) {
                var i = void 0 === (i = (t = void 0 === t ? {} : t).iframeSelector) ? 'iframe' : i,
                    t = void 0 === (t = t.useAutomaticRatio) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.iframeSelector = i),
                    (this.useAutomaticRatio = t),
                    (this.iframe = null),
                    (this.calculateRatio = this.calculateRatio.bind(this))
            }
            init() {
                var e = h('.ecl-media-container__media', this.element)
                e &&
                    !/ecl-media-container__media--ratio/.test(e.className) &&
                    ((this.iframe = h(this.iframeSelector, this.element)),
                    this.iframe && this.useAutomaticRatio && this.calculateRatio()),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            calculateRatio() {
                var e = this.iframe.width,
                    t = this.iframe.height
                ;(e && t) || ((e = this.iframe.offsetWidth), (t = this.iframe.offsetHeight)),
                    (this.iframe.style.aspectRatio = e + '/' + t)
            }
        }),
        (e.Menu = class he {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).MENU) ? {} : t),
                    (t = new he(e, t)).init(),
                    (e.ECLMenu = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).openSelector)
                            ? '[data-ecl-menu-open]'
                            : i,
                    s = void 0 === (s = t.closeSelector) ? '[data-ecl-menu-close]' : s,
                    n = void 0 === (n = t.backSelector) ? '[data-ecl-menu-back]' : n,
                    l = void 0 === (l = t.overlaySelector) ? '[data-ecl-menu-overlay]' : l,
                    a = void 0 === (a = t.innerSelector) ? '[data-ecl-menu-inner]' : a,
                    o = void 0 === (o = t.itemSelector) ? '[data-ecl-menu-item]' : o,
                    r = void 0 === (r = t.linkSelector) ? '[data-ecl-menu-link]' : r,
                    h = void 0 === (h = t.caretSelector) ? '[data-ecl-menu-caret]' : h,
                    c = void 0 === (c = t.megaSelector) ? '[data-ecl-menu-mega]' : c,
                    d = void 0 === (d = t.subItemSelector) ? '[data-ecl-menu-subitem]' : d,
                    u = void 0 === (u = t.attachClickListener) || u,
                    g = void 0 === (g = t.attachHoverListener) || g,
                    p = void 0 === (p = t.attachFocusListener) || p,
                    v = void 0 === (v = t.attachKeyListener) || v,
                    t = void 0 === (t = t.attachResizeListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.openSelector = i),
                    (this.closeSelector = s),
                    (this.backSelector = n),
                    (this.overlaySelector = l),
                    (this.innerSelector = a),
                    (this.itemSelector = o),
                    (this.linkSelector = r),
                    (this.caretSelector = h),
                    (this.megaSelector = c),
                    (this.subItemSelector = d),
                    (this.attachClickListener = u),
                    (this.attachHoverListener = g),
                    (this.attachFocusListener = p),
                    (this.attachKeyListener = v),
                    (this.attachResizeListener = t),
                    (this.open = null),
                    (this.close = null),
                    (this.back = null),
                    (this.overlay = null),
                    (this.inner = null),
                    (this.items = null),
                    (this.links = null),
                    (this.isOpen = !1),
                    (this.resizeTimer = null),
                    (this.isKeyEvent = !1),
                    (this.handleClickOnOpen = this.handleClickOnOpen.bind(this)),
                    (this.handleClickOnClose = this.handleClickOnClose.bind(this)),
                    (this.handleClickOnBack = this.handleClickOnBack.bind(this)),
                    (this.handleClickOnCaret = this.handleClickOnCaret.bind(this)),
                    (this.handleHoverOnItem = this.handleHoverOnItem.bind(this)),
                    (this.handleHoverOffItem = this.handleHoverOffItem.bind(this)),
                    (this.handleFocusOut = this.handleFocusOut.bind(this)),
                    (this.handleKeyboard = this.handleKeyboard.bind(this)),
                    (this.handleKeyboardGlobal = this.handleKeyboardGlobal.bind(this)),
                    (this.handleResize = this.handleResize.bind(this)),
                    (this.useDesktopDisplay = this.useDesktopDisplay.bind(this)),
                    (this.closeOpenDropdown = this.closeOpenDropdown.bind(this))
            }
            init() {
                ;(this.open = h(this.openSelector, this.element)),
                    (this.close = h(this.closeSelector, this.element)),
                    (this.back = h(this.backSelector, this.element)),
                    (this.overlay = h(this.overlaySelector, this.element)),
                    (this.inner = h(this.innerSelector, this.element)),
                    (this.items = r(this.itemSelector, this.element)),
                    (this.subItems = r(this.subItemSelector, this.element)),
                    (this.links = r(this.linkSelector, this.element)),
                    (this.carets = r(this.caretSelector, this.element)),
                    this.useDesktopDisplay(),
                    this.attachClickListener &&
                        this.open &&
                        this.open.addEventListener('click', this.handleClickOnOpen),
                    this.attachClickListener &&
                        this.close &&
                        this.close.addEventListener('click', this.handleClickOnClose),
                    this.attachClickListener &&
                        this.back &&
                        this.back.addEventListener('click', this.handleClickOnBack),
                    this.attachClickListener &&
                        this.overlay &&
                        this.overlay.addEventListener('click', this.handleClickOnClose),
                    this.links &&
                        this.links.forEach((e) => {
                            this.attachFocusListener &&
                                (e.addEventListener('focusin', this.closeOpenDropdown),
                                e.addEventListener('focusout', this.handleFocusOut)),
                                this.attachKeyListener && e.addEventListener('keyup', this.handleKeyboard)
                        }),
                    this.carets &&
                        this.carets.forEach((e) => {
                            this.attachFocusListener && e.addEventListener('focusout', this.handleFocusOut),
                                this.attachKeyListener && e.addEventListener('keyup', this.handleKeyboard),
                                this.attachClickListener &&
                                    e.addEventListener('click', this.handleClickOnCaret)
                        }),
                    this.subItems &&
                        this.subItems.forEach((e) => {
                            ;(e = h('.ecl-menu__sublink', e)),
                                this.attachKeyListener &&
                                    e &&
                                    e.addEventListener('keyup', this.handleKeyboard),
                                this.attachFocusListener &&
                                    e &&
                                    e.addEventListener('focusout', this.handleFocusOut)
                        }),
                    this.attachKeyListener && document.addEventListener('keyup', this.handleKeyboardGlobal),
                    this.attachResizeListener && window.addEventListener('resize', this.handleResize),
                    this.items &&
                        !v.isMobile &&
                        this.items.forEach((e) => {
                            this.checkMenuItem(e),
                                e.hasAttribute('data-ecl-has-children') &&
                                    this.attachHoverListener &&
                                    (e.addEventListener('mouseover', this.handleHoverOnItem),
                                    e.addEventListener('mouseout', this.handleHoverOffItem))
                        }),
                    (this.stickyInstance = new p.Sticky(this.element)),
                    setTimeout(() => {
                        this.element.classList.add('ecl-menu--transition')
                    }, 500),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.stickyInstance && this.stickyInstance.remove(),
                    this.attachClickListener &&
                        this.open &&
                        this.open.removeEventListener('click', this.handleClickOnOpen),
                    this.attachClickListener &&
                        this.close &&
                        this.close.removeEventListener('click', this.handleClickOnClose),
                    this.attachClickListener &&
                        this.back &&
                        this.back.removeEventListener('click', this.handleClickOnBack),
                    this.attachClickListener &&
                        this.overlay &&
                        this.overlay.removeEventListener('click', this.handleClickOnClose),
                    this.attachKeyListener &&
                        this.carets &&
                        this.carets.forEach((e) => {
                            e.removeEventListener('keyup', this.handleKeyboard)
                        }),
                    this.items &&
                        !v.isMobile &&
                        this.items.forEach((e) => {
                            e.hasAttribute('data-ecl-has-children') &&
                                this.attachHoverListener &&
                                (e.removeEventListener('mouseover', this.handleHoverOnItem),
                                e.removeEventListener('mouseout', this.handleHoverOffItem))
                        }),
                    this.links &&
                        this.links.forEach((e) => {
                            this.attachFocusListener &&
                                (e.removeEventListener('focusin', this.closeOpenDropdown),
                                e.removeEventListener('focusout', this.handleFocusOut)),
                                this.attachKeyListener && e.removeEventListener('keyup', this.handleKeyboard)
                        }),
                    this.carets &&
                        this.carets.forEach((e) => {
                            this.attachFocusListener &&
                                e.removeEventListener('focusout', this.handleFocusOut),
                                this.attachKeyListener && e.removeEventListener('keyup', this.handleKeyboard),
                                this.attachClickListener &&
                                    e.removeEventListener('click', this.handleClickOnCaret)
                        }),
                    this.subItems &&
                        this.subItems.forEach((e) => {
                            ;(e = h('.ecl-menu__sublink', e)),
                                this.attachKeyListener &&
                                    e &&
                                    e.removeEventListener('keyup', this.handleKeyboard),
                                this.attachFocusListener &&
                                    e &&
                                    e.removeEventListener('focusout', this.handleFocusOut)
                        }),
                    this.attachKeyListener &&
                        document.removeEventListener('keyup', this.handleKeyboardGlobal),
                    this.attachResizeListener && window.removeEventListener('resize', this.handleResize),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            useDesktopDisplay() {
                return (
                    !v.isMobileOnly &&
                    (v.isTablet
                        ? (this.element.classList.add('ecl-menu--forced-mobile'), !1)
                        : (this.element.classList.remove('ecl-menu--forced-mobile'), !0))
                )
            }
            handleResize() {
                return (
                    this.element.classList.remove('ecl-menu--transition'),
                    clearTimeout(this.resizeTimer),
                    (this.resizeTimer = setTimeout(() => {
                        this.element.classList.remove('ecl-menu--forced-mobile'),
                            this.useDesktopDisplay(),
                            this.items &&
                                !v.isMobile &&
                                this.items.forEach((e) => {
                                    this.checkMenuItem(e)
                                }),
                            this.element.classList.add('ecl-menu--transition')
                    }, 200)),
                    this
                )
            }
            checkMenuItem(e) {
                var t = h(this.megaSelector, e)
                if (t) {
                    if ((i = r(this.subItemSelector, t)).length < 5) e.classList.add('ecl-menu__item--col1')
                    else if (i.length < 9) e.classList.add('ecl-menu__item--col2')
                    else {
                        if (!(i.length < 13)) return void e.classList.add('ecl-menu__item--full')
                        e.classList.add('ecl-menu__item--col3')
                    }
                    var i = t.getBoundingClientRect(),
                        s = this.inner.getBoundingClientRect(),
                        e = e.getBoundingClientRect(),
                        i = i.width
                    s.width < e.left - s.left + i
                        ? t.classList.add('ecl-menu__mega--rtl')
                        : t.classList.remove('ecl-menu__mega--rtl')
                }
            }
            handleKeyboard(e) {
                var t = e.target,
                    i = t.classList,
                    s = this.element.getAttribute('aria-expanded'),
                    n = t.closest(this.itemSelector)
                if ('Escape' === e.key || 'Esc' === e.key)
                    document.activeElement === t && t.blur(),
                        'false' === s &&
                            ((l = h('.ecl-menu__button-caret', n)) && l.focus(), this.closeOpenDropdown())
                else {
                    if (i.contains('ecl-menu__button-caret') && 'false' === s) {
                        if (32 === e.keyCode || 'Enter' === e.key)
                            return void ('true' === n.getAttribute('aria-expanded')
                                ? this.handleHoverOffItem(e)
                                : this.handleHoverOnItem(e))
                        if ('ArrowDown' === e.key)
                            if ((l = h('.ecl-menu__sublink:first-of-type', n))) return void l.focus()
                    }
                    if (i.contains('ecl-menu__link') || i.contains('ecl-menu__button-caret')) {
                        if ('ArrowLeft' === e.key || 'ArrowUp' === e.key) {
                            if ((s = t.previousSibling) && s.classList.contains('ecl-menu__link'))
                                return void s.focus()
                            if ((s = t.parentElement.previousSibling)) {
                                var l,
                                    n = s.classList.contains('ecl-menu__item--has-children')
                                        ? '.ecl-menu__button-caret'
                                        : '.ecl-menu__link'
                                if ((l = h(n, s))) return void l.focus()
                            }
                        }
                        if ('ArrowRight' === e.key || 'ArrowDown' === e.key) {
                            if ((n = t.nextSibling) && n.classList.contains('ecl-menu__button-caret'))
                                return void n.focus()
                            ;(n = t.parentElement.nextSibling) && (s = h('.ecl-menu__link', n)) && s.focus()
                        }
                        this.closeOpenDropdown()
                    }
                    i.contains('ecl-menu__sublink') &&
                        ('ArrowDown' === e.key &&
                        (l = t.parentElement.nextSibling) &&
                        (n = h('.ecl-menu__sublink', l))
                            ? n.focus()
                            : 'ArrowUp' === e.key &&
                              ((s = t.parentElement.previousSibling)
                                  ? (i = h('.ecl-menu__sublink', s)) && i.focus()
                                  : (l = h(
                                        this.itemSelector + '[aria-expanded="true"] ' + this.caretSelector,
                                        this.element
                                    )) && l.focus()))
                }
            }
            handleKeyboardGlobal(e) {
                var t = this.element.getAttribute('aria-expanded')
                ;('Escape' !== e.key && 'Esc' !== e.key) || ('true' === t && this.handleClickOnClose())
            }
            handleClickOnOpen(e) {
                return (
                    e.preventDefault(),
                    this.element.setAttribute('aria-expanded', 'true'),
                    this.inner.setAttribute('aria-hidden', 'false'),
                    (this.isOpen = !0),
                    this
                )
            }
            handleClickOnClose() {
                return (
                    this.element.setAttribute('aria-expanded', 'false'),
                    this.inner.classList.remove('ecl-menu__inner--expanded'),
                    this.inner.setAttribute('aria-hidden', 'true'),
                    this.items.forEach((e) => {
                        e.classList.remove('ecl-menu__item--expanded'),
                            e.setAttribute('aria-expanded', 'false')
                    }),
                    this.open && this.open.focus(),
                    (this.isOpen = !1),
                    this
                )
            }
            handleClickOnBack() {
                return (
                    this.inner.classList.remove('ecl-menu__inner--expanded'),
                    this.items.forEach((e) => {
                        e.classList.remove('ecl-menu__item--expanded'),
                            e.setAttribute('aria-expanded', 'false')
                    }),
                    this
                )
            }
            handleClickOnCaret(e) {
                var t
                'false' !== this.element.getAttribute('aria-expanded') &&
                    (this.inner.classList.add('ecl-menu__inner--expanded'),
                    (t = e.target.closest(this.itemSelector)),
                    this.items.forEach((e) => {
                        e === t
                            ? (e.classList.add('ecl-menu__item--expanded'),
                              e.setAttribute('aria-expanded', 'true'))
                            : (e.classList.remove('ecl-menu__item--expanded'),
                              e.setAttribute('aria-expanded', 'false'))
                    }))
            }
            handleHoverOnItem(e) {
                var t = e.target.closest(this.itemSelector)
                return (
                    this.items.forEach((e) => {
                        e === t
                            ? e.setAttribute('aria-expanded', 'true')
                            : (e.setAttribute('aria-expanded', 'false'),
                              (e = h('.ecl-menu__button-caret', e)) && e.blur())
                    }),
                    this
                )
            }
            handleHoverOffItem(e) {
                return e.target.closest(this.itemSelector).setAttribute('aria-expanded', 'false'), this
            }
            closeOpenDropdown() {
                var e = h(this.itemSelector + "[aria-expanded='true']", this.element)
                e && e.setAttribute('aria-expanded', 'false')
            }
            handleFocusOut(e) {
                var t,
                    e = e.target
                'true' !== this.element.getAttribute('aria-expanded') ||
                    e.parentElement.nextSibling ||
                    ((t = h('.ecl-menu__button-caret', e.parentElement)) && e !== t) ||
                    this.close.focus()
            }
        }),
        (e.Message = class ce {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).MESSAGE) ? {} : t),
                    (t = new ce(e, t)).init(),
                    (e.ECLMessage = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).closeSelector)
                            ? '[data-ecl-message-close]'
                            : i,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.closeSelector = i),
                    (this.attachClickListener = t),
                    (this.close = null),
                    (this.handleClickOnClose = this.handleClickOnClose.bind(this))
            }
            init() {
                ;(this.close = h(this.closeSelector, this.element)),
                    this.attachClickListener &&
                        this.close &&
                        this.close.addEventListener('click', this.handleClickOnClose),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.close &&
                    this.close.removeEventListener('click', this.handleClickOnClose),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnClose() {
                return this.element.parentNode && this.element.parentNode.removeChild(this.element), this
            }
        }),
        (e.NewsTicker = class de {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).NEWS_TICKER) ? {} : t),
                    (t = new de(e, t)).init(),
                    (e.ECLNewsTicker = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).playSelector)
                            ? '[data-ecl-news-ticker-play]'
                            : i,
                    s = void 0 === (s = t.pauseSelector) ? '[data-ecl-news-ticker-pause]' : s,
                    n = void 0 === (n = t.prevSelector) ? '[data-ecl-news-ticker-prev]' : n,
                    l = void 0 === (l = t.nextSelector) ? '[data-ecl-news-ticker-next]' : l,
                    a = void 0 === (a = t.containerClass) ? '.ecl-news-ticker__container' : a,
                    o = void 0 === (o = t.contentClass) ? '.ecl-news-ticker__content' : o,
                    r = void 0 === (r = t.slidesClass) ? '.ecl-news-ticker__slides' : r,
                    h = void 0 === (h = t.slideClass) ? '.ecl-news-ticker__slide' : h,
                    c = void 0 === (c = t.currentSlideClass) ? '.ecl-news-ticker__counter--current' : c,
                    d = void 0 === (d = t.controlsClass) ? '.ecl-news-ticker__controls' : d,
                    u = void 0 === (u = t.attachClickListener) || u,
                    t = void 0 === (t = t.attachResizeListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.playSelector = i),
                    (this.pauseSelector = s),
                    (this.prevSelector = n),
                    (this.nextSelector = l),
                    (this.containerClass = a),
                    (this.contentClass = o),
                    (this.slidesClass = r),
                    (this.slideClass = h),
                    (this.currentSlideClass = c),
                    (this.controlsClass = d),
                    (this.attachClickListener = u),
                    (this.attachResizeListener = t),
                    (this.container = null),
                    (this.content = null),
                    (this.slides = null),
                    (this.btnPlay = null),
                    (this.btnPause = null),
                    (this.btnPrev = null),
                    (this.btnNext = null),
                    (this.index = 1),
                    (this.total = 0),
                    (this.allowShift = !0),
                    (this.autoPlay = null),
                    (this.autoPlayInterval = null),
                    (this.hoverAutoPlay = null),
                    (this.resizeTimer = null),
                    (this.cloneFirstSLide = null),
                    (this.cloneLastSLide = null),
                    (this.handleAutoPlay = this.handleAutoPlay.bind(this)),
                    (this.handleMouseOver = this.handleMouseOver.bind(this)),
                    (this.handleMouseOut = this.handleMouseOut.bind(this)),
                    (this.shiftSlide = this.shiftSlide.bind(this)),
                    (this.checkIndex = this.checkIndex.bind(this)),
                    (this.moveSlides = this.moveSlides.bind(this)),
                    (this.handleResize = this.handleResize.bind(this)),
                    (this.handleFocus = this.handleFocus.bind(this))
            }
            init() {
                if (
                    ((this.btnPlay = h(this.playSelector, this.element)),
                    (this.btnPause = h(this.pauseSelector, this.element)),
                    (this.btnPrev = h(this.prevSelector, this.element)),
                    (this.btnNext = h(this.nextSelector, this.element)),
                    (this.slidesContainer = h(this.slidesClass, this.element)),
                    (this.container = h(this.containerClass, this.element)),
                    (this.content = h(this.contentClass, this.element)),
                    (this.controls = h(this.controlsClass, this.element)),
                    (this.slides = r(this.slideClass, this.element)),
                    (this.total = this.slides.length),
                    this.total <= 1 && this.controls)
                )
                    return (this.content.style.height = 'auto'), !(this.controls.style.display = 'none')
                var e = this.slides[0],
                    t = this.slides[this.slides.length - 1]
                return (
                    (this.cloneFirstSLide = e.cloneNode(!0)),
                    (this.cloneLastSLide = t.cloneNode(!0)),
                    this.slidesContainer.appendChild(this.cloneFirstSLide),
                    this.slidesContainer.insertBefore(this.cloneLastSLide, e),
                    (this.slides = r(this.slideClass, this.element)),
                    this.handleResize(),
                    this.handleAutoPlay(),
                    this.attachClickListener &&
                        this.btnPlay &&
                        this.btnPause &&
                        (this.btnPlay.addEventListener('click', this.handleAutoPlay),
                        this.btnPause.addEventListener('click', this.handleAutoPlay)),
                    this.attachClickListener &&
                        this.btnNext &&
                        this.btnNext.addEventListener('click', this.shiftSlide.bind(this, 1, !0)),
                    this.attachClickListener &&
                        this.btnPrev &&
                        this.btnPrev.addEventListener('click', this.shiftSlide.bind(this, -1, !0)),
                    this.slidesContainer &&
                        (this.slidesContainer.addEventListener('transitionend', this.checkIndex),
                        this.slidesContainer.addEventListener('mouseover', this.handleMouseOver),
                        this.slidesContainer.addEventListener('mouseout', this.handleMouseOut)),
                    this.container && this.container.addEventListener('focus', this.handleFocus, !0),
                    this.attachResizeListener && window.addEventListener('resize', this.handleResize),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true'),
                    this
                )
            }
            destroy() {
                this.cloneFirstSLide &&
                    this.cloneLastSLide &&
                    (this.cloneFirstSLide.remove(), this.cloneLastSLide.remove()),
                    this.btnPlay && this.btnPlay.replaceWith(this.btnPlay.cloneNode(!0)),
                    this.btnPause && this.btnPause.replaceWith(this.btnPause.cloneNode(!0)),
                    this.btnNext && this.btnNext.replaceWith(this.btnNext.cloneNode(!0)),
                    this.btnPrev && this.btnPrev.replaceWith(this.btnPrev.cloneNode(!0)),
                    this.slidesContainer &&
                        (this.slidesContainer.removeEventListener('transitionend', this.checkIndex),
                        this.slidesContainer.removeEventListener('mouseover', this.handleMouseOver),
                        this.slidesContainer.removeEventListener('mouseout', this.handleMouseOut)),
                    this.container && this.container.removeEventListener('focus', this.handleFocus, !0),
                    this.attachResizeListener && window.removeEventListener('resize', this.handleResize),
                    this.autoPlayInterval && (clearInterval(this.autoPlayInterval), (this.autoPlay = null)),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            shiftSlide(e, t) {
                this.allowShift &&
                    ((this.index = 1 === e ? this.index + 1 : this.index - 1), this.moveSlides(!0)),
                    t && this.autoPlay && this.handleAutoPlay(),
                    (this.allowShift = !1)
            }
            moveSlides(e) {
                var t = this.slides[this.index].offsetTop,
                    i = this.slides[this.index].offsetHeight
                ;(this.content.style.height = i + 'px'),
                    (this.slidesContainer.style.transitionDuration = e ? '0.4s' : '1ms'),
                    (this.slidesContainer.style.transform = 'translate3d(0px, -' + t + 'px, 0px)')
            }
            checkIndex() {
                0 === this.index && ((this.index = this.total), this.moveSlides(!1)),
                    this.index === this.total + 1 && ((this.index = 1), this.moveSlides(!1)),
                    (h(this.currentSlideClass, this.element).textContent = this.index),
                    this.slides &&
                        this.slides.forEach((e, t) => {
                            var i = h('.ecl-link', e)
                            this.index === t
                                ? (e.removeAttribute('inert', 'true'), i && i.removeAttribute('tabindex', -1))
                                : (e.setAttribute('inert', 'true'), i && i.setAttribute('tabindex', -1))
                        }),
                    (this.allowShift = !0)
            }
            handleAutoPlay() {
                var e
                this.autoPlay
                    ? (clearInterval(this.autoPlayInterval),
                      (this.autoPlay = !1),
                      (e = document.activeElement === this.btnPause),
                      (this.btnPlay.style.display = 'flex'),
                      (this.btnPause.style.display = 'none'),
                      e && this.btnPlay.focus())
                    : ((this.autoPlayInterval = setInterval(() => {
                          this.shiftSlide(1)
                      }, 5e3)),
                      (this.autoPlay = !0),
                      (e = document.activeElement === this.btnPlay),
                      (this.btnPlay.style.display = 'none'),
                      (this.btnPause.style.display = 'flex'),
                      e && this.btnPause.focus())
            }
            handleMouseOver() {
                return (this.hoverAutoPlay = this.autoPlay), this.hoverAutoPlay && this.handleAutoPlay(), this
            }
            handleMouseOut() {
                return this.hoverAutoPlay && this.handleAutoPlay(), this
            }
            handleResize() {
                var t = 0
                this.slides.forEach((e) => {
                    ;(e = e.offsetHeight), (t = t < e ? e : t)
                }),
                    (t = t < 58 ? 58 : t),
                    (this.container.style.height = t + 10 + 'px'),
                    this.moveSlides(!1)
            }
            handleFocus(e) {
                return (
                    (e = e.target) &&
                        e.contains(document.activeElement) &&
                        this.autoPlay &&
                        this.handleAutoPlay(),
                    this
                )
            }
        }),
        (e.Popover = class ue {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).POPOVER) ? {} : t),
                    (t = new ue(e, t)).init(),
                    (e.ECLPopover = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).toggleSelector)
                            ? '[data-ecl-popover-toggle]'
                            : i,
                    s = void 0 === (s = t.attachClickListener) || s,
                    t = void 0 === (t = t.attachKeyListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.toggleSelector = i),
                    (this.attachClickListener = s),
                    (this.attachKeyListener = t),
                    (this.toggle = null),
                    (this.target = null),
                    (this.openPopover = this.openPopover.bind(this)),
                    (this.closePopover = this.closePopover.bind(this)),
                    (this.positionPopover = this.positionPopover.bind(this)),
                    (this.handleClickOnToggle = this.handleClickOnToggle.bind(this)),
                    (this.handleKeyboardGlobal = this.handleKeyboardGlobal.bind(this)),
                    (this.handleClickGlobal = this.handleClickGlobal.bind(this))
            }
            init() {
                if (
                    ((this.toggle = h(this.toggleSelector, this.element)),
                    this.attachKeyListener && document.addEventListener('keyup', this.handleKeyboardGlobal),
                    this.attachClickListener && document.addEventListener('click', this.handleClickGlobal),
                    (this.target = document.querySelector('#' + this.toggle.getAttribute('aria-controls'))),
                    !this.target)
                )
                    throw new TypeError('Target has to be provided for popover (aria-controls)')
                this.attachClickListener &&
                    this.toggle &&
                    this.toggle.addEventListener('click', this.handleClickOnToggle),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.toggle &&
                    this.toggle.removeEventListener('click', this.handleClickOnToggle),
                    this.attachKeyListener &&
                        document.removeEventListener('keyup', this.handleKeyboardGlobal),
                    this.attachClickListener && document.removeEventListener('click', this.handleClickGlobal),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnToggle(e) {
                e.preventDefault(),
                    'true' === this.toggle.getAttribute('aria-expanded')
                        ? this.closePopover()
                        : (this.openPopover(), this.positionPopover())
            }
            openPopover() {
                this.toggle.setAttribute('aria-expanded', 'true'), (this.target.hidden = !1)
            }
            closePopover() {
                this.toggle.setAttribute('aria-expanded', 'false'), (this.target.hidden = !0)
            }
            positionPopover() {
                this.element.classList.remove('ecl-popover--top'),
                    this.element.classList.remove('ecl-popover--push-left'),
                    this.element.classList.remove('ecl-popover--push-right')
                var e = this.toggle.getBoundingClientRect(),
                    t = this.target.getBoundingClientRect(),
                    i = this.target.clientHeight,
                    s = window.innerHeight,
                    n = window.innerWidth
                0 < i && s - e.top < i && this.element.classList.add('ecl-popover--top'),
                    t.left < 0 &&
                        (this.element.classList.add('ecl-popover--push-left'),
                        this.target.style.setProperty('--ecl-popover-position', e.width / 2 + 'px')),
                    t.right > n &&
                        (this.element.classList.add('ecl-popover--push-right'),
                        this.target.style.setProperty(
                            '--ecl-popover-position',
                            'calc(' + e.width / 2 + 'px - 0.5rem)'
                        ))
            }
            handleKeyboardGlobal(e) {
                !this.target || ('Escape' !== e.key && 'Esc' !== e.key) || this.closePopover()
            }
            handleClickGlobal(e) {
                !this.target ||
                    'true' !== this.toggle.getAttribute('aria-expanded') ||
                    this.target.contains(e.target) ||
                    this.toggle.contains(e.target) ||
                    this.closePopover()
            }
        }),
        (e.Range = class ge {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).RANGE) ? {} : t),
                    (t = new ge(e, t)).init(),
                    (e.ECLRange = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).rangeInputSelector)
                            ? '[data-ecl-range-input]'
                            : i,
                    s = void 0 === (s = t.currentValueSelector) ? '[data-ecl-range-value-current]' : s,
                    t = void 0 === (t = t.attachChangeListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.rangeInputSelector = i),
                    (this.currentValueSelector = s),
                    (this.attachChangeListener = t),
                    (this.rangeInput = null),
                    (this.currentValue = null),
                    (this.handleChange = this.handleChange.bind(this))
            }
            init() {
                ;(this.rangeInput = h(this.rangeInputSelector, this.element)),
                    (this.currentValue = h(this.currentValueSelector, this.element)),
                    this.rangeInput &&
                        this.currentValue &&
                        ((this.currentValue.innerHTML = this.rangeInput.value),
                        this.attachChangeListener &&
                            this.rangeInput.addEventListener('input', this.handleChange)),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachChangeListener &&
                    this.rangeInput &&
                    this.currentValue &&
                    this.rangeInput.removeEventListener('input', this.handleChange),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleChange() {
                this.currentValue.innerHTML = this.rangeInput.value
            }
        }),
        (e.Select = m),
        (e.SiteHeader = class pe {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).SITE_HEADER_CORE) ? {} : t),
                    (t = new pe(e, t)).init(),
                    (e.ECLSiteHeader = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).containerSelector)
                            ? '[data-ecl-site-header-top]'
                            : i,
                    s = void 0 === (s = t.languageLinkSelector) ? '[data-ecl-language-selector]' : s,
                    n =
                        void 0 === (n = t.languageListOverlaySelector)
                            ? '[data-ecl-language-list-overlay]'
                            : n,
                    l = void 0 === (l = t.languageListEuSelector) ? '[data-ecl-language-list-eu]' : l,
                    a = void 0 === (a = t.languageListNonEuSelector) ? '[data-ecl-language-list-non-eu]' : a,
                    o = void 0 === (o = t.closeOverlaySelector) ? '[data-ecl-language-list-close]' : o,
                    r = void 0 === (r = t.searchToggleSelector) ? '[data-ecl-search-toggle]' : r,
                    h = void 0 === (h = t.searchFormSelector) ? '[data-ecl-search-form]' : h,
                    c = void 0 === (c = t.loginToggleSelector) ? '[data-ecl-login-toggle]' : c,
                    d = void 0 === (d = t.loginBoxSelector) ? '[data-ecl-login-box]' : d,
                    u = void 0 === (u = t.attachClickListener) || u,
                    t = void 0 === (t = t.attachKeyListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.containerSelector = i),
                    (this.languageLinkSelector = s),
                    (this.languageListOverlaySelector = n),
                    (this.languageListEuSelector = l),
                    (this.languageListNonEuSelector = a),
                    (this.closeOverlaySelector = o),
                    (this.searchToggleSelector = r),
                    (this.searchFormSelector = h),
                    (this.loginToggleSelector = c),
                    (this.loginBoxSelector = d),
                    (this.attachClickListener = u),
                    (this.attachKeyListener = t),
                    (this.languageMaxColumnItems = 8),
                    (this.languageLink = null),
                    (this.languageListOverlay = null),
                    (this.languageListEu = null),
                    (this.languageListNonEu = null),
                    (this.close = null),
                    (this.focusTrap = null),
                    (this.searchToggle = null),
                    (this.searchForm = null),
                    (this.loginToggle = null),
                    (this.loginBox = null),
                    (this.openOverlay = this.openOverlay.bind(this)),
                    (this.closeOverlay = this.closeOverlay.bind(this)),
                    (this.toggleOverlay = this.toggleOverlay.bind(this)),
                    (this.toggleSearch = this.toggleSearch.bind(this)),
                    (this.toggleLogin = this.toggleLogin.bind(this)),
                    (this.handleKeyboardGlobal = this.handleKeyboardGlobal.bind(this)),
                    (this.handleClickGlobal = this.handleClickGlobal.bind(this))
            }
            init() {
                this.attachKeyListener && document.addEventListener('keyup', this.handleKeyboardGlobal),
                    this.attachClickListener && document.addEventListener('click', this.handleClickGlobal),
                    (this.container = h(this.containerSelector)),
                    (this.languageLink = h(this.languageLinkSelector)),
                    (this.languageListOverlay = h(this.languageListOverlaySelector)),
                    (this.languageListEu = h(this.languageListEuSelector)),
                    (this.languageListNonEu = h(this.languageListNonEuSelector)),
                    (this.close = h(this.closeOverlaySelector)),
                    (this.focusTrap = g(this.languageListOverlay, {
                        onDeactivate: this.closeOverlay,
                        allowOutsideClick: !0,
                    })),
                    this.attachClickListener &&
                        this.languageLink &&
                        this.languageLink.addEventListener('click', this.toggleOverlay),
                    this.attachClickListener &&
                        this.close &&
                        this.close.addEventListener('click', this.toggleOverlay),
                    (this.searchToggle = h(this.searchToggleSelector)),
                    (this.searchForm = h(this.searchFormSelector)),
                    this.attachClickListener &&
                        this.searchToggle &&
                        this.searchToggle.addEventListener('click', this.toggleSearch),
                    (this.loginToggle = h(this.loginToggleSelector)),
                    (this.loginBox = h(this.loginBoxSelector)),
                    this.attachClickListener &&
                        this.loginToggle &&
                        this.loginToggle.addEventListener('click', this.toggleLogin),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.languageLink &&
                    this.languageLink.removeEventListener('click', this.toggleOverlay),
                    this.focusTrap && this.focusTrap.deactivate(),
                    this.attachClickListener &&
                        this.close &&
                        this.close.removeEventListener('click', this.toggleOverlay),
                    this.attachClickListener &&
                        this.searchToggle &&
                        this.searchToggle.removeEventListener('click', this.toggleSearch),
                    this.attachClickListener &&
                        this.loginToggle &&
                        this.loginToggle.removeEventListener('click', this.toggleLogin),
                    this.attachKeyListener &&
                        document.removeEventListener('keyup', this.handleKeyboardGlobal),
                    this.attachClickListener && document.removeEventListener('click', this.handleClickGlobal),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            openOverlay() {
                var e = 1,
                    t = 1,
                    i =
                        (this.languageListEu &&
                            ((i = r('.ecl-site-header__language-item', this.languageListEu)),
                            1 < (e = Math.ceil(i.length / this.languageMaxColumnItems)) &&
                                this.languageListEu.classList.add(
                                    'ecl-site-header__language-category--' + e + '-col'
                                )),
                        this.languageListNonEu &&
                            ((i = r('.ecl-site-header__language-item', this.languageListNonEu)),
                            1 < (t = Math.ceil(i.length / this.languageMaxColumnItems)) &&
                                this.languageListNonEu.classList.add(
                                    'ecl-site-header__language-category--' + t + '-col'
                                )),
                        (this.languageListOverlay.hidden = !1),
                        this.languageListOverlay.setAttribute('aria-modal', 'true'),
                        this.languageLink.setAttribute('aria-expanded', 'true'),
                        this.languageListEu.parentNode.classList.remove(
                            'ecl-site-header__language-content--stack'
                        ),
                        this.languageListOverlay.getBoundingClientRect()),
                    s = this.container.getBoundingClientRect(),
                    e =
                        (i.width > s.width &&
                            (this.languageListEu.parentNode.classList.add(
                                'ecl-site-header__language-content--stack'
                            ),
                            this.languageListNonEu &&
                                (this.languageListNonEu.classList.remove(
                                    'ecl-site-header__language-category--' + t + '-col'
                                ),
                                this.languageListNonEu.classList.add(
                                    'ecl-site-header__language-category--' + Math.max(e, t) + '-col'
                                ))),
                        this.languageListOverlay.classList.remove(
                            'ecl-site-header__language-container--push-right'
                        ),
                        this.languageListOverlay.style.removeProperty('--ecl-language-arrow-position'),
                        this.languageListOverlay.style.removeProperty('right'),
                        (i = this.languageListOverlay.getBoundingClientRect()),
                        window.innerWidth)
                i.right > e &&
                    ((t = this.languageLink.getBoundingClientRect()),
                    this.languageListOverlay.classList.add('ecl-site-header__language-container--push-right'),
                    this.languageListOverlay.style.setProperty('right', '-' + (s.right - t.right) + 'px'),
                    (e = s.right - t.right + t.width / 2),
                    this.languageListOverlay.style.setProperty(
                        '--ecl-language-arrow-position',
                        'calc(' + e + 'px - 0.5rem)'
                    )),
                    0 === i.left &&
                        ((s = this.languageLink.getBoundingClientRect()),
                        this.languageListOverlay.classList.add('ecl-site-header__language-container--full'),
                        (t = i.right - s.right + s.width / 2),
                        this.languageListOverlay.style.setProperty(
                            '--ecl-language-arrow-position',
                            'calc(' + t + 'px - 0.5rem)'
                        ))
            }
            closeOverlay() {
                ;(this.languageListOverlay.hidden = !0),
                    this.languageListOverlay.removeAttribute('aria-modal'),
                    this.languageLink.setAttribute('aria-expanded', 'false')
            }
            toggleOverlay(e) {
                this.languageListOverlay &&
                    this.focusTrap &&
                    (e.preventDefault(),
                    this.languageListOverlay.hasAttribute('hidden')
                        ? (this.openOverlay(), this.focusTrap.activate())
                        : this.focusTrap.deactivate())
            }
            toggleSearch(e) {
                var t
                this.searchForm &&
                    (e.preventDefault(),
                    (t = 'true' === this.searchToggle.getAttribute('aria-expanded')),
                    this.loginToggle &&
                        'true' === this.loginToggle.getAttribute('aria-expanded') &&
                        this.toggleLogin(e),
                    this.searchToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.searchForm.classList.remove('ecl-site-header__search--active')
                        : this.searchForm.classList.add('ecl-site-header__search--active'))
            }
            toggleLogin(e) {
                var t
                this.loginBox &&
                    (e.preventDefault(),
                    (t = 'true' === this.loginToggle.getAttribute('aria-expanded')),
                    this.searchToggle &&
                        'true' === this.searchToggle.getAttribute('aria-expanded') &&
                        this.toggleSearch(e),
                    this.loginToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.loginBox.classList.remove('ecl-site-header__login-box--active')
                        : this.loginBox.classList.add('ecl-site-header__login-box--active'))
            }
            handleKeyboardGlobal(e) {
                var t
                this.languageLink &&
                    ((t = this.languageLink.getAttribute('aria-expanded')),
                    ('Escape' !== e.key && 'Esc' !== e.key) || ('true' === t && this.toggleOverlay(e)))
            }
            handleClickGlobal(e) {
                !this.languageLink ||
                    'true' !== this.languageLink.getAttribute('aria-expanded') ||
                    this.languageListOverlay.contains(e.target) ||
                    this.languageLink.contains(e.target) ||
                    this.toggleOverlay(e)
            }
        }),
        (e.SiteHeaderCore = class ve {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).SITE_HEADER_CORE) ? {} : t),
                    (t = new ve(e, t)).init(),
                    (e.ECLSiteHeaderCore = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).languageLinkSelector)
                            ? '[data-ecl-language-selector]'
                            : i,
                    s =
                        void 0 === (s = t.languageListOverlaySelector)
                            ? '[data-ecl-language-list-overlay]'
                            : s,
                    n = void 0 === (n = t.closeOverlaySelector) ? '[data-ecl-language-list-close]' : n,
                    l = void 0 === (l = t.searchToggleSelector) ? '[data-ecl-search-toggle]' : l,
                    a = void 0 === (a = t.searchFormSelector) ? '[data-ecl-search-form]' : a,
                    o = void 0 === (o = t.loginToggleSelector) ? '[data-ecl-login-toggle]' : o,
                    t = void 0 === (t = t.loginBoxSelector) ? '[data-ecl-login-box]' : t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.languageLinkSelector = i),
                    (this.languageListOverlaySelector = s),
                    (this.closeOverlaySelector = n),
                    (this.searchToggleSelector = l),
                    (this.searchFormSelector = a),
                    (this.loginToggleSelector = o),
                    (this.loginBoxSelector = t),
                    (this.languageSelector = null),
                    (this.languageListOverlay = null),
                    (this.close = null),
                    (this.focusTrap = null),
                    (this.searchToggle = null),
                    (this.searchForm = null),
                    (this.loginToggle = null),
                    (this.loginBox = null),
                    (this.openOverlay = this.openOverlay.bind(this)),
                    (this.closeOverlay = this.closeOverlay.bind(this)),
                    (this.toggleOverlay = this.toggleOverlay.bind(this)),
                    (this.toggleSearch = this.toggleSearch.bind(this)),
                    (this.toggleLogin = this.toggleLogin.bind(this))
            }
            init() {
                ;(this.languageSelector = h(this.languageLinkSelector)),
                    (this.languageListOverlay = h(this.languageListOverlaySelector)),
                    (this.close = h(this.closeOverlaySelector)),
                    (this.focusTrap = g(this.languageListOverlay, { onDeactivate: this.closeOverlay })),
                    this.languageSelector &&
                        this.languageSelector.addEventListener('click', this.toggleOverlay),
                    this.close && this.close.addEventListener('click', this.toggleOverlay),
                    (this.searchToggle = h(this.searchToggleSelector)),
                    (this.searchForm = h(this.searchFormSelector)),
                    this.searchToggle && this.searchToggle.addEventListener('click', this.toggleSearch),
                    (this.loginToggle = h(this.loginToggleSelector)),
                    (this.loginBox = h(this.loginBoxSelector)),
                    this.loginToggle && this.loginToggle.addEventListener('click', this.toggleLogin),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.languageSelector &&
                    this.languageSelector.removeEventListener('click', this.toggleOverlay),
                    this.focusTrap && this.focusTrap.deactivate(),
                    this.close && this.close.removeEventListener('click', this.toggleOverlay),
                    this.searchToggle && this.searchToggle.removeEventListener('click', this.toggleSearch),
                    this.loginToggle && this.loginToggle.removeEventListener('click', this.toggleLogin),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            openOverlay() {
                ;(this.languageListOverlay.hidden = !1),
                    this.languageListOverlay.setAttribute('aria-modal', 'true'),
                    this.languageSelector.setAttribute('aria-expanded', 'true')
            }
            closeOverlay() {
                ;(this.languageListOverlay.hidden = !0),
                    this.languageListOverlay.removeAttribute('aria-modal'),
                    this.languageSelector.setAttribute('aria-expanded', 'false')
            }
            toggleOverlay(e) {
                this.languageListOverlay &&
                    this.focusTrap &&
                    (e.preventDefault(),
                    this.languageListOverlay.hasAttribute('hidden')
                        ? (this.openOverlay(), this.focusTrap.activate())
                        : this.focusTrap.deactivate())
            }
            toggleSearch(e) {
                var t
                this.searchForm &&
                    (e.preventDefault(),
                    (t = 'true' === this.searchToggle.getAttribute('aria-expanded')),
                    this.loginToggle &&
                        'true' === this.loginToggle.getAttribute('aria-expanded') &&
                        this.toggleLogin(e),
                    this.searchToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.searchForm.classList.remove('ecl-site-header-core__search--active')
                        : this.searchForm.classList.add('ecl-site-header-core__search--active'))
            }
            toggleLogin(e) {
                var t
                this.loginBox &&
                    (e.preventDefault(),
                    (t = 'true' === this.loginToggle.getAttribute('aria-expanded')),
                    this.searchToggle &&
                        'true' === this.searchToggle.getAttribute('aria-expanded') &&
                        this.toggleSearch(e),
                    this.loginToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.loginBox.classList.remove('ecl-site-header-core__login-box--active')
                        : this.loginBox.classList.add('ecl-site-header-core__login-box--active'))
            }
        }),
        (e.SiteHeaderHarmonised = class me {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).SITE_HEADER_CORE) ? {} : t),
                    (t = new me(e, t)).init(),
                    (e.ECLSiteHeaderHarmonised = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).languageLinkSelector)
                            ? '[data-ecl-language-selector]'
                            : i,
                    s =
                        void 0 === (s = t.languageListOverlaySelector)
                            ? '[data-ecl-language-list-overlay]'
                            : s,
                    n = void 0 === (n = t.closeOverlaySelector) ? '[data-ecl-language-list-close]' : n,
                    l = void 0 === (l = t.searchToggleSelector) ? '[data-ecl-search-toggle]' : l,
                    a = void 0 === (a = t.searchFormSelector) ? '[data-ecl-search-form]' : a,
                    o = void 0 === (o = t.loginToggleSelector) ? '[data-ecl-login-toggle]' : o,
                    t = void 0 === (t = t.loginBoxSelector) ? '[data-ecl-login-box]' : t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.languageLinkSelector = i),
                    (this.languageListOverlaySelector = s),
                    (this.closeOverlaySelector = n),
                    (this.searchToggleSelector = l),
                    (this.searchFormSelector = a),
                    (this.loginToggleSelector = o),
                    (this.loginBoxSelector = t),
                    (this.languageSelector = null),
                    (this.languageListOverlay = null),
                    (this.close = null),
                    (this.focusTrap = null),
                    (this.searchToggle = null),
                    (this.searchForm = null),
                    (this.loginToggle = null),
                    (this.loginBox = null),
                    (this.openOverlay = this.openOverlay.bind(this)),
                    (this.closeOverlay = this.closeOverlay.bind(this)),
                    (this.toggleOverlay = this.toggleOverlay.bind(this)),
                    (this.toggleSearch = this.toggleSearch.bind(this)),
                    (this.toggleLogin = this.toggleLogin.bind(this))
            }
            init() {
                ;(this.languageSelector = h(this.languageLinkSelector)),
                    (this.languageListOverlay = h(this.languageListOverlaySelector)),
                    (this.close = h(this.closeOverlaySelector)),
                    (this.focusTrap = g(this.languageListOverlay, { onDeactivate: this.closeOverlay })),
                    this.languageSelector &&
                        this.languageSelector.addEventListener('click', this.toggleOverlay),
                    this.close && this.close.addEventListener('click', this.toggleOverlay),
                    (this.searchToggle = h(this.searchToggleSelector)),
                    (this.searchForm = h(this.searchFormSelector)),
                    this.searchToggle && this.searchToggle.addEventListener('click', this.toggleSearch),
                    (this.loginToggle = h(this.loginToggleSelector)),
                    (this.loginBox = h(this.loginBoxSelector)),
                    this.loginToggle && this.loginToggle.addEventListener('click', this.toggleLogin),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.languageSelector &&
                    this.languageSelector.removeEventListener('click', this.toggleOverlay),
                    this.focusTrap && this.focusTrap.deactivate(),
                    this.close && this.close.removeEventListener('click', this.toggleOverlay),
                    this.searchToggle && this.searchToggle.removeEventListener('click', this.toggleSearch),
                    this.loginToggle && this.loginToggle.removeEventListener('click', this.toggleLogin),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            openOverlay() {
                ;(this.languageListOverlay.hidden = !1),
                    this.languageListOverlay.setAttribute('aria-modal', 'true'),
                    this.languageSelector.setAttribute('aria-expanded', 'true')
            }
            closeOverlay() {
                ;(this.languageListOverlay.hidden = !0),
                    this.languageListOverlay.removeAttribute('aria-modal'),
                    this.languageSelector.setAttribute('aria-expanded', 'false')
            }
            toggleOverlay(e) {
                this.languageListOverlay &&
                    this.focusTrap &&
                    (e.preventDefault(),
                    this.languageListOverlay.hasAttribute('hidden')
                        ? (this.openOverlay(), this.focusTrap.activate())
                        : this.focusTrap.deactivate())
            }
            toggleSearch(e) {
                var t
                this.searchForm &&
                    (e.preventDefault(),
                    (t = 'true' === this.searchToggle.getAttribute('aria-expanded')),
                    this.loginToggle &&
                        'true' === this.loginToggle.getAttribute('aria-expanded') &&
                        this.toggleLogin(e),
                    this.searchToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.searchForm.classList.remove('ecl-site-header-harmonised__search--active')
                        : this.searchForm.classList.add('ecl-site-header-harmonised__search--active'))
            }
            toggleLogin(e) {
                var t
                this.loginBox &&
                    (e.preventDefault(),
                    (t = 'true' === this.loginToggle.getAttribute('aria-expanded')),
                    this.searchToggle &&
                        'true' === this.searchToggle.getAttribute('aria-expanded') &&
                        this.toggleSearch(e),
                    this.loginToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.loginBox.classList.remove('ecl-site-header-harmonised__login-box--active')
                        : this.loginBox.classList.add('ecl-site-header-harmonised__login-box--active'))
            }
        }),
        (e.SiteHeaderStandardised = class be {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).SITE_HEADER_CORE) ? {} : t),
                    (t = new be(e, t)).init(),
                    (e.ECLSiteHeaderStandardised = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).languageLinkSelector)
                            ? '[data-ecl-language-selector]'
                            : i,
                    s =
                        void 0 === (s = t.languageListOverlaySelector)
                            ? '[data-ecl-language-list-overlay]'
                            : s,
                    n = void 0 === (n = t.closeOverlaySelector) ? '[data-ecl-language-list-close]' : n,
                    l = void 0 === (l = t.searchToggleSelector) ? '[data-ecl-search-toggle]' : l,
                    a = void 0 === (a = t.searchFormSelector) ? '[data-ecl-search-form]' : a,
                    o = void 0 === (o = t.loginToggleSelector) ? '[data-ecl-login-toggle]' : o,
                    t = void 0 === (t = t.loginBoxSelector) ? '[data-ecl-login-box]' : t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.languageLinkSelector = i),
                    (this.languageListOverlaySelector = s),
                    (this.closeOverlaySelector = n),
                    (this.searchToggleSelector = l),
                    (this.searchFormSelector = a),
                    (this.loginToggleSelector = o),
                    (this.loginBoxSelector = t),
                    (this.languageSelector = null),
                    (this.languageListOverlay = null),
                    (this.close = null),
                    (this.focusTrap = null),
                    (this.searchToggle = null),
                    (this.searchForm = null),
                    (this.loginToggle = null),
                    (this.loginBox = null),
                    (this.openOverlay = this.openOverlay.bind(this)),
                    (this.closeOverlay = this.closeOverlay.bind(this)),
                    (this.toggleOverlay = this.toggleOverlay.bind(this)),
                    (this.toggleSearch = this.toggleSearch.bind(this)),
                    (this.toggleLogin = this.toggleLogin.bind(this))
            }
            init() {
                ;(this.languageSelector = h(this.languageLinkSelector)),
                    (this.languageListOverlay = h(this.languageListOverlaySelector)),
                    (this.close = h(this.closeOverlaySelector)),
                    (this.focusTrap = g(this.languageListOverlay, { onDeactivate: this.closeOverlay })),
                    this.languageSelector &&
                        this.languageSelector.addEventListener('click', this.toggleOverlay),
                    this.close && this.close.addEventListener('click', this.toggleOverlay),
                    (this.searchToggle = h(this.searchToggleSelector)),
                    (this.searchForm = h(this.searchFormSelector)),
                    this.searchToggle && this.searchToggle.addEventListener('click', this.toggleSearch),
                    (this.loginToggle = h(this.loginToggleSelector)),
                    (this.loginBox = h(this.loginBoxSelector)),
                    this.loginToggle && this.loginToggle.addEventListener('click', this.toggleLogin),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.languageSelector &&
                    this.languageSelector.removeEventListener('click', this.toggleOverlay),
                    this.focusTrap && this.focusTrap.deactivate(),
                    this.close && this.close.removeEventListener('click', this.toggleOverlay),
                    this.searchToggle && this.searchToggle.removeEventListener('click', this.toggleSearch),
                    this.loginToggle && this.loginToggle.removeEventListener('click', this.toggleLogin),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            openOverlay() {
                ;(this.languageListOverlay.hidden = !1),
                    this.languageListOverlay.setAttribute('aria-modal', 'true'),
                    this.languageSelector.setAttribute('aria-expanded', 'true')
            }
            closeOverlay() {
                ;(this.languageListOverlay.hidden = !0),
                    this.languageListOverlay.removeAttribute('aria-modal'),
                    this.languageSelector.setAttribute('aria-expanded', 'false')
            }
            toggleOverlay(e) {
                this.languageListOverlay &&
                    this.focusTrap &&
                    (e.preventDefault(),
                    this.languageListOverlay.hasAttribute('hidden')
                        ? (this.openOverlay(), this.focusTrap.activate())
                        : this.focusTrap.deactivate())
            }
            toggleSearch(e) {
                var t
                this.searchForm &&
                    (e.preventDefault(),
                    (t = 'true' === this.searchToggle.getAttribute('aria-expanded')),
                    this.loginToggle &&
                        'true' === this.loginToggle.getAttribute('aria-expanded') &&
                        this.toggleLogin(e),
                    this.searchToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.searchForm.classList.remove('ecl-site-header-standardised__search--active')
                        : this.searchForm.classList.add('ecl-site-header-standardised__search--active'))
            }
            toggleLogin(e) {
                var t
                this.loginBox &&
                    (e.preventDefault(),
                    (t = 'true' === this.loginToggle.getAttribute('aria-expanded')),
                    this.searchToggle &&
                        'true' === this.searchToggle.getAttribute('aria-expanded') &&
                        this.toggleSearch(e),
                    this.loginToggle.setAttribute('aria-expanded', t ? 'false' : 'true'),
                    t
                        ? this.loginBox.classList.remove('ecl-site-header-standardised__login-box--active')
                        : this.loginBox.classList.add('ecl-site-header-standardised__login-box--active'))
            }
        }),
        (e.Table = b),
        (e.Tabs = class fe {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).TABS) ? {} : t),
                    (t = new fe(e, t)).init(),
                    (e.ECLTabs = t)
                )
            }
            constructor(e, t) {
                var i = void 0 === (i = (t = void 0 === t ? {} : t).listSelector) ? '.ecl-tabs__list' : i,
                    s =
                        void 0 === (s = t.listItemsSelector)
                            ? '.ecl-tabs__item:not(.ecl-tabs__item--more)'
                            : s,
                    n = void 0 === (n = t.moreItemSelector) ? '.ecl-tabs__item--more' : n,
                    l = void 0 === (l = t.moreButtonSelector) ? '.ecl-tabs__toggle' : l,
                    a = void 0 === (a = t.moreLabelSelector) ? '.ecl-tabs__toggle .ecl-button__label' : a,
                    o = void 0 === (o = t.prevSelector) ? '.ecl-tabs__prev' : o,
                    r = void 0 === (r = t.nextSelector) ? '.ecl-tabs__next' : r,
                    h = void 0 === (h = t.attachClickListener) || h,
                    t = void 0 === (t = t.attachResizeListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.listSelector = i),
                    (this.listItemsSelector = s),
                    (this.moreItemSelector = n),
                    (this.moreButtonSelector = l),
                    (this.moreLabelSelector = a),
                    (this.prevSelector = o),
                    (this.nextSelector = r),
                    (this.attachClickListener = h),
                    (this.attachResizeListener = t),
                    (this.list = null),
                    (this.listItems = null),
                    (this.moreItem = null),
                    (this.moreButton = null),
                    (this.moreButtonActive = !1),
                    (this.moreLabel = null),
                    (this.moreLabelValue = null),
                    (this.dropdown = null),
                    (this.dropdownItems = null),
                    (this.allowShift = !0),
                    (this.buttonNextSize = 0),
                    (this.index = 0),
                    (this.total = 0),
                    (this.tabsKey = []),
                    (this.firstTab = null),
                    (this.lastTab = null),
                    (this.direction = 'ltr'),
                    (this.isMobile = !1),
                    (this.handleClickOnToggle = this.handleClickOnToggle.bind(this)),
                    (this.handleResize = this.handleResize.bind(this)),
                    (this.closeMoreDropdown = this.closeMoreDropdown.bind(this)),
                    (this.shiftTabs = this.shiftTabs.bind(this)),
                    (this.handleKeyboardOnTabs = this.handleKeyboardOnTabs.bind(this)),
                    (this.moveFocus = this.moveFocus.bind(this)),
                    (this.arrowFocusToTab = this.arrowFocusToTab.bind(this)),
                    (this.tabsKeyEvents = this.tabsKeyEvents.bind(this))
            }
            init() {
                ;(this.list = h(this.listSelector, this.element)),
                    (this.listItems = r(this.listItemsSelector, this.element)),
                    (this.moreItem = h(this.moreItemSelector, this.element)),
                    (this.moreButton = h(this.moreButtonSelector, this.element)),
                    (this.moreLabel = h(this.moreLabelSelector, this.element)),
                    (this.moreLabelValue = this.moreLabel.innerText),
                    (this.btnPrev = h(this.prevSelector, this.element)),
                    (this.btnNext = h(this.nextSelector, this.element)),
                    (this.total = this.listItems.length),
                    this.moreButton &&
                        ((this.dropdown = document.createElement('ul')),
                        this.dropdown.classList.add('ecl-tabs__dropdown'),
                        this.listItems.forEach((e) => {
                            this.dropdown.appendChild(e.cloneNode(!0))
                        }),
                        this.moreItem.appendChild(this.dropdown),
                        (this.dropdownItems = r('.ecl-tabs__dropdown .ecl-tabs__item', this.element))),
                    this.btnNext && (this.buttonNextSize = this.btnNext.getBoundingClientRect().width),
                    this.handleResize(),
                    this.attachClickListener &&
                        this.moreButton &&
                        this.moreButton.addEventListener('click', this.handleClickOnToggle),
                    this.attachClickListener &&
                        document &&
                        this.moreButton &&
                        document.addEventListener('click', this.closeMoreDropdown),
                    this.attachClickListener &&
                        this.btnNext &&
                        this.btnNext.addEventListener('click', this.shiftTabs.bind(this, 'next', !0)),
                    this.attachClickListener &&
                        this.btnPrev &&
                        this.btnPrev.addEventListener('click', this.shiftTabs.bind(this, 'prev', !0)),
                    this.attachResizeListener && window.addEventListener('resize', this.handleResize),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.dropdown && this.dropdown.remove(),
                    this.moreButton &&
                        ((this.moreLabel.textContent = this.moreLabelValue),
                        this.moreButton.replaceWith(this.moreButton.cloneNode(!0))),
                    this.btnNext && this.btnNext.replaceWith(this.btnNext.cloneNode(!0)),
                    this.btnPrev && this.btnPrev.replaceWith(this.btnPrev.cloneNode(!0)),
                    this.attachClickListener &&
                        document &&
                        this.moreButton &&
                        document.removeEventListener('click', this.closeMoreDropdown),
                    this.attachResizeListener && window.removeEventListener('resize', this.handleResize),
                    this.tabsKey &&
                        this.tabsKey.forEach((e) => {
                            e.addEventListener('keydown', this.handleKeyboardOnTabs)
                        }),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            shiftTabs(e) {
                ;(this.index = 'next' === e ? this.index + 1 : this.index - 1),
                    (this.btnPrev.style.display = 1 <= this.index ? 'block' : 'none'),
                    (this.btnNext.style.display = this.index >= this.total - 1 ? 'none' : 'block')
                var e = 0 === this.index ? 0 : this.btnPrev.getBoundingClientRect().width + 13,
                    t = 0
                ;(this.direction = getComputedStyle(this.element).direction),
                    (t =
                        'rtl' === this.direction
                            ? Math.ceil(
                                  this.list.offsetWidth -
                                      this.listItems[this.index].offsetLeft -
                                      this.listItems[this.index].offsetWidth -
                                      e
                              )
                            : Math.ceil(this.listItems[this.index].offsetLeft - e)),
                    (e = Math.ceil(
                        this.list.getBoundingClientRect().width - this.element.getBoundingClientRect().width
                    )) < t && ((this.btnNext.style.display = 'none'), (t = e)),
                    (this.list.style.transitionDuration = '0.4s'),
                    'rtl' === this.direction
                        ? (this.list.style.transform = 'translate3d(' + t + 'px, 0px, 0px)')
                        : (this.list.style.transform = 'translate3d(-' + t + 'px, 0px, 0px)')
            }
            handleClickOnToggle() {
                this.dropdown.classList.toggle('ecl-tabs__dropdown--show'),
                    this.moreButton.setAttribute(
                        'aria-expanded',
                        this.dropdown.classList.contains('ecl-tabs__dropdown--show')
                    )
            }
            handleResize() {
                var t, i, s, n
                'none' === window.getComputedStyle(this.moreButton).display && this.closeMoreDropdown(this),
                    (this.list.style.transform = 'translate3d(0px, 0px, 0px)'),
                    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) <= 480
                        ? ((this.isMobile = !0),
                          (this.index = 1),
                          (this.list.style.transitionDuration = '0.4s'),
                          this.shiftTabs(this.index),
                          this.moreItem && this.moreItem.setAttribute('aria-hidden', 'true'),
                          (t = 0),
                          this.listItems.forEach((e) => {
                              e.setAttribute('aria-hidden', 'false'),
                                  (t += Math.ceil(e.getBoundingClientRect().width))
                          }),
                          (this.list.style.width = t + 'px'),
                          (this.btnNext.style.display = 'block'),
                          (this.btnPrev.style.display = 'none'))
                        : ((this.isMobile = !1),
                          (this.btnNext.style.display = 'none'),
                          (this.btnPrev.style.display = 'none'),
                          (this.list.style.width = 'auto'),
                          (i = this.moreButton.getBoundingClientRect().width + 25),
                          (s = []),
                          (n = this.list.getBoundingClientRect().width),
                          (this.moreButtonActive = !1),
                          this.listItems.forEach((e, t) => {
                              e.setAttribute('aria-hidden', 'false'),
                                  n >= i + e.getBoundingClientRect().width && !s.includes(t - 1)
                                      ? (i += e.getBoundingClientRect().width)
                                      : (e.setAttribute('aria-hidden', 'true'),
                                        e.childNodes[0].classList.contains('ecl-tabs__link--active') &&
                                            (this.moreButtonActive = !0),
                                        s.push(t))
                          }),
                          this.moreButtonActive
                              ? this.moreButton.classList.add('ecl-tabs__toggle--active')
                              : this.moreButton.classList.remove('ecl-tabs__toggle--active'),
                          s.length
                              ? (this.moreItem.setAttribute('aria-hidden', 'false'),
                                (this.moreLabel.textContent = this.moreLabelValue.replace('%d', s.length)),
                                this.dropdownItems.forEach((e, t) => {
                                    s.includes(t)
                                        ? e.setAttribute('aria-hidden', 'false')
                                        : e.setAttribute('aria-hidden', 'true')
                                }))
                              : this.moreItem.setAttribute('aria-hidden', 'true')),
                    this.tabsKeyEvents()
            }
            tabsKeyEvents() {
                ;(this.tabsKey = []),
                    this.listItems.forEach((e, t, i) => {
                        var s = null
                        'false' !== e.getAttribute('aria-hidden') && (e = this.dropdownItems[t]),
                            (s = h('.ecl-tabs__link', e)).addEventListener(
                                'keydown',
                                this.handleKeyboardOnTabs
                            ),
                            this.tabsKey.push(s),
                            0 === t && (this.firstTab = s),
                            t === i.length - 1 && (this.lastTab = s)
                    })
            }
            closeMoreDropdown(e) {
                for (var t = e.target; t; ) {
                    if (t === this.moreButton) return
                    t = t.parentNode
                }
                this.moreButton.setAttribute('aria-expanded', !1),
                    this.dropdown.classList.remove('ecl-tabs__dropdown--show')
            }
            handleKeyboardOnTabs(e) {
                var t = e.currentTarget
                switch (e.key) {
                    case 'ArrowLeft':
                        this.arrowFocusToTab(t, 'prev')
                        break
                    case 'ArrowRight':
                        this.arrowFocusToTab(t, 'next')
                        break
                    case 'Home':
                        this.moveFocus(this.firstTab)
                        break
                    case 'End':
                        this.moveFocus(this.lastTab)
                }
            }
            moveFocus(e) {
                e.closest('.ecl-tabs__dropdown')
                    ? (this.moreButton.setAttribute('aria-expanded', !0),
                      this.dropdown.classList.add('ecl-tabs__dropdown--show'))
                    : (this.moreButton.setAttribute('aria-expanded', !1),
                      this.dropdown.classList.remove('ecl-tabs__dropdown--show')),
                    e.focus()
            }
            arrowFocusToTab(e, t) {
                var i = this.tabsKey.indexOf(e),
                    i = 'next' === t ? i + 1 : i - 1,
                    s = 'next' === t ? this.firstTab : this.lastTab,
                    n = 'next' === t ? this.lastTab : this.firstTab
                this.isMobile
                    ? e !== n && (this.moveFocus(this.tabsKey[i]), this.shiftTabs(t))
                    : e === n
                    ? this.moveFocus(s)
                    : this.moveFocus(this.tabsKey[i])
            }
        }),
        (e.Timeline = class ye {
            static autoInit(e, t) {
                return (
                    (t = void 0 === (t = (void 0 === t ? {} : t).TIMELINE) ? {} : t),
                    (t = new ye(e, t)).init(),
                    (e.ECLTimeline = t)
                )
            }
            constructor(e, t) {
                var i =
                        void 0 === (i = (t = void 0 === t ? {} : t).buttonSelector)
                            ? '[data-ecl-timeline-button]'
                            : i,
                    s = void 0 === (s = t.labelSelector) ? '[data-ecl-label]' : s,
                    n = void 0 === (n = t.labelExpanded) ? 'data-ecl-label-expanded' : n,
                    l = void 0 === (l = t.labelCollapsed) ? 'data-ecl-label-collapsed' : l,
                    t = void 0 === (t = t.attachClickListener) || t
                if (!e || e.nodeType !== Node.ELEMENT_NODE)
                    throw new TypeError('DOM element should be given to initialize this widget.')
                ;(this.element = e),
                    (this.buttonSelector = i),
                    (this.labelSelector = s),
                    (this.labelExpanded = n),
                    (this.labelCollapsed = l),
                    (this.attachClickListener = t),
                    (this.button = null),
                    (this.label = null),
                    (this.handleClickOnButton = this.handleClickOnButton.bind(this))
            }
            init() {
                ;(this.button = h(this.buttonSelector, this.element)),
                    (this.label = h(this.labelSelector, this.element)),
                    this.attachClickListener &&
                        this.button &&
                        this.button.addEventListener('click', this.handleClickOnButton),
                    this.element.setAttribute('data-ecl-auto-initialized', 'true')
            }
            destroy() {
                this.attachClickListener &&
                    this.button &&
                    this.button.removeEventListener('click', this.handleClickOnButton),
                    this.element && this.element.removeAttribute('data-ecl-auto-initialized')
            }
            handleClickOnButton() {
                var e = 'true' === this.button.getAttribute('aria-expanded')
                return (
                    this.button.setAttribute('aria-expanded', e ? 'false' : 'true'),
                    e
                        ? (this.element.removeAttribute('data-ecl-timeline-expanded'),
                          this.button.blur(),
                          this.button.focus())
                        : this.element.setAttribute('data-ecl-timeline-expanded', 'true'),
                    this.label && !e && this.button.hasAttribute(this.labelExpanded)
                        ? (this.label.innerHTML = this.button.getAttribute(this.labelExpanded))
                        : this.label &&
                          e &&
                          this.button.hasAttribute(this.labelCollapsed) &&
                          (this.label.innerHTML = this.button.getAttribute(this.labelCollapsed)),
                    this
                )
            }
        }),
        (e.autoInit = function (e) {
            var e = void 0 === e ? {} : e,
                t = e.root,
                t = void 0 === t ? document : t,
                s = (function (e, t) {
                    if (null == e) return {}
                    for (var i, s = {}, n = Object.keys(e), l = 0; l < n.length; l++)
                        (i = n[l]), 0 <= t.indexOf(i) || (s[i] = e[i])
                    return s
                })(e, F)
            if (!ECL) throw new TypeError('Called autoInit but ECL is not present')
            var n = [],
                i = (ECL.components || (ECL.components = []), r('[data-ecl-auto-init]', t)),
                l = () => {
                    i.filter((e) => 'true' !== e.getAttribute('data-ecl-auto-initialized')).forEach((e) => {
                        var t = e.getAttribute('data-ecl-auto-init')
                        if (!t) throw new TypeError('(ecl-auto-init) ' + t + ' data-ecl-auto-init is empty')
                        var i = ECL[t]
                        if ('function' != typeof i)
                            throw new TypeError("(ecl-auto-init) Could not find '" + t + "'")
                        if ('function' != typeof i.autoInit)
                            throw new TypeError("(ecl-auto-init) Could not find autoInit for '" + t + "'")
                        t = i.autoInit(e, s)
                        ECL.components.push(t), n.push(t)
                    })
                }
            return (
                l(),
                {
                    update: () => l(),
                    destroy: () => {
                        if (ECL.components)
                            for (var e = ECL.components.length - 1; 0 <= e; --e)
                                ECL.components[e].destroy &&
                                    (ECL.components[e].destroy(), ECL.components.splice(e, 1))
                    },
                    components: n,
                }
            )
        }),
        Object.defineProperty(e, '__esModule', { value: !0 }),
        e
    )
})({}, moment)
