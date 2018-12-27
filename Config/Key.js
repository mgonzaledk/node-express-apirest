module.exports = {
    private_keyphrase: process.env.NODE_ENV === 'production' ?
        process.env.SECRET :
        'testkey'
}
