import React from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useAddWalletAlert = () => {
    const history = useHistory()
    return () => toast.success(<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>    У вас нет кошелька
        <br />Желаете добавить?
        <br />
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <button onClick={() => history.push("/settings/profileSettings")} style={{ borderRadius: "12px", padding: "5px 20px", margin: "5px", backgroundColor: "#fb5734", color: "white" }}>Да</button > <button style={{ borderRadius: "12px", margin: "5px", padding: "5px 20px", backgroundColor: "#fb5734", color: "white" }}>Нет</button>
        </div></div >)
}
