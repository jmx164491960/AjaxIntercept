/* global require, chai, describe, before, it */
// 数据占位符定义（Data Placeholder Definition，DPD）
var expect = chai.expect
var AjaxIntercept, $, _

describe('AjaxIntercept.add', function() {
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

    describe('AjaxIntercept.add( String )', function() {
        it('@EMAIL', function() {
            var data = AjaxIntercept.add(this.test.title)
            expect(data).to.not.equal(this.test.title)
            this.test.title += ' => ' + data
        })
    })
})