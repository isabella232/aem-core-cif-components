/*******************************************************************************
 *
 *    Copyright 2019 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import UserContextProvider from '../../../context/UserContext';
import { CartProvider } from '../../Minicart/cartContext';
import { CheckoutProvider } from '../checkoutContext';

import Flow from '../flow';
const dummyCart = {
    items: []
};
const dummyItem = {
    id: 3,
    quantity: 3
};
afterEach(cleanup);
describe('<Flow>', () => {
    it('it disables checkout button for empty cart', () => {
        const { getByRole } = render(
            <MockedProvider>
                <UserContextProvider>
                    <CartProvider
                        initialState={{ cart: dummyCart, cartId: '123ABC' }}
                        reducerFactory={() => state => state}>
                        <CheckoutProvider initialState={{ flowState: 'cart' }} reducer={state => state}>
                            <Flow />
                        </CheckoutProvider>
                    </CartProvider>
                </UserContextProvider>
            </MockedProvider>
        );

        // there are no items in the initial cart, button should be disabled
        expect(getByRole('button').disabled).toBe(true);
    });

    it('enables checkout button for non empty cart', () => {
        const newCart = { ...dummyCart, items: [dummyItem] };

        // we rerender the component with the new cart, button should be enabled
        const { getByRole } = render(
            <MockedProvider>
                <UserContextProvider>
                    <CartProvider
                        initialState={{ cart: newCart, cartId: '456DEF' }}
                        reducerFactory={() => state => state}>
                        <CheckoutProvider initialState={{ flowState: 'cart' }} reducer={state => state}>
                            <Flow />
                        </CheckoutProvider>
                    </CartProvider>
                </UserContextProvider>
            </MockedProvider>
        );
        expect(getByRole('button').disabled).toBe(false);
    });
});
