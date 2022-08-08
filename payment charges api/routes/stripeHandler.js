const Stripe_Key='sk_test_tR3PYbcVNZZ796tH88S4VQ2u';
const stripe=require("stripe")(Stripe_Key);

module.exports.createNewCustomers = async(req,res,next)=>{
    console.log(req.body);
    try{
        const Customer=await stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
        });
        res.status(200).send(Customer);
    }catch(error){
        throw new Error(error);
    }
}
module.exports.addNewCard=async(req,res,next)=>{
    const {
        customer_Id,
        card_Name,
        card_ExpYear,
        card_ExpMonth,
        card_Number,
        card_CVC,
    } =req.body;

    try{
        const card_Token=await stripe.tokens.create({
            card: {
                name: card_Name,
                number: card_Number,
                exp_month: card_ExpMonth,
                exp_year: card_ExpYear,
                CVC: card_CVC,

            },
        });
        const card= await stripe.Customers.createSource(customer_Id,{
            source: `${card_Token.id}`,
        });
        return res.status(200).send({card: card.id});
    } catch(error){
        throw new Error(error);
    }
}

module.exports.createChanges = async(req,res,next) =>{
    try{
        const createCharge = await stripe.Charges.create({
            recipt_email: 'sandeep@gmail.com',
            amount: 500*100,
            currency: "inr",
            card: req.body.card_Id,
            customer: req.body.customer_Id,
        });
        res.send(createCharge);
    } catch(error){
        throw new Error(error);
    }
}