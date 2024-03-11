

const {
   PROD_URI
} = process.env

console.log('Running in prod mode')

export default {
    URI: PROD_URI
}