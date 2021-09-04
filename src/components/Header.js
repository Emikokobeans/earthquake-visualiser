const Header = (props) => {
    const {date, dateFormat} = props;
const formattedDate = dateFormat(date, "dS mmmm yyyy")

    return (
        <header>
        <h1>Earthquake Events on {formattedDate}</h1>
        </header>
    )
}

export default Header;