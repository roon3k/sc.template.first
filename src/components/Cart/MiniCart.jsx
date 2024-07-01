import React from 'react'
import { CART_ROUTE } from '../../utils/consts'
import {NavLink} from "react-router-dom";
import uuid from "react-uuid";



const MiniCart = ({ elements }) => {
	if (!elements || !elements?.length) {
		return <></>
	}
	console.log(elements)
	return (
		<div className={'mini-cart'}>
			<div className='mini-cart__title'>В корзине</div>
			<div className='mini-cart__list'>
				{elements.map((item) => (
					<NavLink to={CART_ROUTE}>
						<div key={uuid()} className={'mini-cart__item'}>
							<div className={'mini-cart__item-info'}>
								<div className={'mini-cart__item-title'}>{item.title}</div>
								<div className={'mini-cart__item-hint'}>{item.sku_title}</div>
							</div>
							<div className={'mini-cart__item-count'}>{item.count} шт.</div>
						</div>
					</NavLink>
				))}
			</div>
		</div>
	)
}

export default MiniCart
