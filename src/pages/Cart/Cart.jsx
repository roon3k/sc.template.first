import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CartList from '../../components/Cart/CartList'
import Spinner from '../../components/Loaders/Spinner'
import { useTelegram } from '../../hooks/useTelegram'
import CartStore from '../../store/cart/CartStore'
import { MAKE_ORDER_ROUTE } from '../../utils/consts'

const Cart = observer(props => {
	const { showMainButton } = useTelegram()
	const navigate = useNavigate()
	const { initBackButton } = useTelegram()

	useEffect(() => {
		if (history.length > 1) {
			initBackButton(true, () => {
				history.back()
			})
			return () => {
				initBackButton(false)
			}
		}
	}, [])

	useEffect(() => {
		CartStore.fetchCart().then(() => {
			showMainButton(
				{
					text: `Оформить заказ  ${CartStore.total_price} Р`,
					is_visible: !!CartStore.quality,
				},
				() => {
					navigate(MAKE_ORDER_ROUTE)
				}
			)
		})
		return () => {
			showMainButton({
				is_visible: false,
			})
		}
	}, [])
	if (CartStore.isLoading) {
		return <Spinner />
	}
	return (
		<div className={'cart'}>
			<CartList
				products={CartStore.products}
				emptyText={'Ваша корзина пуста'}
			/>
		</div>
	)
})
export default Cart
