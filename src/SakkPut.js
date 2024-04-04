import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const SakkPut = ({ setFetchPending, selectedSakk, setSelectedSakk }) => {
    const navigate = useNavigate();
    const param = useParams();
  
    const [formPendingFetch, setFormPendingFetch] = React.useState(true)
  
    /*"id": 1,
    "name": "Garry Kasparov",
    "birth_date": "1963-04-13",
    "world_ch_won": 0,
    "profile_url": "https://hu.wikipedia.org/wiki/Garry_Kasparov",
    "image_url": "https://www.sulla.hu/Kasparov.jpg"*/

    const [neve, setNev] = React.useState("")
    const [kepURL, setKepURL] = React.useState("")
    const [szulDatum, setSzulDatum] = React.useState("")
    const [gyozelmek, setGyozelmek] = React.useState(0)
    const [profilURL, setProfilURL] = React.useState("")

  
    const fetchData = async () => {
      await axios.get(`http://localhost:3001/chess/${param.id}`).then(async (response) => {
        await setSelectedSakk(response.data);
        setNev(response.data.name);
        setKepURL(response.data.image_url);
        setSzulDatum(response.data.birth_date);
        setGyozelmek(response.data.world_ch_won);
        setProfilURL(response.data.profile_url);
      }).finally(() => setFormPendingFetch(false));
    }
  
    useEffect(() => {
      fetchData();
    }, [formPendingFetch]);
  
    const Name = (e) => {
      setNev(e.target.value)
    }
  
    const KepURL = (e) => {
      setKepURL(e.target.value)
    }
  
    const Datum = (e) => {
      setSzulDatum(e.target.value)
    }

    const Gyozelmek = (e) => {
      setGyozelmek(e.target.value)
    }

    const ProfilURL = (e) => {
      setProfilURL(e.target.value)
    }
  
    return (
      <div className='container w-25 mt-5'>
        <form onSubmit={async (e) => {
          e.preventDefault();
          e.persist();
          
          const updateData = {
            id: selectedSakk.id,
            name: neve,
            image_url: kepURL,
            birth_date: szulDatum,
            world_ch_won: gyozelmek,
            profile_url: profilURL
          }

          await axios.put(`https://chess.sulla.hu/chess/${param.id}`, updateData).then(async () => {
            await setFetchPending(true);
            navigate('/Sakk');
          });
  
        }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Név</label>
            <input type="text" className="form-control" id="name" value={neve} onChange={Name} />
          </div>
          <div className="mb-3">
            <label htmlFor="szulDatum" className="form-label">Születési dátum</label>
            <input type="date" className="form-control" id="szulDatum" value={szulDatum} onChange={Datum} />
          </div>
          <div className="mb-3">
            <label htmlFor="profilURL" className="form-label">Profil URL</label>
            <input type="text" className="form-control" id="profilURL" value={profilURL} onChange={ProfilURL} />
          </div>
          <div className="mb-3">
            <label htmlFor="kepURL" className="form-label">Kép URL</label>
            <input type="text" className="form-control" id="kepURL" value={kepURL} onChange={KepURL} />
          </div>
          <div className="mb-3">
            <label htmlFor="gyozelmek" className="form-label">Gyözelmek</label>
            <input type="number" className="form-control" id="gyozelmek" value={gyozelmek} onChange={Gyozelmek} />
          </div>
          <button type="submit" className="btn btn-success">Mentés</button>
        </form>
      </div>
    )
}
