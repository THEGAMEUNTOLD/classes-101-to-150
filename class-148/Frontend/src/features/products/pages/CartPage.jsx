import React from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
    const cartItems = useSelector(state => state.cart?.items || []);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price.amount * (item.quantity || 1),
        0
    );

    return (
        <div className="min-h-screen px-8 lg:px-16 py-12 bg-[#fbf9f6]">
            
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-4xl font-light tracking-wide">
                    YOUR CART
                </h1>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">

                {/* ─── LEFT: CART ITEMS ─── */}
                <div className="lg:col-span-2 space-y-6">

                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-6 border-b pb-6"
                            >
                                {/* Image */}
                                <div className="w-24 h-28 bg-gray-100 overflow-hidden">
                                    <img
                                        src={item.images?.[0]?.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col justify-between flex-1">

                                    <div>
                                        <h2 className="text-lg font-medium">
                                            {item.title}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {item.price.currency} {item.price.amount}
                                        </p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <button className="border px-2">-</button>
                                        <span>{item.quantity || 1}</span>
                                        <button className="border px-2">+</button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                    <p className="font-medium">
                                        {item.price.currency}{" "}
                                        {item.price.amount * (item.quantity || 1)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Coupon */}
                    {cartItems.length > 0 && (
                        <div className="mt-8">
                            <p className="text-sm mb-2 text-gray-500">
                                Have a coupon? Enter your code.
                            </p>

                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Coupon code"
                                    className="border px-4 py-2 w-64 bg-transparent outline-none"
                                />
                                <button className="border px-6 py-2 text-sm">
                                    APPLY
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── RIGHT: SUMMARY ─── */}
                <div className="border p-6 h-fit bg-white">

                    <h2 className="text-lg mb-6 tracking-wide">
                        CART TOTALS
                    </h2>

                    <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span className="text-gray-500">Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Tax</span>
                            <span>₹0</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{subtotal}</span>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full mt-6 bg-black text-white py-3 text-sm tracking-widest">
                        PROCEED TO CHECKOUT
                    </button>

                    <button className="w-full mt-3 text-sm text-gray-500">
                        ← Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;