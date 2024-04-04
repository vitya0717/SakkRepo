import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export const SakkPost = ({setFetchPending}) => {
    const navigate = useNavigate();
    return (
        <div className='container w-25 mt-5'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();

                /*"id": 1,
                "name": "Garry Kasparov",
                "birth_date": "1963-04-13",
                "world_ch_won": 0,
                "profile_url": "https://hu.wikipedia.org/wiki/Garry_Kasparov",
                "image_url": "https://www.sulla.hu/Kasparov.jpg"*/

                const szemelyNev = e.target.sakkNev.value
                const KepURL = e.target.sakkKepURL.value
                const SzulDatum = e.target.sakkSzulDatum.value
                const ProfilUrl = e.target.sakkProfilUrl.value
                const Wins = e.target.sakkWins.value


                const postData = {
                    id: 0,
                    name: szemelyNev,
                    image_url: KepURL,
                    birth_date: SzulDatum,
                    profile_url: ProfilUrl,
                    world_ch_won: Wins
                }
                await axios.post('http://localhost:3001/chess', postData).then(async () => {
                    await setFetchPending(true);
                    navigate('/Sakk');
                });

            }}>
                <div className="mb-3">
                    <label htmlFor="sakkNev" className="form-label">Nev</label>
                    <input type="text" className="form-control" id="sakkNev" />
                </div>
                <div className="mb-3">
                    <label htmlFor="sakkKepURL" className="form-label">Kep URL</label>
                    <input type="text" className="form-control" id="sakkKepURL" />
                </div>
                <div className="mb-3">
                    <label htmlFor="sakkSzulDatum" className="form-label">Szuldatum</label>
                    <input type="date" className="form-control" id="sakkSzulDatum" />
                </div>
                <div className="mb-3">
                    <label htmlFor="sakkProfilUrl" className="form-label">Profil URL</label>
                    <input type="text" className="form-control" id="sakkProfilUrl" />
                </div>
                <div className="mb-3">
                    <label htmlFor="sakkWins" className="form-label">Gyözelmek</label>
                    <input type="number" className="form-control" id="sakkWins" />
                </div>
                <button type="submit" className="btn btn-success">Mentés</button>
            </form>
        </div>
    )
}
