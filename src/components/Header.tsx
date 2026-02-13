type HeaderProps = {
	title?: string
};

const Header = (props: HeaderProps) => {
	const {
		title
	} = props;

	if (title) {
		return <div>title</div>;
	}

	return (
		<div>I am a test header</div>
	);
};


export default Header;