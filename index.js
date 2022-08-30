const express = require('express');
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = 'bfa495456f72aefae42e71f6ef2b020b'
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json()); //this returns middleware that parses only json

//creating routes
app.get('/', (req, res) => {
    res.send('Welcome nibba69')
})


//Get product details
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`)

        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)

    }
})

//Get product reviews
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`)

        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)

    }
})



//Get search results
app.get('/search/:searchQuery', async(req, res) => {
    const { searchQuery } = req.params
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`)

        res.json(JSON.parse(response))

    } catch (error) {
        res.json(error)

    }
})
app.listen(PORT, () => console.log(`Server running on por ${PORT}`))