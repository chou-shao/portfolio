function SavedAddress({ address }) {
    if (!address) {
      return <p className="saved-address__text">No saved address.</p>;
    }
    return (
      <div className="saved-address">
        <h2 className="saved-address__title">Saved Address</h2>
        <div className="saved-address__fields">{address.firstName} {address.lastName}</div>
        <div className="saved-address__fields">{address.street}</div>
        <div className="saved-address__fields">{address.city}, {address.state} {address.zipCode}</div>
        <div className="saved-address__fields">{address.phoneNumber}</div>
      </div>
    );
  }
  
  export default SavedAddress;
  