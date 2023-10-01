const GoodsItem = (props) => {
	const {
		mainId,
		displayName,
		displayDescription,
		price,
		displayAssets,
		addToBasket = Function.prototype,
	} = props;

	return (
		<div className="card" style={{ padding: '0 0 1vw'}} id={mainId}>
			<div className="card-image">
				{(displayAssets.length && displayAssets[0].full_background) 
					? <img src={displayAssets[0].full_background} alt={displayName} />
					: <img src='https://fakeimg.pl/500/?text=No+image' />
				}
				{/* <img src={displayAssets[0].full_background} alt={displayName} /> */}
			</div> 
			<div className="card-content">
				<span className="card-title">{displayName}</span> 
				<p>{displayDescription}</p>
			</div>
				<div className="card-action">
					<button className='btn' onClick={() => addToBasket({
						mainId,
						displayName,
						price,
					})} style={{ margin: '0 0 1vw' }} >Купить платно за деньги</button>
					<div className='left' style={{ fontSize: '1.2rem' }}>{price.finalPrice} социальных баллов</div>
				</div>
		</div>
	);
}

export { GoodsItem };
