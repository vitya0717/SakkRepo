import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const DeleteConfirmModal = ({ selectedSakk, setFetchPending }) => {
    const navigate = useNavigate();
    return (
        <div className="modal fade" id="deleteConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteConfirmLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="deleteConfirmLabel">Törlés megerősítése</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        A következő személy lesz törölve:
                        <div key={selectedSakk.id} className="card m-3" style={{ width: '18rem' }}>
                            <img src={selectedSakk.image_url ? selectedSakk.image_url : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A személyről egy kép" />
                            <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{selectedSakk.name}</h5>
                            <p className="card-text">Születési dátum: {selectedSakk.birth_date}</p>
                            <p className="card-text">Győzelmek(vb): {selectedSakk.world_ch_won}</p>
                            <a href={selectedSakk.profile_url} className='link-primary' >Profil</a>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
                        <button onClick={async () => {
                            await axios.delete(`https://chess.sulla.hu/chess/${selectedSakk.id}`).then(() => {
                                setFetchPending(true);
                                navigate('/Sakk');
                            })
                        }} type="button" className="btn btn-danger" data-bs-dismiss="modal">Törlés</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
