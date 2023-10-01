import {useState, useEffect} from 'react';
import {API_KEY, API_URL} from '../config';

import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import {Cart} from './Cart';
import {BasketList} from './BasketList'
import {Alert} from './Alert';

const Shop = () => {
	// console.log('text', API_KEY, API_URL);

	const [goods, setGoods] = useState([]);
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState([]);
	const [isBasketShow, setIsBasketShow] = useState(false);
	const [alertName, setAlertName] = useState('');

	useEffect(function getGoods() {
		fetch(API_URL, {
			headers: {
				Authorization : API_KEY,
			},
		})
			.then((response)  => {
				return response.json()
			})
			.then((data) => {
				// console.log('data', data);
				data.shop && setGoods(data.shop);
				setLoading(false); // здесь же все выполняется поочередно? нет асинхронности?
			});
	}, []);

	const addToBasket = (item) => { // item это object
		// order = [
		//		{mainId: 1, displayName: 'a', price: 100, quantity: 1},
		//		{mainId: 2, displayName: 'b', price: 100, quantity: 1},
		//		{mainId: 3, displayName: 'c', price: 100: quantity: 1},
		// ]
		// item = {mainId: 4, displayName: 'd', price: 200}

		const itemIndex = order.findIndex((orderItem) => orderItem.mainId === item.mainId) // find
		// itemIndex == -1

		if (itemIndex < 0) { // item not found in order
			const newItem = { // ???
				...item,
				quantity: 1,
			}
			// newItem = {mainId: 4, displayName: 'd', price: 200, quantity: 1}
			setOrder([...order, newItem])
			// order = [
			//		{mainId: 1, displayName: 'a', price: 100, quantity: 1},
			//		{mainId: 2, displayName: 'b', price: 100, quantity: 1},
			//		{mainId: 3, displayName: 'c', price: 100: quantity: 1},
			//		{mainId: 4, displayName: 'd', price: 200: quantity: 1},
			// ]
		} else {
			// order = [
			//		{mainId: 1, displayName: 'a', price: 100, quantity: 1},
			//		{mainId: 2, displayName: 'b', price: 100, quantity: 1},
			//		{mainId: 3, displayName: 'c', price: 100: quantity: 1},
			// ]
			const newOrder = order.map((orderItem, index) => { // orderItem элемент массива index порядковый номер
				if (index === itemIndex) {
					return {
						...orderItem,
						quantity: orderItem.quantity + 1,
					}
					// {mainId: 1, displayName: 'a', price: 100, quantity: 2}
				} else {
					return orderItem;
					// {mainId: 2, displayName: 'b', price: 100, quantity: 1}
				}
			})
			// newOrder = [
			//		{mainId: 1, displayName: 'a', price: 100, quantity: 2}, // quantity + 1
			//		{mainId: 2, displayName: 'b', price: 100, quantity: 1},
			//		{mainId: 3, displayName: 'c', price: 100: quantity: 1},
			// ]
			setOrder(newOrder);
		}
		setAlertName(item.displayName);
	};

	const removeFromBasket = (itemId) => {
		const newOrder = order.filter(el => el.mainId !== itemId);
		setOrder(newOrder);
	}

	const handleBasketShow = () => {
		setIsBasketShow(!isBasketShow)
	};

	const basketItemIncrement = (itemId) => {
		// const deleteItem = order.findIndex((el) => el.mainId === itemId)
		const newOrder = order.map(el => {
			if (el.mainId === itemId) {
				const newQuantity = el.quantity + 1;
				return {
					...el,
					quantity: newQuantity
				}
			} else {
				return el;
			}
		});
		setOrder(newOrder);
	}

	const basketItemDecrement = (itemId) => {
		const newOrder = order.map(el => {
			if (el.mainId === itemId) {
				const newQuantity = el.quantity - 1;
				console.log(newQuantity)
				return {
					...el,
					quantity: newQuantity > 0 ? newQuantity : 0,
				};
			} else {
				return el;
			}
		}).filter(el => el.quantity);
		setOrder(newOrder)
	}

	const closeAlert = () => {
		setAlertName('');
	}

	return (
		<main className='container content'>
			<Cart quantity={order.length} handleBasketShow={handleBasketShow} order={order} />
			{loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
			{isBasketShow && (
				<BasketList
					order={order}
					handleBasketShow={handleBasketShow}
					removeFromBasket={removeFromBasket}
					basketItemIncrement={basketItemIncrement}
					basketItemDecrement={basketItemDecrement}
				/>
			)}
			{
				alertName && <Alert name={alertName} closeAlert={closeAlert}/>
			}
		</main>
	);
}

export {Shop}
