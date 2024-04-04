import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sakk from './Sakk';
import Navbar from './Navbar';
import { SakkPost } from './SakkPost';
import { SakkPut } from './SakkPut';
import { SakkSelect } from './SakkSelect';
import { DeleteConfirmModal } from './DeleteConfirmModal';


function App() {
  const [sakk, setSakk] = useState([]);
  const [isFetchPending, setFetchPending] = useState(true)
  const [selectedSakk, setSelectedSakk] = useState({});


  return (
    <BrowserRouter>
      <Navbar sakk={sakk} setSakk={setSakk} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />
      <Routes>
        <Route path={"/"} element={<Sakk sakk={sakk} setSakk={setSakk} setSelectedSakk={setSelectedSakk} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />} />
        <Route path={"/Sakk"} element={<Sakk sakk={sakk} setSakk={setSakk} setSelectedSakk={setSelectedSakk} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />} />
        <Route path={"/ujSakk"} element={<SakkPost sakk={sakk} setSakk={setSakk} setFetchPending={setFetchPending} />} />
        <Route path={"/sakkFrissit/:id"} element={<SakkPut selectedSakk={selectedSakk} setSelectedSakk={setSelectedSakk} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />} />
        <Route path={"/sakk/:id"} element={<SakkSelect selectedSakk={selectedSakk} setSelectedSakk={setSelectedSakk} />} />
      </Routes>
      <DeleteConfirmModal selectedSakk={selectedSakk} setFetchPending={setFetchPending} />
    </BrowserRouter>
  );
}

export default App;