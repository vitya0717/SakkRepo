import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export const SakkSelect = ({ selectedSakk, setSelectedSakk }) => {
    const navigate = useNavigate();
    const param = useParams();

    const [isFetchPending, setFetchPending] = React.useState(true)

    const fetchData = async () => {
        await axios.get(`http://localhost:3001/chess/${param.id}`).then(async (response) => {
            await setSelectedSakk(response.data);
        }).finally(() => setFetchPending(false));
    }

    useEffect(() => {
        fetchData();
    }, [isFetchPending]);

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    <div key={selectedSakk.id} className="card m-3" style={{ width: '18rem' }}>
                        <Link onClick={() => {
                            navigate(`/sakk/${selectedSakk.id}`);
                        }} to={`/sakk/${selectedSakk.id}`}> <img src={selectedSakk.image_url.includes('.jpg') || selectedSakk.image_url.includes('.png') ? selectedSakk.image_url : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A személyről egy kép" /></Link>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{selectedSakk.name}</h5>
                            <p className="card-text">Születési dátum: {selectedSakk.birth_date}</p>
                            <p className="card-text">Győzelmek(vb): {selectedSakk.world_ch_won}</p>
                            <a href={selectedSakk.profile_url} className='link-primary' >Profil</a>
                            <div className="mt-auto">
                                <Link to={`/sakkFrissit/${selectedSakk.id}`} className="btn btn-warning m-1"
                                    onClick={async () => {
                                        await setSelectedSakk(selectedSakk);
                                    }}>Frissítés</Link>
                                <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                    await setSelectedSakk(selectedSakk);
                                }} className="btn btn-danger m-1">Törlés</button>
                            </div>
                        </div>
                    </div>
            }
        </div>


    )
}
