import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { productId } = req.body;

    try {
      // Mock product data (In real case, fetch this from your database)
      const product = {
        id: productId,
        price: 1000, // Price in cents
        title: "Digital Product",
        downloadLink: "https://example.com/download/digital-product",
      };

      // Create a payment session (use Stripe or any payment gateway)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.title,
              },
              unit_amount: product.price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${
          req.headers.origin
        }/success?downloadLink=${encodeURIComponent(product.downloadLink)}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ success: true, checkoutUrl: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
