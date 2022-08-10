import spinner from '../images/spinner.gif';

const Output = (props) => {
    const {load} = props;
    return (
      <main className="loadingSection">
        <p className="text-secondary">{load}</p>
        <img src={spinner} alt="Loading..." />
      </main>
    );
}

export default Output;