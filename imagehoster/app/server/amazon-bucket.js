
import AWS from 'aws-sdk'
import config from 'config'

export const s3 = new AWS.S3()

export function s3call(method, params) {
    return new Promise((resolve, reject) => {
        s3[method](params, function(err, data) {
            if(err && (err.code === 'NotFound' || err.code === 'NoSuchKey')) {
                resolve(null)
            } else if (err) {
                console.error(method, params, err)
                reject(err)
            }
            else resolve(data);
        });
    })
}

/**
    @arg {string} what = objectExists, ..
    @arg {object} params = {Bucket, Key}
*/
export function waitFor(method, params/*, responseHeaders*/) {
    return new Promise((resolve, reject) => {
        s3.waitFor(method, params, function(err, data) {
            if (err) {
                console.error(err)
                reject(err)
            }
            else resolve(data);
        });
    })
}

const bucketUrls = {}
for (const t of ['upload', 'web', 'thumbnail']) {
    const bucket = config[`${ t }Bucket`]
    let url = config[`${ t }Url`]
    if (url) {
        if (url.slice(-1) !== '/') {
            url += '/'
        }
        bucketUrls[bucket] = url
    }
}

export function getObjectUrl({Key, Bucket}) {
    const url = bucketUrls[Bucket] || `https://${ Bucket }.s3.amazonaws.com/`
    return url + Key
}
