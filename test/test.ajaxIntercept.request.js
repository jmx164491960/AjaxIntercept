/* global console, require, chai, describe, before, it */
// 数据占位符定义（Data Placeholder Definition，DPD）
var expect = chai.expect
var AjaxIntercept, $, _

describe('Request', function() {
    before(function(done) {
        require(['ajaxIntercept', 'underscore', 'jquery'], function() {
            AjaxIntercept = arguments[0]
            _ = arguments[1]
            $ = arguments[2]
            expect(AjaxIntercept).to.not.equal(undefined)
            expect(_).to.not.equal(undefined)
            expect($).to.not.equal(undefined)
            done()
        })
    })

    function stringify(json) {
        return JSON.stringify(json /*, null, 4*/ )
    }

    describe('jQuery.ajax()', function() {
        it('', function(done) {
            var that = this
            var url = Math.random()
            $.ajax({
                url: url,
                dataType: 'json'
            }).done(function( /*data, textStatus, jqXHR*/ ) {
                // 不会进入
            }).fail(function(jqXHR /*, textStatus, errorThrown*/ ) {
                // 浏览器 || PhantomJS
                expect([404, 0]).to.include(jqXHR.status)
                that.test.title += url + ' => ' + jqXHR.status
            }).always(function() {
                done()
            })
        })
    })
    describe('jQuery.getScript()', function() {
        it('', function(done) {
            var that = this
            var url = './materiels/noop.js'
            $.getScript(url, function(script, textStatus, jqXHR) {
                expect(script).to.be.ok
                that.test.title += url + ' => ' + jqXHR.status + ' ' + textStatus
                done()
            })
        })
    })
    describe('jQuery.load()', function() {
        it('', function(done) {
            var that = this
            var url = './materiels/noop.html'
            $('<div>').load(url, function(responseText /*, textStatus, jqXHR*/ ) {
                expect(responseText).to.be.ok
                that.test.title += url + ' => ' + responseText
                done()
            })
        })
    })
    describe('jQuery.ajax() XHR Fields', function() {
        it('', function(done) {
            var that = this
            var url = Math.random()
            var xhr
            $.ajax({
                xhr: function() {
                    xhr = $.ajaxSettings.xhr()
                    return xhr
                },
                url: url,
                dataType: 'json',
                xhrFields: {
                    timeout: 123,
                    withCredentials: true
                }
            }).done(function( /*data, textStatus, jqXHR*/ ) {
                // 不会进入
            }).fail(function(jqXHR /*, textStatus, errorThrown*/ ) {
                // 浏览器 || PhantomJS
                expect([404, 0]).to.include(jqXHR.status)
                that.test.title += url + ' => ' + jqXHR.status
                expect(xhr.timeout).to.be.equal(123)
                expect(xhr.withCredentials).to.be.equal(true)
            }).always(function() {
                done()
            })
        })
    })

    describe('AjaxIntercept.add( rurl, rtype, function(options) )', function() {
        it('', function(done) {
            var that = this
            var url = 'rurl_rtype_function.json'
            var count = 0

            AjaxIntercept.add(/rurl_rtype_function\.json/, /get/, function(options) {
                expect(options).to.not.equal(undefined)
                expect(options.url).to.be.equal(url)
                expect(options.type).to.be.equal('GET')
                expect(options.body).to.be.equal(null)
                return {
                    type: 'get'
                }
            })
            AjaxIntercept.add(/rurl_rtype_function\.json/, /post|put/, function(options) {
                expect(options).to.not.equal(undefined)
                expect(options.url).to.be.equal(url)
                expect(['POST', 'PUT']).to.include(options.type)
                expect(options.body).to.be.equal(null)
                return {
                    type: options.type.toLowerCase()
                }
            })

            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json'
            }).done(function(data /*, status, jqXHR*/ ) {
                that.test.title += 'GET ' + url + ' => ' + stringify(data)
                expect(data).to.have.property('type', 'get')
            }).done(success).always(complete)

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json'
            }).done(function(data /*, status, jqXHR*/ ) {
                that.test.title += 'POST ' + url + ' => ' + stringify(data)
                expect(data).to.have.property('type', 'post')
            }).done(success).always(complete)

            $.ajax({
                url: url,
                type: 'put',
                dataType: 'json'
            }).done(function(data /*, status, jqXHR*/ ) {
                that.test.title += 'PUT ' + url + ' => ' + stringify(data)
                expect(data).to.have.property('type', 'put')
            }).done(success).always(complete)


            function success( /*data*/ ) {
                count++
            }

            function complete() {
                if (count === 3) done()
            }

        })
    })
    describe('AjaxIntercept.add( rurl, rtype, function(options) ) + data', function() {
        it('', function(done) {
            var that = this
            var url = 'rurl_rtype_function.json'
            var count = 0

            AjaxIntercept.add(/rurl_rtype_function\.json/, /get/, function(options) {
                expect(options).to.not.equal(undefined)
                expect(options.url).to.be.equal(url + '?foo=1')
                expect(options.type).to.be.equal('GET')
                expect(options.body).to.be.equal(null)
                return {
                    type: 'get'
                }
            })
            AjaxIntercept.add(/rurl_rtype_function\.json/, /post|put/, function(options) {
                expect(options).to.not.equal(undefined)
                expect(options.url).to.be.equal(url)
                expect(['POST', 'PUT']).to.include(options.type)
                expect(options.body).to.be.equal('foo=1')
                return {
                    type: options.type.toLowerCase()
                }
            })

            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function(data /*, status, jqXHR*/ ) {
                that.test.title += 'GET ' + url + ' => ' + stringify(data)
                expect(data).to.have.property('type', 'get')
            }).done(success).always(complete)

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function(data /*, status, jqXHR*/ ) {
                that.test.title += 'POST ' + url + ' => ' + stringify(data)
                expect(data).to.have.property('type', 'post')
            }).done(success).always(complete)

            $.ajax({
                url: url,
                type: 'put',
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function(data /*, status, jqXHR*/ ) {
                that.test.title += 'PUT ' + url + ' => ' + stringify(data)
                expect(data).to.have.property('type', 'put')
            }).done(success).always(complete)


            function success( /*data*/ ) {
                count++
            }

            function complete() {
                if (count === 3) done()
            }

        })
    })
})