'use strict'

// Import Topping Model
const Topping = use('App/Models/Topping')

class ToppingController {
    async store({ request, response }) {
        try {
            const data = request.only(['topping'])
            const topping = await Topping.create(data)
            return response
                .status(200)
                .send({ success: { message: 'Topping Added' } })
        } catch (err) {
            return response
                .status(err.status)
                .send(err)
        }
    }

    async index({ params }) {
        const toppingId = params.id
        const topping = await Topping.query()
            .where('id', toppingId)
            .fetch()
        return topping
    }

    async get({ request, response }) {

        try {
            const topping = await Topping.query().fetch()
            return topping
        } catch (error) {
            return response
                .status(err.status)
                .send(err)
        }
    }

    async update({ params, request, response }) {

        try {
            const data = request.only(['topping'])
            const topping = await Topping.findOrFail(params.id) // looking for topping
            topping.merge(data)
            await topping.save()
            return response
                .status(200)
                .send({ success: { message: 'Topping Updated' } })

        } catch (error) {
            return response
                .status(err.status)
                .send(err)
        }

    }

    async destroy({ params, response }) {

        try {
            const topping = await Topping.findOrFail(params.id)
            await topping.delete()
            return response
                .status(200)
                .send({ success: { message: 'Topping deleted' } })
        } catch (error) {
            return response
                .status(err.status)
                .send(err)
        }

    }
}

module.exports = ToppingController
