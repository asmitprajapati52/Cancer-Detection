import React, { createContext, useContext, useState } from 'react'

const ScanContext=createContext();

export const ScanProvider=({children})=>{
    const [currentScan, setCurrentScan] = useState(null);
    const [scanHistory, setScanHistory] = useState([]);

    const saveScanResult=(result)=>{
        setCurrentScan(result);
        setScanHistory((prev)=>[result, ...prev]);
    };

    const clearCurrentScan=()=>{
        setCurrentScan(null);
    }

    return(
        <ScanContext.Provider value={{ currentScan , scanHistory, saveScanResult, clearCurrentScan}}>
            {children}
        </ScanContext.Provider>
    )
}



export const useScan=()=>useContext(ScanContext);