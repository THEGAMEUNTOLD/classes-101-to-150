import React from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart?.items || []);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price.amount * (item.quantity || 1),
        0
    );

    return (
        <div className="min-h-screen bg-[#fbf9f6] px-8 lg:px-16 py-12">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-4xl font-light tracking-wide">
                    CHECKOUT
                </h1>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

                {/* ─── LEFT: FORM ─── */}
                <div className="space-y-8">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-lg mb-4">Contact Information</h2>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full border p-3 mb-4 bg-transparent outline-none"
                        />
                    </div>

                    {/* Shipping Address */}
                    <div>
                        <h2 className="text-lg mb-4">Shipping Address</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <input placeholder="First name" className="border p-3 bg-transparent" />
                            <input placeholder="Last name" className="border p-3 bg-transparent" />
                        </div>

                        <input placeholder="Address" className="border p-3 w-full mt-4 bg-transparent" />
                        <input placeholder="City" className="border p-3 w-full mt-4 bg-transparent" />

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <input placeholder="State" className="border p-3 bg-transparent" />
                            <input placeholder="ZIP Code" className="border p-3 bg-transparent" />
                        </div>

                        <input placeholder="Phone" className="border p-3 w-full mt-4 bg-transparent" />
                    </div>

                    {/* Payment */}
                    <div>
                        <h2 className="text-lg mb-4">Payment</h2>

                        <input placeholder="Card Number" className="border p-3 w-full mb-4 bg-transparent" />

                        <div className="grid grid-cols-2 gap-4">
                            <input placeholder="MM/YY" className="border p-3 bg-transparent" />
                            <input placeholder="CVC" className="border p-3 bg-transparent" />
                        </div>
                    </div>
                </div>

                {/* ─── RIGHT: ORDER SUMMARY ─── */}
                <div className="border p-6 bg-white h-fit">

                    <h2 className="text-lg mb-6 tracking-wide">
                        ORDER SUMMARY
                    </h2>

                    {/* Products */}
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">

                                {/* Image */}
                                <div className="w-16 h-20 bg-gray-100 overflow-hidden">
                                    <img
                                        src={item.images?.[0]?.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <p className="text-sm">{item.title}</p>
                                    <p className="text-xs text-gray-500">
                                        Qty: {item.quantity || 1}
                                    </p>
                                </div>

                                {/* Price */}
                                <p className="text-sm font-medium">
                                    ₹{item.price.amount * (item.quantity || 1)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-6" />

                    {/* Totals */}
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Tax</span>
                            <span>₹0</span>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{subtotal}</span>
                    </div>

                    {/* Place Order */}
                    <button className="w-full mt-6 bg-black text-white py-3 text-sm tracking-widest">
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;