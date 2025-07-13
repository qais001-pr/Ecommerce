/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './nav'
import { CategoriesProvider } from './context/categoriescontext'
import { ProductsProvider } from './context/productscontext'
export default function App() {
  return (
    <>
      <CategoriesProvider>
        <ProductsProvider>
          <AppNavigator />
        </ProductsProvider>
      </CategoriesProvider>
    </>
  )
}