import { GoodsItem } from './GoodsItem';

const GoodsList = (props) => {
	const {goods = [], addToBasket = Function.prototype} = props; //???

	if (!goods.length) {
		return <h3>Nothing found</h3>
	}

	return (
		<div className='goods'>
			{goods.map(item => (
				<GoodsItem key={item.mainId} {...item} addToBasket={addToBasket} /> // как работает это многоточие? и зачем тут key?
			))}
		</div>
	);
}

export {GoodsList};
