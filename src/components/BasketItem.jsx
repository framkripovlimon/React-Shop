const BasketItem = (props) => {
	const {
		mainId,
		displayName,
		price,
		quantity,
		removeFromBasket = Function.prototype,
		basketItemIncrement = Function.prototype,
		basketItemDecrement = Function.prototype
	} = props;
	return (
		<li className="collection-item">
			{displayName} x{quantity} = {price.finalPrice * quantity} лет работы
			
			<i className="material-icons basket-delete" onClick={() => basketItemDecrement(mainId)}>remove</i>
			<span style={{fontSize: '1.5rem'}}>{quantity}</span>
			<i className="material-icons basket-delete" onClick={() => basketItemIncrement(mainId)}>add</i>

			<span className="secondary-content" onClick={() => removeFromBasket(mainId)}>
				<i className="material-icons basket-delete">close</i>
			</span>
		</li>
	);
}

export {BasketItem}
