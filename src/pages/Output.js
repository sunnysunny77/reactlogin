const Output = (props) => {
    const {load} = props;
    return (
      <main className="loadingSection">
        <p className="text-secondary">{load}</p>
      </main>
    );
}

export default Output;