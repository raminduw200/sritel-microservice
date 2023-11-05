import React, { useState } from 'react';
import axios from 'axios';


function Services() {
    const [selectedSong, setSelectedSong] = useState('');
    const [showSongSelector, setShowSongSelector] = useState(false);
    const [ringtoneStatus, setRingtoneStatus] = useState('');

    const [selectedDataTopUp, setSelectedDataTopUp] = useState('');
    const [showDataTopUpSelector, SetDataTopUpSelector] = useState(false);
    const [dataTopUpsStatus, setDataTopUpsStatus] = useState('');

    const [data, setData] = useState([
        { service: "Roaming", status: "Deactivate", action: "" },
        { service: "Data top ups", status: dataTopUpsStatus === "" ? "Deactivate" : dataTopUpsStatus, action: "Activate", action2: "" },
        { service: "Other services", status: "Deactivate", action: "" },
        { service: "Ringtone", status: ringtoneStatus === "" ? "Deactivate" : ringtoneStatus, action: "Activate", action2: "" },
    ]);

    const handleServiceStatus = async (serviceName) => {
        try {
            if (serviceName === 'Ringtone') {
                //hide action2 btn and change the status to deactivate 
                const updatedData = [...data];
                const index = updatedData.findIndex(item => item.service === "Ringtone");
                if (index !== -1) {
                    updatedData[index].status = "Deactivate";
                    updatedData[index].action = "Activate";
                    updatedData[index].action2 = "";
                }
                setData([...updatedData]);

                const response = await axios.post(`http://localhost:8082/telco/ringingTone/unsub/${selectedSong}`);

                alert(response.data.message);
                setRingtoneStatus("Deactivate");

            } else if (serviceName === 'Data top ups') {
                //hide action2 btn and change the status to deactivate 
                const updatedData = [...data];
                const index = updatedData.findIndex(item => item.service === "Data top ups");
                if (index !== -1) {
                    updatedData[index].status = "Deactivate";
                    updatedData[index].action = "Activate";
                    updatedData[index].action2 = "";
                }
                setData([...updatedData]);

                const response = await axios.post(`http://localhost:8082/telco/dataTopUp/unsub/${selectedDataTopUp}`);

                alert(response.data.message);
                setDataTopUpsStatus("Deactivate");

            } else {
                const serviceIndex = data.findIndex((item) => item.service === serviceName);

                if (serviceIndex !== -1) {
                    data[serviceIndex].status =
                        data[serviceIndex].status === 'Active' ? 'Deactivate' : 'Active';

                    setData([...data]);
                }

                if (serviceName === 'Roaming') {
                    const response = await axios.post(`http://localhost:8082/telco/roaming/${data[serviceIndex].status === 'Active' ? 'sub' : 'unsub'}`);
                    alert(response.data.message);
                    console.log(response);
                } 
                else {
                    const response = await axios.post(`http://localhost:8082/api/othertelco/${data[serviceIndex].status === 'Active' ? 'subscribe' : 'unsubscribe'}`, {
                        service: serviceName,
                        status: data[serviceIndex].status,
                    });
                    alert(response.data);
                }
            } 
        } catch (error) {
                console.error('Error updating status:', error);
        }
    };


    const handleSongChange = async () => {
        if (!selectedSong) {
            alert('Please select a song');
            return;
        }
        const confirmChange = window.confirm('Are you sure you want to change the song?');
        if (!confirmChange) {
            return;
        }

        const updatedData = [...data];
        const index = updatedData.findIndex(item => item.service === "Ringtone");
        if (index !== -1) {
            if (selectedSong === "1") {
                updatedData[index].status = "Take me to church is Activated";
            } else if (selectedSong === "2") {
                updatedData[index].status = "Hall of the fame is Activated";
            } else {
                updatedData[index].status = "The greatest is Activated";
            }
            updatedData[index].action = "Change";
            updatedData[index].action2 = "Deactivate";
        }
        console.log(selectedSong);
        
        try {
            const response = await axios.post(`http://localhost:8082/telco/ringingTone/sub/${selectedSong}`);
            alert(response.data.message);
    
            setShowSongSelector(false);
        } catch (error) {
            console.error('Error:', error);
        }

        setShowSongSelector(false);
    };


    const handleDataTopUpChange = async () => {
        if (!selectedDataTopUp) {
            alert('Please select a data top up');
            return;
        }
        const confirmChange = window.confirm('Are you sure you want to change the data top up?');
        if (!confirmChange) {
            return;
        }

        const updatedData = [...data];
        const index = updatedData.findIndex(item => item.service === "Data top ups");
        if (index !== -1) {
            if (selectedDataTopUp === "1") {
                updatedData[index].status = "Data plan of 1GB is Activated";
            } else if (selectedDataTopUp === "2") {
                updatedData[index].status = "Data plan of 10GB is Activated";
            } else {
                updatedData[index].status = "Data plan of 30GB is Activated";
            }
            updatedData[index].action = "Change";
            updatedData[index].action2 = "Deactivate";
        }
        console.log(selectedDataTopUp);
        
        try {
            const response = await axios.post(`http://localhost:8082/telco/dataTopUp/sub/${selectedDataTopUp}`);
            alert(response.data.message);
    
            SetDataTopUpSelector(false);
        } catch (error) {
            console.error('Error:', error);
        }

        SetDataTopUpSelector(false);
    };


    return (
        <>
            <a href="/dashboard" className="btn btn-light mb-3">Back to Dashboard</a>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <h2 className="card-header">Services</h2>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Telco service</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map((val, key) => (
                                            <tr key={key}>
                                                <td>{val.service}</td>
                                                <td style={{ color: val.status === 'Deactivate' ? 'red' : 'green' }}>
                                                    {val.status}
                                                </td>
                                                <td>
                                                    {val.service === 'Ringtone' ? (
                                                        <div>
                                                            <button className="btn btn-primary btn-sm m-1" onClick={() => setShowSongSelector(true)}>
                                                                {val.action}
                                                            </button>
                                                            {val.action === 'Change' && (
                                                                <button className="btn btn-secondary btn-sm m-1" onClick={() => handleServiceStatus(val.service)}>
                                                                    {val.action2}
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : val.service === 'Data top ups' ? (
                                                        <div>
                                                            <button className="btn btn-primary btn-sm m-1" onClick={() => SetDataTopUpSelector(true)}>
                                                                {val.action}
                                                            </button>
                                                            {val.action === 'Change' && (
                                                                <button className="btn btn-secondary btn-sm m-1" onClick={() => handleServiceStatus(val.service)}>
                                                                    {val.action2}
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <button className="btn btn-primary btn-sm m-1" onClick={() => handleServiceStatus(val.service)}>
                                                            {val.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showSongSelector && (
                    <div className="mt-3">
                        <h3>Available Songs List:</h3>
                        <select className="form-control d-inline w-auto mr-2" onChange={(e) => setSelectedSong(e.target.value)}>
                            <option value="">Select a song</option>
                            <option value="1">Take me to church</option>
                            <option value="2">Hall of the fame</option>
                            <option value="3">The greatest</option>
                        </select>
                        <button className="btn btn-primary" onClick={handleSongChange}>Confirm</button>
                    </div>
                )}

                {showDataTopUpSelector && (
                    <div className="mt-3">
                        <h3>Available Data Top Ups:</h3>
                        <select className="form-control d-inline w-auto mr-2" onChange={(e) => setSelectedDataTopUp(e.target.value)}>
                            <option value="">Select a data top up</option>
                            <option value="1">1GB - Rs.100</option>
                            <option value="2">10GB - Rs.250</option>
                            <option value="3">30GB - Rs.400</option>
                        </select>
                        <button className="btn btn-primary" onClick={handleDataTopUpChange}>Confirm</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Services;