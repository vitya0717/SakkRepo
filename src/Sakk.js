import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Sakk = ({ sakk, setSakk, setSelectedSakk, setFetchPending, isFetchPending }) => {
    const navigate = useNavigate();
    const fetchSakk = async () => {
        try {
            const response = await fetch('https://chess.sulla.hu/chess/')
            const data = await response.json()
            setSakk(data)
        } catch (error) {
            console.error(error)
        } finally {
            setFetchPending(false)
        }
    }/*"id": 1,
    "name": "Garry Kasparov",
    "birth_date": "1963-04-13",
    "world_ch_won": 0,
    "profile_url": "https://hu.wikipedia.org/wiki/Garry_Kasparov",
    "image_url": "https://www.sulla.hu/Kasparov.jpg"*/
    useEffect(() => {
        fetchSakk()
    }, [isFetchPending])

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    sakk.map(sakk => (
                        <div key={sakk.id} className="card m-3" style={{ width: '18rem' }}>
                            <Link onClick={() => {
                                navigate(`/sakk/${sakk.id}`);
                            }} to={`/sakk/${sakk.id}`}> <img src={sakk.image_url.includes('.jpg') || sakk.image_url.includes('.png') ? sakk.image_url : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A személyről egy kép" /></Link>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{sakk.name}</h5>
                                <p className="card-text">Születési dátum: {sakk.birth_date}</p>
                                <p className="card-text">Győzelmek(vb): {sakk.world_ch_won}</p>
                                <a href={sakk.profile_url} className='link-primary' >Profil</a>
                                <div className="mt-auto">
                                    <Link to={`/sakkFrissit/${sakk.id}`} className="btn btn-warning m-1"
                                        onClick={async () => {
                                            await setSelectedSakk(sakk);
                                        }}>Frissítés</Link>
                                    <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                        await setSelectedSakk(sakk);
                                    }} className="btn btn-danger m-1">Törlés</button>
                                </div>
                            </div>
                        </div>
                    ))

            }
        </div>

    )
}

export default Sakk
