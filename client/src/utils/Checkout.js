/**
 * Checkout class that creates a singleton that handles the available products, discounts and the current cart status.
 */
class Checkout {
    /**
     * Create a Checkout instance.
     * @param {object} pricingRules - An object in the shape of { products: array, discounts: object} that will contain the available products that the store is selling, and the discounts that will be applied given some specific condiions.
     * @memberof Checkout
     */
    constructor(
        pricingRules,
        // initialCart, // Posibility of having the cart initialized (retreving cart from localStorage)
    ) {
        // Make sure we return the same instance every time we call "new" on Checkout.
        if (!Checkout.instance) {
            this._data = [];
            Checkout.instance = this;
        }

        // Arrange products, cart and discounts in a "Map" to reduce complexity on the access and manage.
        this._products = new Map();
        this._discounts = new Map();

        if (pricingRules) {
            pricingRules.products.forEach(p => this._products.set(p.code, p));
            Object.entries(pricingRules.discounts).forEach(([k, v]) => this._discounts.set(k, v));
        }

        this._cart = new Map();  // TODO: initialize with "initialCart"

        // We make sure we return the instance.
        return Checkout.instance;
    }

    /**
     * Load products that the store has available to sell. It clears the shopping cart on load for simplicity.
     *
     * @param {array} products - The products array
     * @memberof Checkout
     */
    loadProducts(products) {
        this._products.clear();
        products.forEach(p => this._products.set(p.code, p));

        // We remove any inconsistance
        this.clearCart();
    }

    /**
     * Get the products available to sell.
     *
     * @readonly
     * @returns The products formated as an array of entries.
     * @memberof Checkout
     */
    get products() {
        return Array.from(this._products.values());
    }

    /**
     * Load discount that the store can apply. It clears the shopping cart on load for simplicity.
     *
     * @param {object} discounts - The discounts
     * @memberof Checkout
     */
    loadDiscounts(discounts) {
        this._discounts.clear();
        Object.entries(discounts).forEach(([k, v]) => this._discounts.set(k, v));

        // We remove any inconsistance
        this.clearCart();
    }

    /**
     * Insert a product in the cart.
     * @param {string} code - The code of the product to add to the cart.
     * @returns {object} The checkout instance (to allow chaining).
     * @memberof Checkout
     */
    scan(code) {
        this._cart.has(code) ? this._cart.set(code, this._cart.get(code) + 1) : this._cart.set(code, 1);
        return this;
    }

    /**
     * Remove a product from the cart.
     * @param {string} code - The code of the product to remove from the cart.
     * @returns {object} The checkout instance (to allow chaining).
     * @memberof Checkout
     */
    remove(code) {
        this._cart.get(code) > 1 ? this._cart.set(code, this._cart.get(code) - 1) : this._cart.delete(code);
        return this;
    }

    /**
     * Get the list of products in the shopping cart as an object mapping code product to quantity.
     * @returns {object} The current shopping cart formatted in a object where the property name is the product code, and the value is the quantity.
     * @memberof Checkout
     */
    getCart() {
        return Object.fromEntries(this._cart);
    }

    /**
     * Clear the shopping cart.
     * @memberof Checkout
     */
    clearCart() {
        this._cart.clear();
    }

    /**
     * List the discounts that apply to the current cart.
     * @returns {array} An array that contains the discounts applied with a key/value pairs with this shape => [['<discount label>': string, <price discounted>: number]]
     * @memberof Checkout
     */
    listDiscounts() {
        // If there are no products in the cart or discounts available, no discounts applied.
        if (!this._cart.size || !this._discounts.size) {
            return [];
        }

        // We build a discounts array of key/value pairs with this structure => [['<discount label>', <price discounted>]]
        return Array.from(this._cart, ([code, quantity]) => {
            const product = this._products.get(code);
            const productSpecificDiscounts = this._discounts.get(code) || [];
            // Iterate over every available discount that applies for the products in the cart.
            return productSpecificDiscounts.map(discount => {
                // If this kind of products can have a discount, return the discount structure [label, discount]
                return this.discountable(discount, quantity) && [this.getDiscountLabel(discount, product.name), this.getDiscount(discount, quantity, product.price)];
            }).filter(Boolean);
        }).flat();
    }

    /**
     *  Test if the given discount is applicable for the given product quantity. In the future, other input variables should be taken into account (user location, ). As this can grow in complexity very easily, whould probably be better to move the logic to the server.
     * @param {object} discount - The discount object that has the required properties.
     * @param {number} quantity - The number of products that we are testing to discount against.
     * @returns {boolean} If the discount is applicable
     * @memberof Checkout
     */
    discountable(discount, quantity) {
        switch (discount.id) {
            case "XforY":
            case "bulkDiscount":
                return quantity >= discount.minProducts;
            default:
                return false;
        }
    };

    /**
     * Simple helper function to get the discount label for the UI.
     * @param {object} discount - The discount object that has the required properties.
     * @param {string} productName - The product name.
     * @returns {string} The discount label.
     * @memberof Checkout
     */
    getDiscountLabel(discount, productName) {
        switch (discount.id) {
            case "XforY":
                return `${discount.minProducts}x${discount.minProducts-discount.freeProducts} ${productName}`
            case "bulkDiscount":
                return `x${discount.minProducts} ${productName}`
            default:
                return `${productName}`;
        }
    };

    /**
     * Calculate the discuont that will be applied to a given product with a given quantity of this product.
     * @param {object} discount - The discount object that has the required properties.
     * @param {number} quantity - The number of products that we have.
     * @param {number} price - The proce of the product.
     * @returns {number} The discount applied.
     * @memberof Checkout
     */
    getDiscount(discount, quantity, price) {
        switch (discount.id) {
            case "XforY":
                // This algorithm calculates the number of products that the user gets for free (X) given he has Y products, and multiplies it by the price of the product
                return ((
                    Math.floor(quantity / discount.minProducts) * discount.freeProducts
                ) + (
                    (quantity % discount.freeProducts) > (discount.minProducts - discount.freeProducts)
                        ? (quantity % discount.freeProducts) - (discount.minProducts - discount.freeProducts)
                        : 0
                )) * price;
            case "bulkDiscount":
                // Usual bulk percentage discount
                return (price * discount.discountPercentage / 100) * quantity;
            default:
                return 0;
        }
    };

    /**
     * The cart size (number of items).
     * @returns {number} The number of items
     * @memberof Checkout
     */
    cartSize() {
        return Array.from(this._cart, ([_, quantity]) => quantity).reduce((acc, q) => q + acc, 0);
    }

    /**
     * Calculate the raw price of the products in the cart, with no discounts applied.
     * @returns {number} The raw price calculated.
     * @memberof Checkout
     */
    rawTotal() {
        return Array.from(this._cart, ([code, quantity]) => [quantity, this._products.get(code).price]).reduce((acc, [q, p]) => q * p + acc, 0);
    }

    /**
     * Calculate the total discount that can be applied to the current shopping cart.
     * @returns {number} The discount value for all the products combined.
     * @memberof Checkout
     */
    totalDiscount() {
        return this.listDiscounts().reduce((acc, [_, d]) => acc + d, 0);
    }

    /**
     * Helper funtion to return the final price of the shopping cart (total minus the discounts).
     * @returns {number} The total value of the cart amount with the discounts applied.
     * @memberof Checkout
     */
    total() {
        return this.rawTotal() - this.totalDiscount();
    }
}

export default Checkout;
