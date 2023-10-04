function BootstrapSpinner() {
    return (
    <div className="d-flex justify-content-center">
        <div className="spinner-border m-5 text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    );
}

export default BootstrapSpinner;