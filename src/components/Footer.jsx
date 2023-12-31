function Footer() {
	return <footer className="page-footer">
	<div className="container">
		<div className="row">
			<div className="col l6 s12">
				<h5 className="white-text">React Shop</h5>
			</div>
			<div className="col l4 offset-l2 s12">
				<h5 className="white-text">Links</h5>
				<ul>
					<li><a className="grey-text text-lighten-3" href="#!">Discord</a></li>
					<li><a className="grey-text text-lighten-3" href="#!">Instagram</a></li>
					<li><a className="grey-text text-lighten-3" href="#!">Telegram</a></li>
					<li><a className="grey-text text-lighten-3" href="#!">Patreon</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div className="footer-copyright">
		<div className="container">
		© 2023 Copyright Text
		<a className="grey-text text-lighten-4 right" href="#!">More Links</a>
		</div>
	</div>
</footer>
}

export {Footer}
