import React from 'react'
import { ClaimsItem } from './ClaimsItem'

export const ClaimsList = ({ claims }) => {
    if (!claims.length) {
        return <h3 className="text-danger text-center mt-5">Заявок нет!</h3>
    }

    return (
        <>
            { claims?.length &&
                claims.map((item, idx) => {
                return (
                    <div className="accordion d-flex flex-column my-2" key={item.itemId}>
                        <ClaimsItem item={item} idx={idx}/>
                    </div>
                )
            })}
        </>
    )
}


