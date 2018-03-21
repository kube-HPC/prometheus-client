const { expect } = require('chai');
const prometheusClient = require('../index');


describe('prometheus-client', () => {
    before((done) => {
        prometheusClient.init({ endpoint: {} });
        done();
    });
    describe('query', () => {
        it('query for algorithm run time', (done) => {
            prometheusClient.query({ query: 'histogram_quantile(0.5, sum(rate(algorithm_net_histogram_bucket[2m])) by (algorithmName, le))/1000', time: 1521625158.729 }).then((res) => {
                expect(res).to.be.an('sucess');
                done();
            });
        });
    });
    describe('query_range', (done) => {
        it('query for algorithm run time between dates', async () => {
            prometheusClient.range({
                query: 'histogram_quantile(0.5, sum(rate(algorithm_net_histogram_bucket[2m])) by (algorithmName, le))/1000', start: 1521587616.42, end: 1521630816.42, step: 172
            }).then((res) => {
                expect(res).to.be.an('sucess');
                done();
            });
        });
    });
});
