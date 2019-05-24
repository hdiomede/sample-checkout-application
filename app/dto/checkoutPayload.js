const moment = require('moment');

const PAY_CHECKOUT = require('../config/payCheckout');

function genDate(forwardsDay) {
    if(!forwardsDay) {
        return null;
    }

    return moment().add(forwardsDay, 'days').format("YYYY-MM-DD");

}

module.exports = (amount, foreign_amount, description, consumer) => {
    return {
        checkout: PAY_CHECKOUT.checkout,
        confirm: PAY_CHECKOUT.confirm,
        installments: PAY_CHECKOUT.installments,
        due_date: genDate(PAY_CHECKOUT.due_date_rule),
        soft_descriptor: PAY_CHECKOUT.soft_descriptor,

        amount: parseFloat(amount).toFixed(2),
        foreign_amount: parseFloat(foreign_amount).toFixed(2),
        cart: [
            {
                description: description,
                quantity: PAY_CHECKOUT.quantity,
                unit_price: amount
            }
        ],
        consumer: consumer,
        billing: {
            national_id: consumer.national_id,
            name: consumer.full_name
        },

        redirect_url: process.env.CHECKOUT_REDIRECT_URL
    }
}