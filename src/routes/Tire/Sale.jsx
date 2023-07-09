import React, { useEffect, useState } from 'react'
import { getToday } from '../../lib/helper';
const today = getToday();

function Sale({ salesState }) {
    useEffect(() => {
        if([].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))) {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            })}
        }
    , [])
    return (
        <div className="sale">
            <fieldset>
                <legend>{today}</legend>
                {salesState.sales.map(sale => {
                    return (
                        <div className="flex g-1" data-bs-toggle="tooltip" data-bs-placement="right" title="right">{sale.service == 'fix' ?
                            <>
                                <div>補</div>
                            </>
                            :
                            <>
                                <div>售</div>
                                <div className="f-g-1">{sale.spec}</div>
                                <div>{sale.quantity}</div>
                            </>
                        }
                            <div className='d-sign'>{sale.price}</div>
                        </div>
                    )
                })
                }
            </fieldset>
        </div>
    )
}

export default Sale