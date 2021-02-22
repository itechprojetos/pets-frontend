import React from 'react'

const CardAroundAnimals = ({ imgView, raca }) => {
    return (
        <div className="">
            <div className="shadow mt-1 d-flex justify-content-center align-items-center"
                style={{
                    width: "100px",
                    height: "100px",
                    // paddingTop: "16px",
                    // paddingBottom: "16px",
                    // paddingLeft: "10px",
                    // paddingRight: "10px",
                    lineHeight: 1.33,
                    borderRadius: "45px",
                    overflow: 'hidden'
                }}
            >
                <img src={imgView} alt="" style={{ objectFit: 'cover', width: '120px', height: '120px' }} />
            </div>
            <p className="text-md-center text-left mt-2 ml-2 ml-md-0" >{raca || 'X'}</p>
        </div>
    )
}

export default CardAroundAnimals
