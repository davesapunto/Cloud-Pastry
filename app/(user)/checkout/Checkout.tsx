import "./Checkout.css";
import { MdLocationOn } from "react-icons/md";

export const Checkout = () => {
    return (
        <div className="check-section">
            <h1 className="check-header-title">Checkout</h1>

            <div className="check-delivery">
                <MdLocationOn />
                <p className="check-bold-text">Delivery Address</p>
            </div>

            <div className="check-customer">
                <div className="check-between">

                    <div className="check-customer-details">
                        <p>Juan Dela Cruz (+63) 966 389 6043</p>
                        <p>151 J.P. Rizal St.</p>
                        <p>Bagong Silang, Quezon City, Metro Manila, 1119</p>
                    </div>

                    <p>Edit</p>

                </div>
            </div>

            <div className="check-product-details">
                <div className="check-image-container">
                    <img src="assets/Images/Promo Images 2.jpg" alt="Promo Images 2" />
                </div>
                <div className="check-details-and-quantity">
                    <p className="check-bold-text">Brownie with Nuts</p>
                    <p className="check-gray-text">#03</p>
                    <p className="check-price">₱40.00</p>
                </div>
                <p className="check-gray-text">1x</p>
            </div>

            <div className="check-shipping-details">
                <p className="check-bold-text">Shipping</p>

                <div className="check-between">
                    <div className="check-shipping-subdetails">
                        <p>Standard Local</p>
                        <p className="check-gray-text">Received by 1 Week</p>
                    </div>

                    <div className="check-shipping-price">
                        <p>₱40.00</p>
                        <p>₱40.00</p>
                    </div>
                </div>
            </div>

            <div className="check-payment-details">

                <p className="check-bold-text">Payment Details</p>
                <div className="check-between">
                    <div className="check-subtotal-details">
                        <p>Product Subtotal</p>
                        <p>Shipping Subtotal</p>
                    </div>

                    <div className="check-gray-text">
                        <p>₱40.00</p>
                        <p>₱40.00</p>
                    </div>

                </div>
            </div>

            <div className="check-total-payment-details">
                <h2>Total Payment (PHP)</h2>
                <h2>₱80.00</h2>
            </div>

            <button className="check-place-order-button">PLACE ORDER</button>

        </div>
    )
}
