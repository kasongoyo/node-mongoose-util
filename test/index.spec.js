'use strict';

const path = require('path');
const lib = require(path.join(__dirname, '..', 'lib'));
const expect = require('chai').expect;



describe('Test Lib', function () {


    describe('Parse Query', function () {
        it('should return empty object when query is not provided', function () {
            const parsed = lib.parseQuery();
            expect(parsed).to.be.empty;
        });


        it('should parse query successfully', function () {
            const rawQuery = {
                name: 'anonymous',
                select: 'name,age,gender',
                sort: 'age',
                page: 1,
                limit: 10
            }
            const parsed = lib.parseQuery(rawQuery);
            const {query, select, sort, page, limit} = parsed;
            expect(query).to.eql({name: 'anonymous'});
            expect(select).to.equal('name age gender');
            expect(sort).to.equal('age');
            expect(page).to.equal(1);
            expect(limit).to.equal(10);
        });

        it('should parse query with id', function () {
            const rawQuery = {
                id: '3'
            }
            const parsed = lib.parseQuery(rawQuery);
            const {query} = parsed;
            expect(query).to.eql({_id: '3'});
        });

        it('should parse query successfully', function () {
            const rawQuery = {
                name: 'anonymous',
                select: 'name,age,gender',
                sort: 'age',
                page: 1,
                limit: 10
            }
            const parsed = lib.parseQuery(rawQuery);
            const {query, select, sort, page, limit} = parsed;
            expect(query).to.eql({name: 'anonymous'});
            expect(select).to.equal('name age gender');
            expect(sort).to.equal('age');
            expect(page).to.equal(1);
            expect(limit).to.equal(10);
        });
    });
});