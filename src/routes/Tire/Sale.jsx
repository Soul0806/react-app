import React, { useEffect, useState } from 'react'
import { getToday } from '../../lib/helper';
const today = getToday();

function Sale({ salesState }) {
    
    useEffect(() => {
  
    }, [])

    function service(service) {
        return service == 'fix' ? '補' : '換';
    }
    return (
        <div>
            <fieldset>
                <legend>{today}</legend>
                {salesState.sales.map(sale => {
                    return (
                        <div>
                            {service(sale.service)}
                            {sale.price}
                        </div>
                    )
                })
                }
            </fieldset>
        </div>
    )
}

export default Sale