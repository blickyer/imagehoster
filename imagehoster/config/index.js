const toBoolean = s => s == null || s.trim() === '' ? false : JSON.parse(s)

const {NODE_ENV = 'dev'} = process.env
const dev = NODE_ENV === 'dev'

const config = {
    ws_connection_server: process.env.STEEMIT_UPLOAD_STEEMD_WEBSOCKET || 'wss://steemd-int.steemit.com',
    // When protocol === 'https' a default port url is used (ignores STEEMIT_UPLOAD_HTTP_PORT)
    protocol: process.env.STEEMIT_UPLOAD_HTTP_PROTOCOL || 'https',
    host: process.env.STEEMIT_UPLOAD_HTTP_HOST || (dev ? 'steemitdevimages.com' : 'steemitimages.com'),
    port: process.env.STEEMIT_UPLOAD_HTTP_PORT || 3234,
    tarantool: {
        host: process.env.STEEMIT_TARANTOOL_HOST || 'localhost',
        port: process.env.STEEMIT_TARANTOOL_PORT || 3301,
        username: process.env.STEEMIT_TARANTOOL_USERNAME || 'guest',
        password: process.env.STEEMIT_TARANTOOL_PASSWORD || '',
    },
    testKey: toBoolean(process.env.STEEMIT_UPLOAD_TEST_KEY),
    uploadIpLimit: {
        minRep: parseFloat(process.env.STEEMIT_UPLOAD_MIN_REP || 10),
    },

    uploadBucket: process.env.STEEMIT_IMAGEPROXY_BUCKET_UPLOAD || 'steemit-dev-imageproxy-upload',
    webBucket: process.env.STEEMIT_IMAGEPROXY_BUCKET_WEB || 'steemit-dev-imageproxy-web',
    thumbnailBucket: process.env.STEEMIT_IMAGEPROXY_BUCKET_THUMBNAIL || 'steemit-dev-imageproxy-thumbnail',
    uploadUrl: process.env.STEEMIT_IMAGEPROXY_URL_UPLOAD,
    webUrl: process.env.STEEMIT_IMAGEPROXY_URL_WEB,
    thumbnailUrl: process.env.STEEMIT_IMAGEPROXY_URL_THUMBNAIL,
}

if(config.testKey) {
    if(process.env.NODE_ENV === 'production') {
        throw new Error('ERROR test key provided, do not use in production.');
    }
    console.log('WARNING test key provided, do not use in production.');
}

export default config
