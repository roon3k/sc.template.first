import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import BannersSlider from '../../components/Banners/BannersSlider'
import CategoryList from '../../components/Catalog/Category/CategoryList'
import ProductList from '../../components/Catalog/Product/ProductList'
import ProductCatalogStore from '../../store/catalog/products/ProductStore'

import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram'
import CartStore from '../../store/cart/CartStore'
import ProductStore from '../../store/catalog/products/ProductStore'
import { CART_ROUTE } from '../../utils/consts'

const ProductsPage = observer(() => {
	const [chooseCategory, setChooseCategory] = useState(null)
	const { items, categories, isLoading } = ProductStore
	const { quality } = CartStore
	const navigate = useNavigate()
	const { showMainButton } = useTelegram()

	useEffect(() => {
		showMainButton(
			{
				text: `Перейти в корзину`,
				is_visible: true,
			},
			() => {
				navigate(CART_ROUTE)
			}
		)

		return () => {
			showMainButton({
				is_visible: false,
			})
		}
	}, [CartStore.quality])

	useEffect(() => {
		ProductStore.fetchCategories()
	}, [])

	useEffect(() => {
		ProductCatalogStore.setFilter({
			category_id: chooseCategory ? chooseCategory.id : null,
		})
		ProductCatalogStore.fetchList()
	}, [chooseCategory])

	return (
		<div>
			<CategoryList
				items={categories}
				value={chooseCategory}
				onChange={setChooseCategory}
			/>
			<BannersSlider />
			<ProductList
				products={items}
				emptyText={'Товары не найдены'}
				isLoading={isLoading}
			/>
		</div>
	)
})
export default ProductsPage
