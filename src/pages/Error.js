import spinner from '../images/spinner.gif';

const Error = (props) => {
    const {error} = props;
    return (
        <section className="loadingSection">
        <h1 className="text-secondary">Error</h1>
        <p className="text-secondary">{error}</p>
        <img src={spinner} alt="Loading..." />
      </section>
    );
}

export default Error;