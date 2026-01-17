import { NextResponse } from "next/server";

export async function POST(request) {
  const { productId } = await request.json();

  try {
    // Mock product data (In real applications, fetch this from a database)
    const product = {
      id: productId,
      price: 5000, // Price in cents
      title: "Premium Digital Product",
      downloadLink: "https://example.com/download/digital-product",
    };

    // Mock payment handling logic (Replace with actual payment gateway integration)
    const paymentSuccessful = true;

    if (paymentSuccessful) {
      return NextResponse.json({
        success: true,
        redirectUrl: `/success?downloadLink=${encodeURIComponent(
          product.downloadLink
        )}`,
      });
    }

    return NextResponse.json({ success: false, message: "Payment failed." });
  } catch (error) {
    console.error("Error processing purchase:", error);
    return NextResponse.json({ success: false, message: "Server error." });
  }
}
