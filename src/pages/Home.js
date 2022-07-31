const Home = (props) => {
    const {logOut} = props;
    return (
        <section id="home">
            <h1>loged in</h1>
            <button onClick={logOut} className="btn btn-secondary">Log Out</button>
        </section>
    );
}

export default Home;