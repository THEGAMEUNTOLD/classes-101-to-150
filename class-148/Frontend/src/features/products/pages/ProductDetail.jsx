import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../state/cart.slice";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const { handleGetSingleProduct } = useProduct();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const data = await handleGetSingleProduct(id);
            setProduct(data);
            setSelectedImage(data?.images?.[0]?.url);
        }
        fetchProduct();
    }, [id]);

    if (!product) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div
            className="min-h-screen px-8 lg:px-16 xl:px-24 py-16"
            style={{ backgroundColor: "#fbf9f6" }}
        >
            <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

                {/* ── LEFT: IMAGES ── */}
                <div className="flex flex-col gap-6">
                    <div className="aspect-[4/5] overflow-hidden bg-[#f5f3f0]">
                        <img
                            src={selectedImage}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="flex gap-4">
                        {product.images?.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedImage(img.url)}
                                className="w-20 h-24 cursor-pointer overflow-hidden border"
                                style={{ borderColor: "#e4e2df" }}
                            >
                                <img
                                    src={img.url}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: DETAILS ── */}
                <div className="flex flex-col justify-center">

                    <h1
                        className="text-4xl lg:text-5xl mb-6"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            color: "#1b1c1a"
                        }}
                    >
                        {product.title}
                    </h1>

                    <span
                        className="text-sm uppercase tracking-[0.2em] mb-6"
                        style={{ color: "#C9A96E" }}
                    >
                        {product.price.currency} {product.price.amount}
                    </span>

                    <p
                        className="text-sm leading-relaxed mb-10"
                        style={{ color: "#7A6E63" }}
                    >
                        {product.description}
                    </p>

                    {/* Size Selection */}
                    <div className="mb-8">
                        <p className="text-xs uppercase mb-3 tracking-wider">Size</p>
                        <div className="flex gap-3">
                            {["S", "M", "L", "XL"].map(size => (
                                <button
                                    key={size}
                                    className="px-4 py-2 border text-sm hover:bg-black hover:text-white transition"
                                    style={{ borderColor: "#e4e2df" }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4">

                        {/* Add to Cart */}
                        <button
                            onClick={() => {
                                dispatch(addToCart(product));
                                navigate("/cart");
                            }}
                            className="py-4 text-sm uppercase tracking-widest"
                            style={{
                                backgroundColor: "#1b1c1a",
                                color: "white"
                            }}
                        >
                            Add to Cart
                        </button>

                        {/* Buy Now */}
                        <button
                            onClick={() => {
                                dispatch(addToCart(product));
                                navigate("/checkout");
                            }}
                            className="py-4 border text-sm uppercase tracking-widest hover:bg-black hover:text-white transition"
                            style={{ borderColor: "#1b1c1a" }}
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Extra Info */}
                    <div className="mt-10 text-xs text-[#7A6E63] leading-relaxed">
                        Free shipping on all orders. Easy 7-day returns.
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;