import {BasketItem} from './BasketItem';

const BasketList = (props) => {
	const {order = [],
		handleBasketShow = Function.prototype,
		removeFromBasket = Function.prototype,
		basketItemIncrement,
		basketItemDecrement,
	} = props;

	const totalPrice = order.reduce((sum, el) => { // чем reduce отличается от map?
		return sum + el.price.finalPrice * el.quantity
	}, 0) // 0 - значение по умолчанию

	return (
		<ul className="collection basket-list" >
			<i
				className='material-icons basket-close'
				onClick={handleBasketShow}
			>close</i>

			<li className="collection-item active">Корзина</li>
			{
				order.length ? order.map(item => (
					<BasketItem
						key={item.mainId}
						removeFromBasket={removeFromBasket}
						{...item}
						basketItemIncrement={basketItemIncrement}
						basketItemDecrement={basketItemDecrement}
					/>
				)) : <li className="collection-item">Корзина пуста</li>
			}
			<li className="collection-item active">
				У вас конфискуют: {totalPrice} денег
			</li>
			<li className="collection-item">
				<button className='btn-small'>Оформить</button>
			</li>
		</ul>
	);
}

export {BasketList}
