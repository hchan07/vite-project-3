type HeaderProps = {
	title?: string
}

const Header = (props: HeaderProps) => {
	if (props.title) {
		return <div>title</div>
	}

	return (
		<div>I am a test header</div>
	);
};


export default Header;