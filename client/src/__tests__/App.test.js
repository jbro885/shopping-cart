import React from 'react';
import { render, fireEvent, wait, waitForElement, within, getNodeText } from '../test-utils';
import ReactModal from "react-modal";
import App from '../App';

// This set tests follow the principles of the Testing Library: https://testing-library.com/docs/guiding-principles

test('renders shopping cart title', async () => {
    // Arrange
    const { getByText, container } = render(<App />);

    // Act
    const shoppingCartTitle = await waitForElement(() => getByText(/shopping cart/i));
    ReactModal.setAppElement(container);

    // Assert
    expect(shoppingCartTitle).toBeInTheDocument();
});

test('product is added to the cart when quantity is incremented and removed when decremented', async () => {
    // Arrange
    const { getAllByTestId, getByTestId, getByText, container } = render(<App />);
    ReactModal.setAppElement(container);

    // Act
    await waitForElement(() => getByText(/shopping cart/i));
    const summaryItemsNode = getByTestId('summary-items-number');
    const productNameNode = getAllByTestId('product-name')[0];
    const selectedProduct = getNodeText(productNameNode);
    const productRowNode = getByText(selectedProduct).closest('li[data-testid="product-row"]');
    const minusButtonNode = within(productRowNode).getByTestId('decrement-button');
    const plusButtonNode = within(productRowNode).getByTestId('increment-button');
    const quantityInputNode = within(productRowNode).getByRole('spinbutton');
    fireEvent.click(plusButtonNode);

    // Assert
    expect(quantityInputNode).toHaveValue(1)
    expect(summaryItemsNode).toHaveTextContent(/1/i)

    // Act
    fireEvent.click(minusButtonNode);

    // Assert
    expect(quantityInputNode).toHaveValue(0)
    expect(summaryItemsNode).toHaveTextContent(/0/i)
});

test('checkout button clears the cart', async () => {
    // Arrange
    const { getAllByTestId, getByTestId, getByText, container } = render(<App />);
    ReactModal.setAppElement(container);

    // Act
    await waitForElement(() => getByText(/shopping cart/i));
    const summaryItemsNode = getByTestId('summary-items-number');
    const productNameNode = getAllByTestId('product-name')[0];
    const selectedProduct = getNodeText(productNameNode);
    const productRowNode = getByText(selectedProduct).closest('li[data-testid="product-row"]');
    const plusButtonNode = within(productRowNode).getByTestId('increment-button');
    const quantityInputNode = within(productRowNode).getByRole('spinbutton');
    const checkoutButtonNode = getByTestId('checkout-button');
    fireEvent.click(plusButtonNode);

    // Assert
    expect(quantityInputNode).toHaveValue(1)
    expect(summaryItemsNode).toHaveTextContent(/1/i)

    // Act
    fireEvent.click(checkoutButtonNode);

    // Assert
    expect(quantityInputNode).toHaveValue(0)
    expect(summaryItemsNode).toHaveTextContent(/0/i)
});

test('modal is opened when product name is clicked', async () => {
    // Arrange
    const { getAllByTestId, getByText, getByRole, container } = render(<App />);
    ReactModal.setAppElement(container);

    // Act
    await waitForElement(() => getByText(/shopping cart/i));
    const productNameNode = getAllByTestId('product-name')[0];
    fireEvent.click(productNameNode)
    const modalNode = await waitForElement(() => getByRole('dialog'))

    // Assert
    expect(modalNode).toHaveTextContent(/add to cart/i)
});

test('modal closes on X button click', async () => {
    // Arrange
    const { getAllByTestId, getByRole, getByText, container } = render(<App />);
    ReactModal.setAppElement(container);

    // Act
    await waitForElement(() => getByText(/shopping cart/i));
    const productNameNode = getAllByTestId('product-name')[0];
    fireEvent.click(productNameNode)
    const modalNode = await waitForElement(() => getByRole('dialog'))

    // Assert
    expect(modalNode).toHaveTextContent(/add to cart/i)

    // Act
    const closeButtonNode = within(modalNode).getByTestId('modal-close-button');
    fireEvent.click(closeButtonNode)

    // Assert
    await wait(() => {
        expect(modalNode).not.toBeInTheDocument();
    })
});

test('product is added to cart when added from the product detail modal', async () => {
    // Arrange
    const { getAllByTestId, getByTestId, getByText, getByRole, container } = render(<App />);
    ReactModal.setAppElement(container);

    // Act
    await waitForElement(() => getByText(/shopping cart/i));
    const productNameNode = getAllByTestId('product-name')[0];
    const selectedProduct = getNodeText(productNameNode);
    fireEvent.click(productNameNode)
    const modalNode = await waitForElement(() => getByRole('dialog'))

    // Assert
    expect(modalNode).toHaveTextContent(/add to cart/i)

    // Act
    const addToCartButtonNode = within(modalNode).getByTestId('add-to-cart');
    fireEvent.click(addToCartButtonNode);

    // Assert
    await wait(() => {
        expect(modalNode).not.toBeInTheDocument();
    })
    const summaryItemsNode = getByTestId('summary-items-number');
    const productRowNode = getByText(selectedProduct).closest('li[data-testid="product-row"]');
    const quantityInputNode = within(productRowNode).getByRole('spinbutton');
    expect(quantityInputNode).toHaveValue(1)
    expect(summaryItemsNode).toHaveTextContent(/1/i)
});
