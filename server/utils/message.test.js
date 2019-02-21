const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = "Luke Skywalker";
        let text = "That's not true.  That's impossible!";
        let message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        let from = "Darth Vader";
        let latitude = 42.42;
        let longitude = 13.37;
        let location = generateLocationMessage(from, latitude, longitude);
        expect(location.from).toBe(from);
        expect(location.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(typeof location.createdAt).toBe('number');
    });
})